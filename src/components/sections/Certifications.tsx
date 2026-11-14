import { Award, BadgeCheck, Plus, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, type Certification } from "@/data/certifications";

const ICONS = {
  award: Award,
  badge: BadgeCheck,
  certificate: ShieldCheck,
} as const;

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const Icon = ICONS[cert.icon];

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7">
        {/* Gradient sheen */}
        <span
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        />

        <div className="relative flex items-start justify-between gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-accent-gradient-soft text-accent2 transition-all duration-400 group-hover:border-accent2/50">
            <Icon size={24} strokeWidth={1.6} />
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="relative mt-6 font-display text-[1.22rem] font-semibold leading-tight tracking-tight text-ink">
          {cert.title}
        </h3>
        <p className="relative mt-2 text-[0.9rem] font-medium text-accent2">
          {cert.issuer}
        </p>
        {cert.issuerNote && (
          <p className="relative mt-1 text-[0.82rem] text-faint">
            {cert.issuerNote}
          </p>
        )}

        <ul className="relative mt-5 space-y-2.5 border-t border-line pt-5">
          {cert.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[0.855rem] leading-relaxed text-muted"
            >
              <span
                aria-hidden="true"
                className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-accent2"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-6">
          {cert.credentialId && (
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
              ID · {cert.credentialId}
            </span>
          )}
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent2 underline-offset-4 transition-all hover:underline"
            >
              Verify credential →
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Certifications() {
  const hasCreds = certifications.some((c) => c.credentialId || c.verifyUrl);

  return (
    <section
      aria-labelledby="certifications-heading"
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="Certifications"
          title={
            <>
              Certified on the SAP platform{" "}
              <span className="text-gradient">and its AI direction</span>.
            </>
          }
          description="Formal credentials that back up the day-to-day work."
          align="left"
        />

        <ul className="grid gap-6 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <li key={cert.id} className="flex">
              <div className="flex w-full">
                <CertCard cert={cert} index={i} />
              </div>
            </li>
          ))}

          {/* Reserved slot for future credentials */}
          <Reveal delay={certifications.length * 0.1} className="h-full sm:col-span-2 lg:col-span-1">
            <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line2 bg-transparent p-7 text-center transition-colors duration-400 hover:border-accent2/45">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface text-faint">
                <Plus size={20} strokeWidth={1.7} />
              </span>
              <p className="font-display text-[1rem] font-semibold tracking-tight text-muted">
                Additional credentials
              </p>
              <p className="max-w-xs text-[0.82rem] leading-relaxed text-faint">
                This slot is reserved for the next certification — add it in{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.75rem] text-accent2">
                  certifications.ts
                </code>
                .
              </p>
              {!hasCreds && (
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
                  No credential IDs published yet
                </p>
              )}
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
