import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | HyderabadSe India",
  description:
    "Read the terms and conditions for using HyderabadSe India's product sourcing and international delivery services.",
};

export default function TermsPage() {
  return (
    <main className="bg-cream text-ink">
      <section className="shell py-6 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Side navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                Terms
              </p>

              <nav className="mt-5 space-y-3 text-sm text-slate-600">
                <a href="#about" className="block hover:text-ink">
                  About the service
                </a>
                <a href="#requests" className="block hover:text-ink">
                  Product requests
                </a>
                <a href="#confirmation" className="block hover:text-ink">
                  Order confirmation
                </a>
                <a href="#payment" className="block hover:text-ink">
                  Payments
                </a>
                <a href="#product" className="block hover:text-ink">
                  Product availability
                </a>
                <a href="#shipping" className="block hover:text-ink">
                  Shipping
                </a>
                <a href="#customer" className="block hover:text-ink">
                  Customer responsibility
                </a>
                <a href="#support" className="block hover:text-ink">
                  Support
                </a>
                <a href="#changes" className="block hover:text-ink">
                  Changes to these terms
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
                Terms & Conditions
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                These terms explain how HyderabadSe works when you use our
                website to request products, arrange purchases and receive
                products internationally.
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Last updated: September 2026
              </p>
            </div>

            <div className="mt-12 space-y-12">
              <section id="about">
                <h2 className="text-2xl font-semibold">
                  1. About HyderabadSe
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  HyderabadSe helps customers outside India request products
                  that are available in India. We review product requests,
                  communicate with the customer, and where the request is
                  accepted and confirmed, purchase the product on the
                  customer&apos;s behalf and help arrange delivery.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Our goal is to make the process simple and transparent,
                  especially for customers who may not otherwise be able to
                  purchase or arrange delivery from India themselves.
                </p>
              </section>

              <section id="requests">
                <h2 className="text-2xl font-semibold">
                  2. Product Requests
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  A product request submitted through our website is a request
                  for assistance. Submitting a request does not automatically
                  create a purchase obligation for you or HyderabadSe.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  We may contact you to clarify the product, brand, quantity,
                  destination, budget, delivery preference or other details
                  before confirming whether we can proceed.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  You are welcome to ask questions or request changes before
                  confirming the order.
                </p>
              </section>

              <section id="confirmation">
                <h2 className="text-2xl font-semibold">
                  3. Order Confirmation
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  We will communicate the relevant product and purchase
                  details with you before proceeding. We may ask you to confirm
                  the order once or more than once when clarification is
                  necessary.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  HyderabadSe will only proceed with purchasing a product on
                  your behalf after the order has been confirmed and the
                  required product payment has been arranged.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  If you change your mind before the product is purchased,
                  please contact us as soon as possible. Our cancellation and
                  refund policy explains the applicable process.
                </p>
              </section>

              <section id="payment">
                <h2 className="text-2xl font-semibold">
                  4. Payments
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Payment information and payment instructions will be
                  communicated to you before a purchase is made.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Product pricing may depend on the actual availability,
                  seller, brand, size, quantity and other product-specific
                  factors at the time of purchase.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Shipping and other applicable delivery amounts may be
                  communicated separately when the product is ready for
                  shipment.
                </p>
              </section>

              <section id="product">
                <h2 className="text-2xl font-semibold">
                  5. Product Availability
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Product availability, pricing, specifications and delivery
                  timelines may change before an order is confirmed or
                  purchased.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  If the requested product becomes unavailable, changes
                  significantly in price, or cannot reasonably be sourced, we
                  will communicate the situation with you before proceeding
                  whenever possible.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Where possible, we may help you consider an alternative
                  product, brand, size or seller if you would like to continue
                  with the request.
                </p>
              </section>

              <section id="shipping">
                <h2 className="text-2xl font-semibold">
                  6. Shipping & Delivery
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Once the product has been purchased and is ready to ship, we
                  will communicate the applicable shipping information and
                  amount with you.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Delivery times are estimates and may be affected by the
                  destination country, courier, customs procedures, weather,
                  holidays, inspections or circumstances outside our control.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  More information about international shipping and customs is
                  available on our Shipping & Customs page.
                </p>
              </section>

              <section id="customer">
                <h2 className="text-2xl font-semibold">
                  7. Customer Information & Responsibility
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Customers are responsible for providing accurate information
                  needed to process their request, including their name,
                  contact information, destination address and other relevant
                  delivery details.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  If any information changes, please let us know as soon as
                  possible so that we can try to update the request before the
                  relevant stage of the process.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  We will make reasonable efforts to communicate important
                  information with you clearly and give you an opportunity to
                  clarify or correct details before we proceed.
                </p>
              </section>

              <section id="support">
                <h2 className="text-2xl font-semibold">
                  8. Customer Support
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  If you have questions about a product request, purchase,
                  shipment or delivery, you can contact HyderabadSe for
                  assistance.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  We aim to keep customers informed throughout the process and
                  will try to help resolve reasonable questions or issues as
                  quickly as possible.
                </p>
              </section>

              <section id="changes">
                <h2 className="text-2xl font-semibold">
                  9. Changes to These Terms
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  We may update these terms from time to time to reflect
                  changes to our services, processes or applicable
                  requirements. The updated version will be published on this
                  page with the relevant update date.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Your request or order will continue to be handled according
                  to the information communicated to you for that request,
                  together with the policies applicable to the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  10. Related Policies
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  For additional information, please also review our
                  Cancellation & Refund, Privacy Policy, Shipping & Customs and
                  Customer Support pages.
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-semibold">
                  Questions?
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  If something about your request or order is unclear, please
                  contact us before proceeding. We are happy to clarify the
                  process.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}