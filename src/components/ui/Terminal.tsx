import { motion, useReducedMotion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

const TONE: Record<"cmd" | "info" | "ok", string> = {
  cmd: "text-accent2",
  info: "text-muted",
  ok: "text-emerald-400 dark:text-emerald-400",
};

/**
 * The SAP-system-inspired terminal in the hero. Decorative: the real content
 * is announced once by the surrounding section, so the log itself is hidden
 * from assistive technology to avoid reading out every line.
 */
export function Terminal({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { terminal } = profile;

  return (
    <div
      className={cn(
        "glass relative w-full overflow-hidden rounded-2xl noise-overlay",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <span className="ml-1 truncate font-mono text-[0.68rem] tracking-tight text-faint">
          {terminal.title}
        </span>

        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
          live
        </span>
      </div>

      {/* Screen */}
      <div className="relative px-4 py-5 sm:px-5 sm:py-6">
        {/* Scanline sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
        >
          <div className="h-16 w-full animate-scan bg-gradient-to-b from-transparent via-accent2/12 to-transparent" />
        </div>

        <div
          className="relative space-y-2.5 font-mono text-[0.7rem] leading-relaxed sm:text-[0.76rem]"
          aria-hidden="true"
        >
          {terminal.lines.map((line, i) => (
            <motion.div
              key={line.text}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.16, duration: 0.45, ease: "easeOut" }}
              className="flex gap-2.5"
            >
              <span className="shrink-0 select-none text-faint">
                {line.type === "ok" ? "✓" : line.type === "info" ? "·" : "›"}
              </span>
              <span className={cn("break-words", TONE[line.type])}>{line.text}</span>
            </motion.div>
          ))}

          {/* Prompt with a live caret */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + terminal.lines.length * 0.16, duration: 0.4 }}
            className="flex items-center gap-2.5 pt-1"
          >
            <span className="shrink-0 select-none text-accent3">abap&gt;</span>
            <span className="text-ink">{terminal.prompt}</span>
            <span className="inline-block h-3.5 w-2 animate-pulse bg-accent2" />
          </motion.div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-4 border-t border-line bg-surface2/40 px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint sm:px-5">
        <span className="inline-flex items-center gap-2">
          <TerminalIcon size={11} strokeWidth={1.8} />
          ABAP Workbench
        </span>
        <span className="hidden sm:inline">Syntax check: 0 errors</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
