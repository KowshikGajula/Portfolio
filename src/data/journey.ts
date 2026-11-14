/**
 * PROFESSIONAL EXPERIENCE — TIMELINE
 * ============================================================================
 *  ONE ENTRY IS REAL: the current SAP ABAP Consultant role — Careator
 *  Technologies, working with client Brillio.
 *
 *  Do NOT add employment duration or achievement metrics you cannot back up.
 *  Add earlier roles below by copying an entry and setting `current` off the
 *  previous one.
 *
 *  `current: true` renders the "now" marker on the newest entry.
 * ============================================================================
 */

export interface JourneyEntry {
  id: string;
  period: string; // « e.g. 2023 — Present »
  role: string;
  employer: string; // « replace with your employer »
  client?: string; // on-site client, shown as a badge when set
  location: string;
  summary: string;
  highlights: string[];
  current?: boolean;
}

export const journey: JourneyEntry[] = [
  {
    id: "entry-1",
    period: "May 2026 — Present",
    role: "SAP ABAP Consultant",
    employer: "Careator Technologies",
    client: "Brillio",
    location: "India",
    current: true,
    summary:
      "Currently working as an SAP ABAP Consultant — delivering custom development, integrations and automation on enterprise SAP landscapes, and supporting them once they are live.",
    highlights: [
      "Built the SAP User Onboarding Automation process: SU01 provisioning, role assignment, approval routing and Service Desk integration.",
      "Delivered the Sphere / GMAO to SAP PM integration — AL11 file processing, BAPI_ALM_ORDER_MAINTAIN order creation and response-file generation.",
      "Developed and maintained custom ABAP developments across reporting, ALV and object-oriented code.",
      "Applied enhancement-framework techniques — BAdIs, user exits and BAPIs — to extend standard processes without modifying core code.",
      "Handled production support: debugging, root-cause analysis and corrective development, with transports released through the standard change process.",
    ],
  },
];

/**
 * Capability areas shown alongside the timeline. These describe the work, not
 * a duration — no experience length is claimed anywhere on the site.
 */
export const focusAreas: { title: string; detail: string }[] = [
  {
    title: "Enterprise Development",
    detail:
      "Custom ABAP — reports, ALV output, internal tables, Open SQL and object-oriented design against ECC and S/4HANA data models.",
  },
  {
    title: "SAP Integrations",
    detail:
      "RFC, BAPIs, IDocs, OData and file-based interfaces that connect SAP to the systems around it, with logging on both sides.",
  },
  {
    title: "Process Automation",
    detail:
      "Replacing manual, repetitive steps with scheduled ABAP programs — from user provisioning to maintenance-order creation.",
  },
  {
    title: "Production Support",
    detail:
      "Debugging, runtime analysis and root-cause correction on live systems, leaving behind code the next developer can maintain.",
  },
];
