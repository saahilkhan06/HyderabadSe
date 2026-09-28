"use client";

import { useEffect, useRef, useState } from "react";

type SpeechRecognitionEventLike = Event & {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
};

type SpeechRecognitionConstructor =
  new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000"
).replace(/\/$/, "");

const SILENCE_DELAY = 3000;

export default function VoiceEnquiry() {
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const recognitionRef =
    useRef<SpeechRecognitionLike | null>(null);

  const transcriptRef = useRef("");
  const listeningRef = useRef(false);
  const submittingRef = useRef(false);

  const emailRef = useRef("");

  const silenceTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const successTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldRestartRef = useRef(false);

  useEffect(() => {
    const clearSilenceTimer = () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };

    const clearSuccessTimer = () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }
    };

    const submitVoiceEnquiry = async () => {
      const finalTranscript =
        transcriptRef.current.trim();

      const customerEmail =
        emailRef.current.trim();

      if (!finalTranscript) {
        setError("Please speak your enquiry first.");
        return;
      }

      if (!customerEmail) {
        setError(
          "Please enter your email address before sending.",
        );
        return;
      }

      const emailIsValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          customerEmail,
        );

      if (!emailIsValid) {
        setError(
          "Please enter a valid email address.",
        );
        return;
      }

      if (submittingRef.current) {
        return;
      }

      setIsSubmitting(true);
      submittingRef.current = true;

      setError("");
      setSuccess("");

      try {
        const response = await fetch(
          `${API_URL}/api/voice-enquiries`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transcript: finalTranscript,
              email: customerEmail,
              source: "voice",
            }),
          },
        );

        const data = (await response
          .json()
          .catch(() => ({}))) as {
          success?: boolean;
          referenceId?: string;
          message?: string;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(
            data.message ||
              data.error ||
              "We could not send your enquiry. Please try again.",
          );
        }

        setSuccess(
          data.message ||
            "Your enquiry has been sent successfully.",
        );

        clearSuccessTimer();

        successTimerRef.current =
          setTimeout(() => {
            setSuccess("");
            setTranscript("");
            transcriptRef.current = "";

            setEmail("");
            emailRef.current = "";

            setError("");
          }, 4000);
      } catch (error) {
        console.error(
          "Voice enquiry submission failed:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "We could not send your enquiry. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
        submittingRef.current = false;
      }
    };

    const startRecognition = () => {
      const recognition =
        recognitionRef.current;

      if (
        !recognition ||
        submittingRef.current
      ) {
        return;
      }

      try {
        recognition.start();
      } catch {
        // Chrome can throw if recognition is already running.
        // Safe to ignore.
      }
    };

    const stopListeningAfterSilence = () => {
      clearSilenceTimer();

      silenceTimerRef.current =
        setTimeout(() => {
          shouldRestartRef.current = false;
          listeningRef.current = false;

          setIsListening(false);

          recognitionRef.current?.stop();
        }, SILENCE_DELAY);
    };

    const startVoiceEnquiry = () => {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setError(
          "Voice enquiry is not supported in this browser. Please use Google Chrome or Microsoft Edge.",
        );
        return;
      }

      if (
        listeningRef.current ||
        submittingRef.current
      ) {
        return;
      }

      clearSilenceTimer();
      clearSuccessTimer();

      setError("");
      setSuccess("");
      setTranscript("");
      setEmail("");

      transcriptRef.current = "";
      emailRef.current = "";

      shouldRestartRef.current = true;
      listeningRef.current = true;

      setIsListening(true);

      const recognition =
        new SpeechRecognition();

      recognition.lang = "en-IN";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let text = "";

        for (
          let i = 0;
          i < event.results.length;
          i++
        ) {
          text +=
            event.results[i][0].transcript;
        }

        const finalText = text.trim();

        if (!finalText) {
          return;
        }

        transcriptRef.current = finalText;

        setTranscript(finalText);

        // Reset the 3-second silence countdown
        // every time the user speaks.
        stopListeningAfterSilence();
      };

      recognition.onerror = (event) => {
        if (event.error === "no-speech") {
          if (
            listeningRef.current &&
            shouldRestartRef.current
          ) {
            setTimeout(() => {
              if (
                listeningRef.current &&
                shouldRestartRef.current
              ) {
                startRecognition();
              }
            }, 100);
          }

          return;
        }

        if (event.error === "aborted") {
          return;
        }

        listeningRef.current = false;
        shouldRestartRef.current = false;

        setIsListening(false);

        clearSilenceTimer();

        setError(
          "We could not hear your enquiry. Please try again.",
        );
      };

      recognition.onend = () => {
        if (
          listeningRef.current &&
          shouldRestartRef.current &&
          !submittingRef.current
        ) {
          setTimeout(() => {
            if (
              listeningRef.current &&
              shouldRestartRef.current &&
              !submittingRef.current
            ) {
              startRecognition();
            }
          }, 100);

          return;
        }
      };

      recognitionRef.current = recognition;

      try {
        recognition.start();
      } catch (error) {
        console.error(
          "Could not start voice recognition:",
          error,
        );

        listeningRef.current = false;
        shouldRestartRef.current = false;

        setIsListening(false);

        setError(
          "We could not start the microphone. Please try again.",
        );
      }
    };

    window.addEventListener(
      "hyderabadse-start-voice",
      startVoiceEnquiry,
    );

    // Store submit function so the button can call it.
    (
      window as Window & {
        hyderabadseSubmitVoiceEnquiry?: () => void;
      }
    ).hyderabadseSubmitVoiceEnquiry = submitVoiceEnquiry;

    return () => {
      window.removeEventListener(
        "hyderabadse-start-voice",
        startVoiceEnquiry,
      );

      clearSilenceTimer();
      clearSuccessTimer();

      shouldRestartRef.current = false;
      listeningRef.current = false;

      recognitionRef.current?.stop();
      recognitionRef.current = null;

      delete (
        window as Window & {
          hyderabadseSubmitVoiceEnquiry?: () => void;
        }
      ).hyderabadseSubmitVoiceEnquiry;
    };
  }, []);

  const handleSend = () => {
    const submit =
      (
        window as Window & {
          hyderabadseSubmitVoiceEnquiry?: () => void;
        }
      ).hyderabadseSubmitVoiceEnquiry;

    submit?.();
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] w-[min(90vw,600px)] -translate-x-1/2">
      {(isListening ||
        isSubmitting ||
        transcript ||
        error ||
        success) && (
        <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-xl">

          {isListening && (
            <p className="mb-3 text-sm font-medium text-orange-500">
              Listening...
            </p>
          )}

          {isSubmitting && (
            <p className="mb-3 text-sm font-medium text-orange-500">
              Sending your enquiry...
            </p>
          )}

          {transcript && (
            <div>
              <p className="text-base leading-relaxed text-ink">
                {transcript}
              </p>
            </div>
          )}

          {transcript && !success && (
            <div className="mt-4">
              <label
                htmlFor="voice-enquiry-email"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Your email address
              </label>

              <input
                id="voice-enquiry-email"
                type="email"
                value={email}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  setEmail(value);
                  emailRef.current = value;

                  if (error) {
                    setError("");
                  }
                }}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 disabled:opacity-60"
              />

              <p className="mt-2 text-xs text-slate-500">
                We'll send your enquiry confirmation
                to this email address.
              </p>

              <button
                type="button"
                onClick={handleSend}
                disabled={isSubmitting}
                className="mt-4 w-full rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Sending..."
                  : "Send enquiry"}
              </button>
            </div>
          )}

          {success && (
            <p className="mt-3 text-sm font-medium text-green-600">
              {success}
            </p>
          )}

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}