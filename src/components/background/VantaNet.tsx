import { useEffect, useRef, useState } from "react";
import type { VantaEffect } from "vanta/src/vanta.net.js";
import { cn } from "@/lib/cn";

interface VantaNetProps {
  className?: string;
  /** 0–1. Lower values keep the effect from competing with the copy. */
  intensity?: number;
  points?: number;
}

/**
 * Animated network backdrop built on Vanta's NET effect.
 *
 * Notes on the integration (these were non-obvious and are load-bearing):
 *  - `vanta`'s published UMD bundle does not expose the registered effect, so
 *    we import the ESM source (`vanta/src/vanta.net.js`) instead.
 *  - three.js is passed in explicitly through `options.THREE`; Vanta otherwise
 *    expects a global `window.THREE`.
 *  - three.js removed the `VertexColors` enum that Vanta still references, so
 *    we supply it as `true`, which is the modern equivalent.
 *  - everything is loaded via dynamic import so three.js never blocks first
 *    paint, and it degrades silently when WebGL is unavailable.
 */
export function VantaNet({ className, intensity = 1, points }: VantaNetProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.WebGLRenderingContext) return;

    let cancelled = false;
    let effect: VantaEffect | null = null;

    const boot = async () => {
      try {
        const [THREE_NS, netModule] = await Promise.all([
          import("three"),
          import("vanta/src/vanta.net.js"),
        ]);

        if (cancelled) return;

        // See the note above about the removed `VertexColors` enum.
        const VANTA_THREE = {
          ...(THREE_NS as unknown as Record<string, unknown>),
          VertexColors: true,
        };

        effect = netModule.default({
          el: host,
          THREE: VANTA_THREE as never,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 320,
          minWidth: 320,
          scale: 1,
          scaleMobile: 0.85,
          // Transparent clear colour lets the themed CSS background show through.
          backgroundColor: 0x000000,
          backgroundAlpha: 0,
          color: 0x2f88f5,
          points: points ?? 11,
          maxDistance: 21,
          spacing: 17,
          showDots: true,
        });

        setReady(true);
      } catch (error) {
        // WebGL context limits, blocked contexts, etc. The CSS grid backdrop
        // behind this element is the designed fallback, so we can simply stop.
        console.warn("[VantaNet] background unavailable —", error);
      }
    };

    void boot();

    return () => {
      cancelled = true;
      try {
        effect?.destroy();
      } catch {
        /* effect may already be torn down */
      }
      effect = null;
      setReady(false);
    };
  }, [points]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000",
        ready ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ opacity: ready ? intensity : 0 }}
    />
  );
}
