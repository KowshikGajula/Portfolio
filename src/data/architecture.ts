/**
 * INTERACTIVE SAP INTEGRATION ARCHITECTURE
 * The canonical flow: External System → AL11 → ABAP → BAPI → SAP PM →
 * Response File → External System.
 * Each node is clickable and expands into a technical detail panel.
 */

export interface ArchNode {
  id: string;
  step: string;
  label: string;
  system: "external" | "interface" | "abap" | "sap";
  icon: "globe" | "file" | "code" | "database" | "arrow";
  detail: string;
  tech: string[];
}

export const architectureFlow: ArchNode[] = [
  {
    id: "external",
    step: "01",
    label: "External System",
    system: "external",
    icon: "globe",
    detail:
      "The GMAO / Sphere maintenance platform raises a request. It has no direct connection to SAP — it simply writes what it needs into a file.",
    tech: ["GMAO", "Sphere", "Flat file"],
  },
  {
    id: "al11",
    step: "02",
    label: "AL11 File",
    system: "interface",
    icon: "file",
    detail:
      "The request lands in an AL11 directory on the application server. The directory path and file naming convention define the interface contract between the two systems.",
    tech: ["AL11", "Application server", "File I/O"],
  },
  {
    id: "program",
    step: "03",
    label: "ABAP Program",
    system: "abap",
    icon: "code",
    detail:
      "A scheduled ABAP program opens the file, parses each record, validates it, and resolves it against SAP master data. This is where bad input is rejected early instead of creating a bad order.",
    tech: ["ABAP", "Open SQL", "Validation", "Scheduling"],
  },
  {
    id: "bapi",
    step: "04",
    label: "BAPI",
    system: "abap",
    icon: "code",
    detail:
      "The validated payload is passed to BAPI_ALM_ORDER_MAINTAIN inside a BAPI transaction control loop — commit on success, rollback on failure, with returned messages collected rather than discarded.",
    tech: ["BAPI_ALM_ORDER_MAINTAIN", "Transaction control", "Message handling"],
  },
  {
    id: "order",
    step: "05",
    label: "SAP PM Order",
    system: "sap",
    icon: "database",
    detail:
      "The maintenance order is created with the equipment and functional location already assigned, so it is usable the moment it appears — not a shell someone has to complete.",
    tech: ["SAP PM", "Equipment", "Functional location"],
  },
  {
    id: "response",
    step: "06",
    label: "Response File",
    system: "interface",
    icon: "file",
    detail:
      "Success or failure is written back to an AL11 response file. A successful record carries the SAP order number; a failed record carries the reason. Nothing is silently dropped.",
    tech: ["AL11", "Order number", "Error reason"],
  },
  {
    id: "confirm",
    step: "07",
    label: "External System",
    system: "external",
    icon: "globe",
    detail:
      "The source system reads the response file and closes the loop, so both sides agree on what was created — and what was not, and why.",
    tech: ["Reconciliation", "Confirmation"],
  },
];
