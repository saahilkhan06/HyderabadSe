import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const phoneNumber = "919666266807";

const message = encodeURIComponent(
  "Hi HyderabadSe, I would like to enquire about sourcing or ordering a product from Hyderabad,India.",
);

export default function WhatsAppButton() {
  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order through WhatsApp with HyderabadSe"
      className="
        fixed bottom-5 right-5 z-[100]
        flex h-14 w-14 items-center justify-center
        rounded-full
        md:gap-5
        bg-green-600
        text-white
        shadow-[0_10px_30px_rgba(0,0,0,0.18)]
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-green-600
        hover:shadow-[0_14px_35px_rgba(0,0,0,0.22)]
        focus:outline-none
        focus:ring-4
        focus:ring-[#25D366]/30
        sm:bottom-6
        sm:right-6
        sm:h-auto
        sm:w-auto
        sm:rounded-2xl
        sm:bg-sky-950
        sm:px-5
        sm:py-3
        sm:justify-start
      "
    >
      {/* WhatsApp logo */}
      <div
        className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-full
          bg-green-600
        "
      >
        <FaWhatsapp
          className="h-7 w-7"
          aria-hidden="true"
        />
      </div>

      {/* Text — hidden on mobile */}
      <div className="hidden leading-tight sm:block">
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/80">
          Aapki Seva Mein
        </div>

        <div className="text-sm font-semibold sm:text-[15px]">
          One Order - You are Served
        </div>

        <div className="mt-0.5 text-[11px] text-white/80">
          Ready to serve • Personal support
        </div>
      </div>

      {/* Arrow — hidden on mobile */}
      <span
        className="ml-1 hidden text-lg sm:block"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}