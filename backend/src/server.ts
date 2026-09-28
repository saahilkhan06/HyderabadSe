import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";

import { config } from "./config.js";
import { connectDatabase, closeDatabase } from "./db.js";

import { registerProductRequestRoutes } from "./routes/productRequests.js";
import { registerVoiceEnquiryRoutes } from "./routes/voiceEnquiries.js";

async function startServer() {
  const app = Fastify({
    logger: true,
    trustProxy: true,
  });

  await app.register(helmet);

  await app.register(cors, {
    origin: config.CORS_ORIGIN,
    methods: [
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "x-admin-api-key",
    ],
  });

  await app.register(rateLimit, {
    max: 60,
    timeWindow: "1 minute",
  });

  app.get("/", async () => ({
    name: "HyderabadSe API",
    status: "running",
    database: "mongodb",
    health: "/health",
  }));

  app.get("/health", async () => ({
    ok: true,
    service: "gharse--api",
    database: "mongodb",
  }));

  await registerProductRequestRoutes(app);

  await registerVoiceEnquiryRoutes(app);

  const shutdown = async () => {
    try {
      await app.close();
      await closeDatabase();
    } finally {
      process.exit(0);
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  try {
    console.log("Connecting to MongoDB...");

    await connectDatabase();

    console.log("MongoDB connected successfully.");

    await app.listen({
      port: config.PORT,
      host: config.HOST,
    });

    console.log(
      `HyderabadSe  API running on http://localhost:${config.PORT}`,
    );
  } catch (error) {
    app.log.error(error);

    await closeDatabase();

    process.exit(1);
  }
}

void startServer();