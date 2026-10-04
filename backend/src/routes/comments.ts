import type {
  FastifyInstance,
  FastifyRequest,
} from "fastify";

import { CommentModel } from "../models/CommentModel.ts";
import { sendCommentNotificationEmail } from "../email";

/* =========================================================
   TYPES
========================================================= */

type CreateCommentBody = {
  name?: string;
  comment?: string;
  website?: string;
};

type SSEClient = {
  response: FastifyRequest["raw"];
};

/* =========================================================
   CONNECTED SSE CLIENTS
========================================================= */

const clients = new Set<SSEClient>();

/* =========================================================
   SIMPLE COMMENT RATE LIMIT
========================================================= */

// One IP can post at most 5 comments every 10 minutes.

const rateLimitMap = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

function getClientIp(request: FastifyRequest): string {
  const forwarded = request.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  return request.ip || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  const existing = rateLimitMap.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + 10 * 60 * 1000,
    });

    return true;
  }

  if (existing.count >= 5) {
    return false;
  }

  existing.count += 1;

  return true;
}

/* =========================================================
   BROADCAST COMMENT TO CONNECTED VISITORS
========================================================= */

function broadcastComment(comment: {
  _id: unknown;
  name: string;
  comment: string;
  createdAt: Date;
}) {
  const payload = `data: ${JSON.stringify({
    _id: String(comment._id),
    name: comment.name,
    comment: comment.comment,
    createdAt: comment.createdAt,
  })}\n\n`;

  for (const client of clients) {
    try {
      client.response.write(payload);
    } catch {
      clients.delete(client);
    }
  }
}

/* =========================================================
   COMMENT ROUTES
========================================================= */

export default async function commentsRoutes(
  fastify: FastifyInstance,
) {
  /* =======================================================
     GET /api/comments

     Returns the latest 50 comments.
  ======================================================= */

  fastify.get(
    "/api/comments",
    async (_request, reply) => {
      try {
        const comments = await CommentModel.find()
          .sort({ createdAt: -1 })
          .limit(50)
          .lean();

        return reply.send(comments);
      } catch (error) {
        fastify.log.error(error);

        return reply.code(500).send({
          message: "Unable to load comments.",
        });
      }
    },
  );

  /* =======================================================
     POST /api/comments

     Creates and saves a new comment.
  ======================================================= */

  fastify.post<{ Body: CreateCommentBody }>(
    "/api/comments",
    async (request, reply) => {
      try {
        const name =
          request.body?.name?.trim() || "";

        const comment =
          request.body?.comment?.trim() || "";

        const website =
          request.body?.website?.trim() || "";

        /* ---------------------------------------------------
           HONEYPOT SPAM PROTECTION
        --------------------------------------------------- */

        if (website) {
          return reply.code(400).send({
            message: "Invalid submission.",
          });
        }

        /* ---------------------------------------------------
           NAME VALIDATION
        --------------------------------------------------- */

        if (name.length < 2) {
          return reply.code(400).send({
            message: "Please enter your name.",
          });
        }

        if (name.length > 60) {
          return reply.code(400).send({
            message: "Name is too long.",
          });
        }

        /* ---------------------------------------------------
           COMMENT VALIDATION
        --------------------------------------------------- */

        if (comment.length < 2) {
          return reply.code(400).send({
            message: "Please enter a comment.",
          });
        }

        if (comment.length > 500) {
          return reply.code(400).send({
            message:
              "Comment must be 500 characters or less.",
          });
        }

        /* ---------------------------------------------------
           RATE LIMIT
        --------------------------------------------------- */

        const ip = getClientIp(request);

        if (!checkRateLimit(ip)) {
          return reply.code(429).send({
            message:
              "Too many comments from this connection. Please try again later.",
          });
        }

        /* ---------------------------------------------------
           SAVE COMMENT TO MONGODB
        --------------------------------------------------- */

        const savedComment =
          await CommentModel.create({
            name,
            comment,
          });

        /* ---------------------------------------------------
           PUBLIC COMMENT OBJECT
        --------------------------------------------------- */

        const publicComment = {
          _id: savedComment._id,
          name: savedComment.name,
          comment: savedComment.comment,
          createdAt: savedComment.createdAt,
        };

        /* ---------------------------------------------------
           LIVE UPDATE
        --------------------------------------------------- */

        broadcastComment(publicComment);

        /* ---------------------------------------------------
           EMAIL NOTIFICATION

           Runs in the background so the visitor does not
           have to wait for Resend.
        --------------------------------------------------- */

        void sendCommentNotificationEmail({
          name: savedComment.name,
          comment: savedComment.comment,
          createdAt: savedComment.createdAt,
        }).catch((error) => {
          fastify.log.error(
            error,
            "Comment notification email failed",
          );
        });

        /* ---------------------------------------------------
           RESPONSE
        --------------------------------------------------- */

        return reply.code(201).send({
          message: "Comment posted successfully.",
          comment: publicComment,
        });
      } catch (error) {
        fastify.log.error(error);

        return reply.code(500).send({
          message: "Unable to post comment.",
        });
      }
    },
  );

  /* =======================================================
     GET /api/comments/stream

     Server-Sent Events endpoint.

     Visitors connect here and receive new comments
     automatically without refreshing the page.
  ======================================================= */

  fastify.get(
    "/api/comments/stream",
    async (request, reply) => {
      /*
       * Take control of the raw response because SSE keeps
       * the HTTP connection open.
       */
      reply.hijack();

      const response = reply.raw;

      response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
        "Access-Control-Allow-Origin":
          process.env.CORS_ORIGIN || "*",
      });

      /* ---------------------------------------------------
         INITIAL CONNECTION MESSAGE
      --------------------------------------------------- */

      response.write(
        "event: connected\ndata: connected\n\n",
      );

      const client: SSEClient = {
        response,
      };

      clients.add(client);

      /* ---------------------------------------------------
         HEARTBEAT
      --------------------------------------------------- */

      const heartbeat = setInterval(() => {
        try {
          response.write(": heartbeat\n\n");
        } catch {
          clearInterval(heartbeat);
          clients.delete(client);
        }
      }, 25000);

      /* ---------------------------------------------------
         CONNECTION CLOSED
      --------------------------------------------------- */

      request.raw.on("close", () => {
        clearInterval(heartbeat);

        clients.delete(client);

        try {
          response.end();
        } catch {
          // Connection already closed.
        }
      });
    },
  );
}
