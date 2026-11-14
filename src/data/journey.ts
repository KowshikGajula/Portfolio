/**
 * PROFESSIONAL JOURNEY — TIMELINE
 * ============================================================================
 *  employer / period / role are EDITABLE PLACEHOLDERS.
 *  Replace them with your real history; do not publish the placeholders.
 *  `current: true` renders the "now" marker on the newest entry.
 * ============================================================================
 */

export interface JourneyEntry {
  id: string;
  period: string; // « e.g. 2023 — Present »
  role: string;
  employer: string; // « replace with your employer »
  location: string;
  summary: string;
  highlights: string[];
  current?: boolean;
}

export const journey: JourneyEntry[] = [
  {
    id: "entry-1",
    period: "« 2023 — Present »", // « EDIT
    role: "SAP ABAP Consultant",
    employer: "« Your Company »", // « EDIT — company name is intentionally a placeholder
    location: "India",
    current: true,
    summary:
      "Delivering custom ABAP developments, enhancements and integrations across SAP ECC and S/4HANA, working closely with functional teams and supporting production systems.",
    highlights: [
      "Built file-based integration programs feeding SAP PM work orders from an external maintenance system.",
      "Developed and maintained Smart Forms output for production labels and quality documentation.",
      "Applied enhancement-framework techniques to extend standard processes without modifying core code.",
      "Handled production support — debugging, root-cause analysis and corrective development.",
      "Worked with transports, code reviews and object activation through the standard change process.",
    ],
  },
  {
    id: "entry-2",
    period: "« 2021 — 2023 »", // « EDIT
    role: "« ABAP Developer »", // « EDIT
    employer: "« Your Previous Company »", // « EDIT
    location: "India",
    summary:
      "Grew from core ABAP development into integration and output design, taking ownership of assigned objects end to end.",
    highlights: [
      "Authored classical and ALV reports against ECC data models.",
      "Implemented BAPI and RFC based interfaces with structured error handling.",
      "Designed print programs and form layouts for business documents.",
      "Used the debugger, ST22 and SAT to trace and resolve runtime issues.",
    ],
  },
  {
    id: "entry-3",
    period: "« 2020 — 2021 »", // « EDIT
    role: "« ABAP Trainee / Junior Developer »", // « EDIT
    employer: "« Your First Company »", // « EDIT
    location: "India",
    summary:
      "Learning the SAP platform — the workbench, the data dictionary and how an ABAP change travels from development to production.",
    highlights: [
      "Learned SE11 / SE38 / SE37 / SE80 and the standard development workflow.",
      "Wrote and corrected simple reports under supervision.",
      "Built understanding of transports, requests and client concepts.",
    ],
  },
];
