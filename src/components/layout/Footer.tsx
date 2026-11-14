import { ArrowUp, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { NAV_LINKS } from "./Navbar";

const SOCIAL_ICONS = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  email: Mail,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Oversized watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-18%] select-none text-center font-display text-[clamp(4rem,16vw,13rem)] font-bold leading-none tracking-tighter opacity-[0.045]"
      >
        {profile.firstName.toUpperCase()}
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-16 sm:px-8">
        {/* Upper row */}
        <div className="flex flex-col gap-10 border-b border-line pb-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface font-display text-[0.9rem] font-semibold">
                <span className="bg-accent-gradient bg-clip-text text-transparent">
                  KG
                </span>
              </span>
              <div>
                <p className="font-display text-[1rem] font-semibold tracking-tight text-ink">
                  {profile.name}
                </p>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent2">
                  {profile.title}
                </p>
              </div>
            </div>

            <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">
              Engineering enterprise solutions with SAP ABAP — scalable
              automation, intelligent integrations and custom development
              across ECC and S/4HANA.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {profile.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.id as keyof typeof SOCIAL_ICONS];
                if (!Icon) return null;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-label={item.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent2/50 hover:text-accent2"
                  >
                    <Icon size={15} strokeWidth={1.75} />
                  </a>
                );
              })}

              <a
                href={profile.contact.resume}
                download
                aria-label="Download resume"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent2/50 hover:text-accent2"
              >
                <Download size={15} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-faint">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="group inline-flex items-center gap-2 text-[0.875rem] text-muted transition-colors hover:text-accent2"
                  >
                    <span className="font-mono text-[0.62rem] text-faint transition-colors group-hover:text-accent2">
                      {link.index}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <a
            href="#home"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-line bg-surface px-5 py-3 text-[0.8rem] font-medium text-ink transition-all duration-300 hover:border-accent2/50 hover:text-accent2"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-gradient-soft text-accent2 transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp size={13} strokeWidth={2} />
            </span>
          </a>
        </div>

        {/* Lower row */}
        <div className="flex flex-col items-start justify-between gap-4 pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
            {profile.location} · Currently an{" "}
            <span className="text-accent2">SAP ABAP Consultant</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
