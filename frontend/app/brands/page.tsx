import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Popular Indian Brands | HyderabadSe",
  description:
    "Explore popular Indian brands across sweets, bakery, clothing, snacks, spices, pickles, tea, coffee, gifts and home products that HyderabadSe can help source.",
};

type Brand = {
  name: string;
  domain: string;
};

type BrandCategory = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  brands: Brand[];
};

const categories: BrandCategory[] = [
  {
    id: "sweets",
    eyebrow: "01 · Mithai",
    title: "Popular Indian sweet brands",
    description:
      "Classic mithai and gift-box names from Hyderabad and across India. Availability and shelf life are checked request by request.",
    brands: [
      { name: "Haldiram's", domain: "haldirams.com" },
      { name: "Bikaji", domain: "bikaji.com" },
      { name: "Bikanervala", domain: "bikanervala.com" },
      { name: "pista House", domain: "pistahouse.in" },
      { name: "Dadu's", domain: "dadus.co.in" },
      { name: "G. Pulla Reddy", domain: "gpullareddysweets.com" },
      { name: "Anand Sweets", domain: "anandsweets.in" },
      { name: "K.C. Das", domain: "kcdas.com" },
      { name: "Sri Krishna Sweets", domain: "srikrishnasweets.com" },
      { name: "Almond House", domain: "almondhouse.com" },
    ],
  },

  {
    id: "bakery",
    eyebrow: "02 · Bakery",
    title: "Popular Indian bakery brands",
    description:
      "Biscuits, rusks, cookies and bakery favourites — with packaged and shelf-stable options prioritised for sourcing review.",
    brands: [
      { name: "Karachi Bakery", domain: "karachibakery.com" },
      { name: "Subhan Bakery", domain: "subhanbakery.in" },
      { name: "Café Niloufer", domain: "niloufercafe.com" },
      { name: "Pista House", domain: "pistahouse.in" },
      { name: "Theobroma", domain: "theobroma.in" },
      { name: "Monginis", domain: "monginis.net" },
      { name: "English Oven", domain: "englishoven.com" },
      { name: "Harvest Gold", domain: "harvestgold.in" },
      { name: "Bakelore", domain: "bakelore.com" },
      { name: "Sunfeast", domain: "sunfeastworld.com" },
    ],
  },

  {
    id: "clothing",
    eyebrow: "03 · Clothing",
    title: "Popular Indian clothing brands",
    description:
      "Kurtas, ethnic wear, festive outfits and everyday Indian fashion from recognisable Indian labels.",
    brands: [
      { name: "Fabindia", domain: "fabindia.com" },
      { name: "H&M", domain: "www2.hm.com" },
      { name: "Manyavar", domain: "manyavar.com" },
      { name: "Soch", domain: "soch.com" },
      { name: "W for Woman", domain: "wforwoman.com" },
      { name: "Taruni", domain: "taruni.in" },
      { name: "Libas", domain: "libas.in" },
      { name: "Neeru's", domain: "neerus.com" },
      { name: "Tasva", domain: "tasva.com" },
      { name: "BIBA", domain: "biba.in" },
    ],
  },

  {
    id: "namkeen",
    eyebrow: "04 · Namkeen & snacks",
    title: "Popular Indian snack brands",
    description:
      "Crunchy namkeen, chips and packaged snacks for the cravings that are hard to replace when you are away from home.",
    brands: [
      { name: "Haldiram's", domain: "haldirams.com" },
      { name: "Bikaji", domain: "bikaji.com" },
      { name: "Balaji Wafers", domain: "balajiwafers.com" },
      { name: "Too Yumm!", domain: "tooyumm.com" },
      { name: "Bikanervala", domain: "bikanervala.com" },
      { name: "Chheda's", domain: "chhedas.com" },
      { name: "Prabhuji", domain: "prabhujipurefood.com" },
      { name: "Doritos", domain: "doritos.com" },
      { name: "Yellow Diamond", domain: "yellowdiamond.in" },
      { name: "Bingo!", domain: "bingosnacks.com" },
    ],
  },

  {
    id: "spices",
    eyebrow: "05 · Spices",
    title: "Popular Indian spice brands",
    description:
      "Everyday masalas, regional blends and pantry staples that can bring familiar Indian cooking closer to home.",
    brands: [
      { name: "Everest", domain: "everestspices.com" },
      { name: "MDH", domain: "mdhspices.com" },
      { name: "Catch Foods", domain: "catchfoods.com" },
      { name: "Tata Sampann", domain: "tatasampann.com" },
      { name: "Aachi", domain: "aachifoods.com" },
      { name: "Eastern", domain: "eastern.in" },
      { name: "MTR Foods", domain: "mtrfoods.com" },
      { name: "Badshah Masala", domain: "badshahmasala.com" },
      { name: "Keya", domain: "keyafoods.com" },
      { name: "Zoff", domain: "zofffoods.com" },
    ],
  },

  {
    id: "pickles",
    eyebrow: "06 · Pickles & chutneys",
    title: "Popular Indian pickle brands",
    description:
      "Mango, gongura, chilli, lime and regional favourites. These are especially useful for request-led sourcing because varieties differ by region.",
    brands: [
      { name: "Mother's Recipe", domain: "mothersrecipe.com" },
      { name: "Priya Foods", domain: "priyafoods.com" },
      { name: "Aachi", domain: "aachifoods.com" },
      { name: "Nilon's", domain: "nilons.com" },
      { name: "Pachranga", domain: "pachrangapickles.co.in" },
      { name: "MTR Foods", domain: "mtrfoods.com" },
      { name: "Tops", domain: "topsfoods.com" },
      { name: "Bedekar", domain: "vpbedekar.com" },
      { name: "Grillo's", domain: "grillos.com" },
      { name: "Sitara", domain: "sitarafoods.com" },
    ],
  },

  {
    id: "tea-coffee",
    eyebrow: "07 · Chai & coffee",
    title: "Popular Indian tea & coffee brands",
    description:
      "The everyday cup matters. Ask for familiar tea leaves, masala chai blends, filter coffee and more.",
    brands: [
      { name: "Tata Tea", domain: "tataconsumer.com" },
      { name: "Wagh Bakri", domain: "waghbakritea.com" },
      { name: "Brooke Bond Red Label", domain: "hul.co.in" },
      { name: "Society Tea", domain: "societytea.com" },
      { name: "Lipton", domain: "lipton.com" },
      { name: "Bru", domain: "hul.co.in" },
      { name: "Cothas Coffee", domain: "cothas.com" },
      { name: "Niloufer", domain: "niloufercafe.com" },
      { name: "3 Roses", domain: "hul.co.in" },
      { name: "Girnar", domain: "girnar.com" },
    ],
  },
];

