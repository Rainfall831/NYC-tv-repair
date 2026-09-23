export type NavItem = { label: string; href: string; description?: string };

export const servicesMenu: NavItem[] = [
  { label: "TV repair", href: "/tv-repair", description: "LCD, LED, OLED, QLED, plasma, CRT, projection" },
  { label: "Appliance repair", href: "/appliance-repair", description: "In-home, flat labor from $175" },
  { label: "Special offers", href: "/special-offers", description: "Free carry-in estimates, 10% off labor" },
  { label: "Service areas", href: "/service-areas", description: "All five NYC boroughs" },
  { label: "Warranty", href: "/warranty", description: "30-day labor, 90-day parts" },
  { label: "Pay for repair", href: "/pay", description: "Home service fee, ticket or deposit" },
];

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Book a repair", href: "/book" },
    { label: "Pay for repair", href: "/pay" },
  ],
  services: [
    { label: "TV repair", href: "/tv-repair" },
    { label: "Appliance repair", href: "/appliance-repair" },
    { label: "Pricing", href: "/pricing" },
    { label: "Brands we repair", href: "/brands" },
    { label: "Special offers", href: "/special-offers" },
    { label: "Warranty", href: "/warranty" },
  ],
  legal: [
    { label: "Terms & conditions", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
} satisfies Record<string, NavItem[]>;
