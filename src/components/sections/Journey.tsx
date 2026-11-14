import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey, focusAreas, type JourneyEntry } from "@/data/journey";
import { cn } from "@/lib/cn";

function TimelineEntry({ entry, index }: { entry: JourneyEntry; index: number }) {
  const reduce = useReducedMotion();

  return (
    <Reveal as="li" delay={index * 0.08} className="relative pl-10 sm:pl-16">
      {/* Rail */}
      {index < journey.length - 1 && (
        <span
          aria-hidden="true"
          className="absolute left-[13px] top-10 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-accent2/50 via-line to-transparent sm:left-[21px]"
        />
      )}

      {/* Node */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-full border sm:left-2 sm:h-11 sm:w-11",
          entry.current
            ? "border-transparent bg-accent-gradient shadow-glow"
            : "border-line bg-surface",
        )}
      >
        {entry.current ? (
          <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-white" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
        )}
      </span>

      <article className="card-hover rounded-2xl border border-line bg-surface p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.63rem] uppercase tracking-[0.2em] text-accent2">
              {entry.period}
            </p>
            <h3 className="mt-2 font-display text-[1.18rem] font-semibold leading-tight tracking-tight text-ink sm:text-[1.3rem]">
              {entry.role}
            </h3>
            <p className="mt-1.5 text-[0.92rem] font-medium text-muted">
              {entry.employer}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
              <MapPin size={11} strokeWidth={1.9} />
              {entry.location}
            </span>
            {entry.client && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent2/35 bg-accent-gradient-soft px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent2">
                <Briefcase size={11} strokeWidth={1.9} />
                Client · {entry.client}
              </span>
            )}
            {entry.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-emerald-500 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500 dark:bg-emerald-400" />
                Current
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 border-t border-line pt-4 text-[0.9rem] leading-relaxed text-muted">
          {entry.summary}
        </p>

        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 space-y-2.5"
        >
          {entry.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[0.875rem] leading-relaxed text-muted">
              <span
                aria-hidden="true"
                className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-accent2"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </motion.ul>
      </article>
    </Reveal>
  );
}

export function Journey() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="02 — Professional Experience"
          title={
            <>
              Consulting on SAP ABAP,{" "}
              <span className="text-gradient">end to end</span>.
            </>
          }
          description="Currently working as an SAP ABAP Consultant — enterprise development, integrations, automation and production support across the SAP landscape."
        />

        <ol className="relative">
          {journey.map((entry, index) => (
            <TimelineEntry key={entry.id} entry={entry} index={index} />
          ))}
        </ol>

        {/* Focus areas — what the work covers, not how long it took. */}
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-accent2">
              What the work covers
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {focusAreas.map((area, i) => (
              <Reveal as="li" key={area.title} delay={i * 0.06} className="h-full">
                <article className="card-hover group h-full rounded-xl border border-line bg-surface p-5">
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-px w-8 bg-accent-gradient transition-all duration-400 group-hover:w-14"
                  />
                  <h3 className="font-display text-[0.98rem] font-semibold tracking-tight text-ink">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                    {area.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
