import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SplitTextProps {
  text: string;
  className?: string;
  /**
   * Applied to the span that actually holds the glyphs. Needed for classes
   * like `.text-gradient`, because `background-clip: text` does not reach into
   * nested `inline-block` boxes — the gradient must sit on the element that
   * directly contains the text.
   */
  innerClassName?: string;
  /** Animate per word (default) or per character. */
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Wraps each unit in an overflow-hidden mask so text slides up into place. */
  masked?: boolean;
  /**
   * Animate the whole string as one masked unit instead of splitting it.
   * Required when the line carries a gradient or any background-clip treatment.
   */
  whole?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Word/character level entrance — the "react-bits" SplitText treatment.
 *
 * The accessible string is rendered once in a visually hidden span and the
 * animated copy is marked `aria-hidden`, so screen readers hear the heading
 * exactly once no matter how many fragments it is split into.
 */
export function SplitText({
  text,
  className,
  innerClassName,
  by = "word",
  delay = 0,
  stagger = 0.045,
  duration = 0.85,
  masked = true,
  whole = false,
}: SplitTextProps) {
  const reduce = useReducedMotion();

  // No animation: render the real text once, with any styling intact.
  if (reduce) {
    return (
      <span className={cn("inline", className)}>
        <span className={innerClassName}>{text}</span>
      </span>
    );
  }

  const units = whole
    ? [text]
    : by === "word"
      ? text.split(" ")
      : Array.from(text);

  return (
    <span className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {units.map((unit, i) => {
          const isSpace = by === "char" && unit === " ";
          const content =
            whole || by === "word" ? unit : isSpace ? "\u00A0" : unit;

          return (
            <span
              key={`${unit}-${i}`}
              className={cn(
                "inline-block",
                masked && "overflow-hidden pb-[0.12em]",
              )}
              style={{ verticalAlign: "bottom" }}
            >
              <motion.span
                className={cn(
                  "inline-block",
                  whole ? innerClassName : "will-change-transform",
                  !whole && innerClassName,
                )}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration,
                  delay: delay + (whole ? 0 : i * stagger),
                  ease: EASE,
                }}
              >
                {content}
                {!whole && by === "word" && i < units.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
