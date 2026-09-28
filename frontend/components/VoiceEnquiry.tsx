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

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

const SILENCE_DELAY = 3000;

export default function VoiceEnquiry() {
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const recognitionRef =
    useRef<SpeechRecognitionLike | null>(null);

  const transcriptRef = useRef("");
  const listeningRef = useRef(false);
  const submittingRef = useRef(false);

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

      if (!finalTranscript || submittingRef.current) {
        return;
      }

      shouldRestartRef.current = false;

      setIsListening(false);
      listeningRef.current = false;

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
          data.message || "Your enquiry has been sent.",
        );

        clearSuccessTimer();

        successTimerRef.current = setTimeout(() => {
          setSuccess("");
          setTranscript("");

          transcriptRef.current = "";
        }, 3000);
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
      const recognition = recognitionRef.current;

      if (!recognition || submittingRef.current) {
        return;
      }

      try {
        recognition.start();
      } catch {
        // Chrome throws if recognition is already running.
        // We can safely ignore that case.
      }
    };

    const scheduleSubmission = () => {
      clearSilenceTimer();

      silenceTimerRef.current = setTimeout(() => {
        submitVoiceEnquiry();
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

      transcriptRef.current = "";

      shouldRestartRef.current = true;
      listeningRef.current = true;

      setIsListening(true);

      const recognition = new SpeechRecognition();

      recognition.lang = "en-IN";

      /*
       * Keep recognition running for as long as possible.
       * Chrome may still end recognition after silence,
       * so onend below restarts it while our 3-second
       * silence timer is active.
       */
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let text = "";

        for (
          let i = 0;
          i < event.results.length;
          i++
        ) {
          text += event.results[i][0].transcript;
        }

        const finalText = text.trim();

        if (!finalText) {
          return;
        }

        transcriptRef.current = finalText;

        setTranscript(finalText);

        /*
         * Every time the user speaks, reset the
         * 3-second silence countdown.
         */
        scheduleSubmission();
      };

      recognition.onerror = (event) => {
        /*
         * "no-speech" can happen when the browser
         * temporarily stops listening. We don't want
         * that to immediately submit the enquiry.
         */
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
        /*
         * If the user has not finished speaking, Chrome may
         * end the recognition session after a short pause.
         *
         * Restart it so the user can continue speaking.
         */
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

        /*
         * Recognition has genuinely finished.
         * The actual submission is controlled by the
         * 3-second silence timer.
         */
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
    };
  }, []);

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
            <p className="text-base leading-relaxed text-ink">
              {transcript}
            </p>
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