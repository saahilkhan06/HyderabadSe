export const metadata = {
  title: "Cancellation & Refund Policy | HyderabadSe India",
  description:
    "Read HyderabadSe India's cancellation and refund policy, including order confirmation, product purchase, cancellation eligibility and refunds.",
};

export default function CancellationRefundPage() {
  return (
    <main className="bg-cream text-ink">
      {/* Hero */}
      <section className="border-b border-ink/10 bg-[#f7f2e9]">
        <div className="shell py-8 lg:py-15">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              HyderabadSe India
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Cancellation & Refund Policy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              We believe every order should be handled with clarity,
              confirmation and transparency. This policy explains when you
              can cancel a request, when a refund is available, and what
              happens once a product has been purchased on your behalf.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Last updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section>
        <div className="shell py-6 lg:py-10">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
            {/* Side navigation */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  On this page
                </p>

                <nav className="mt-5 space-y-3 text-sm">
                  <a
                    href="#how-orders-work"
                    className="block text-slate-600 transition hover:text-orange-600"
                  >
                    How orders work
                  </a>

                  <a
                    href="#cancellation"
                    className="block text-slate-600 transition hover:text-orange-600"
                  >
                    Cancellation
                  </a>

                  <a
                    href="#refund"
                    className="block text-slate-600 transition hover:text-orange-600"
                  >
                    Refunds
                  </a>

                  <a
                    href="#after-purchase"
                    className="block text-slate-600 transition hover:text-orange-600"
                  >
                    After product purchase
                  </a>

                  <a
                    href="#shipping"
                    className="block text-slate-600 transition hover:text-orange-600"
                  >
                    Shipping & tracking
                  </a>

                  <a
                    href="#contact"
                    className="block text-slate-600 transition hover:text-orange-600"
                  >
                    Contact us
                  </a>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <article className="max-w-3xl space-y-14">
              {/* Intro */}
              <section>
                <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
                  <h2 className="text-xl font-semibold">
                    Our commitment to you
                  </h2>

                  <p className="mt-4 leading-8 text-slate-600">
                    HyderabadSe operates as a product sourcing and assistance
                    service. We do not automatically purchase a product simply
                    because an enquiry or request has been submitted.
                  </p>

                  <p className="mt-4 leading-8 text-slate-600">
                    Before we purchase a product on your behalf, we will
                    communicate the relevant details with you and obtain your
                    confirmation. This gives you an opportunity to review the
                    product, pricing and applicable charges before the purchase
                    is made.
                  </p>
                </div>
              </section>

              {/* How orders work */}
              <section id="how-orders-work">
                <h2 className="text-2xl font-semibold">
                  1. How the order process works
                </h2>

                <div className="mt-6 space-y-5 text-slate-600 leading-8">
                  <p>
                    When you submit a product request through HyderabadSe, the
                    request is first reviewed by our team. A request or enquiry
                    does not by itself constitute a purchase or confirmed
                    order.
                  </p>

                  <p>
                    We may contact you to clarify product specifications,
                    availability, quantity, destination, preferred brand,
                    delivery requirements and other relevant details.
                  </p>

                  <p>
                    Before proceeding with the purchase, we will ask you to
                    confirm the order. Where appropriate, we may request
                    confirmation more than once so that there is a clear record
                    that you wish us to proceed.
                  </p>

                  <p>
                    Only after your order has been confirmed and the applicable
                    amount has been received will HyderabadSe proceed with
                    purchasing the product on your behalf.
                  </p>
                </div>
              </section>

              {/* Cancellation */}
              <section id="cancellation">
                <h2 className="text-2xl font-semibold">
                  2. Cancellation policy
                </h2>

                <div className="mt-6 space-y-5 text-slate-600 leading-8">
                  <p>
                    You may request cancellation at any time before
                    HyderabadSe has purchased the product on your behalf.
                  </p>

                  <p>
                    If your order has been confirmed but the product has not
                    yet been purchased, you may still request cancellation and
                    a refund, subject to the conditions described below.
                  </p>

                  <p>
                    We recommend contacting us as soon as possible if you no
                    longer wish to proceed. Once a product has been purchased,
                    cancellation under this policy is no longer available.
                  </p>

                  <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-ink">
                      Simple rule
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      <strong className="text-ink">
                        Product not purchased yet?
                      </strong>{" "}
                      Cancellation and refund may be requested.
                    </p>

                    <p className="mt-3 leading-7 text-slate-600">
                      <strong className="text-ink">
                        Product already purchased?
                      </strong>{" "}
                      The order cannot be cancelled or refunded through
                      HyderabadSe under this policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Refund */}
              <section id="refund">
                <h2 className="text-2xl font-semibold">
                  3. Refund policy
                </h2>

                <div className="mt-6 space-y-5 text-slate-600 leading-8">
                  <p>
                    A refund is available when you cancel before HyderabadSe
                    has purchased the product on your behalf.
                  </p>

                  <p>
                    If you have confirmed an order but we have not yet
                    purchased the product, you can contact us to request
                    cancellation and a refund.
                  </p>

                  <p>
                    Once HyderabadSe has purchased or placed the product order
                    on your behalf, the transaction has moved into the
                    purchasing stage and the amount paid for that product is
                    non-refundable under this policy.
                  </p>

                  <p>
                    This applies even if the product is subsequently in
                    transit, awaiting delivery, delayed in shipping, or
                    otherwise being processed after purchase.
                  </p>

                  <h3 className="pt-4 text-lg font-semibold text-ink">
                    What amount is refundable before purchase?
                  </h3>

                  <p>
                    Where a refund is approved before the product is purchased,
                    HyderabadSe will refund the eligible amount that was paid
                    for the order, subject to any third-party payment or
                    transaction charges that cannot reasonably be recovered.
                  </p>

                  <p>
                    Any applicable non-recoverable charges will be communicated
                    to you where relevant.
                  </p>
                </div>
              </section>

              {/* After purchase */}
              <section id="after-purchase">
                <h2 className="text-2xl font-semibold">
                  4. Once the product has been purchased
                </h2>

                <div className="mt-6 space-y-5 text-slate-600 leading-8">
                  <p>
                    Once HyderabadSe has purchased the product on your behalf,
                    the order is considered committed.
                  </p>

                  <p>
                    From that point onward, cancellation and refund requests
                    are generally not accepted because the product has already
                    been purchased specifically for you.
                  </p>

                  <p>
                    This policy exists because HyderabadSe may purchase
                    products specifically according to the customer&apos;s confirmed
                    requirements. Once that purchase has been made, we may no
                    longer be able to recover the amount paid to the seller or
                    supplier.
                  </p>

                  <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h3 className="font-semibold text-red-900">
                      Important
                    </h3>

                    <p className="mt-3 leading-7 text-red-800/80">
                      Please review the product details, quantity, destination,
                      applicable charges and other order information carefully
                      before giving your final confirmation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Shipping */}
              <section id="shipping">
                <h2 className="text-2xl font-semibold">
                  5. Shipping, proof and tracking
                </h2>

                <div className="mt-6 space-y-5 text-slate-600 leading-8">
                  <p>
                    Once the product has been purchased, HyderabadSe will
                    proceed with the applicable fulfilment and shipping
                    process.
                  </p>

                  <p>
                    Before the final shipment is arranged, we will communicate
                    the applicable shipping amount and relevant delivery
                    details with you. The shipping amount is separate from the
                    product purchase amount unless otherwise stated.
                  </p>

                  <p>
                    Where available, we will provide appropriate proof or
                    shipment documentation after dispatch.
                  </p>

                  <p>
                    Customers will also receive the relevant tracking
                    information, shipment reference and other available
                    delivery details so that the shipment can be followed
                    through the applicable carrier or logistics provider.
                  </p>

                  <p>
                    Tracking availability and frequency of updates depend on
                    the shipping carrier and logistics provider. HyderabadSe
                    does not control the carrier&apos;s scanning schedule or
                    delivery network.
                  </p>
                </div>
              </section>

              {/* No refund after purchase */}
              <section>
                <h2 className="text-2xl font-semibold">
                  6. Why refunds are limited after purchase
                </h2>

                <div className="mt-6 space-y-5 text-slate-600 leading-8">
                  <p>
                    HyderabadSe may source products from different sellers,
                    stores, suppliers or marketplaces based on the customer&apos;s
                    requirements. In many cases, the product is purchased
                    specifically because the customer has requested and
                    confirmed it.
                  </p>

                  <p>
                    Once that purchase has been made, HyderabadSe may be unable
                    to cancel the supplier transaction or recover the amount
                    paid. For this reason, our cancellation and refund
                    eligibility ends once the product has been purchased.
                  </p>
                </div>
              </section>

              {/* Exceptions */}
              <section>
                <h2 className="text-2xl font-semibold">
                  7. Exceptional circumstances
                </h2>

                <div className="mt-6 space-y-5 text-slate-600 leading-8">
                  <p>
                    If a serious issue occurs after purchase, such as a
                    supplier cancelling the transaction, a product becoming
                    unavailable before fulfilment, or another circumstance
                    outside the normal order process, please contact us.
                  </p>

                  <p>
                    Such situations will be reviewed individually based on the
                    circumstances, supplier terms, payment status and any
                    applicable third-party policies.
                  </p>

                  <p>
                    Any exception to this policy will be considered at
                    HyderabadSe&apos;s discretion and does not create a general
                    entitlement to a refund.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact">
                <div className="rounded-2xl bg-ink p-7 text-white sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                    Need help?
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold">
                    Contact us before your product is purchased
                  </h2>

                  <p className="mt-4 leading-7 text-white/70">
                    If you want to cancel a confirmed order, please contact
                    HyderabadSe as soon as possible and include your reference
                    number. We will check whether the product has already been
                    purchased.
                  </p>

                  <p className="mt-5 text-sm text-white/60">
                    Please keep your HyderabadSe reference number available
                    whenever you contact us regarding an order.
                  </p>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}