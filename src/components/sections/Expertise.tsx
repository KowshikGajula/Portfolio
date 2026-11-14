import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Database,
  Layers,
  Network,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { skillCategories, allSkills, type SkillCategory } from "@/data/skills";
import { cn } from "@/lib/cn";

const ICONS: Record<SkillCategory["icon"], LucideIcon> = {
  code: Code2,
  layers: Layers,
  network: Network,
  database: Database,
  wrench: Wrench,
};

function SkillChip({ label, index }: { label: string; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.045, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/chip inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[0.82rem] font-medium tracking-tight text-ink transition-colors duration-300 hover:border-accent2/45 hover:text-accent2"
    >
      {/* Activity marker — intentionally not a proficiency score. */}
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent2/45 transition-all duration-300 group-hover/chip:scale-125 group-hover/chip:bg-accent2"
      />
      {label}
    </motion.li>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const Icon = ICONS[category.icon];

  return (
    <Reveal
      as="li"
      delay={index * 0.07}
      className="h-full"
    >
      <article className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6">
        {/* Corner accent that lights up on hover */}
        <span
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent-gradient opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
        />

        <div className="relative mb-5 flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-accent-gradient-soft text-accent2 transition-all duration-400 group-hover:border-accent2/45">
            <Icon size={19} strokeWidth={1.7} />
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="relative font-display text-[1.06rem] font-semibold tracking-tight text-ink">
          {category.title}
        </h3>
        <p className="relative mt-2 mb-5 text-[0.85rem] leading-relaxed text-muted">
          {category.blurb}
        </p>

        <ul className="relative mt-auto flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <SkillChip key={skill} label={skill} index={i} />
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      {/* Soft wash behind the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-accent-gradient opacity-[0.07] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="04 — Technical Expertise"
          title={
            <>
              The toolkit behind{" "}
              <span className="text-gradient">enterprise SAP delivery</span>.
            </>
          }
          description="Five categories, organised by the work they do rather than by a score. Every item here has been used in a real development or support context."
        />

        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </ul>
      </div>

      {/* Skills rail */}
      <div className="relative mt-20">
        <div className="mb-5 flex items-center gap-4 px-5 sm:px-8">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-faint">
            The full stack, end to end
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <Marquee className="py-1">
          {allSkills.map((skill) => (
            <span
              key={skill}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2",
                "font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted",
              )}
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-accent2"
              />
              {skill}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
