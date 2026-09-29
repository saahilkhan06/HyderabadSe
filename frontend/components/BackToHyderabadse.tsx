import Link from "next/link";

export default function BackToHyderabadse() {
  return (
    <Link
      href="/"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-4 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-terracotta hover:shadow-xl sm:bottom-6 sm:right-6"
    >
      <span aria-hidden="true">←</span>{""}
      Back to HyderabadSe
    </Link>
  );
}