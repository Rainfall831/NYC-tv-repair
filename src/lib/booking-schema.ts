import { z } from "zod";
import { BOROUGHS, serviceAreaNotice } from "@/content/business";
import {
  BOOKING_BRANDS,
  OTHER_BRAND,
  OTHER_PROBLEM,
  PROBLEM_OPTIONS,
  SCREEN_SIZE_OPTIONS,
} from "@/content/booking-options";
import { boroughForZip } from "@/content/zips";

const digits = (s: string) => s.replace(/\D/g, "");
const tenDigits = (s: string) => {
  const d = digits(s);
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
};

const required = (label: string, max = 120) =>
  z.string().trim().min(1, `Enter your ${label}.`).max(max, `${label[0].toUpperCase()}${label.slice(1)} is too long.`);

const brandValues = [...BOOKING_BRANDS, OTHER_BRAND] as [string, ...string[]];
const sizeValues = SCREEN_SIZE_OPTIONS.map((o) => o.value) as [string, ...string[]];
const problemValues = PROBLEM_OPTIONS.map((o) => o.value) as [string, ...string[]];

export function todayISO(now = new Date()) {
  // Local date in New York, where the shop operates.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(now);
}

export const bookingSchema = z
  .object({
    first_name: required("first name", 35),
    last_name: required("last name", 35),
    phone: z
      .string()
      .trim()
      .min(1, "Enter a phone number we can reach you on.")
      .refine((v) => tenDigits(v).length === 10, "Enter a 10-digit US phone number."),
    cell_phone: z
      .string()
      .trim()
      .refine((v) => v === "" || tenDigits(v).length === 10, "Enter a 10-digit US phone number, or leave this blank."),
    email: z.string().trim().min(1, "Enter your email address.").pipe(z.email("Enter a valid email address.")),
    address: required("street address", 120),
    city: z.enum(BOROUGHS, { error: "Choose your borough." }),
    zip: z
      .string()
      .trim()
      .regex(/^\d{5}$/, "Enter a 5-digit ZIP code.")
      .refine((v) => boroughForZip(v) !== null, serviceAreaNotice),
    brand: z.enum(brandValues, { error: "Choose the brand of your TV." }),
    new_brand: z.string().trim().max(35, "Brand name is too long."),
    screen_size: z.enum(sizeValues, { error: "Choose your TV type and screen size." }),
    model: required("TV model number", 40),
    desc: z.enum(problemValues, { error: "Choose the problem that fits best." }),
    desc_other: z.string().trim().max(500, "Please keep the description under 500 characters."),
    service_date: z
      .string()
      .trim()
      .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Choose a valid date.")
      .refine((v) => v === "" || v >= todayISO(), "Choose today or a later date.")
      .refine((v) => v === "" || new Date(`${v}T12:00:00`).getDay() !== 0, "We are closed on Sundays. Choose another day."),
    /** Honeypot. Real people never see or fill this. */
    company: z.string().max(0).optional(),
  })
  .superRefine(
    (d, ctx) => {
      // Runs even when other fields are invalid (see `when`), so read defensively.
      const newBrand = String(d.new_brand ?? "").trim();
      const descOther = String(d.desc_other ?? "").trim();
      const zip = String(d.zip ?? "").trim();
      if (d.brand === OTHER_BRAND && newBrand.length === 0) {
        ctx.addIssue({ code: "custom", path: ["new_brand"], message: "Enter the brand of your TV." });
      }
      if (d.desc === OTHER_PROBLEM && descOther.length === 0) {
        ctx.addIssue({ code: "custom", path: ["desc_other"], message: "Describe the problem in a few words." });
      }
      const zipBorough = boroughForZip(zip);
      if (zipBorough && d.city && (BOROUGHS as readonly string[]).includes(d.city) && zipBorough !== d.city) {
        ctx.addIssue({ code: "custom", path: ["city"], message: `ZIP ${zip} is in ${zipBorough}. Check your borough or ZIP code.` });
      }
    },
    { when: () => true },
  );

export type BookingInput = z.input<typeof bookingSchema>;
export type Booking = z.output<typeof bookingSchema>;

export const BOOKING_STEPS = [
  { id: "you", label: "You", fields: ["first_name", "last_name", "phone", "cell_phone", "email"] },
  { id: "where", label: "Address", fields: ["address", "zip", "city"] },
  { id: "tv", label: "Your TV", fields: ["brand", "new_brand", "screen_size", "model", "desc", "desc_other"] },
  { id: "when", label: "Review", fields: ["service_date"] },
] as const satisfies readonly { id: string; label: string; fields: readonly (keyof BookingInput)[] }[];

export const EMPTY_BOOKING: BookingInput = {
  first_name: "",
  last_name: "",
  phone: "",
  cell_phone: "",
  email: "",
  address: "",
  city: "" as BookingInput["city"],
  zip: "",
  brand: "" as BookingInput["brand"],
  new_brand: "",
  screen_size: "" as BookingInput["screen_size"],
  model: "",
  desc: "" as BookingInput["desc"],
  desc_other: "",
  service_date: "",
  company: "",
};

export function formatPhone(v: string) {
  const d = digits(v).replace(/^1(?=\d{10})/, "").slice(0, 10);
  if (d.length <= 3) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function normalizePhone(v: string) {
  const d = tenDigits(v);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : v;
}
