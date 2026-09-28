"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Products we can source", "#products"],
  ["How it works", "#how"],
  ["Why trust us", "#trust"],
  ["Supported destinations", "#destinations"],
  ["FAQ", "#faq"],
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) triggerRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="md:hidden">
      <button ref={triggerRef} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} className="rounded-xl p-2 text-ink">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-[70px] border-b border-ink/10 bg-cream px-5 py-4 shadow-soft">
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold hover:bg-white">{label}</a>)}
            <a href="#request" onClick={() => setOpen(false)} className="button-primary mt-2">Request a product</a>
          </nav>
        </div>
      )}
    </div>
  );
}
