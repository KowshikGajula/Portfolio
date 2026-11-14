import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "accent" | "outline";

interface TagProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const tones: Record<Tone, string> = {
  default: "bg-surface text-muted border-line",
  accent:
    "bg-accent-gradient-soft text-accent2 border-accent2/30 dark:border-accent2/30",
  outline: "bg-transparent text-faint border-line",
};

export function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
