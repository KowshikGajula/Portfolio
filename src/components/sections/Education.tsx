import { GraduationCap, MapPin, CalendarDays, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, educationTimeline } from "@/data/education";

function EducationCard({ index }: { index: number }) {
  const entry = education[index];
  if (!entry) return null;

  const total = educationTimeline.end - educationTimeline.start;

  return (
    <Reveal className="h-full">
      <article className="card-hover group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8">
        {/* Accent rail */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#0a6ed1] via-[#2f88f5] to-[#22d3ee] opacity-70"
        />
        {/* Ambient glow on hover */}
        <span
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-accent-gradient-soft text-accent2 transition-all duration-400 group-hover:border-accent2/45">
            <GraduationCap size={20} strokeWidth={1.7} />
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            <BadgeCheck size={12} strokeWidth={2} />
            {entry.status}
          </span>
        </div>

        <div className="relative mt-6">
          <p className="font-mono text-[0.63rem] uppercase tracking-[0.2em] text-accent2">
            {entry.degree}
          </p>
          <h3 className="mt-2 font-display text-[1.3rem] font-semibold leading-tight tracking-tight text-ink sm:text-[1.5rem]">
            {entry.field}
          </h3>
          <p className="mt-2 text-[0.98rem] font-medium text-muted">
            {entry.institution}
          </p>
        </div>

        {/* Meta */}
        <ul className="relative mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <li className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-faint">
            <CalendarDays size={12} strokeWidth={1.9} />
            {entry.period}
          </li>
          {entry.location && (
            <li className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-faint">
              <MapPin size={12} strokeWidth={1.9} />
              {entry.location}
            </li>
          )}
        </ul>

        {/* Academic progress rail */}
        <div className="relative mt-8">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-line">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 rounded-full bg-accent-gradient"
              style={{ width: "100%" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 right-0 h-1 w-1 -translate-y-0 rounded-full bg-accent2 shadow-[0_0_10px_2px_rgba(47,136,245,0.7)]"
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
            <span>{educationTimeline.startLabel}</span>
            <span className="text-accent2">
              {total} years · completed
            </span>
            <span>{educationTimeline.endLabel}</span>
          </div>
        </div>

        {/* Optional highlights — rendered only when you add them */}
        {entry.highlights.length > 0 && (
          <ul className="relative mt-6 space-y-2.5 border-t border-line pt-5">
            {entry.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-[0.875rem] leading-relaxed text-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-accent2"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </Reveal>
  );
}

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      {/* Soft wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[26rem] w-[54rem] -translate-x-1/2 rounded-full bg-accent-gradient opacity-[0.06] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="05 — Education"
          title={
            <>
              Foundations in{" "}
              <span className="text-gradient">computer science</span>.
            </>
          }
          description="The academic background behind the consulting work — a full-time engineering degree in computer science and engineering."
        />

        <ul className="grid gap-6 lg:grid-cols-12">
          <li className="lg:col-span-7">
            <EducationCard index={0} />
          </li>

          {/* Side note card keeps the layout balanced as Education grows */}
          <li className="lg:col-span-5">
            <Reveal delay={0.1} className="h-full">
              <div className="glass flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent2">
                    Always learning
                  </p>
                  <p className="mt-4 text-[0.95rem] leading-[1.75] text-muted">
                    A computer science degree gives the theory — algorithms,
                    data structures, databases and networks. Consulting is
                    where it meets the reality of an enterprise SAP landscape:
                    master data that does not cooperate, interfaces that must
                    never lose a record, and production systems that do not
                    allow guesswork.
                  </p>
                </div>

                <p className="mt-6 border-t border-line pt-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
                  B.Tech · CSE · {educationTimeline.startLabel} —{" "}
                  {educationTimeline.endLabel}
                </p>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
