import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface DecryptedTextProps {
  text: string;
  className?: string;
  /** Characters revealed per animation frame. */
  speed?: number;
  /** Frames to wait before starting. */
  startDelay?: number;
  /** Run once on mount instead of on hover. */
  auto?: boolean;
  characters?: string;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*<>/\\";

/**
 * "react-bits" DecryptedText — characters resolve out of a scramble.
 * Respects reduced-motion by rendering the final string immediately.
 */
export function DecryptedText({
  text,
  className,
  speed = 3,
  startDelay = 0,
  auto = false,
  characters = GLYPHS,
}: DecryptedTextProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef<number | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    let started = false;

    const run = () => {
      if (started) return;
      started = true;

      const total = text.length;
      const tick = () => {
        frame.current += 1;
        const revealed = Math.floor(frame.current / speed);

        setDisplay(
          Array.from(text)
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealed) return char;
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join(""),
        );

        if (revealed <= total) {
          raf.current = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      };

      raf.current = requestAnimationFrame(tick);
    };

    const timer = window.setTimeout(run, startDelay);

    return () => {
      window.clearTimeout(timer);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      started = true;
    };
  }, [text, speed, startDelay, reduce, characters]);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
  }, []);

  return (
    <span
      className={cn("font-mono", className)}
      onMouseEnter={auto ? undefined : undefined}
      aria-label={text}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
