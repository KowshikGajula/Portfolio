import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

export const NAV_LINKS = [
  { id: "about", label: "About", index: "01" },
  { id: "expertise", label: "Expertise", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "architecture", label: "Architecture", index: "04" },
  { id: "journey", label: "Journey", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

const SECTION_IDS = ["home", ...NAV_LINKS.map((l) => l.id)];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (id: string) => active === id;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-gradient focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth",
          scrolled
            ? "border-b border-line bg-canvas/80 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/70"
            : "border-b border-transparent",
        )}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8"
          aria-label="Primary"
        >
          {/* Monogram */}
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — home`}
          >
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-line bg-surface font-display text-[0.95rem] font-semibold tracking-tight text-ink transition-all duration-400 group-hover:border-accent2/60">
              <span className="bg-accent-gradient bg-clip-text text-transparent">
                KG
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-accent-gradient opacity-0 transition-opacity duration-400 group-hover:opacity-10"
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[0.92rem] font-semibold tracking-tight text-ink">
                {profile.name}
              </span>
              <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-faint">
                {profile.title}
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive(link.id) ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.84rem] font-medium tracking-tight transition-colors duration-300",
                    isActive(link.id)
                      ? "text-accent2"
                      : "text-muted hover:text-ink",
                  )}
                >
                  <span className="mr-1.5 font-mono text-[0.62rem] text-faint">
                    {link.index}
                  </span>
                  {link.label}
                  {isActive(link.id) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-accent2/35 bg-accent-gradient-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <a
              href={profile.contact.resume}
              download
              className="hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-[0.8rem] font-medium text-ink transition-all duration-300 hover:border-accent2/50 hover:text-accent2 sm:inline-flex"
            >
              <Download size={14} strokeWidth={1.8} />
              Resume
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent2/50 lg:hidden"
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-canvas/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-8">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-accent2">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: reduce ? 0 : -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-baseline gap-4 border-b border-line py-5 font-display text-[1.9rem] font-medium tracking-tight transition-colors",
                      isActive(link.id) ? "text-accent2" : "text-ink",
                    )}
                  >
                    <span className="font-mono text-[0.68rem] tracking-[0.2em] text-faint">
                      {link.index}
                    </span>
                    {link.label}
                    <ArrowUpRight
                      size={20}
                      className="ml-auto self-center text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent2"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="px-5 pb-8 sm:px-8">
              <a
                href={profile.contact.resume}
                download
                onClick={() => setOpen(false)}
                className="btn-primary flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium"
              >
                <Download size={16} strokeWidth={1.8} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
