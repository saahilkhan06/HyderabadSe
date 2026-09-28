export const siteConfig = {
  name: "HyderabadSe",
  tagline: "India’s favourites, brought closer to home.",
  alternateTagline: "Your trusted person in Hyderabad,India.",
  launchMessage: "Starting with Hyderabad. Expanding across India.",
  description:
    "A request-first Hyderabad-to-Gulf sourcing service. Request eligible products from Hyderabad or other parts of India and receive a clear quotation before confirmation.",
  contactEmail: "hyderabadseorder@gmail.com",
  whatsappDisplay: "+91 9666266807",
  whatsappUrl: "https://wa.me/9666266807",
  operatingLocation: "Ameerpet,Hyderabad",
  canonicalUrl: "https://[YOUR_DOMAIN]/",
} as const;

export const destinations = [
  { country: "UAE", status: "Pilot", tone: "active" as const },
  { country: "Saudi Arabia", status: "Coming soon", tone: "planned" as const },
  { country: "Qatar", status: "Coming soon", tone: "planned" as const },
  { country: "Kuwait", status: "Coming soon", tone: "planned" as const },
  { country: "Oman", status: "Coming soon", tone: "planned" as const },
  { country: "Bahrain", status: "Coming soon", tone: "planned" as const },
];

export const categories = [
  { icon: "package", title: "Food and packaged snacks", copy: "Sealed, shelf-stable options subject to product and import checks." },
  { icon: "landmark", title: "Hyderabad favourites", copy: "Regional finds from Hyderabad, with sourcing checked request by request." },
  { icon: "shirt", title: "Clothing and ethnic wear", copy: "Kurtas, textiles and selected apparel from eligible sellers." },
  { icon: "gem", title: "Accessories and jewellery", copy: "Selected fashion pieces and gifts, subject to destination rules." },
  { icon: "gift", title: "Gifts and handicrafts", copy: "Regional crafts, keepsakes and personal gifts where eligible." },
  { icon: "house", title: "Household products", copy: "Useful home items that meet packaging and shipping requirements." },
  { icon: "sparkles", title: "Personal-care products", copy: "Eligible packaged products after destination-specific review." },
  { icon: "search", title: "Other eligible products", copy: "Tell us what you need; we will check whether sourcing and shipping are practical." },
] as const;

export const faqs = [
  ["Can I request something from any Place in Hyderabad?", "You can submit requests from any Hyderabad place. The initial sourcing strength is Hyderabad, while requests from elsewhere are checked individually based on availability and logistics."],
  ["What types of products can I request?", "You can request eligible food and packaged snacks, clothing, accessories, jewellery, gifts, handicrafts, household items, personal-care products and other products that can legally and practically be shipped."],
  ["Can you deliver to countries other than the UAE?", "The UAE is the initial pilot destination. Saudi Arabia, Qatar, Kuwait, Oman and Bahrain are planned expansion markets; availability depends on the shipping and compliance setup for each destination."],
  ["How are shipping charges calculated?", "Shipping depends on product weight, dimensions, packaging, destination, delivery method and carrier options. The quotation separates product cost, sourcing or handling, shipping and known destination charges."],
  ["Are customs and taxes included?", "Not automatically. Known destination charges can be shown in the quote when they are available, but customs, taxes and final clearance requirements depend on the product and destination authorities."],
  ["Can I request food or fresh products?", "You can ask, but food and especially fresh or perishable items require additional eligibility, shelf-life, packaging and destination checks. We do not promise that every food request can be shipped."],
  ["What if my product is restricted?", "We will tell you if a request appears restricted, prohibited or unsuitable for the requested route. We will not accept a product simply because it was requested."],
  ["When do I pay?", "Submitting a request does not confirm an order or payment. We verify the request and provide a quotation before you decide whether to confirm."],
  ["What happens if the product cannot be sourced?", "We will explain what prevented the request from moving forward. Where practical, we may ask whether you want to consider another brand, seller, size or similar product."],
  ["How do I track my request?", "Confirmed requests can move through clear statuses such as Request received, Under review, Quote ready, Confirmed, Sourcing, Packed and Shipped. The exact update method will depend on the final operating workflow."],
  ["How is my personal information used?", "We collect the information needed to review your request and communicate with you. We do not ask for card details in this request form. Replace the placeholder privacy policy link before launch."],
] as const;
