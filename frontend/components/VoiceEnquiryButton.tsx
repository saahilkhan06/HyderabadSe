"use client";

import { Mic } from "lucide-react";

export default function VoiceEnquiryButton() {
  return (
    <button
      type="button"
      aria-label="Voice enquiry"
      title="Voice enquiry"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        window.dispatchEvent(
          new CustomEvent("hyderabadse-start-voice"),
        );
      }}
      className="flex h-auto w-auto place-items-center gap-3 rounded-full border border-ink/15 bg-white p-3 text-ink transition hover:bg-ink hover:text-cream"
    >
      <div className="rounded-full bg-orange-400 p-2 text-white">
        <Mic size={25} />
      </div>

      <div>
        <span>Drop your Order here we will help you.</span>
      </div>
    </button>
  );
}