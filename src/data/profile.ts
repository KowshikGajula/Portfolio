/**
 * ============================================================================
 *  PERSONAL PROFILE  —  EDIT EVERYTHING IN THIS FILE
 * ============================================================================
 *  Contact details below are your real, published values. Anything wrapped in
 *  « … » is a placeholder you still need to fill in (see journey.ts).
 * ============================================================================
 */

export const profile = {
  name: "Kowshik Gajula",
  firstName: "Kowshik",
  lastName: "Gajula",
  title: "SAP ABAP Consultant",
  location: "India",

  availability: {
    label: "Currently working as an SAP ABAP Consultant",
    tone: "available" as "available" | "busy" | "open",
  },

  /* ------------------------------------------------------------------ */
  /*  HERO — headline is split so the gradient can land on line two     */
  /* ------------------------------------------------------------------ */
  headline: {
    line1: "Engineering Enterprise Solutions",
    line2: "with SAP ABAP.",
  },

  tagline:
    "Building scalable SAP solutions through enterprise automation, intelligent integrations, and custom ABAP development.",

  summary:
    "SAP ABAP Consultant working on enterprise SAP landscapes — custom development, integrations, automation and production support across ECC and S/4HANA.",

  intro: [
    "I work as an SAP ABAP Consultant on enterprise landscapes: designing and delivering custom developments, interface integrations and the automation that removes manual effort from core business processes.",
    "Day to day that means turning a functional requirement into stable, supportable ABAP, integrating SAP with the systems around it, debugging production issues down to root cause, and leaving behind code the next developer can maintain.",
  ],

  /* ------------------------------------------------------------------ */
  /*  Contact — real, published values                                  */
  /* ------------------------------------------------------------------ */
  contact: {
    email: "kowshikgajula1@gmail.com",
    linkedin: "https://www.linkedin.com/in/kowshik-gajula-a25955253/",
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
      href: "https://www.linkedin.com/in/kowshik-gajula-a25955253/",
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
      href: "mailto:kowshikgajula1@gmail.com",
      external: false,
    },
  ],

  /**
   * Terminal window shown in the hero. Deliberately generic: it mirrors the
   * ABAP Workbench flow rather than naming transports or programs that would
   * have to be invented.
   */
  terminal: {
    title: "kowshik@sap-epoch — abap-workbench",
    prompt: "SE38",
    lines: [
      { type: "cmd" as const, text: "SYSTEM  SAP ECC · mode DEVELOPER" },
      { type: "cmd" as const, text: "STATUS  connected · session active" },
      { type: "info" as const, text: "▸ syntax check ......... 0 errors, 0 warnings" },
      { type: "info" as const, text: "▸ extended check ....... no findings" },
      { type: "ok" as const, text: "▸ activation ........... successful" },
      { type: "ok" as const, text: "▸ transport ............ ready for release" },
      { type: "cmd" as const, text: "WAITING FOR INPUT ..." },
    ],
  },

  stats: [
    { value: "ECC + S/4HANA", label: "Platform focus" },
    { value: "End-to-end", label: "Design to transport" },
    { value: "Production", label: "Support mindset" },
  ],
} as const;

export type Profile = typeof profile;
