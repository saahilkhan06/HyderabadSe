"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  text:
    "👋 **AssalamuAlaikum!** I'm **HyderabadSe Assistant**.\n\n" +
    "I can help you find products from India, understand how HyderabadSe works, " +
    "and guide you through requesting something to be delivered to the Gulf.\n\n" +
    "Tell me what you're looking for — a product, brand, Indian item, or anything you want to source. 🇮🇳 → 🇦🇪",
};
const quickQuestions = [
  "How does it work?",
  "I want to order something",
  "Do you ship to Dubai?",
  "Do you also shop for us?",
  "Duration of Shipping?",
  "will you help me buy clothes?"
];
const SymptomChecker = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  /* =========================================================
     AUTO SCROLL
  ========================================================= */

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isOpen, isMinimized]);

  /* =========================================================
     AUTO FOCUS
  ========================================================= */

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  const sendMessage = async (messageText?: string) => {
    const trimmed = (messageText ?? input).trim();

    if (!trimmed || loading) return;

    const userMessage: Message = {
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      const response = await fetch(`${apiUrl}/api/hyderabadse/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,

          history: messages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();

      if (data.success && data.response) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.response,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text:
              "Sorry, I couldn't process that right now. " +
              "Please try again or use **Request a Product** to tell us what you're looking for.",
          },
        ]);
      }
    } catch (error) {
      console.error("HyderabadSe Assistant error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "⚠️ I'm having trouble connecting right now.\n\n" +
            "You can still use **Request a Product** on the website, " +
            "and our team will help you source it from India.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     ENTER TO SEND
  ========================================================= */

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  /* =========================================================
     RESET CHAT
  ========================================================= */

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  /* =========================================================
     RENDER TEXT
  ========================================================= */

  const renderText = (text: string) => {
    const lines = text.split("\n");

    return lines.map((line, index) => {
      const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

      return (
        <span key={index}>
          {parts.map((part, partIndex) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
            }

            if (part.startsWith("*") && part.endsWith("*")) {
              return <em key={partIndex}>{part.slice(1, -1)}</em>;
            }

            return <span key={partIndex}>{part}</span>;
          })}

          {index < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* =====================================================
          FLOATING BUTTON
      ===================================================== */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed
            bottom-28
            right-3
            z-50
            flex
            flex-col
            items-center
            justify-center
            rounded-full
            bg-[#102a43]
            text-white
            shadow-2xl
            transition-all
            duration-300
            hover:scale-105
            hover:bg-moss
          "
          style={{
            width: "82px",
            height: "82px",
          }}
          title="HyderabadSe Assistant"
          aria-label="Open HyderabadSe Assistant"
        >
          {/* Pulse */}
          <span className="absolute inset-0 rounded-full bg-[#d8b978] opacity-20 animate-ping" />

          {/* Chat icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.8L3 21l1.8-4.2A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
            <path d="M8 11h.01" />
            <path d="M12 11h.01" />
            <path d="M16 11h.01" />
          </svg>

          <span className="relative z-10 mt-1 text-[9px] font-semibold">
            AI Assistant
          </span>
        </button>
      )}

      {/* =====================================================
          CHAT WIDGET
      ===================================================== */}

      {isOpen && (
        <div
          className={`
  fixed
  bottom-24
  sm:bottom-28
  right-4
  sm:right-5
  z-50
  flex
  flex-col
  overflow-hidden
  rounded-2xl
  border
  border-black/10
  bg-white
  shadow-2xl
  transition-all
  duration-300

  ${
    isMinimized
      ? "h-14 w-72"
      : "h-[min(570px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] sm:w-96"
  }
`}
          style={{
            maxHeight: "90vh",
          }}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-shrink-0 items-center justify-between bg-[#102a43] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              {/* Logo/avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8b978] text-[#102a43]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.8L3 21l1.8-4.2A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
                  <path d="M8 11h.01" />
                  <path d="M12 11h.01" />
                  <path d="M16 11h.01" />
                </svg>
              </div>

              <div>
                <p className="text-sm font-semibold leading-tight">
                  HyderabadSe Assistant
                </p>

                <p className="text-[10px] leading-tight text-white/65">
                  Your AI India → Gulf helper
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset */}
              <button
                onClick={resetChat}
                title="Reset chat"
                className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>

              {/* Minimize */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isMinimized ? (
                    <path d="M18 15l-6-6-6 6" />
                  ) : (
                    <path d="M6 9l6 6 6-6" />
                  )}
                </svg>
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                title="Close"
                className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* =================================================
              CHAT CONTENT
          ================================================= */}

          {!isMinimized && (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f2e9] px-4 py-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Assistant avatar */}
                    {message.role === "assistant" && (
                      <div className="mr-2 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#102a43] text-[#d8b978]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.8L3 21l1.8-4.2A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
                          <path d="M8 11h.01" />
                          <path d="M12 11h.01" />
                          <path d="M16 11h.01" />
                        </svg>
                      </div>
                    )}

                    {/* Message */}
                    <div
                      className={`
                        max-w-[82%]
                        rounded-2xl
                        px-3
                        py-2
                        text-sm
                        leading-relaxed

                        ${
                          message.role === "user"
                            ? "rounded-tr-sm bg-[#102a43] text-white"
                            : "rounded-tl-sm border border-black/5 bg-white text-[#243b53] shadow-sm"
                        }
                      `}
                    >
                      {renderText(message.text)}
                    </div>
                  </div>
                ))}

                {/* =================================================
                    TYPING INDICATOR
                ================================================= */}

                {loading && (
                  <div className="flex justify-start">
                    <div className="mr-2 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#102a43] text-[#d8b978]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.8L3 21l1.8-4.2A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
                        <path d="M8 11h.01" />
                        <path d="M12 11h.01" />
                        <path d="M16 11h.01" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-black/5 bg-white px-4 py-3 shadow-sm">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#102a43]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#102a43] [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#102a43] [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* =================================================
                  QUICK HELP
              ================================================= */}

              <div className="flex-shrink-0 border-t border-[#e8e1d6] bg-white px-3 py-2">
                <div className="flex gap-2 overflow-x-auto px-1 py-1 scrollbar-hide">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question)}
                      disabled={loading}
                      className="
          shrink-0
          whitespace-nowrap
          rounded-full
          border
          border-black/10
          bg-white
          px-3
          py-1.5
          text-xs
          font-medium
          text-[#243b53]
          transition
          hover:bg-[#f7f2e9]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* =================================================
                  DISCLAIMER
              ================================================= */}

              <div className="flex-shrink-0 border-t border-[#e8e1d6] bg-[#fffaf1] px-3 py-1.5">
                <p className="text-center text-[10px] text-[#7b8794]">
                  HyderabadSe Assistant may make mistakes. For exact pricing and
                  availability, submit a product request.
                </p>
              </div>

              {/* =================================================
                  INPUT
              ================================================= */}

              <div className="flex-shrink-0 rounded-b-2xl border-t border-[#e8e1d6] bg-white p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What would you like from India?"
                    rows={1}
                    disabled={loading}
                    className="
                      max-h-24
                      min-h-[40px]
                      flex-1
                      resize-none
                      overflow-y-auto
                      rounded-xl
                      border
                      border-gray-200
                      px-3
                      py-2
                      text-sm
                      text-gray-700
                      outline-none
                      transition-all
                      placeholder:text-gray-400
                      focus:border-[#102a43]
                      focus:ring-1
                      focus:ring-[#102a43]/20
                      disabled:bg-gray-50
                    "
                    style={{
                      lineHeight: "1.4",
                    }}
                    onInput={(event) => {
                      const target = event.currentTarget;

                      target.style.height = "auto";

                      target.style.height =
                        Math.min(target.scrollHeight, 96) + "px";
                    }}
                  />

                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="
                      flex
                      h-10
                      w-10
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#102a43]
                      text-white
                      transition-all
                      hover:scale-105
                      hover:bg-[#183b5d]
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                    aria-label="Send message"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4 20-7z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </button>
                </div>

                <p className="mt-1.5 text-center text-[10px] text-gray-400">
                  Enter to send · Shift+Enter for a new line
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SymptomChecker;
