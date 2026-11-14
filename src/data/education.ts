/**
 * ============================================================================
 *  EDUCATION
 * ============================================================================
 *  Facts below are as provided. `highlights` is intentionally empty — add
 *  coursework, CGPA or achievements only if you want them published, then they
 *  render automatically.
 * ============================================================================
 */

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: string;
  location?: string;
  highlights: string[];
}

export const education: EducationEntry[] = [
  {
    id: "btech-cse",
    degree: "B.Tech",
    field: "Computer Science and Engineering (CSE)",
    institution: "KL University",
    period: "2022 — 2026",
    status: "Graduated",
    location: "India",
    highlights: [], // « optional: coursework, CGPA, achievements »
  },
];

/** Academic timeline bounds, used to draw the progress rail. */
export const educationTimeline = {
  start: 2022,
  end: 2026,
  startLabel: "2022",
  endLabel: "2026",
};
