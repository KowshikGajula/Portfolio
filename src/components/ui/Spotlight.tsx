import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  /** Spotlight size in px. */
  size?: number;
  /** How strong the light reads against the surface. */
  opacity?: number;
}

/**
 * Cursor-tracking radial highlight. Wraps any card so hovering it lights the
 * surface from the pointer position — the premium "spotlight card" treatment.
 */
export function Spotlight({
  children,
  className,
  size = 420,
  opacity = 0.16,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn("relative overflow-hidden", className)}
      style={{ isolation: "isolate" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: active ? opacity : 0,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, var(--accent-2), transparent 65%)`,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
