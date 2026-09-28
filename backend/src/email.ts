import { Resend } from "resend";

export type ProductRequestEmailData = {
  referenceId: string;
  name: string;
  email: string;
  whatsapp: string;
  destinationCountry?: string;
  destinationCity?: string;
  dubaiArea?: string;
  productName: string;
  preferredBrand?: string;
  productUrl?: string;
  quantity: string;
  budget?: string;
  shippingPreference?: string;
  desiredDeliveryDate?: string;
  notes?: string;
};

export type VoiceEnquiryEmailData = {
  referenceId: string;
  transcript: string;
};

let resend: Resend | null = null;

function getResend() {
  if (resend) return resend;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY in the backend environment.",
    );
  }

  resend = new Resend(apiKey);

  return resend;
}

function getEmailFrom() {
  const from = process.env.EMAIL_FROM;

  if (!from) {
    throw new Error(
      "EMAIL_FROM must be configured in the backend environment.",
    );
  }

  return from;
}

function getNotificationEmail() {
  const email = process.env.NOTIFICATION_EMAIL;

  if (!email) {
    throw new Error(
      "NOTIFICATION_EMAIL must be configured in the backend environment.",
    );
  }

  return email;
}

function esc(value: unknown) {
  return String(value ?? "—")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: unknown) {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e8e1d6;font-weight:600;color:#102a43;width:190px;">
        ${esc(label)}
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #e8e1d6;color:#334155;">
        ${esc(value)}
      </td>
    </tr>
  `;
}

/* =========================================================
   PRODUCT REQUEST → ADMIN
========================================================= */

export async function sendNewProductRequestEmail(
  data: ProductRequestEmailData,
) {
  const mailer = getResend();

  const to = getNotificationEmail();
  const from = getEmailFrom();

  const subject = `New HyderabadSe request — ${data.referenceId} — ${data.productName}`;

  const html = `
    <div style="margin:0;background:#f7f2e9;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#102a43;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e8e1d6;border-radius:18px;overflow:hidden;">

        <div style="background:#102a43;padding:24px 28px;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#e4be70;font-weight:700;">
            HyderabadSe
          </div>

          <h1 style="margin:8px 0 0;font-size:25px;line-height:1.25;">
            New product request
          </h1>

          <p style="margin:8px 0 0;color:#dce5ec;">
            Reference: <strong>${esc(data.referenceId)}</strong>
          </p>
        </div>

        <div style="padding:24px 28px;">

          <p style="margin:0 0 18px;color:#475569;line-height:1.6;">
            A customer has submitted a new product request through the HyderabadSe website.
          </p>

          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row("Customer name", data.name)}
            ${row("Customer email", data.email)}
            ${row("WhatsApp", data.whatsapp)}
            ${row("Destination country", data.destinationCountry)}
            ${row(
              "Destination city / area",
              data.destinationCity || data.dubaiArea,
            )}
            ${row("Product", data.productName)}
            ${row(
              "Preferred brand / shop",
              data.preferredBrand,
            )}
            ${row("Product link", data.productUrl)}
            ${row("Quantity", data.quantity)}
            ${row("Budget", data.budget)}
            ${row(
              "Shipping preference",
              data.shippingPreference,
            )}
            ${row(
              "Desired delivery date",
              data.desiredDeliveryDate,
            )}
            ${row("Additional notes", data.notes)}
          </table>

          <div style="margin-top:22px;padding:14px 16px;background:#f7f2e9;border-radius:12px;color:#475569;font-size:13px;line-height:1.6;">
            This is a request, not a confirmed order. Availability,
            eligibility, shipping, customs/taxes and the final quotation
            still need to be verified.
          </div>

        </div>
      </div>
    </div>
  `;

  const result = await mailer.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    html,
    text: [
      "New HyderabadSe product request",
      `Reference: ${data.referenceId}`,
      `Customer: ${data.name}`,
      `Email: ${data.email}`,
      `WhatsApp: ${data.whatsapp}`,
      `Destination: ${data.destinationCountry || ""} ${
        data.destinationCity || data.dubaiArea || ""
      }`,
      `Product: ${data.productName}`,
      `Preferred brand/shop: ${data.preferredBrand || "—"}`,
      `Product URL: ${data.productUrl || "—"}`,
      `Quantity: ${data.quantity}`,
      `Budget: ${data.budget || "—"}`,
      `Shipping: ${data.shippingPreference || "—"}`,
      `Desired delivery date: ${
        data.desiredDeliveryDate || "—"
      }`,
      `Notes: ${data.notes || "—"}`,
    ].join("\n"),
  });

  if (result.error) {
    throw new Error(
      `Failed to send product request email: ${result.error.message}`,
    );
  }
}

/* =========================================================
   PRODUCT REQUEST → CUSTOMER
========================================================= */

export async function sendCustomerRequestConfirmationEmail(
  data: ProductRequestEmailData,
) {
  const mailer = getResend();

  const from = getEmailFrom();
  const notificationEmail = getNotificationEmail();

  const subject = `HyderabadSe  request received — ${data.referenceId}`;

  const result = await mailer.emails.send({
    from,
    to: data.email,
    replyTo: notificationEmail,
    subject,

    html: `
      <div style="margin:0;background:#f7f2e9;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#102a43;">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e8e1d6;border-radius:18px;overflow:hidden;">

          <div style="background:#102a43;padding:24px 28px;color:#ffffff;">

            <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#e4be70;font-weight:700;">
              HyderabadSe 
            </div>

            <h1 style="margin:8px 0 0;font-size:25px;">
              Request received
            </h1>

          </div>

          <div style="padding:28px;">

            <p style="line-height:1.7;">
              Hi ${esc(data.name)},
            </p>

            <p style="line-height:1.7;color:#475569;">
              We have received your product request. We will review
              the details and contact you with the next step.
            </p>

            <div style="margin:20px 0;padding:16px;border-radius:12px;background:#f7f2e9;">

              <strong>Reference:</strong>
              ${esc(data.referenceId)}
              <br />

              <strong>Product:</strong>
              ${esc(data.productName)}

            </div>

            <p style="font-size:13px;line-height:1.6;color:#64748b;">
              Submitting a request does not confirm an order.
              Product availability, eligibility, shipping and the
              final quotation are checked before confirmation.
            </p>

            <p style="margin-top:24px;line-height:1.7;">
              Aapki seva mein,<br />
              <strong>HyderabadSe </strong>
            </p>

          </div>
        </div>
      </div>
    `,

    text: [
      `Hi ${data.name},`,
      "",
      "We have received your product request.",
      `Reference: ${data.referenceId}`,
      `Product: ${data.productName}`,
      "",
      "We will review the details and contact you with the next step.",
      "Submitting a request does not confirm an order.",
      "",
      "Aapki seva mein,",
      "HyderabadSe ",
    ].join("\n"),
  });

  if (result.error) {
    throw new Error(
      `Failed to send customer confirmation email: ${result.error.message}`,
    );
  }
}

/* =========================================================
   VOICE ENQUIRY → ADMIN
========================================================= */

export async function sendNewVoiceEnquiryEmail(
  data: VoiceEnquiryEmailData,
) {
  const mailer = getResend();

  const to = getNotificationEmail();
  const from = getEmailFrom();

  const subject = `New HyderabadSe voice enquiry — ${data.referenceId}`;

  const html = `
    <div style="margin:0;background:#f7f2e9;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#102a43;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e8e1d6;border-radius:18px;overflow:hidden;">

        <div style="background:#102a43;padding:24px 28px;color:#ffffff;">

          <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#e4be70;font-weight:700;">
            HyderabadSe
          </div>

          <h1 style="margin:8px 0 0;font-size:25px;line-height:1.25;">
            New voice enquiry
          </h1>

          <p style="margin:8px 0 0;color:#dce5ec;">
            Reference:
            <strong>${esc(data.referenceId)}</strong>
          </p>

        </div>

        <div style="padding:24px 28px;">

          <p style="margin:0 0 18px;color:#475569;line-height:1.6;">
            A customer has submitted a voice enquiry through the HyderabadSe website.
          </p>

          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row("Source", "Voice enquiry")}
            ${row("Reference", data.referenceId)}
            ${row("Enquiry", data.transcript)}
          </table>

          <div style="margin-top:22px;padding:14px 16px;background:#f7f2e9;border-radius:12px;color:#475569;font-size:13px;line-height:1.6;">
            This enquiry was captured using the HyderabadSe voice enquiry feature.
          </div>

        </div>
      </div>
    </div>
  `;

  const result = await mailer.emails.send({
    from,
    to,
    subject,
    html,
    text: [
      "New HyderabadSe voice enquiry",
      "",
      `Reference: ${data.referenceId}`,
      `Source: Voice enquiry`,
      "",
      "Customer enquiry:",
      data.transcript,
    ].join("\n"),
  });

  if (result.error) {
    throw new Error(
      `Failed to send voice enquiry email: ${result.error.message}`,
    );
  }
}

/* =========================================================
   VOICE ENQUIRY → CUSTOMER
========================================================= */

export async function sendCustomerVoiceEnquiryConfirmationEmail(
  data: VoiceEnquiryEmailData & {
    email: string;
  },
) {
  const mailer = getResend();

  const from = getEmailFrom();
  const notificationEmail = getNotificationEmail();

  const subject = `HyderabadSe voice enquiry received — ${data.referenceId}`;

  const result = await mailer.emails.send({
    from,
    to: data.email,
    replyTo: notificationEmail,
    subject,

    html: `
      <div style="margin:0;background:#f7f2e9;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#102a43;">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e8e1d6;border-radius:18px;overflow:hidden;">

          <div style="background:#102a43;padding:24px 28px;color:#ffffff;">

            <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#e4be70;font-weight:700;">
              HyderabadSe 
            </div>

            <h1 style="margin:8px 0 0;font-size:25px;">
              Voice enquiry received
            </h1>

          </div>

          <div style="padding:28px;">

            <p style="line-height:1.7;">
              Thank you for contacting HyderabadSe.
            </p>

            <p style="line-height:1.7;color:#475569;">
              We have successfully received your voice enquiry.
              Our team will review it and get back to you.
            </p>

            <div style="margin:20px 0;padding:16px;border-radius:12px;background:#f7f2e9;">

              <strong>Reference:</strong>
              ${esc(data.referenceId)}

              <br /><br />

              <strong>Your enquiry:</strong>

              <div style="margin-top:8px;color:#475569;line-height:1.6;">
                ${esc(data.transcript)}
              </div>

            </div>

            <p style="font-size:13px;line-height:1.6;color:#64748b;">
              Please keep your reference ID for future communication
              regarding this enquiry.
            </p>

            <p style="margin-top:24px;line-height:1.7;">
              Aapki seva mein,<br />
              <strong>HyderabadSe </strong>
            </p>

          </div>
        </div>
      </div>
    `,

    text: [
      "Thank you for contacting HyderabadSe.",
      "",
      "We have successfully received your voice enquiry.",
      "",
      `Reference: ${data.referenceId}`,
      "",
      "Your enquiry:",
      data.transcript,
      "",
      "Our team will review it and get back to you.",
      "",
      "Please keep your reference ID for future communication.",
      "",
      "Aapki seva mein,",
      "HyderabadSe ",
    ].join("\n"),
  });

  if (result.error) {
    throw new Error(
      `Failed to send customer voice confirmation: ${result.error.message}`,
    );
  }
}