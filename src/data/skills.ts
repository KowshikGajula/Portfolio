/**
 * TECHNICAL EXPERTISE — grouped exactly as requested.
 * No proficiency percentages are used anywhere: each skill is presented as a
 * capability you have worked with, not a fabricated score.
 */

export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  icon: "code" | "layers" | "file" | "network" | "database" | "wrench";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "core-abap",
    title: "Core ABAP",
    blurb: "The foundation — data modelling, reporting and modularised program design.",
    icon: "code",
    skills: [
      "Classical Reports",
      "Interactive Reports",
      "Internal Tables",
      "Open SQL",
      "Data Dictionary",
      "Modularization",
      "ALV",
    ],
  },
  {
    id: "enhancements",
    title: "Enhancements",
    blurb: "Extending standard SAP without touching core code — the right way.",
    icon: "layers",
    skills: [
      "BAdIs",
      "User Exits",
      "Enhancement Framework",
      "BAPIs",
      "BADIs",
      "RFC",
    ],
  },
  {
    id: "forms",
    title: "SAP Forms",
    blurb: "Document output that matches the business document it represents.",
    icon: "file",
    skills: ["Smart Forms", "SAPscript", "Adobe Forms", "Print Programs"],
  },
  {
    id: "integration",
    title: "SAP Integration",
    blurb: "Moving data in and out of SAP reliably, with logging and recovery.",
    icon: "network",
    skills: ["IDocs", "Proxies", "RFC", "OData", "REST APIs", "XML"],
  },
  {
    id: "technologies",
    title: "SAP Technologies",
    blurb: "Working across ECC today and the S/4HANA road ahead.",
    icon: "database",
    skills: [
      "SAP ECC",
      "SAP S/4HANA",
      "ABAP on HANA",
      "CDS Views",
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    blurb: "The workbench, the debugger and the analysis tools behind every fix.",
    icon: "wrench",
    skills: [
      "SE11",
      "SE38",
      "SE37",
      "SE80",
      "SE24",
      "SE18",
      "SE19",
      "ST22",
      "SAT",
      "ADT",
      "Eclipse",
    ],
  },
];

/** Flat list used by the marquee strip. */
export const allSkills: string[] = skillCategories.flatMap((c) => c.skills);
