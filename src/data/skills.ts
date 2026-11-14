/**
 * TECHNICAL EXPERTISE — five categories, exactly as briefed.
 * No proficiency percentages are used anywhere: each skill is presented as a
 * capability used in real development work, not a fabricated score.
 */

export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  icon: "code" | "layers" | "network" | "database" | "wrench";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "core-abap",
    title: "Core ABAP",
    blurb: "The foundation — reporting, data modelling and object-oriented design.",
    icon: "code",
    skills: [
      "Reports",
      "ALV",
      "Internal Tables",
      "Open SQL",
      "Data Dictionary",
      "OO ABAP",
    ],
  },
  {
    id: "enhancements",
    title: "Enhancements",
    blurb: "Extending standard SAP without touching core code — the right way.",
    icon: "layers",
    skills: ["BAdIs", "User Exits", "BAPIs", "Enhancement Framework"],
  },
  {
    id: "integration",
    title: "Integration",
    blurb: "Moving data in and out of SAP reliably, with logging and recovery.",
    icon: "network",
    skills: ["RFC", "IDocs", "Proxies", "OData", "REST APIs", "XML"],
  },
  {
    id: "platforms",
    title: "SAP Platforms",
    blurb: "Working across ECC today and the S/4HANA road ahead.",
    icon: "database",
    skills: ["ECC", "S/4HANA", "ABAP on HANA", "CDS Views"],
  },
  {
    id: "tools",
    title: "Tools",
    blurb: "The workbench, the debugger and the analysis tools behind every fix.",
    icon: "wrench",
    skills: [
      "SE11",
      "SE37",
      "SE38",
      "SE80",
      "SE18",
      "SE19",
      "ST22",
      "SAT",
      "Eclipse ADT",
    ],
  },
];

/** Flat list used by the marquee strip. */
export const allSkills: string[] = skillCategories.flatMap((c) => c.skills);
