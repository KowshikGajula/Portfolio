import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "subtle";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  download?: boolean | string;
  type?: "button" | "submit";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const base =
  "relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.9rem] font-medium tracking-tight transition-all duration-300 ease-smooth select-none";

const variants: Record<Variant, string> = {
  primary: "btn-primary hover:-translate-y-0.5 active:translate-y-0",
  ghost: "btn-ghost hover:-translate-y-0.5 active:translate-y-0",
  subtle:
    "text-muted hover:text-ink border border-transparent hover:border-line hover:bg-surface",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  iconPosition = "right",
  download,
  type = "button",
  external,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="relative z-10 grid place-items-center">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="relative z-10 grid place-items-center transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(classes, "group")}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(classes, "group")}
    >
      {content}
    </button>
  );
}
