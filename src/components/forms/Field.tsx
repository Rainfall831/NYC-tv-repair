import clsx from "clsx";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { CaretDown, WarningCircle } from "@phosphor-icons/react";

export const fieldControl =
  "block w-full rounded-[var(--radius-field)] border border-line-strong bg-surface px-4 text-[1rem] text-ink placeholder:text-ink-3 transition-[border-color,box-shadow] duration-150 hover:border-ink-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/20 disabled:opacity-60";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label above, control, optional hint, error below. */
export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.92rem] font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-3"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <div id={`${id}-hint`} className="text-[0.85rem] leading-snug text-ink-2">
          {hint}
        </div>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-[0.85rem] font-medium leading-snug text-danger">
          <WarningCircle size={16} weight="bold" className="mt-px shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: boolean) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export const TextInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(function TextInput(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={clsx(fieldControl, "h-9", className)} {...props} />;
});

export const Select = forwardRef<HTMLSelectElement, ComponentProps<"select">>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select ref={ref} className={clsx(fieldControl, "h-9 appearance-none pr-11", className)} {...props}>
        {children}
      </select>
      <CaretDown
        size={16}
        weight="bold"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-2"
        aria-hidden
      />
    </div>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(function TextArea(
  { className, ...props },
  ref,
) {
  return <textarea ref={ref} className={clsx(fieldControl, "min-h-28 py-3 leading-relaxed", className)} {...props} />;
});
