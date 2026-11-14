import { cn } from "@/lib/cn";

/**
 * Static fallback behind the WebGL backdrop — a fading engineering grid plus
 * two soft radial glows. Always present so the hero never looks empty, even if
 * WebGL is disabled or the animation fails to initialise.
 */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="grid-backdrop absolute inset-0" />

      {/* SAP-blue glow, top-left */}
      <div
        className="absolute -left-40 -top-40 h-[46rem] w-[46rem] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(10,110,209,0.30), transparent 65%)" }}
      />
      {/* Cyan glow, bottom-right */}
      <div
        className="absolute -bottom-52 -right-40 h-[42rem] w-[42rem] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.20), transparent 65%)" }}
      />
      {/* Horizontal hairline accents */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent2/40 to-transparent" />
    </div>
  );
}
