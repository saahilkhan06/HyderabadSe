const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/* =========================================================
   TYPES
========================================================= */

export type CommentItem = {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
};

export type CreateCommentInput = {
  name: string;
  comment: string;
  website?: string;
};

/* =========================================================
   GET COMMENTS
========================================================= */

export async function getComments(): Promise<CommentItem[]> {
  const response = await fetch(`${API_URL}/api/comments`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Unable to load comments.",
    );
  }

  return Array.isArray(data) ? data : [];
}

/* =========================================================
   POST COMMENT
========================================================= */

export async function createComment(
  input: CreateCommentInput,
): Promise<{
  message: string;
  comment: CommentItem;
}> {
  const response = await fetch(`${API_URL}/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Unable to post your comment.",
    );
  }

  return data;
}

/* =========================================================
   LIVE COMMENT STREAM
========================================================= */

export function createCommentStream(
  onComment: (comment: CommentItem) => void,
) {
  const stream = new EventSource(
    `${API_URL}/api/comments/stream`,
  );

  stream.onmessage = (event) => {
    try {
      const comment: CommentItem = JSON.parse(event.data);

      onComment(comment);
    } catch {
      // Ignore malformed SSE messages.
    }
  };

  stream.onerror = () => {
    /*
      EventSource automatically attempts to reconnect.
      We intentionally do not close the stream here.
    */
  };

  return stream;
}
