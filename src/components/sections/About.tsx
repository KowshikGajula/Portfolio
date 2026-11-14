import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DecryptedText } from "@/components/ui/DecryptedText";
import { profile } from "@/data/profile";
import { journey } from "@/data/journey";
import { Code2, Layers, LifeBuoy, Puzzle, Workflow, Zap } from "lucide-react";

const PILLARS = [
  {
    icon: Code2,
    title: "Development",
    body: "Custom ABAP — reports, ALV output, modularised programs and the data dictionary work behind them.",
  },
  {
    icon: Layers,
    title: "Enhancements",
    body: "Extending standard SAP through the enhancement framework, BAdIs, user exits and BAPIs — without touching core code.",
  },
  {
    icon: Workflow,
    title: "Integration",
    body: "Interfaces that move data in and out of SAP: file-based, RFC, OData and IDoc, with logging built in.",
  },
  {
    icon: Puzzle,
    title: "Problem Solving",
    body: "Debugging production issues to root cause — debugger, runtime analysis and stack analysis rather than guesswork.",
  },
  {
    icon: LifeBuoy,
    title: "Production Support",
    body: "Keeping live systems healthy: analysing failures, correcting them and making the fix easy to verify.",
  },
  {
    icon: Zap,
    title: "Automation",
    body: "Removing manual effort from repetitive processes so people stop re-keying what a program could do.",
  },
];

export function About() {
  const entry = journey[0];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="01 — About"
          title={
            <>
              An <span className="text-gradient">SAP ABAP Consultant</span> who
              owns the technical detail end to end.
            </>
          }
          description={profile.summary}
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Narrative */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-5 text-[1rem] leading-[1.75] text-muted">
                <p>
                  I work on the technical side of SAP — the layer between a
                  functional requirement and something that actually runs in
                  production. Day to day that means designing and writing custom
                  ABAP, extending standard processes through the enhancement
                  framework, building interfaces, and producing the forms and
                  reports the business depends on.
                </p>
                <p>
                  Most of the value I add sits in the unglamorous parts: reading
                  a spec carefully, deciding what happens when the input is
                  wrong, making an error message say something useful, and
                  leaving behind a program the next developer can understand.
                  When something breaks in production, I would rather find the
                  root cause with the debugger than ship a workaround.
                </p>
                <p>
                  My recent work has been concentrated in plant maintenance and
                  production — automated order creation from external systems,
                  label and certificate output, and the investigation work that
                  comes with complex structures like multi-level BOMs.
                </p>
              </div>
            </Reveal>

            {/* Focus / current role strip */}
            <Reveal delay={0.1}>
              <div className="glass mt-10 rounded-2xl p-6">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent2">
                    Current focus
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="font-display text-[1.02rem] font-semibold tracking-tight text-ink">
                      {entry.role}
                    </p>
                    <p className="mt-1 text-sm text-muted">{entry.employer}</p>
                  </div>
                  <div>
                    <p className="font-display text-[1.02rem] font-semibold tracking-tight text-ink">
                      {entry.period}
                    </p>
                    <p className="mt-1 text-sm text-muted">{entry.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Technical signature */}
            <Reveal delay={0.15}>
              <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
                SE38 · SE11 · SE37 ·{" "}
                <DecryptedText
                  text="SE80"
                  auto
                  speed={4}
                  startDelay={900}
                  className="text-accent2"
                />{" "}
                · SAT · ST22
              </p>
            </Reveal>
          </div>

          {/* Pillars */}
          <div className="lg:col-span-5">
            <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
              {PILLARS.map((pillar, i) => (
                <Reveal as="li" key={pillar.title} delay={0.05 * i}>
                  <div className="card-hover group flex gap-4 rounded-xl border border-line bg-surface p-4 sm:p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-accent-gradient-soft text-accent2 transition-colors duration-300 group-hover:border-accent2/40">
                      <pillar.icon size={17} strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[0.95rem] font-semibold tracking-tight text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
