"use client";

import { FormEvent, useEffect, useState } from "react";

import {
  createComment,
  createCommentStream,
  getComments,
  type CommentItem,
} from "@/lib/comments-api";

export default function Comments() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     LOAD EXISTING COMMENTS
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadComments() {
      try {
        const data = await getComments();

        if (!cancelled) {
          setComments(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load comments right now.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadComments();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     LIVE COMMENTS — SERVER SENT EVENTS
  ========================================================= */

  useEffect(() => {
    const stream = createCommentStream((newComment) => {
      setComments((current) => {
        const alreadyExists = current.some(
          (item) => item._id === newComment._id,
        );

        if (alreadyExists) {
          return current;
        }

        return [newComment, ...current].slice(0, 50);
      });
    });

    return () => {
      stream.close();
    };
  }, []);

  /* =========================================================
     SUBMIT COMMENT
  ========================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const cleanName = name.trim();
    const cleanComment = comment.trim();

    /* -------------------------------------------------------
       NAME VALIDATION
    ------------------------------------------------------- */

    if (cleanName.length < 2) {
      setError("Please enter your name.");
      return;
    }

    if (cleanName.length > 60) {
      setError("Name must be 60 characters or less.");
      return;
    }

    /* -------------------------------------------------------
       COMMENT VALIDATION
    ------------------------------------------------------- */

    if (cleanComment.length < 2) {
      setError("Please write a comment.");
      return;
    }

    if (cleanComment.length > 500) {
      setError("Comment must be 500 characters or less.");
      return;
    }

    setPosting(true);

    try {
      await createComment({
        name: cleanName,
        comment: cleanComment,
        website,
      });

      /*
        The backend broadcasts the saved comment through SSE.
        We intentionally do not manually add it here.
      */

      setName("");
      setComment("");
      setWebsite("");

      setMessage(
        "Thank you! Your comment has been posted.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to post your comment.",
      );
    } finally {
      setPosting(false);
    }
  }

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  function formatDate(date: string) {
    try {
      return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "";
    }
  }

  return (
    <section
      id="comments"
      className="shell pb-16 lg:pb-20"
    >
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        {/* ===================================================
            LEFT — COMMENT FORM
        =================================================== */}

        <div className="card p-6 sm:p-8">
          <p className="section-title">
            Share your experience.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-ink/60">
            Completed an order with HyderabadSe? We would love
            to hear about your experience.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-3 space-y-5"
          >
            {/* NAME */}

            <div>
              <label
                htmlFor="comment-name"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Your name
              </label>

              <input
                id="comment-name"
                type="text"
                className="field"
                placeholder="Your name"
                value={name}
                maxLength={60}
                autoComplete="name"
                onChange={(event) =>
                  setName(event.target.value)
                }
              />
            </div>

            {/* COMMENT */}

            <div>
              <label
                htmlFor="comment-text"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Your experience
              </label>

              <textarea
                id="comment-text"
                className="field min-h-[80px] resize-none"
                placeholder="Tell us about your experience with HyderabadSe..."
                value={comment}
                maxLength={500}
                onChange={(event) =>
                  setComment(event.target.value)
                }
              />

              <div className="mt-1 text-right text-[11px] text-ink/40">
                {comment.length}/500
              </div>
            </div>

            {/* =================================================
                HONEYPOT
            ================================================= */}

            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="comment-website">
                    
              </label>

              <input
                id="comment-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) =>
                  setWebsite(event.target.value)
                }
              />
            </div>

            {/* STATUS */}

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {message && (
              <p
                role="status"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={posting}
              className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {posting
                ? "Posting..."
                : "Share your experience"}
            </button>
          </form>
        </div>

        {/* ===================================================
            RIGHT — LIVE COMMENTS
        =================================================== */}

        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="section-title">
                What people are saying
              </p>

              <h3 className="eyebrow mt-2">
                Real words from our community.
              </h3>
            </div>

            <span className="hidden rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11px] font-semibold text-ink/50 sm:inline-flex">
              Live
            </span>
          </div>

          {loading ? (
            <div className="card p-6 text-sm text-ink/50">
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className="card p-7 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-lg">
                💬
              </div>

              <h4 className="mt-4 text-base font-bold text-ink">
                Be the first to share
              </h4>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink/50">
                Your experience could help someone deciding
                whether to order through HyderabadSe.
              </p>
            </div>
          ) : (
            <div
              aria-live="polite"
              className="space-y-4"
            >
              {comments.map((item) => (
                <article
                  key={item._id}
                  className="card p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-bold text-ink">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[11px] font-medium text-ink/40">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/5 text-sm">
                      💬
                    </div>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-ink/70">
                    {item.comment}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
