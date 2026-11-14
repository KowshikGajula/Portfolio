import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Filter,
  GitBranch,
  Loader,
  Target,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { projects, projectTags, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";

const ACCENT: Record<Project["accent"], string> = {
  blue: "from-[#0a6ed1] to-[#2f88f5]",
  cyan: "from-[#2f88f5] to-[#22d3ee]",
  indigo: "from-[#085bab] to-[#59a4ff]",
};

const CASE_STUDY_BLOCKS = [
  {
    key: "challenge" as const,
    label: "Challenge",
    icon: Target,
  },
  {
    key: "approach" as const,
    label: "Technical Approach",
    icon: GitBranch,
  },
  {
    key: "implementation" as const,
    label: "Implementation",
    icon: Wrench,
  },
  {
    key: "outcome" as const,
    label: "Outcome",
    icon: CheckCircle2,
  },
];

function ArchitectureChain({ steps }: { steps: Project["architecture"] }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent2">
        Architecture
      </p>
      <ol className="flex flex-col gap-0 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-0">
        {steps.map((step, i) => (
          <li key={step.step} className="flex sm:flex-col sm:flex-1 sm:min-w-[9rem]">
            <div className="flex flex-1 flex-col">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-gradient font-mono text-[0.62rem] font-semibold text-white",
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[0.82rem] font-semibold leading-tight text-ink">
                    {step.step}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="mx-3 my-1 w-px shrink-0 bg-line sm:my-0 sm:mx-0 sm:h-px sm:w-full sm:self-start sm:mt-3"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function StatusPill({ project }: { project: Project }) {
  const ongoing = project.status === "ongoing";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em]",
        ongoing
          ? "border-amber-400/35 bg-amber-400/10 text-amber-600 dark:text-amber-400"
          : "border-emerald-400/35 bg-emerald-400/10 text-emerald-600 dark:text-emerald-400",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          ongoing
            ? "animate-pulse-dot bg-amber-500 dark:bg-amber-400"
            : "bg-emerald-500 dark:bg-emerald-400",
        )}
      />
      {ongoing ? "Ongoing" : "Completed"}
    </span>
  );
}

function DeliveryList({ project }: { project: Project }) {
  const groups = [
    { key: "completed" as const, label: "Completed", items: project.delivery.completed },
    { key: "ongoing" as const, label: "In progress", items: project.delivery.ongoing },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.key}
          className="rounded-xl border border-line bg-surface p-5"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className={cn(
                "grid h-7 w-7 place-items-center rounded-md",
                group.key === "completed"
                  ? "bg-emerald-400/12 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-400/12 text-amber-600 dark:text-amber-400",
              )}
            >
              {group.key === "completed" ? (
                <CheckCircle2 size={13} strokeWidth={1.9} />
              ) : (
                <Loader size={13} strokeWidth={1.9} />
              )}
            </span>
            <h4 className="font-mono text-[0.63rem] uppercase tracking-[0.18em] text-accent2">
              {group.label}
            </h4>
          </div>
          <ul className="space-y-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[0.845rem] leading-relaxed text-muted"
              >
                <CircleDot
                  size={12}
                  strokeWidth={1.8}
                  className="mt-1 shrink-0 text-faint"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = `case-study-${project.id}`;

  return (
    <Reveal className="h-full">
      <article className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
        {/* Accent header rail */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70",
            ACCENT[project.accent],
          )}
        />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          {/* Index + status + expand affordance */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <span className="font-mono text-[0.66rem] tracking-[0.2em] text-faint">
              PROJECT {project.index}
            </span>
            <div className="flex items-center gap-2.5">
              <StatusPill project={project} />
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-faint transition-all duration-400 group-hover:border-accent2/50 group-hover:text-accent2"
              >
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </span>
            </div>
          </div>

          <h3 className="font-display text-[1.24rem] font-semibold leading-tight tracking-tight text-ink sm:text-[1.35rem]">
            {project.title}
          </h3>
          <p className="mt-2 text-[0.88rem] font-medium text-accent2">
            {project.subtitle}
          </p>

          <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
            {project.summary}
          </p>

          <p className="mt-4 flex items-center gap-2 font-mono text-[0.63rem] uppercase tracking-[0.14em] text-faint">
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                project.status === "ongoing" ? "bg-amber-400" : "bg-emerald-400",
              )}
            />
            {project.statusLabel}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-line pt-5">
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent2">
                {open ? "Hide case study" : "Read case study"}
              </span>
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-all duration-400",
                  open && "rotate-180 border-accent2/50 text-accent2",
                )}
              >
                <ChevronDown size={15} strokeWidth={1.9} />
              </span>
            </button>
          </div>
        </div>

        {/* Expandable case study */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-5 border-t border-line bg-elevated/60 p-6 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  {CASE_STUDY_BLOCKS.map((block) => (
                    <div
                      key={block.key}
                      className="rounded-xl border border-line bg-surface p-5"
                    >
                      <div className="mb-3 flex items-center gap-2.5">
                        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-gradient-soft text-accent2">
                          <block.icon size={13} strokeWidth={1.9} />
                        </span>
                        <h4 className="font-mono text-[0.63rem] uppercase tracking-[0.18em] text-accent2">
                          {block.label}
                        </h4>
                      </div>
                      <p className="text-[0.845rem] leading-relaxed text-muted">
                        {project.caseStudy[block.key]}
                      </p>
                    </div>
                  ))}
                </div>

                <DeliveryList project={project} />

                <ArchitectureChain steps={project.architecture} />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                    Built with
                  </span>
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[0.66rem] tracking-tight text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? projects
        : projects.filter((project) =>
            (project.tags as string[]).includes(activeTag),
          ),
    [activeTag],
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="03 — Featured Projects"
          title={
            <>
              Two enterprise programmes,{" "}
              <span className="text-gradient">told as case studies</span>.
            </>
          }
          description="Business challenge, architecture, technical implementation, technologies and outcomes — with completed and in-progress functionality called out separately. No invented metrics, just the work."
        />

        {/* Filter */}
        <Reveal>
          <div
            role="group"
            aria-label="Filter projects by SAP technology"
            className="mb-10 flex flex-wrap items-center gap-2.5"
          >
            <span className="mr-1 inline-flex items-center gap-2 font-mono text-[0.63rem] uppercase tracking-[0.18em] text-faint">
              <Filter size={12} strokeWidth={1.9} />
              Filter
            </span>

            {["All", ...projectTags].map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setActiveTag(tag);
                    setOpenId(null);
                  }}
                  aria-pressed={isActive}
                  className={cn(
                    "relative rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-all duration-300",
                    isActive
                      ? "border-transparent text-white"
                      : "border-line bg-surface text-muted hover:border-accent2/45 hover:text-accent2",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent-gradient"
                      transition={{ type: "spring", stiffness: 400, damping: 36 }}
                    />
                  )}
                  {tag}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.ul layout className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex"
              >
                <div className="flex w-full">
                  <ProjectCard
                    project={project}
                    open={openId === project.id}
                    onToggle={() =>
                      setOpenId((current) =>
                        current === project.id ? null : project.id,
                      )
                    }
                  />
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-line bg-surface p-10 text-center text-muted">
            No projects match that technology yet.
          </p>
        )}
      </div>
    </section>
  );
}
