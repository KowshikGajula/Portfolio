import { cn } from "@/lib/cn";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Pause the scroll while hovered. */
  pauseOnHover?: boolean;
  reverse?: boolean;
  /** Fade the edges into the background. */
  faded?: boolean;
}

/** Infinite horizontal scroll strip — used for the skills rail. */
export function Marquee({
  children,
  className,
  pauseOnHover = true,
  reverse = false,
  faded = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative flex overflow-hidden",
        faded && "mask-fade-x",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center gap-3 pr-3",
          pauseOnHover && "[animation-play-state:paused] hover:[animation-play-state:running]",
          reverse && "flex-row-reverse",
        )}
      >
        {children}
      </div>
      {/* Second copy keeps the loop seamless. */}
      <div
        aria-hidden="true"
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center gap-3 pr-3",
          pauseOnHover && "[animation-play-state:paused] hover:[animation-play-state:running]",
          reverse && "flex-row-reverse",
        )}
      >
        {children}
      </div>
    </div>
  );
}
