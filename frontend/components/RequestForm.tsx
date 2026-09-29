"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { submitProductRequest } from "@/lib/request-api";

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

export type ProductRequestPayload = {
  // Required
  name: string;
  email: string;
  whatsapp: string;
  destinationCountry: string;
  productName: string;

  // Optional
  destinationCity?: string;
  preferredBrand?: string;
  productUrl?: string;
  quantity?: string;
  budget?: string;
  shippingPreference?: "economy" | "express" | "not_sure";
  desiredDeliveryDate?: string;
  notes?: string;

  // Consent remains required by the form
  consent: boolean;

  source?: "form" | "voice";
};

type FormState = "idle" | "loading" | "success" | "error";

const initial: ProductRequestPayload = {
  name: "",
  email: "",
  whatsapp: "",
  destinationCountry: "UAE",
  destinationCity: "",
  productName: "",
  preferredBrand: "",
  productUrl: "",
  quantity: "",
  budget: "",
  shippingPreference: undefined,
  desiredDeliveryDate: "",
  notes: "",
  consent: false,
  source: "form",
};

export function RequestForm() {
  const [form, setForm] = useState<ProductRequestPayload>(initial);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<FormState>("idle");
  const [requestId, setRequestId] = useState("");
  const [error, setError] = useState("");

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  /*
   * These refs keep the latest values available to the
   * voice event listener without recreating the listener
   * every time the form changes.
   */
  const formRef = useRef(form);
  const statusRef = useRef(status);
  const isListeningRef = useRef(isListening);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  /*
   * Start voice enquiry.
   */
  const startVoiceEnquiry = () => {
    const currentForm = formRef.current;
    const currentStatus = statusRef.current;
    const currentlyListening = isListeningRef.current;

    if (currentStatus === "loading" || currentlyListening) {
      return;
    }

    /*
     * Voice enquiry requires the same basic customer information
     * as the normal request form.
     */
    if (
      !currentForm.name.trim() ||
      !currentForm.email.trim() ||
      !currentForm.whatsapp.trim() ||
      !currentForm.destinationCountry.trim() ||
      !currentForm.consent
    ) {
      setError(
        "Please complete your name, email, WhatsApp number, destination country and consent before starting a voice enquiry.",
      );

      document.getElementById("request")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Voice enquiry is not supported in this browser. Please use Google Chrome or Microsoft Edge.",
      );
      return;
    }

    setError("");
    setIsListening(true);

    const transcriptRef = {
      current: "",
    };

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      transcriptRef.current = transcript.trim();
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error !== "aborted") {
        setError("We could not hear your enquiry. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;

      const finalTranscript = transcriptRef.current.trim();

      if (!finalTranscript) {
        setError("No enquiry was detected. Please try speaking again.");
        return;
      }

      const voicePayload: ProductRequestPayload = {
        ...formRef.current,
        productName: finalTranscript,
        source: "voice",
      };

      setForm(voicePayload);
      setStatus("loading");

      void submitProductRequest(voicePayload)
        .then((result) => {
          setRequestId(result.requestId);
          setStatus("success");
        })
        .catch((err) => {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.",
          );
          setStatus("error");
        });
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setError("Unable to start voice enquiry. Please try again.");
    }
  };

  /*
   * Listen for the global voice-enquiry event.
   *
   * This matches the event dispatched by VoiceEnquiryButton:
   *
   * "start-voice-enquiry"
   */
  useEffect(() => {
    const handleVoiceEnquiry = () => {
      startVoiceEnquiry();
    };

    window.addEventListener("start-voice-enquiry", handleVoiceEnquiry);

    return () => {
      window.removeEventListener("start-voice-enquiry", handleVoiceEnquiry);

      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  /*
   * Generic form setter.
   */
  const set = <K extends keyof ProductRequestPayload>(
    key: K,
    value: ProductRequestPayload[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  /*
   * Normal form submission.
   */
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("loading");
    setError("");

    try {
      const result = await submitProductRequest(form);

      setRequestId(result.requestId);
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );

      setStatus("error");
    }
  };

  /*
   * Success state.
   */
  if (status === "success") {
    return (
      <div className="card p-7 sm:p-9" aria-live="polite">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-moss/10 text-moss">
          <CheckCircle2 />
        </div>

        <p className="eyebrow mt-6">Request received</p>

        <h3 className="mt-2 font-display text-3xl tracking-tight">
          Your reference is {requestId}.
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-6 text-ink/60">
          We&apos;ll review the details and contact you with the next step. This
          request does not confirm an order or payment.
        </p>

        <button
          type="button"
          onClick={() => {
            setForm(initial);
            setStatus("idle");
            setRequestId("");
            setError("");
          }}
          className="button-secondary mt-6"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 sm:p-7" noValidate>
      <div className="grid gap-5 md:grid-cols-3">
        {/* REQUIRED */}

        <Field label="Full name" required>
          <input
            id="name"
            aria-label="Full name"
            className="field"
            placeholder="eg.John"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
          />
        </Field>

        <Field label="Email address" required>
          <input
            id="email"
            aria-label="Email address"
            className="field"
            placeholder="eg.example@gmail.com"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
          />
        </Field>

        <Field label="WhatsApp number" required>
          <input
            id="whatsapp"
            aria-label="WhatsApp number"
            className="field"
            placeholder="eg.+971 XX XXX XXXX,+966 XX XXX XXXX"
            type="tel"
            inputMode="tel"
            value={form.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            required
          />
        </Field>

        <Field label="Destination country" required>
          <select
            id="destinationCountry"
            aria-label="Destination country"
            className="field"
            value={form.destinationCountry}
            onChange={(e) => set("destinationCountry", e.target.value)}
            required
          >
            <option value="UAE">UAE</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Qatar">Qatar</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Oman">Oman</option>
            <option value="Bahrain">Bahrain</option>
          </select>
        </Field>

        <Field label="List your Products" required>
          <textarea
            id="productName"
            aria-label="Product name or description"
            className="field min-h-15 resize-y py-3"
            value={form.productName}
            onChange={(e) => set("productName", e.target.value)}
            placeholder="e.g. Sweets & Cookies,Shirts & Sarees,Indian pickles,Medicines,Any other Accessories,etc"
            required
          />
        </Field>

        {/* OPTIONAL */}

        {/* <Field label="Destination city or area">
          <input
            id="destinationCity"
            aria-label="Destination city or area"
            className="field"
            value={form.destinationCity ?? ""}
            onChange={(e) => set("destinationCity", e.target.value)}
            placeholder="e.g. Dubai Marina"
          />
        </Field> */}

        <Field label="Preferred brand, shop, or seller">
          <input
            id="preferredBrand"
            aria-label="Preferred brand, shop, or seller"
            className="field"
            placeholder="eg.Pista House,Zudio,H&M,Apollo pharmacy"
            value={form.preferredBrand ?? ""}
            onChange={(e) => set("preferredBrand", e.target.value)}
          />
        </Field>

        {/* Product link can be enabled later if needed. */}
        {/*
        <Field label="Product link">
          <input
            id="productUrl"
            aria-label="Product link"
            className="field"
            type="url"
            value={form.productUrl ?? ""}
            onChange={(e) => set("productUrl", e.target.value)}
            placeholder="https://…"
          />
        </Field>
        */}

        <Field label="Quantity">
          <input
            id="quantity"
            aria-label="Quantity"
            className="field"
            value={form.quantity ?? ""}
            onChange={(e) => set("quantity", e.target.value)}
            placeholder="e.g. 2 boxes, 3 shirts"
          />
        </Field>

        {/* Delivery preference can be enabled later if needed. */}

        <Field label="Delivery preference">
          <select
            id="shippingPreference"
            aria-label="Delivery preference"
            className="field"
            value={form.shippingPreference ?? "not_sure"}
            onChange={(e) =>
              set(
                "shippingPreference",
                e.target.value as ProductRequestPayload["shippingPreference"],
              )
            }
          >
            <option value="economy">Economy shipping / 6-7 working days</option>
            <option value="express">Express shipping / 2-3 working days</option>
          </select>
        </Field>

        {/* Desired delivery date can be enabled later if needed. */}
        {/*
        <Field label="Desired delivery date">
          <input
            id="desiredDeliveryDate"
            aria-label="Desired delivery date"
            className="field"
            type="date"
            value={form.desiredDeliveryDate ?? ""}
            onChange={(e) => set("desiredDeliveryDate", e.target.value)}
          />
        </Field>
        */}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Additional notes">
          <textarea
            id="notes"
            aria-label="Additional notes"
            className="field min-h-24 resize-y py-3"
            value={form.notes ?? ""}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Medium size, less spicy, specific colour, preferred shop, or any other details..."
          />
        </Field>
      </div>

      {/* Consent remains required */}
      <label className="mt-5 flex items-start gap-3 text-sm text-ink/65">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[#B65D3D]"
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          required
        />

        <span>
          I agree that HyderabadSe may contact me about this request and use the
          submitted information to process it.
        </span>
      </label>

      {status === "error" && (
        <div
          className="mt-5 flex items-start gap-3 rounded-xl border border-terracotta/25 bg-terracotta/5 p-4 text-sm text-ink"
          role="alert"
        >
          <XCircle className="mt-0.5 shrink-0 text-terracotta" size={18} />

          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-5 text-ink/50">
          Submitting this form starts a request. It does not confirm an order or
          payment. We verify availability, eligibility, pricing, and delivery
          before confirmation.
        </p>

        <button
          type="submit"
          className="button-primary shrink-0"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" size={17} />
              Reviewing…
            </>
          ) : (
            "Send request"
          )}
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {status === "loading"
          ? "Submitting request"
          : status === "error"
            ? error
            : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {children}
    </div>
  );
}
