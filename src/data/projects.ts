/**
 * FEATURED PROJECTS — expandable case studies.
 * ============================================================================
 *  `outcome` deliberately contains no invented percentages or business
 *  results. Describe what was built and how it behaves; leave numeric claims
 *  out unless you can substantiate them.
 *  `architecture` is the ordered step chain rendered as a mini diagram.
 * ============================================================================
 */

export type ProjectTag =
  | "ABAP"
  | "SAP PM"
  | "Smart Forms"
  | "BAPI"
  | "AL11"
  | "Integration"
  | "ALV"
  | "Diagnostics"
  | "S/4HANA"
  | "Automation";

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: ProjectTag[];
  featured: boolean;
  accent: "blue" | "cyan" | "indigo";
  problem: string;
  caseStudy: {
    challenge: string;
    approach: string;
    implementation: string;
    outcome: string;
  };
  architecture: { step: string; detail: string }[];
  stack: string[];
}

export const projects: Project[] = [
  {
    id: "sphere-gmao-pm",
    index: "01",
    title: "Sphere / GMAO to SAP PM Integration",
    subtitle: "File-based integration that creates SAP maintenance orders automatically",
    summary:
      "An automated pipeline that reads maintenance requests from an external GMAO/Sphere system and turns them into SAP PM work orders — with a response file telling the source system exactly what happened.",
    tags: ["Integration", "SAP PM", "BAPI", "AL11", "ABAP", "Automation"],
    featured: true,
    accent: "blue",
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
        "Maintenance requests now flow from the external system into SAP PM without manual re-keying, and each created order carries its originating request. Failures are explicit and recoverable: a rejected record is reported in the response file rather than silently dropped, which makes support a matter of reading a file instead of reconstructing events.",
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

  {
    id: "pm-order-automation",
    index: "02",
    title: "SAP PM Order Automation",
    subtitle: "Automated order creation with master-data derivation and business rules",
    summary:
      "Automates PM order creation and the master data derivation around it — validating equipment and functional locations, mapping personnel numbers, and applying business rules before anything is written.",
    tags: ["SAP PM", "BAPI", "ABAP", "Automation"],
    featured: true,
    accent: "cyan",
    problem:
      "Order creation depended on the person entering it knowing which equipment, location and personnel number belonged together. Different users produced different results for the same request.",
    caseStudy: {
      challenge:
        "Deriving the correct master data consistently — and refusing to create an order when the input is wrong rather than creating a bad one that someone has to clean up later.",
      approach:
        "Move derivation and validation ahead of creation: check the equipment and functional location exist and are valid, map the personnel number through defined business rules, and only then call the BAPI with a complete, verified payload.",
      implementation:
        "Implemented pre-creation validation covering equipment and functional location existence and consistency, with clear per-record error reporting. Personnel number mapping and the associated business rules are applied in one place so the logic is auditable rather than scattered. The BAPI call is wrapped in transaction control with explicit rollback on failure, and all messages are collected into a result structure instead of being raised as short dumps.",
      outcome:
        "Order creation is deterministic: the same input produces the same order, and invalid input is rejected with a specific reason before it reaches the database. Support effort shifts from correcting bad orders to reading a validation message.",
    },
    architecture: [
      { step: "Input", detail: "Request payload received by the program" },
      { step: "Validation", detail: "Equipment & functional location checked against master data" },
      { step: "Business Rules", detail: "Personnel number mapping and rule handling applied" },
      { step: "BAPI", detail: "Validated payload passed to the maintenance BAPI" },
      { step: "SAP PM Order", detail: "Order created, or rolled back with a message" },
      { step: "Result Log", detail: "Outcome recorded for reporting and support" },
    ],
    stack: ["ABAP", "BAPI", "SAP PM", "Master data validation", "Transaction control"],
  },

  {
    id: "production-label-printing",
    index: "03",
    title: "SAP Production Order Label Printing",
    subtitle: "Smart Forms output driving Zebra ZPL label printers on the shop floor",
    summary:
      "Custom Smart Forms and driver programs that extract production order data and print accurate warehouse labels — material, batch, quantity and shelf life — straight to Zebra printers via ZPL.",
    tags: ["Smart Forms", "ABAP", "SAP PM", "Automation"],
    featured: false,
    accent: "indigo",
    problem:
      "Labels had to be generated from production order data at the point of use, with batch and shelf-life details that are only correct if read live from SAP.",
    caseStudy: {
      challenge:
        "Print output on a shop floor is unforgiving: the wrong batch or an expired shelf-life date on a label is a material problem, not a cosmetic one. The form also had to reach Zebra printers that consume ZPL, not PostScript.",
      approach:
        "Extract the label data in a driver program, render it through a purpose-built Smart Form, and hand it to a print routine that emits ZPL for the target printer.",
      implementation:
        "Wrote driver programs that read production order header and item data together with material, batch, quantity and shelf-life information. Designed the Smart Forms layout around the physical label rather than a document page, keeping the print logic out of the data extraction. Output is routed to Zebra devices through ZPL, with the form and driver kept separate so a label design change does not require touching the data logic.",
      outcome:
        "Labels are produced directly from live SAP production order data, with batch and shelf-life values taken from the source rather than transcribed. Because the driver and the form are independent, layout changes can be made without reworking the extraction.",
    },
    architecture: [
      { step: "Production Order", detail: "Order selected for label output" },
      { step: "Driver Program", detail: "Material, batch, quantity & shelf life extracted" },
      { step: "Smart Form", detail: "Label layout rendered from structured data" },
      { step: "ZPL Output", detail: "Form output converted for Zebra printer" },
      { step: "Zebra Printer", detail: "Physical label printed on the shop floor" },
    ],
    stack: ["Smart Forms", "ABAP", "Print programs", "ZPL", "Zebra", "Production orders"],
  },

  {
    id: "quality-coa",
    index: "04",
    title: "SAP Quality Certificate of Analysis (COA)",
    subtitle: "Dynamic certificate output built on Smart Forms",
    summary:
      "A Smart Forms based Certificate of Analysis that pulls inspection characteristics, their short texts, and material and plant master data into a clean, printable quality document.",
    tags: ["Smart Forms", "ABAP", "ALV", "S/4HANA"],
    featured: false,
    accent: "blue",
    problem:
      "A COA must show the inspection results and exactly what each characteristic means — which means characteristic short texts have to be resolved, not assumed.",
    caseStudy: {
      challenge:
      "Inspection characteristics are stored separately from their descriptive short text, and the number of characteristics varies per material and batch. A static form would either omit rows or print empty space.",
      approach:
        "Build the form dynamically: collect the inspection characteristics for the batch, resolve each short text, merge in material and plant master data, and let the print layout adapt to the number of rows actually returned.",
      implementation:
        "Implemented retrieval of inspection characteristics together with their characteristic short texts, joined with material and plant master data so the certificate is self-contained. Used dynamic internal table handling in the driver so the form receives only the rows that exist, and structured the Smart Form with a table that grows and shrinks with the data. Print layout was tuned so the document stays legible whether it carries a handful of characteristics or many.",
      outcome:
        "Certificates are generated from the actual inspection data for the batch, with characteristic names resolved rather than left as technical identifiers, and the layout adapts to the data instead of fighting it.",
    },
    architecture: [
      { step: "Inspection Lot", detail: "Batch and inspection results selected" },
      { step: "Characteristics", detail: "Inspection characteristics retrieved" },
      { step: "Short Texts", detail: "Characteristic descriptions resolved" },
      { step: "Master Data", detail: "Material and plant data merged in" },
      { step: "Smart Form", detail: "Dynamic print layout rendered" },
      { step: "COA Output", detail: "Certificate printed / archived" },
    ],
    stack: ["Smart Forms", "ABAP", "Quality management", "Dynamic tables", "Material master"],
  },

  {
    id: "bom-cs15-investigation",
    index: "05",
    title: "SAP BOM / CS15 Investigation",
    subtitle: "Debugging a multi-level BOM explosion that would not terminate",
    summary:
        "A diagnostic investigation into multi-level BOM processing: tracing a circular BOM reference, isolating the recursion, and resolving the runtime behaviour behind it.",
    tags: ["Diagnostics", "ABAP", "ALV"],
    featured: false,
    accent: "cyan",
    problem:
      "A multi-level BOM explosion was behaving incorrectly on certain structures. The symptom appeared far from the cause, and the failure mode pointed at recursion rather than bad data entry.",
    caseStudy: {
      challenge:
        "The problem was not yet understood — only that a multi-level BOM traversal misbehaved on some structures and failed at runtime on others. Guessing at a fix would have risked masking the real cause.",
      approach:
        "Treat it as an investigation: reproduce it, observe it with the debugger and runtime analysis, identify whether a structure could reference itself, and only then decide on a fix.",
      implementation:
        "Traced the explosion path with the debugger and used runtime analysis (SAT) to locate where time and memory were being consumed. Examined the BOM structure itself for a circular reference — a component whose explosion leads back to its own header — and confirmed the recursion. Separately traced an arithmetic overflow raised while accumulating quantity values, and corrected the handling so accumulation could not overflow the field.",
      outcome:
        "The behaviour was explained rather than papered over: a circular BOM structure was identified as the cause of the non-terminating explosion, and the arithmetic overflow in quantity accumulation was corrected. The investigation left behind a repeatable way to recognise the same class of problem.",
    },
    architecture: [
      { step: "Reproduce", detail: "Reproduce the reported BOM behaviour" },
      { step: "Debugger", detail: "Trace the explosion path step by step" },
      { step: "Runtime Analysis", detail: "SAT profile to find where time is spent" },
      { step: "Structure Check", detail: "Inspect BOM for circular references" },
      { step: "Root Cause", detail: "Circular BOM + arithmetic overflow identified" },
      { step: "Correction", detail: "Recursion guarded, quantity handling fixed" },
    ],
    stack: ["ABAP Debugger", "SAT Runtime Analysis", "CS15", "BOM processing", "ST22"],
  },
];

/** Filter facets derived from the tags actually present. */
export const projectTags: string[] = Array.from(
  new Set(projects.flatMap((p) => p.tags)),
).sort();
