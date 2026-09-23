// Business facts. Source of truth: nytechtvrepair.com (contact.html, about.html, payment.html, job.html).

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nytechtvrepair.com";

export const business = {
  legalName: "NY Tech TV Repair, Inc.",
  shortName: "NY Tech TV Repair",
  address: {
    street: "3130 Nostrand Ave",
    city: "Brooklyn",
    region: "NY",
    postalCode: "11229-2601",
    country: "US",
  },
  phones: {
    main: { display: "(718) 787-1301", e164: "+17187871301" },
    manhattan: { display: "(212) 348-5858", e164: "+12123485858" },
  },
  fax: { display: "(718) 787-1303", e164: "+17187871303" },
  email: "nytvrepair@optonline.net",
  careersEmail: "nytech@nytechtvrepair.com",
  hours: [
    { label: "Monday - Friday", value: "10am - 6pm", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
    { label: "Saturday", value: "10am - 4pm", days: ["Saturday"], opens: "10:00", closes: "16:00" },
    { label: "Sunday", value: "Closed", days: ["Sunday"], opens: null, closes: null },
  ],
  // The original site does not say whether the office line accepts texts.
  // Set to false to hide every "Text us" button.
  smsEnabled: true,
  paymentsAccepted: "We accept all major cards.",
  sisterSites: {
    appliance: { label: "NY Tech Appliance Repair", url: "https://nytechappliance.com/" },
    tvRepairService: { label: "TV Repair & Service", url: "https://tv-repair-service.com" },
    parts: { label: "TV parts", url: "https://tv-part.com/" },
  },
  nesda: { label: "NESDA", url: "http://nesda.com" },
} as const;

export const addressOneLine = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;

export const links = {
  call: `tel:${business.phones.main.e164}`,
  callManhattan: `tel:${business.phones.manhattan.e164}`,
  sms: `sms:${business.phones.main.e164}`,
  email: `mailto:${business.email}`,
  emailBooking: `mailto:${business.email}?subject=${encodeURIComponent("TV repair request")}`,
  careers: `mailto:${business.careersEmail}?subject=${encodeURIComponent("Field Service TV Technician")}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.legalName}, ${addressOneLine}`)}`,
  map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressOneLine)}`,
} as const;

export const BOROUGHS = ["Brooklyn", "Queens", "Manhattan", "Bronx", "Staten Island"] as const;
export type Borough = (typeof BOROUGHS)[number];

export const serviceAreaNotice =
  "We strictly service the New York City area: Brooklyn, Bronx, Queens, Manhattan and Staten Island. If you are not in the New York City area, we apologize for the inconvenience.";
