import {
  ArrowRight,
  ChatText,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/ssr";
import { business, links } from "@/content/business";
import { ButtonLink, buttonClass, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { BookLink } from "./BookLink";

type ActionProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string };

export function BookButton({
  variant = "primary",
  size = "md",
  className,
  brand,
  label = "Book a repair",
}: ActionProps & { brand?: string; label?: string }) {
  return (
    <BookLink brand={brand} className={buttonClass(variant, size, className)}>
      <span>{label}</span>
      <ArrowRight size={18} weight="bold" aria-hidden />
    </BookLink>
  );
}

export function CallButton({
  variant = "secondary",
  size = "md",
  className,
  label,
}: ActionProps & { label?: string }) {
  return (
    <ButtonLink
      href={links.call}
      variant={variant}
      size={size}
      className={className}
      icon={<Phone size={18} weight="bold" aria-hidden />}
      aria-label={`Call ${business.shortName} at ${business.phones.main.display}`}
    >
      {label ?? `Call ${business.phones.main.display}`}
    </ButtonLink>
  );
}

export function TextButton({ variant = "secondary", size = "md", className }: ActionProps) {
  if (!business.smsEnabled) return null;
  return (
    <ButtonLink
      href={links.sms}
      variant={variant}
      size={size}
      className={className}
      icon={<ChatText size={18} weight="bold" aria-hidden />}
      aria-label={`Send a text message to ${business.phones.main.display}`}
    >
      Text us
    </ButtonLink>
  );
}

export function EmailButton({ variant = "secondary", size = "md", className }: ActionProps) {
  return (
    <ButtonLink
      href={links.email}
      variant={variant}
      size={size}
      className={className}
      icon={<EnvelopeSimple size={18} weight="bold" aria-hidden />}
    >
      Email us
    </ButtonLink>
  );
}

export function DirectionsButton({ variant = "secondary", size = "md", className }: ActionProps) {
  return (
    <ButtonLink
      href={links.directions}
      variant={variant}
      size={size}
      className={className}
      icon={<MapPin size={18} weight="bold" aria-hidden />}
    >
      Directions
    </ButtonLink>
  );
}
