import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import WhatsAppButton from "@/components/WhatsAppButton";


export const metadata: Metadata = {
  metadataBase: new URL(
    siteConfig.canonicalUrl.replace("[YOUR_DOMAIN]", "example.com"),
  ),
  title: "HyderabadSe | Hyd-to-Gulf Product Sourcing",
  description: siteConfig.description,
  alternates: { canonical: siteConfig.canonicalUrl },
  icons: {
    icon: "/webicon.png",
    shortcut: "/webicon.png",
    apple: "/webicon.png",
  },
  openGraph: {
    title: "HyderabadSe | India’s favourites, brought closer to home.",
    description: siteConfig.description,
    type: "website",
    url: siteConfig.canonicalUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.canonicalUrl,
    email: siteConfig.contactEmail,
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
        <WhatsAppButton/>

      </body>
    </html>
  );
}