"use client";
import {  siteConfig } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink py-10 text-white">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={"/webicon.png"}
                alt={"H"}
                width={48}
                height={48}
                className="h-12 w-12 object-cover rounded-full"
                loading="lazy"
              />

              <span className="font-display text-2xl">HyderabadSe</span>
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/50">
              {siteConfig.alternateTagline}
            </p>

            <p className="mt-3 max-w-2xl break-words text-xs leading-5 text-white/35">
              <Link href="mailto:hyderabadseorder@gmail.com">
                Email: {siteConfig.contactEmail}
              </Link>{" "}
              ·{" "}
              <Link href="https://wa.me/9666266807?text=Hi HyderabadSe, I would like to enquire about sourcing or ordering a product from Hyderabad,India.">
                WhatsApp: {siteConfig.whatsappDisplay}
              </Link>{" "}
              · India location: {siteConfig.operatingLocation}
            </p>
          </div>

          <div className="grid gap-2 text-sm text-white/55 sm:grid-cols-2 sm:gap-x-8">
            <Link href="#products" className="hover:text-white">
              Products we can source
            </Link>

            <Link href="#how" className="hover:text-white">
              How it works
            </Link>

            <Link href="#destinations" className="hover:text-white">
              Supported destinations
            </Link>

            <Link href="#faq" className="hover:text-white">
              FAQ
            </Link>

            <Link href="/privacy-policy" className="hover:text-white">
              Privacy policy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/cancellation-refund" className="hover:text-white">
              Cancellation & refund
            </Link>

            <Link href="/shipping-customs" className="hover:text-white">
              Shipping & customs
            </Link>
          </div>
        </div>

        <div className="mt-9 border-t border-white/10 pt-5 text-xs leading-5 text-white/35">
          HyderabadSe is an early-stage Hyderabad-to-Gulf sourcing service.
          Product availability, export eligibility, shipping, customs,
          destination charges, and delivery timing are confirmed individually
          before an order is accepted.
        </div>
      </div>
    </footer>
  );
}
