import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  MapPin,
  MessageCircle,
  PackageCheck,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";

import { CategoryIcon } from "@/components/Icon";
// import { MobileNav } from "@/components/MobileNav";
// import VoiceEnquiryButton from "@/components/VoiceEnquiryButton";
import { RequestForm } from "@/components/RequestForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { categories, destinations, faqs, siteConfig } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
// import VoiceEnquiry from "@/components/VoiceEnquiry";

const nav = [
  ["Products we can source", "#products"],
  ["How it works", "#how"],
  ["Why trust us", "#trust"],
  ["FAQ", "#faq"],
] as const;

const statuses = [
  "Request received",
  "Under review",
  "Quote ready",
  "Confirmed",
  "Sourcing",
  "Packed",
  "Shipped",
  "Delivered",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-terracotta/10 blur-3xl" />

        <div className="absolute right-[-12rem] top-[40rem] h-[30rem] w-[30rem] rounded-full bg-[#8d9f91]/10 blur-3xl" />

        <div className="absolute inset-0 pattern-grid opacity-40" />
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className=" top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
        <div className="shell flex h-[92px] items-center justify-between sm:h-[112px] lg:h-[175px]">
          {" "}
          {/* LARGE LOGO + BRAND */}
          <Link
            href="#top"
            className="flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-5 lg:mr-10"
            aria-label="HyderabadSe home"
          >
            <span className="flex h-[76px] w-[76px] shrink-0  items-center justify-center overflow-hidden rounded-2xl sm:h-[96px] sm:w-[96px] sm:rounded-2xl lg:h-[160px] lg:w-[160px] lg:rounded-3xl">
              <Image
                src="/logo-2.png"
                alt="HyderabadSe logo"
                width={434}
                height={434}
                quality={100}
                sizes="(max-width: 639px) 76px, (max-width: 1023px) 96px, 160px"
                className="h-full w-full object-cover "
                priority
              />
            </span>

            <span>
              <span className="block truncate font-display text-[22px] leading-none sm:text-[26px] lg:text-[30px]">
                HyderabadSe
              </span>

              <span className="mt-2 block text-[8px] font-bold uppercase tracking-[.18em] text-terracotta sm:mt-2.5 sm:text-[10px] sm:tracking-[.22em] lg:mt-3 lg:text-[11px] lg:tracking-[.25em]">
                India → Gulf
              </span>
            </span>
          </Link>
          {/* NAVIGATION */}
          <nav
            className="hidden items-center gap-10 text-[12px] font-semibold text-ink/65  xl:text-[13px] md:flex "
            aria-label="Primary navigation"
          >
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="transition hover:text-ink"
              >
                {label}
              </Link>
            ))}
          </nav>
          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="#request" className="button-primary">
              Request a product
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        id="top"
        className="relative shell grid gap-10 pb-14 pt-8 sm:pt-12 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:pb-20 lg:pt-14"
      >
        {/* ---------------------------------------------------------
            DESKTOP BRAND BUTTON
            The right padding reserves physical space for the circle,
            so the headline can never run underneath it.
        --------------------------------------------------------- */}
        <Link
          href="/brands"
          aria-label="Explore your favourite Indian brands"
          className="
            group
            absolute
            left-1/2 -translate-x-[calc(90%+10px)]            
            top-5
            z-20
            hidden
            h-40
            w-40
            items-center
            justify-center
            rounded-full
            border
            border-terracotta/20
            bg-[#efe2d0]
            p-6
            text-center
            shadow-soft
            transition
            duration-300
            hover:-translate-y-2
            hover:bg-white
            xl:flex
          "
        >
          <span className="absolute inset-2 rounded-full border border-gold/25" />

          <span className="relative z-10">
            <span className="block text-[9px] font-bold uppercase tracking-[.2em] text-terracotta">
              Explore
            </span>

            <span className="mt-1 block font-display text-lg leading-[1.02] text-ink">
              Your favourite
              <br />
              Indian brands
            </span>

            <ArrowRight
              className="mx-auto mt-3 h-4 w-4 text-terracotta transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </Link>

        {/* ---------------------------------------------------------
            HERO COPY
        --------------------------------------------------------- */}
        <div className="relative ">
          {/* Traditional welcome */}
          <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[.16em] text-ink/55">
            <span className="text-green-700">AssalamuAlaikum</span>

            <span className="text-ink/25">•</span>

            <span className="text-orange-400">Namaste</span>

            <span className="text-ink/25">•</span>

            <span className="text-black">Welcome</span>
          </div>

          {/* Launch message */}
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-1.5 text-[11px] font-bold text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />

            {siteConfig.launchMessage}
          </div>

          <p className="eyebrow mt-7">{siteConfig.tagline}</p>

          <h1 className="display mt-3 max-w-3xl text-balance">
            Your trusted person in India.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg">
            From Hyderabad to Dubai and beyond, tell us what you’re looking for.
            We check availability, sourcing, shipping, and destination
            requirements before giving you a clear quotation.
          </p>

          <div className="mt-7 flex flex-col gap-8 sm:flex-row">
            <Link href="#request" className="button-primary">
              Request a product
            </Link>

            {/* <VoiceEnquiryButton /> */}
          </div>

          {/* Mobile / tablet brand CTA */}
          <Link
            href="/brands"
            className="
              mt-5
              inline-flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              border
              border-terracotta/20
              bg-[#efe2d0]
              px-5
              py-3
              text-center
              shadow-sm
              transition
              hover:bg-white
              sm:w-fit
              xl:hidden
            "
          >
            <span>
              <span className="block text-[9px] font-bold uppercase tracking-[.18em] text-terracotta">
                Explore
              </span>

              <span className="font-display text-base text-ink">
                Your favourite Indian brands
              </span>
            </span>

            <ArrowRight
              size={16}
              className="text-terracotta"
              aria-hidden="true"
            />
          </Link>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-ink/55">
            <span>Clear quotes</span>
            <span>•</span>
            <span>Practical shipping options</span>
            <span>•</span>
            <span>Personal support</span>
          </div>
        </div>

        {/* Route visual */}
        <RouteVisual />
      </section>

      {/* =========================================================
          FLOATING ACTIONS
      ========================================================= */}

      {/* WhatsApp stays on the right */}
      <WhatsAppButton />

      {/* Mobile brand button stays on the left */}
      <Link
        href="/brands"
        aria-label="Explore your favourite Indian brands"
        className="
          fixed
          bottom-5
          left-5
          z-[100]
          flex
          h-[76px]
          w-[76px]
          items-center
          justify-center
          rounded-full
          border
          border-terracotta/20
          bg-[#efe2d0]
          p-2
          text-center
          shadow-[0_12px_30px_rgba(31,45,56,.18)]
          transition
          duration-300
          hover:-translate-y-1
          hover:bg-white
          sm:h-[84px]
          sm:w-[84px]
          xl:hidden
        "
      >
        <span className="absolute inset-[5px] rounded-full border border-gold/30" />

        <span className="relative z-10">
          <span className="block text-[7px] font-bold uppercase tracking-[.16em] text-terracotta">
            Explore
          </span>

          <span className="mt-0.5 block font-display text-[12px] leading-[1.05] text-ink">
            Indian
            <br />
            brands
          </span>

          <ArrowRight
            className="mx-auto mt-1 h-3.5 w-3.5 text-terracotta"
            aria-hidden="true"
          />
        </span>
      </Link>

      {/* =========================================================
          MARQUEE
      ========================================================= */}
      <section
        aria-label="Launch note"
        className="border-y border-ink/10 bg-ink py-3 text-white"
      >
        <div className="marquee-track flex gap-10 whitespace-nowrap text-[11px] font-bold uppercase tracking-[.18em] text-white/70">
          {Array.from({ length: 2 }).flatMap((_, copy) =>
            [
              "Hyderabad → UAE",
              "India sourcing",
              "Quote before confirmation",
              "Eligibility checked",
              "Economy & express where available",
            ].map((x, i) => (
              <span
                key={`${copy}-${i}`}
                className="inline-flex items-center gap-3"
              >
                <span className="text-[#d8b978]">✦</span>
                {x}
              </span>
            )),
          )}
        </div>
      </section>

      {/* =========================================================
          PRODUCTS
      ========================================================= */}
      <section id="products" className="shell py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="eyebrow">What we can source</p>

            <h2 className="section-title mt-3">
              From everyday essentials to special finds.
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-ink/60">
            Request products from Hyderabad or other parts of India. We review
            every request individually before confirming whether it can be
            sourced and shipped.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="group card p-5 transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-white">
                  <CategoryIcon name={category.icon} />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[.15em] text-ink/35">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold tracking-tight">
                {category.title}
              </h3>

              <p className="mt-2 min-h-[72px] text-sm leading-6 text-ink/55">
                {category.copy}
              </p>

              <Link
                href="#request"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-terracotta"
              >
                Request this category
                <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      {/* =========================================================
          REQUEST FORM
      ========================================================= */}
      <section id="request" className="shell scroll-mt-24 pb-16 lg:pb-24">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">Request a product</p>

          <h2 className="section-title mt-3">
            Can’t find what you need? Ask us.
          </h2>

          <p className="mt-4 text-sm leading-6 text-ink/60">
            Send a product name, photograph, link, brand, or shop name. We’ll
            investigate the request and let you know what is possible.
          </p>
        </div>

        <RequestForm />
      </section>

      {/* =========================================================
          PERSON IN INDIA
      ========================================================= */}
      <section className="shell pb-16 lg:pb-20">
        <div className="overflow-hidden rounded-[1.8rem] border border-ink/10 bg-[#efe4d4]">
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-7 sm:p-10">
              <p className="eyebrow">Your person in India.</p>

              <h2 className="section-title mt-3 max-w-xl">
                Tell us what you remember. We’ll help find what you mean.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-ink/60">
                Need something from India? Send us the name, photo, link, or
                shop. We’ll check where to find it, what it costs, and whether
                it can be shipped to you.
              </p>

              <p className="mt-5 font-display text-xl italic text-ink/70">
                “Aap bas bataiye, hum Hyderabad mein check karenge.”
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link href="#request" className="button-primary bg-orange-400">
                  Start a request
                </Link>

                <p className="button-primary bg-emerald-900">
                  Kuch Bhi — Anything — Just One Order Away
                </p>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden bg-ink p-7 text-white sm:p-10">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-[#d8b978]/30" />

              <div className="absolute bottom-5 left-5 h-32 w-32 rounded-full border border-white/10" />

              <div className="relative h-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d8b978]">
                    Hyderabad sourcing desk
                  </span>

                  <UserRound size={18} className="text-white/50" />
                </div>

                <div className="mt-12 grid gap-3">
                  <MiniRequest label="Product photo" value="Uploaded" />

                  <MiniRequest label="Seller / shop" value="Checking" />

                  <MiniRequest label="Shipping route" value="UAE" />

                  <MiniRequest label="Quote" value="Next step" />
                </div>

                <div className="mt-7 flex items-center gap-2 text-xs text-white/45">
                  <span className="h-2 w-2 rounded-full bg-[#d8b978]" />
                  India-side support, request by request.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section id="how" className="bg-ink py-16 text-white lg:py-20">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d8b978]">
                How it works
              </p>

              <h2 className="section-title mt-3 max-w-xl text-white">
                A simple request-to-delivery flow.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/55">
                The service is built around verification before confirmation—so
                you know what is practical before you commit.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [
                  "01",
                  "Tell us what you need",
                  "Submit the product name, photo, link, brand, shop, quantity, and destination.",
                ],
                [
                  "02",
                  "We check the request",
                  "We check supplier availability, product eligibility, packaging, dimensions, shipping, and destination requirements.",
                ],
                [
                  "03",
                  "Receive a clear quote",
                  "The quotation separates product cost, sourcing or handling, shipping, and known destination charges.",
                ],
                [
                  "04",
                  "Confirm and track",
                  "After confirmation, we source and dispatch the product and provide request or shipment updates.",
                ],
              ].map(([n, title, copy]) => (
                <article
                  key={n}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[.055] p-5 transition hover:bg-white/[.08]"
                >
                  <span className="text-xs font-bold text-[#d8b978]">{n}</span>

                  <h3 className="mt-5 text-lg font-bold">{title}</h3>

                  <p className="mt-2 text-sm leading-6 text-white/50">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
              {statuses.map((status, index) => (
                <div
                  key={status}
                  className="border-b border-r border-white/10 px-3 py-4 text-center text-[10px] font-semibold text-white/45 lg:border-b-0"
                >
                  <span
                    className={`mx-auto mb-2 grid h-6 w-6 place-items-center rounded-full text-[9px] ${
                      index === 0
                        ? "bg-[#d8b978] text-ink"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {index + 1}
                  </span>

                  {status}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AFFORDABILITY
      ========================================================= */}
      <section className="shell py-16 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="card bg-[#e8ddce] p-7 sm:p-9">
            <p className="eyebrow">Affordability, honestly framed</p>

            <h2 className="section-title mt-3">
              Choose the option that fits your budget.
            </h2>

            <p className="mt-5 text-sm leading-6 text-ink/60">
              We look for practical shipping options so you can choose economy
              or express delivery where available. Your final quote depends on
              the product, weight, dimensions, destination, customs, taxes, and
              delivery method.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/65 p-4">
                <Truck size={18} />

                <p className="mt-3 text-sm font-bold">
                  Economy where available
                </p>
              </div>

              <div className="rounded-xl bg-white/65 p-4">
                <Sparkles size={18} />

                <p className="mt-3 text-sm font-bold">
                  Express where available
                </p>
              </div>
            </div>
          </div>

          <QuoteCard />
        </div>
      </section>

      {/* =========================================================
          TRUST
      ========================================================= */}
      <section
        id="trust"
        className="border-y border-ink/10 bg-white/45 py-16 lg:py-20"
      >
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="eyebrow">Why trust us</p>

              <h2 className="section-title mt-3">
                Trust built into every request.
              </h2>

              <p className="mt-5 text-sm leading-6 text-ink/60">
                We are building a trusted India-to-Gulf sourcing service around
                clear steps, honest eligibility checks and personal support.
              </p>

              <div className="mt-7 rounded-2xl border border-terracotta/15 bg-terracotta/5 p-5 text-sm leading-6 text-ink/70">
                <ShieldCheck className="text-terracotta" size={20} />

                <p className="mt-3 font-semibold text-ink">
                  We do not ask you to confirm a product before we have checked
                  whether it is available and suitable for shipping.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  ["Clear quotations", Quote],
                  ["Eligibility checks", ShieldCheck],
                  ["Practical delivery options", Truck],
                  ["Request status updates", Clock3],
                  ["Personal WhatsApp support", MessageCircle],
                  ["Clear cancellation and refund information", Check],
                ] as const
              ).map(([title, Icon]) => (
                <div key={String(title)} className="card p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white">
                    <Icon size={18} />
                  </div>

                  <h3 className="mt-5 text-sm font-bold leading-5">{title}</h3>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-xs text-ink/45">
            Privacy note: We only collect the information needed to process your
            request and communicate with you.
          </p>
        </div>
      </section>

      {/* =========================================================
          DESTINATIONS
      ========================================================= */}
      <section id="destinations" className="shell py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow">Where we’re going</p>

            <h2 className="section-title mt-3">
              Start with the UAE. Build across the Gulf.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-ink/60">
            The UAE is the pilot destination. Other Gulf destinations are
            planned expansion markets and should not be treated as active
            delivery locations until the relevant shipping and compliance
            process is ready.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.country}
              className="card flex items-center justify-between p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white">
                  <Globe2 size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">{destination.country}</h3>

                  <p className="mt-0.5 text-xs text-ink/45">
                    Eligibility varies
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  destination.tone === "active"
                    ? "bg-moss/10 text-moss"
                    : "bg-ink/5 text-ink/50"
                }`}
              >
                {destination.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          CUSTOMER STORIES
      ========================================================= */}
      <section className="shell pb-16 lg:pb-20">
        <div className="rounded-[1.8rem] border border-ink/10 bg-ink p-7 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d8b978]">
                Real stories, when they’re real
              </p>

              <h2 className="section-title mt-3 max-w-2xl text-white">
                Customer stories will appear here after completed requests.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/50">
                We’d rather share verified customer experiences than manufacture
                testimonials, ratings or trust badges.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-xs font-semibold text-white/55">
              Review component ready for approved customer stories.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section
        id="faq"
        className="border-t border-ink/10 bg-white/40 py-16 lg:py-20"
      >
        <div className="shell grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="eyebrow">FAQ</p>

            <h2 className="section-title mt-3">
              Clear answers before you request.
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-xl border border-ink/10 bg-white/65 px-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-bold">
                  {question}

                  <ChevronDown
                    className="shrink-0 transition group-open:rotate-180"
                    size={17}
                  />
                </summary>

                <p className="pb-5 text-sm leading-6 text-ink/55">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
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

              <Link href="#" className="hover:text-white">
                Privacy policy
              </Link>

              <Link href="#" className="hover:text-white">
                Terms
              </Link>

              <Link href="#" className="hover:text-white">
                Cancellation & refund
              </Link>

              <Link href="#" className="hover:text-white">
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
      {/* <VoiceEnquiry /> */}
    </main>
  );
}

/* ===============================================================
   ROUTE VISUAL
================================================================ */

function RouteVisual() {
  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-[1.5rem] border border-ink/10 bg-[#eadfce] p-4 shadow-soft sm:min-h-[430px] sm:rounded-[1.75rem] sm:p-6 lg:min-h-[460px] lg:rounded-[2rem] lg:p-7">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[36px] border-gold/15" />

      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-terracotta/10 blur-2xl" />

      <div className="relative h-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Sourcing route</p>

            <p className="mt-1 font-display text-2xl">Hyderabad → Gulf</p>
          </div>

          <span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-ink/55">
            Pilot: UAE
          </span>
        </div>

        <div className="relative mt-6 h-[220px] sm:mt-8 sm:h-[250px] lg:h-[260px]">
          {/* Hyderabad */}
          <div className="absolute left-[12%] top-[43%] grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lg">
            <MapPin size={19} />
          </div>

          {/* Dubai */}
          <div className="absolute right-[11%] top-[28%] grid h-12 w-12 place-items-center rounded-full bg-terracotta text-white shadow-lg">
            <MapPin size={19} />
          </div>

          {/* Route */}
          <div className="absolute left-[25%] right-[24%] top-[48%] h-px route-line" />

          {/* Parcel */}
          <div className="absolute left-[48%] top-[41%] grid h-10 w-10 place-items-center rounded-full bg-white text-terracotta shadow-lg">
            <PackageCheck size={18} />
          </div>

          <span className="absolute left-[5%] top-[67%] text-[10px] font-bold sm:left-[7%] sm:text-xs">
            Hyderabad
          </span>

          <span className="absolute right-[3%] top-[52%] text-[10px] font-bold sm:right-[5%] sm:text-xs">
            Dubai
          </span>

          {/* Request */}
          <div className="absolute left-0 top-[5%] rounded-xl border border-ink/10 bg-white/75 p-2.5 shadow-sm sm:left-[4%] sm:top-[8%] sm:p-3">
            <Search size={15} className="text-terracotta" />

            <p className="mt-2 text-[10px] font-bold">Request received</p>
          </div>

          {/* Quote */}
          <div className="absolute bottom-0 right-0 rounded-xl border border-ink/10 bg-white/75 p-2.5 shadow-sm sm:bottom-[5%] sm:right-[1%] sm:p-3">
            <Quote size={15} className="text-gold" />

            <p className="mt-2 text-[10px] font-bold">
              Clear quote before confirmation
            </p>
          </div>
        </div>

        {/* Category strip */}
        <div className="grid grid-cols-5 gap-1.5 border-t border-ink/10 pt-4 sm:gap-2 sm:pt-5">
          <RouteIcon icon={<PackageCheck size={17} />} label="Food" />

          <RouteIcon icon={<ShirtIcon />} label="Clothing" />

          <RouteIcon icon={<GiftIcon />} label="Gifts" />

          <RouteIcon icon={<GemIcon />} label="Accessories" />

          <RouteIcon icon={<HouseIcon />} label="Home" />
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   SMALL COMPONENTS
================================================================ */

function RouteIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-9 w-9 place-items-center rounded-lg bg-white text-ink shadow-sm">
        {icon}
      </div>

      <p className="mt-2 text-[9px] font-bold text-ink/45">{label}</p>
    </div>
  );
}

function MiniRequest({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[.055] px-4 py-3">
      <span className="text-xs text-white/45">{label}</span>

      <span className="text-xs font-bold text-white/80">{value}</span>
    </div>
  );
}

function QuoteCard() {
  const rows = [
    ["Product cost", "To be verified"],
    ["Sourcing and handling", "Quoted"],
    ["Packaging", "Quoted"],
    ["International shipping", "Quoted"],
    ["Estimated destination charges", "If available"],
  ];

  return (
    <div className="card overflow-hidden bg-white p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Example quotation — not a live price</p>

          <h3 className="mt-2 font-display text-3xl">
            A clear quote, line by line.
          </h3>
        </div>

        <Quote className="text-gold" />
      </div>

      <div className="mt-6 divide-y divide-ink/10">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-5 py-3 text-sm"
          >
            <span className="text-ink/55">{label}</span>

            <span className="text-right font-semibold">{value}</span>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 py-4">
          <span className="font-bold">Total before confirmation</span>

          <span className="font-display text-right text-lg sm:text-xl">
            Calculated per request
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-ink/45">
        Final prices are confirmed individually. We do not promise the lowest
        price before comparing the actual request.
      </p>
    </div>
  );
}

/* ===============================================================
   SIMPLE VISUAL ICONS
================================================================ */

function ShirtIcon() {
  return <span className="text-sm">⌁</span>;
}

function GiftIcon() {
  return <span className="text-sm">✦</span>;
}

function GemIcon() {
  return <span className="text-sm">◇</span>;
}

function HouseIcon() {
  return <span className="text-sm">⌂</span>;
}