function BrandLogo({ name, domain }: { name: string; domain: string }) {
  // const logo = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  // const logo = `https://logos.hunter.io/${domain}`;
  // const logo = `https://logo.debounce.com/${domain}`;
  const logo = `https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_KEY}`;
  return (
    <div
      className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm"
      aria-label={`${name} logo`}
      title={name}
    >
      <Image
        src={logo}
        alt={`${name} logo`}
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
        loading="lazy"
      />
    </div>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="group flex min-h-[190px] flex-col justify-between rounded-[1.35rem] border border-ink/10 bg-white/75 p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_60px_rgba(18,35,51,.11)]">
      <div className="flex items-start justify-between gap-3">
        <BrandLogo name={brand.name} domain={brand.domain} />

        <span className="hidden md:flex rounded-full bg-cream px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.13em] text-ink/45">
          Ask us
        </span>
      </div>

      <div className="mt-5">
        <h3 className="font-display text-xl leading-tight text-ink">
          {brand.name}
        </h3>

        <p className="mt-2 text-[10px] leading-4 text-ink/40">
          Example brand · subject to availability
        </p>
      </div>

      <Link
        href="/#request"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-terracotta"
      >
        Request this brand
        <ArrowRight size={14} />
      </Link>
    </article>
  );
}

export default function BrandsPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-cream text-ink">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-terracotta/10 blur-3xl" />

        <div className="absolute right-[-12rem] top-[35rem] h-[30rem] w-[30rem] rounded-full bg-[#8d9f91]/10 blur-3xl" />

        <div className="absolute inset-0 pattern-grid opacity-40" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
        <div className="shell flex h-[70px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="HyderabadSe home"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-display text-lg text-white">
              <Image alt="H" src="/logo-2.png" width={434} height={434} />
            </div>

            <span>
              <span className="block font-display text-[21px] leading-none">
                HyderabadSe India
              </span>

              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.22em] text-terracotta">
                India → Gulf
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/" className="button-secondary hidden sm:inline-flex">
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <Link href="/#request" className="button-primary">
              Request a product
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="shell py-5 ">
        <h1 className="section-title mt-3 ">
          The brands you miss. One place to explore them.
        </h1>
      </section>

      {/* Brand categories */}
      <div className="shell py-5 ">
        <div className="space-y-20 lg:space-y-24">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-28"
            >
              <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
                <div>
                  <p className="eyebrow">{category.eyebrow}</p>

                  <h2 className="section-title mt-3">{category.title}</h2>
                </div>

                <p className="max-w-2xl text-sm leading-6 text-ink/55">
                  {category.description}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
                {category.brands.map((brand) => (
                  <BrandCard
                    key={`${category.id}-${brand.name}`}
                    brand={brand}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Request CTA */}
      <section
        id="request"
        className="border-t border-ink/10 bg-[#eadfce] py-16 lg:py-20"
      >
        <div className="shell">
          <div className="overflow-hidden rounded-[1.8rem] bg-ink p-7 text-white shadow-soft sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d8b978]">
                  Found your favourite?
                </p>

                <h2 className="section-title mt-3 max-w-2xl text-white">
                  Tell us the brand, product or even send a photo.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
                  We’ll check where it can be sourced, what is practical to
                  ship, and what the quotation looks like before you confirm.
                </p>
              </div>

              <Link
                href="/#request"
                className="button-primary bg-[#d8b978] text-ink hover:bg-[#e6c98f]"
              >
                Start a product request
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-10 text-white">
        <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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

            <p className="mt-3 max-w-md text-xs leading-5 text-white/40">
              {siteConfig.alternateTagline}. Brand examples are for discovery
              only and are subject to sourcing and destination checks.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/65 hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to HyderabadSe
          </Link>
        </div>
      </footer>
    </main>
  );
}
