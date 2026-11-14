import { cn } from "@/lib/cn";

interface ShinyTextProps {
  text: string;
  className?: string;
  /** 0 disables the sweep, 1 is full intensity. */
  intensity?: number;
}

/**
 * "react-bits" ShinyText — a light sweep travelling across the text.
 * Implemented with a background-clip gradient so it stays crisp at any size.
 */
export function ShinyText({ text, className, intensity = 1 }: ShinyTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        intensity > 0 && "animate-shimmer",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(110deg, var(--text-muted) 0%, var(--text-muted) 38%, var(--accent-2) 50%, var(--text-muted) 62%, var(--text-muted) 100%)",
        backgroundSize: "220% 100%",
        opacity: 1 - intensity * 0.001,
      }}
    >
      {text}
    </span>
  );
}
