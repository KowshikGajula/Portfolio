import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
import { GridBackdrop } from "@/components/background/GridBackdrop";
import { VantaNet } from "@/components/background/VantaNet";
import { Terminal } from "@/components/ui/Terminal";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

const AVAILABILITY_TONE: Record<string, string> = {
  available: "bg-emerald-400",
  busy: "bg-amber-400",
  open: "bg-accent2",
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // GSAP ScrollTrigger drives the parallax; Lenis feeds ScrollTrigger updates
  // through the bridge in SmoothScroll, so the motion stays in lockstep.
  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    const target = terminalRef.current;
    if (!section || !target) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { y: 34 },
        {
          y: -46,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );

      gsap.to(section.querySelector(".hero-glow"), {
        yPercent: 24,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduce]);

  const { availability, intro, stats, contact } = profile;

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 sm:pt-32 lg:pb-32"
    >
      {/* Layer 1 — static engineering grid + glows */}
      <GridBackdrop />

      {/* Layer 2 — animated network (WebGL, degrades away silently) */}
      <VantaNet points={10} intensity={0.72} />

      {/* Layer 3 — veil so copy stays legible over the animation */}
      <div
        className="hero-glow pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 22% 45%, var(--hero-veil), transparent 72%)",
        }}
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-canvas to-transparent"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* ---------------- Copy ---------------- */}
        <div className="lg:col-span-7">
          {/* Availability */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-70",
                  AVAILABILITY_TONE[availability.tone] ?? "bg-accent2",
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  AVAILABILITY_TONE[availability.tone] ?? "bg-accent2",
                )}
              />
            </span>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
              {availability.label}
            </span>
          </motion.div>

          {/* Eyebrow with the gradient-highlighted title */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 font-display text-[0.95rem] font-medium tracking-tight text-muted sm:text-base"
          >
            {profile.name}{" "}
            <span className="mx-1.5 text-faint" aria-hidden="true">
              /
            </span>
            <span className="text-gradient font-semibold">
              {profile.title}
            </span>
            <span className="mx-1.5 text-faint" aria-hidden="true">
              /
            </span>
            <span className="text-faint">{profile.location}</span>
          </motion.p>

          {/* Main heading */}
          <h1 className="font-display text-[clamp(2.15rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-tightest text-ink">
            <SplitText
              text={profile.headline.line1}
              delay={0.15}
              stagger={0.05}
            />
            <br />
            <SplitText
              text={profile.headline.line2}
              delay={0.42}
              whole
              innerClassName="text-gradient"
            />
          </h1>

          {/* Introduction */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl space-y-4"
          >
            {intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-[0.98rem] leading-relaxed text-muted sm:text-[1.04rem]"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              href="#work"
              icon={<ArrowRight size={16} strokeWidth={1.9} />}
            >
              Explore Projects
            </Button>
            <Button
              href={contact.resume}
              download
              variant="ghost"
              icon={<Download size={16} strokeWidth={1.9} />}
              iconPosition="left"
            >
              Download Resume
            </Button>
            <Button
              href="#contact"
              variant="subtle"
              icon={<Mail size={16} strokeWidth={1.9} />}
              iconPosition="left"
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-7"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[0.92rem] font-semibold tracking-tight text-ink sm:text-[1rem]">
                  {stat.value}
                </dd>
                <dd className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---------------- Terminal ---------------- */}
        <motion.div
          ref={terminalRef}
          initial={reduce ? false : { opacity: 0, y: 40, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
          style={{ perspective: 1200 }}
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="group absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-accent2 md:flex"
        aria-label="Scroll to the about section"
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em]">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <motion.span
            animate={reduce ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-accent2"
          />
        </span>
        <ArrowDown size={12} strokeWidth={1.8} className="opacity-0" />
      </motion.a>
    </section>
  );
}
