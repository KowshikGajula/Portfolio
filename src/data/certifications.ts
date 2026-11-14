/**
 * CERTIFICATIONS
 * Add or remove cards freely — the grid reflows automatically.
 * `verifyUrl` may be left as an empty string to hide the verification link.
 */

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerNote?: string;
  credentialId?: string;
  verifyUrl?: string;
  icon: "award" | "badge" | "certificate";
  highlights: string[];
}

export const certifications: Certification[] = [
  {
    id: "joule-certified-developer",
    title: "Joule Certified Developer",
    issuer: "SAP",
    issuerNote: "SAP's AI copilot development certification",
    credentialId: "", // « add your credential ID »
    verifyUrl: "", // « add verification URL »
    icon: "certificate",
    highlights: [
      "Joule prompt & skill development",
      "SAP Business AI assistant extensibility",
      "Grounding responses in SAP data",
    ],
  },
  {
    id: "abap-backend-developer",
    title: "ABAP Backend Developer",
    issuer: "SAP",
    issuerNote: "Backend development on the SAP platform",
    credentialId: "", // « add your credential ID »
    verifyUrl: "", // « add verification URL »
    icon: "badge",
    highlights: [
      "ABAP language & runtime",
      "Data Dictionary & Open SQL",
      "Debugging, performance & transport management",
    ],
  },
];
