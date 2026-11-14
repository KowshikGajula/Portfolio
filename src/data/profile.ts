/**
 * ============================================================================
 *  PERSONAL PROFILE  —  EDIT EVERYTHING IN THIS FILE
 * ============================================================================
 *  Anything wrapped in « … » is a placeholder. Replace it with your real
 *  detail before publishing. Nothing here is invented on your behalf.
 * ============================================================================
 */

export const profile = {
  name: "Kowshik Gajula",
  firstName: "Kowshik",
  lastName: "Gajula",
  title: "SAP ABAP Consultant",
  location: "India",
  availability: {
    label: "Open to SAP technical consulting & opportunities",
    tone: "available" as "available" | "busy" | "open",
  },

  summary:
    "SAP ABAP Consultant specialising in SAP ECC and SAP S/4HANA technical development — custom enhancements, integrations, automation, reporting and enterprise application development.",

  intro: [
    "I build and maintain the technical layer that keeps enterprise SAP landscapes running: custom ABAP developments, enhancement-framework work, interface integrations and the automation that removes manual effort from plant maintenance and production processes.",
    "My work sits close to the business — turning functional requirements into stable, supportable ABAP, debugging production issues under pressure, and making sure what ships can be maintained long after I have moved on.",
  ],

  /* ------------------------------------------------------------------ */
  /*  EDIT: real contact details go here                                */
  /* ------------------------------------------------------------------ */
  contact: {
    email: "your.email@example.com", // « replace with your address »
    linkedin: "https://www.linkedin.com/in/your-linkedin-handle", // « replace »
    github: "https://github.com/KowshikGajula",
    resume: "/resume.pdf",
    /**
     * Optional: a form backend endpoint (Formspree, Web3Forms, your own API).
     * Leave empty and the form falls back to opening the visitor's mail client
     * with the message pre-filled — no backend required.
     */
    formEndpoint: "", // « e.g. https://formspree.io/f/xxxxxxx »
  },

  social: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/your-linkedin-handle", // « replace »
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/KowshikGajula",
      external: true,
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:your.email@example.com", // « replace »
      external: false,
    },
  ],

  /* Terminal window shown in the hero — SAP-flavoured, purely decorative. */
  terminal: {
    title: "kowshik@sap-epoch — abap-workbench",
    prompt: "SE38",
    lines: [
      { type: "cmd" as const, text: "SYSTEM  SAP-ECC  ·  client 100  ·  transport DEV-K900123" },
      { type: "cmd" as const, text: "STATUS  connected · mode DEVELOPER · author KOWSHIK.GAJULA" },
      { type: "info" as const, text: "▸ ZR_PM_ORDER_AUTO      ACTIVE   PM order automation" },
      { type: "info" as const, text: "▸ ZCL_GMAO_INTERFACE   ACTIVE   AL11 → BAPI bridge" },
      { type: "info" as const, text: "▸ Z_SMARTFORM_LABEL    ACTIVE   ZPL label output" },
      { type: "ok" as const, text: "▸ syntax check ......... 0 errors, 0 warnings" },
      { type: "ok" as const, text: "▸ transport released .... ready for QA" },
      { type: "cmd" as const, text: "WAITING FOR INPUT ..." },
    ],
  },

  stats: [
    { value: "ECC + S/4HANA", label: "Landscape focus" },
    { value: "End-to-end", label: "Design → transport" },
    { value: "Production", label: "Support mindset" },
  ],
} as const;

export type Profile = typeof profile;
