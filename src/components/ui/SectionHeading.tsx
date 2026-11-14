import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Small uppercase eyebrow, e.g. "02 — Expertise" */
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 max-w-3xl md:mb-20",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-accent-gradient" aria-hidden="true" />
          <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.28em] text-accent2">
            {label}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.15rem)] font-semibold leading-[1.08] tracking-tightest text-ink">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-muted md:text-[1.08rem]">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
