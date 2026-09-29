import BackToHyderabadse from "@/components/BackToHyderabadse";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Customs | HyderabadSe India",
  description:
    "Learn how HyderabadSe handles international shipping, tracking, customs, delivery and destination-country requirements.",
};

export default function ShippingCustomsPage() {
  return (
    <main className="bg-cream text-ink">
      <BackToHyderabadse />
      <section className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Side navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                Shipping
              </p>

              <nav className="mt-5 space-y-3 text-sm text-slate-600">
                <a href="#how-it-works" className="block hover:text-ink">
                  How shipping works
                </a>
                <a href="#shipping-cost" className="block hover:text-ink">
                  Shipping cost
                </a>
                <a href="#tracking" className="block hover:text-ink">
                  Tracking
                </a>
                <a href="#customs" className="block hover:text-ink">
                  Customs
                </a>
                <a href="#duties" className="block hover:text-ink">
                  Duties & taxes
                </a>
                <a href="#delays" className="block hover:text-ink">
                  Delays
                </a>
                <a href="#address" className="block hover:text-ink">
                  Address information
                </a>
                <a href="#support" className="block hover:text-ink">
                  Support
                </a>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="max-w-4xl">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
                HyderabadSe India
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Shipping & Customs
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                Important information about how products purchased through
                HyderabadSe are prepared, shipped and delivered internationally.
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Last updated: September 2026
              </p>
            </div>

            <div className="mt-12 space-y-12">
              <section id="how-it-works">
                <h2 className="text-2xl font-semibold">
                  1. How Shipping Works
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  After your requested product has been purchased and is ready
                  for international delivery, HyderabadSe will communicate the
                  applicable shipping details with you.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Shipping is arranged according to the destination, package
                  size, product characteristics and available delivery options.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  We will try to provide clear information before shipping so
                  that you understand the next step.
                </p>
              </section>

              <section id="shipping-cost">
                <h2 className="text-2xl font-semibold">2. Shipping Cost</h2>

                <p className="mt-4 leading-7 text-slate-600">
                  International shipping costs depend on factors such as the
                  destination country, package weight, dimensions, courier and
                  selected service.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  The applicable shipping amount will be communicated to you
                  before the shipment is arranged.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  If the available shipping option is significantly different
                  from what you expected, please contact us before proceeding
                  and we will help you understand the available options.
                </p>
              </section>

              <section id="tracking">
                <h2 className="text-2xl font-semibold">
                  3. Tracking & Shipment Information
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Once your shipment has been dispatched, we will provide the
                  available shipment or tracking information.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Where tracking is available, you can use the tracking or
                  reference number provided to follow the shipment through the
                  relevant courier or carrier.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Tracking updates may not appear immediately after dispatch and
                  can sometimes take time to be reflected in the courier system.
                </p>
              </section>

              <section id="customs">
                <h2 className="text-2xl font-semibold">
                  4. Customs & Import Procedures
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  International shipments may be inspected or processed by
                  customs authorities in the destination country.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Customs procedures are controlled by the destination
                  country&apos;s authorities and are outside HyderabadSe&apos;s
                  direct control.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Customers should be aware that some products may be subject to
                  import restrictions, documentation requirements or other
                  destination-country rules.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  If additional information is requested by the courier or
                  customs authority, we will try to assist with the information
                  available to us.
                </p>
              </section>

              <section id="duties">
                <h2 className="text-2xl font-semibold">
                  5. Customs Duties, Taxes & Charges
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Depending on the destination country and the nature of the
                  shipment, customs duties, import taxes, VAT, handling fees or
                  other government or carrier charges may apply.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  These charges are determined by the relevant destination
                  authorities or service providers and may vary by country,
                  product and shipment.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Customers are responsible for complying with the import
                  requirements applicable to their destination.
                </p>
              </section>

              <section id="delays">
                <h2 className="text-2xl font-semibold">
                  6. Shipping & Customs Delays
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  International delivery times are estimates rather than
                  guaranteed dates.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Delays can occur because of customs inspections, courier
                  capacity, weather, public holidays, incorrect or incomplete
                  delivery information, security checks, transportation
                  disruptions or other circumstances outside our control.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  If we receive information about a significant shipment issue,
                  we will try to communicate it with you and assist with the
                  available next steps.
                </p>
              </section>

              <section id="address">
                <h2 className="text-2xl font-semibold">7. Delivery Address</h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Please provide a complete and accurate delivery address,
                  including any apartment, building, postal code, phone number
                  or other information required by the courier.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  If you notice an error in your delivery information, contact
                  us as soon as possible. We will try to assist with corrections
                  where the shipment stage and courier rules allow it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  8. Restricted or Unavailable Products
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Some products may not be suitable or permitted for
                  international shipment to certain destinations.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  If we learn that a requested product cannot reasonably be
                  shipped to your destination, we will communicate this with you
                  rather than proceeding without clarification.
                </p>
              </section>

              <section id="support">
                <h2 className="text-2xl font-semibold">
                  9. Need Help With Your Shipment?
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  If you have a question about shipping, tracking, customs or
                  delivery, please contact HyderabadSe with your reference or
                  tracking number whenever available.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  We will do our best to help you understand the current status
                  and available next steps.
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-semibold">
                  Our goal is transparency
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  International shipping can involve several parties. We will
                  keep you informed about the parts of the process that are
                  within our control and help you navigate the parts handled by
                  couriers and destination authorities.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
