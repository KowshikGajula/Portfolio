/**
 * FEATURED ENTERPRISE PROJECTS — expandable case studies.
 * ============================================================================
 *  Exactly two projects, per the brief.
 *
 *  `status` marks what is shipped and what is still being built, so the case
 *  study never claims completion for work that is in progress.
 *
 *  `outcome` deliberately contains no invented percentages or business
 *  results. Describe what was built and how it behaves; leave numeric claims
 *  out unless you can substantiate them.
 *
 *  `architecture` is the ordered step chain rendered as a mini diagram.
 * ============================================================================
 */

export type ProjectTag =
  | "ABAP"
  | "SAP PM"
  | "SU01"
  | "CUA"
  | "RFC"
  | "BAPI"
  | "AL11"
  | "Workflow"
  | "Integration"
  | "Automation"
  | "Service Desk"
  | "Role Management";

/** Delivery state of the project as a whole. */
export type ProjectStatus = "completed" | "ongoing";

export interface CaseSection {
  title: string;
  body: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: ProjectTag[];
  featured: boolean;
  accent: "blue" | "cyan" | "indigo";
  status: ProjectStatus;
  statusLabel: string;
  problem: string;
  caseStudy: {
    challenge: string;
    approach: string;
    implementation: string;
    outcome: string;
  };
  /** Functionality that is live today vs. still being built out. */
  delivery: {
    completed: string[];
    ongoing: string[];
  };
  architecture: { step: string; detail: string }[];
  stack: string[];
}

