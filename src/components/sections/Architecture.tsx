import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  FileText,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { architectureFlow, type ArchNode } from "@/data/architecture";
import { cn } from "@/lib/cn";

const ICONS: Record<ArchNode["icon"], LucideIcon> = {
  globe: Globe2,
  file: FileText,
  code: Code2,
  database: Database,
  arrow: ArrowRight,
};

const SYSTEM_LABEL: Record<ArchNode["system"], string> = {
  external: "External",
  interface: "Interface layer",
  abap: "ABAP runtime",
  sap: "SAP core",
};

export function Architecture() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  const select = useCallback((index: number) => {
    setActive(Math.max(0, Math.min(architectureFlow.length - 1, index)));
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLOListElement>) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => Math.min(i + 1, architectureFlow.length - 1));
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (event.key === "Home") {
        event.preventDefault();
        setActive(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setActive(architectureFlow.length - 1);
      }
    },
    [],
  );

  const current = architectureFlow[active];
  const CurrentIcon = ICONS[current.icon];
  const progress = (active / (architectureFlow.length - 1)) * 100;

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[30rem] w-[30rem] rounded-full bg-accent-gradient opacity-[0.08] blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="04 — Technical Architecture"
          title={
            <>
              How an external request becomes{" "}
              <span className="text-gradient">an SAP PM order</span>.
            </>
          }
          description="The integration loop end to end. Select any stage to see what happens there and which technology carries it."
        />

        {/* ---------------- Flow rail ---------------- */}
        <Reveal>
          <div className="relative">
            {/* Desktop progress rail */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 hidden h-px bg-line lg:block"
            />
            <div
              aria-hidden="true"
              className="absolute left-0 top-7 hidden h-px bg-accent-gradient transition-[width] duration-700 ease-smooth lg:block"
              style={{ width: `${progress}%` }}
            />
            {/* Travelling packet */}
            <motion.span
              aria-hidden="true"
              className="absolute top-7 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent2 shadow-[0_0_12px_3px_rgba(47,136,245,0.7)] lg:block"
              animate={reduce ? {} : { left: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />

            <ol
              ref={listRef}
              onKeyDown={onKeyDown}
              role="tablist"
              aria-label="SAP integration stages"
              className="relative grid grid-cols-1 gap-5 lg:grid-cols-7 lg:gap-3"
            >
              {architectureFlow.map((node, index) => {
                const Icon = ICONS[node.icon];
                const isActive = index === active;
                const isDone = index <= active;

                return (
                  <li key={node.id} className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-3.5 lg:text-center">
                    {/* Mobile vertical connector */}
                    {index < architectureFlow.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-7 top-14 h-[calc(100%+1.25rem)] w-px bg-line lg:hidden"
                      />
                    )}

                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="stage-detail"
                      id={`stage-tab-${node.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => select(index)}
                      className={cn(
                        "relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border transition-all duration-400 ease-smooth",
                        isActive
                          ? "border-transparent bg-accent-gradient text-white shadow-glow"
                          : isDone
                            ? "border-accent2/40 bg-accent-gradient-soft text-accent2"
                            : "border-line bg-surface text-faint hover:border-accent2/40 hover:text-accent2",
                      )}
                    >
                      <Icon size={19} strokeWidth={1.7} />
                      <span
                        className={cn(
                          "absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border px-1 font-mono text-[0.62rem] font-semibold",
                          isActive
                            ? "border-transparent bg-white text-sap-700"
                            : "border-line bg-elevated text-faint",
                        )}
                      >
                        {node.step}
                      </span>
                    </button>

                    <div className="min-w-0 lg:px-1">
                      <button
                        type="button"
                        onClick={() => select(index)}
                        tabIndex={-1}
                        className={cn(
                          "block text-left font-display text-[0.88rem] font-semibold tracking-tight transition-colors lg:text-center",
                          isActive ? "text-ink" : "text-muted hover:text-ink",
                        )}
                      >
                        {node.label}
                      </button>
                      <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
                        {SYSTEM_LABEL[node.system]}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        {/* ---------------- Detail panel ---------------- */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              id="stage-detail"
              role="tabpanel"
              aria-labelledby={`stage-tab-${current.id}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass grid gap-7 rounded-2xl p-6 sm:p-8 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-gradient text-white">
                    <CurrentIcon size={20} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent2">
                      Stage {current.step}
                    </p>
                    <h3 className="font-display text-[1.3rem] font-semibold tracking-tight text-ink">
                      {current.label}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {current.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-[0.66rem] tracking-tight text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Stage counter */}
                <div className="mt-6 flex items-center gap-2" aria-hidden="true">
                  {architectureFlow.map((node, i) => (
                    <span
                      key={node.id}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        i === active
                          ? "w-7 bg-accent-gradient"
                          : i < active
                            ? "w-3 bg-accent2/50"
                            : "w-3 bg-line",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8">
                <p className="text-[1rem] leading-[1.8] text-muted sm:text-[1.04rem]">
                  {current.detail}
                </p>

                {/* Direction cue */}
                <div className="mt-7 flex items-center gap-3 border-t border-line pt-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                  <span>
                    {active < architectureFlow.length - 1
                      ? `Next — ${architectureFlow[active + 1].label}`
                      : "Loop closed — both systems agree"}
                  </span>
                  <ArrowRight size={13} strokeWidth={1.8} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Full loop written out for clarity / SEO */}
        <Reveal delay={0.1}>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
            {architectureFlow.map((node, i) => (
              <span key={node.id} className="inline-flex items-center gap-3">
                {node.label}
                {i < architectureFlow.length - 1 && (
                  <ArrowRight size={11} strokeWidth={2} className="text-accent2" />
                )}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