export const projects: Project[] = [
  {
    id: "archroma-user-onboarding",
    index: "01",
    title: "SAP User Onboarding Automation — Archroma",
    subtitle: "End-to-end SU01 provisioning with approval routing and system selection",
    summary:
      "An automated user provisioning process that takes an onboarding request through approval, then creates the user, assigns roles and records the outcome in SAP — across CUA and standalone systems.",
    tags: ["ABAP", "SU01", "CUA", "Workflow", "Service Desk", "Role Management", "Automation"],
    featured: true,
    accent: "blue",
    status: "ongoing",
    statusLabel: "Ongoing — core flow live, extensions in progress",
    problem:
      "Provisioning a new user meant a chain of manual steps: deciding which system the user belongs to, creating the account in SU01, assigning the right roles, and keeping a record of who asked for what. Handled manually, that chain is slow to execute and hard to audit.",
    caseStudy: {
      challenge:
        "A single onboarding request has to reach different SAP systems depending on the user's scope — a central user in CUA versus a user that only exists in a standalone system — and it must arrive with the correct roles already assigned. The request itself comes through a Service Desk ticket, so the approval trail and the technical execution have to agree with each other.",
      approach:
        "Model the flow as a request, an approval, and an execution step. The Service Desk ticket carries the request and its approval status; once approved, an ABAP process reads the request, decides the target system, creates the user in SU01, assigns the requested roles, and writes a status back so the ticket always reflects reality.",
      implementation:
        "Built the provisioning logic around SU01 function-module calls: user creation, parameter maintenance and role assignment executed programmatically rather than by hand. Added routing that distinguishes CUA-managed users from standalone-system users, so the same request can be directed to the right destination. Role assignment is driven by the request data rather than typed in at the time of execution. Validation runs before anything is written — the request is checked for completeness and for target-system suitability, and every attempt is logged with its result so a failed run is visible instead of silent. Status and logging records are maintained against the request, giving the Service Desk side a reliable point of truth.",
      outcome:
        "Provisioning is driven from a single approved request instead of a sequence of manual steps, and every attempt leaves a log behind. When a request fails validation it is reported with a reason before it reaches the user master, and the originating ticket carries the current status of the run.",
    },
    delivery: {
      completed: [
        "SU01-based user creation and parameter maintenance driven from request data",
        "Role assignment executed programmatically as part of the provisioning run",
        "Validation ahead of execution, with per-run logging of the result",
        "Routing between CUA-managed and standalone SAP systems",
        "Status written back against the originating Service Desk request",
      ],
      ongoing: [
        "Further approval-workflow coverage across additional request types",
        "Extended Service Desk integration and status handling",
        "Additional validation and reporting around provisioning runs",
      ],
    },
    architecture: [
      { step: "Service Desk", detail: "Onboarding request raised and approved" },
      { step: "Request Data", detail: "User details, scope and requested roles" },
      { step: "Validation", detail: "Request checked before anything is written" },
      { step: "System Routing", detail: "CUA or standalone target system selected" },
      { step: "SU01", detail: "User created and parameters maintained" },
      { step: "Role Assignment", detail: "Requested roles assigned to the new user" },
      { step: "Logging", detail: "Run result and status recorded" },
      { step: "Status Feedback", detail: "Outcome written back to the request" },
    ],
    stack: ["ABAP", "SU01", "CUA", "RFC", "Service Desk", "Role assignment", "Validation & logging"],
  },

  {
    id: "sphere-gmao-pm",
    index: "02",
    title: "Sphere / GMAO — SAP PM Integration",
    subtitle: "File-based integration that creates SAP maintenance orders automatically",
    summary:
      "An automated pipeline that reads maintenance requests from an external GMAO/Sphere system and turns them into SAP PM work orders — with a response file telling the source system exactly what happened.",
    tags: ["Integration", "SAP PM", "BAPI", "AL11", "ABAP", "Automation", "RFC"],
    featured: true,
    accent: "cyan",
    status: "ongoing",
    statusLabel: "Ongoing — order creation live, mapping refinements in progress",
    problem:
      "Maintenance requests were raised in an external GMAO system, then re-keyed into SAP by hand. Re-keying was slow, error-prone, and nobody could see, inside SAP, which external request had produced which order.",
    caseStudy: {
      challenge:
        "Two systems had to agree without a user in the middle. The external system produced flat files on a schedule; SAP had to consume them, create the correct PM order every time, and report back precisely — including when a request was rejected, and why.",
      approach:
        "Design a scheduled ABAP program that reads inbound files from an AL11 directory, validates and maps each record against SAP master data, creates the order through a BAPI, and always writes a response file — success or failure — for the external system to pick up.",
      implementation:
        "Built the file reader and writer against AL11 directories with explicit open/read/close handling. Each record is mapped to equipment and functional location before the BAPI call, so the order is created with the right object assignments rather than defaults. Order creation runs through BAPI_ALM_ORDER_MAINTAIN inside a BAPI transaction control loop, with BAPI_TRANSACTION_COMMIT only on success. Every record produces a structured response line carrying the SAP order number or the failure reason, so the integration is diagnosable from either side.",
      outcome:
        "Maintenance requests flow from the external system into SAP PM without manual re-keying, and each created order carries its originating request. Failures are explicit and recoverable: a rejected record is reported in the response file rather than silently dropped, which makes support a matter of reading a file instead of reconstructing events.",
    },
    delivery: {
      completed: [
        "AL11 inbound file processing with structured read and error handling",
        "Equipment and functional location mapping against SAP master data",
        "PM order creation through BAPI_ALM_ORDER_MAINTAIN with transaction control",
        "Response-file generation carrying the order number or the failure reason",
      ],
      ongoing: [
        "Extended mapping coverage for additional equipment and location scenarios",
        "Further error classification and reporting in the response file",
        "Scheduling and monitoring refinements around the interface run",
      ],
    },
    architecture: [
      { step: "External System", detail: "GMAO / Sphere raises a maintenance request" },
      { step: "AL11 File", detail: "Request written to an inbound interface directory" },
      { step: "ABAP Program", detail: "Scheduled read, parse and validation of each record" },
      { step: "Mapping", detail: "Equipment & functional location resolved against master data" },
      { step: "BAPI", detail: "BAPI_ALM_ORDER_MAINTAIN creates the PM order" },
      { step: "SAP PM Order", detail: "Order number returned to the interface layer" },
      { step: "Response File", detail: "Order number or error reason written back to AL11" },
      { step: "External System", detail: "Source system confirms the outcome" },
    ],
    stack: ["ABAP", "AL11", "BAPI_ALM_ORDER_MAINTAIN", "SAP PM", "File I/O", "Error logging"],
  },
];

/** Filter facets derived from the tags actually present. */
export const projectTags: string[] = Array.from(
  new Set(projects.flatMap((p) => p.tags)),
).sort();
