#!/usr/bin/env node
/**
 * Generates public/resume.pdf — a real, downloadable PDF with no dependencies.
 *
 * Run with:  npm run resume
 *
 * EDIT THE `resume` OBJECT BELOW to change the content, then re-run.
 * Contact details are your real, published values. Anything wrapped in
 * « … » is a placeholder — fill it in before sharing the PDF.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/resume.pdf");

/* ========================================================================== */
/*  CONTENT — EDIT ME                                                        */
/* ========================================================================== */
const resume = {
  name: "Kowshik Gajula",
  title: "SAP ABAP Consultant",
  location: "India",
  contact: [
    "kowshikgajula1@gmail.com",
    "linkedin.com/in/kowshik-gajula-a25955253",
    "github.com/KowshikGajula",
    "portfolio-three-nu-11.vercel.app",
  ],

  summary:
    "SAP ABAP Consultant building enterprise SAP solutions — custom ABAP development, " +
    "process automation, intelligent integrations and production support across ECC and " +
    "S/4HANA. Comfortable owning a requirement end to end, from reading the functional " +
    "specification through design and implementation to transport release and support.",

  expertise: [
    ["Core ABAP",
      "Reports, ALV, internal tables, Open SQL, data dictionary, OO ABAP"],
    ["Enhancements",
      "BAdIs, user exits, BAPIs, enhancement framework"],
    ["Integration",
      "RFC, IDocs, proxies, OData, REST APIs, XML"],
    ["SAP Platforms",
      "SAP ECC, SAP S/4HANA, ABAP on HANA, CDS views"],
    ["Tools",
      "SE11, SE37, SE38, SE80, SE18, SE19, ST22, SAT, Eclipse ADT"],
  ],

  // EDIT: replace the period and employer with your own history before sharing.
  experience: [
    {
      period: "May 2026 - Present",
      role: "SAP ABAP Consultant",
      employer: "« Your Company »",
      location: "India",
      points: [
        "Delivering custom ABAP developments, enhancements and integrations across SAP ECC and S/4HANA landscapes.",
        "Built the SAP User Onboarding Automation process: SU01 provisioning, role assignment, approval routing and Service Desk integration, with CUA and standalone system routing.",
        "Delivered the Sphere / GMAO to SAP PM integration — AL11 file processing, BAPI_ALM_ORDER_MAINTAIN order creation and response-file generation.",
        "Applied enhancement-framework techniques to extend standard processes without modifying core code.",
        "Handled production support: debugging, root-cause analysis and corrective development through the standard change process.",
      ],
    },
  ],

  // EDIT: only real, factual project entries — completed vs ongoing stated plainly.
  projects: [
    {
      name: "SAP User Onboarding Automation - Archroma  (ongoing)",
      detail:
        "SU01 user provisioning with user creation and role assignment, approval workflow and " +
        "Service Desk integration, CUA and standalone system routing, plus validation, logging " +
        "and status tracking against the originating request.",
    },
    {
      name: "Sphere / GMAO - SAP PM Integration  (ongoing)",
      detail:
        "AL11 file processing and ABAP automation, equipment and functional location mapping, " +
        "BAPI_ALM_ORDER_MAINTAIN order creation with error handling, and response-file " +
        "generation carrying the SAP order number or the failure reason.",
    },
  ],

  education: [
    {
      degree: "B.Tech - Computer Science and Engineering (CSE)",
      institution: "KL University",
      period: "2022 - 2026",
      status: "Graduated",
    },
  ],
};

/* ========================================================================== */
/*  PDF PRIMITIVE — do not edit below                                        */
/* ========================================================================== */

const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const MARGIN_X = 52;
const TOP = 790;
const BOTTOM = 62;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

const BLUE = [0.039, 0.431, 0.82];
const INK = [0.06, 0.09, 0.16];
const MUTED = [0.32, 0.37, 0.46];
const FAINT = [0.55, 0.6, 0.68];

/** Rough Helvetica advance-width factor — keeps wrapped lines inside the margin. */
const CH_W = 0.512;

function esc(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7E]/g, (c) => (c === "—" ? "-" : c === "’" ? "'" : "?"));
}

function wrap(text, size, width = CONTENT_W) {
  const max = Math.max(8, Math.floor(width / (size * CH_W)));
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

class Document {
  constructor() {
    this.pages = [];
    this.ops = [];
    this.y = TOP;
    this.newPage();
  }

  newPage() {
    if (this.ops.length) this.pages.push(this.ops.join("\n"));
    this.ops = [];
    this.y = TOP;
  }

  ensure(space) {
    if (this.y - space < BOTTOM) this.newPage();
  }

  setFill(color) {
    this.ops.push(`${color.map((c) => c.toFixed(3)).join(" ")} rg`);
  }

  /** Draws one line at the current cursor and advances. */
  line(text, { size = 9.5, font = "F1", color = INK, x = MARGIN_X, dy = 0 } = {}) {
    this.y -= dy;
    this.setFill(color);
    this.ops.push(
      `BT /${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${this.y.toFixed(2)} Tm (${esc(text)}) Tj ET`,
    );
    this.y -= size * 1.28;
  }

  paragraph(text, opts = {}) {
    const size = opts.size ?? 9.5;
    const color = opts.color ?? MUTED;
    const indent = opts.indent ?? 0;
    this.ensure(size * 3);
    for (const l of wrap(text, size, CONTENT_W - indent)) {
      this.line(l, { ...opts, size, color, x: MARGIN_X + indent });
    }
  }

  bullet(text) {
    const size = 9.5;
    const indent = 13;
    const lines = wrap(text, size, CONTENT_W - indent);
    this.ensure(size * 2.4 * lines.length);

    lines.forEach((l, i) => {
      this.y -= i === 0 ? 3.5 : 0;
      if (i === 0) {
        this.setFill(BLUE);
        this.ops.push(
          `BT /F2 9 Tf 1 0 0 1 ${MARGIN_X} ${(this.y + 1).toFixed(2)} Tm (\\267) Tj ET`,
        );
      }
      this.line(l, { size, color: MUTED, x: MARGIN_X + indent });
    });
    this.y -= 2;
  }

  sectionTitle(text) {
    this.ensure(46);
    this.y -= 12;
    this.setFill(BLUE);
    this.ops.push(
      `BT /F2 8.5 Tf 1 0 0 1 ${MARGIN_X} ${this.y.toFixed(2)} Tm (${esc(
        text.toUpperCase(),
      )}) Tj ET`,
    );
    this.y -= 6;
    this.setStroke(BLUE, 0.45);
    this.ops.push(
      `${MARGIN_X} ${this.y.toFixed(2)} m ${(PAGE_W - MARGIN_X).toFixed(2)} ${this.y.toFixed(2)} l S`,
    );
    this.y -= 13;
  }

  setStroke(color, width) {
    this.ops.push(
      `${color.map((c) => c.toFixed(3)).join(" ")} RG ${width} w`,
    );
  }

  finish() {
    if (this.ops.length) this.pages.push(this.ops.join("\n"));
    this.ops = [];
    return this.pages;
  }
}

function buildPdf(pageStreams) {
  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length; // 1-based object number
  };

  const fontRegular = add(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  );
  const fontBold = add(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  );

  const contentIds = pageStreams.map((stream) => {
    const bytes = Buffer.byteLength(stream, "latin1");
    return add(`<< /Length ${bytes} >>\nstream\n${stream}\nendstream`);
  });

  const pagesId = objects.length + 1;
  const kids = contentIds.map((_, i) => `${pagesId + 1 + i} 0 R`).join(" ");

  add(`<< /Type /Pages /Kids [${kids}] /Count ${contentIds.length} >>`);

  contentIds.forEach((cid) => {
    add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> ` +
        `/Contents ${cid} 0 R >>`,
    );
  });

  const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  // --- assemble with a correct xref table ---
  let out = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets = [];

  objects.forEach((body, i) => {
    offsets[i] = Buffer.byteLength(out, "latin1");
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(out, "latin1");
  out += `xref\n0 ${objects.length + 1}\n`;
  out += "0000000000 65535 f \n";
  offsets.forEach((off) => {
    out += `${String(off).padStart(10, "0")} 00000 n \n`;
  });
  out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n`;
  out += `startxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(out, "latin1");
}

/* ========================================================================== */
/*  LAYOUT                                                                    */
/* ========================================================================== */

const doc = new Document();

// ---- Header ----
doc.setFill(INK);
doc.ops.push(
  `BT /F2 26 Tf 1 0 0 1 ${MARGIN_X} ${(doc.y - 6).toFixed(2)} Tm (${esc(resume.name)}) Tj ET`,
);
doc.y -= 30;

doc.setFill(BLUE);
doc.ops.push(
  `BT /F2 12 Tf 1 0 0 1 ${MARGIN_X} ${doc.y.toFixed(2)} Tm (${esc(resume.title)}) Tj ET`,
);
doc.y -= 18;

doc.setFill(FAINT);
doc.ops.push(
  `BT /F1 9 Tf 1 0 0 1 ${MARGIN_X} ${doc.y.toFixed(2)} Tm (${esc(
    resume.location,
  )}) Tj ET`,
);
doc.y -= 15;

doc.setFill(MUTED);
doc.ops.push(
  `BT /F1 8.5 Tf 1 0 0 1 ${MARGIN_X} ${doc.y.toFixed(2)} Tm (${esc(
    resume.contact.join("   |   "),
  )}) Tj ET`,
);
doc.y -= 12;

doc.setStroke(BLUE, 1.1);
doc.ops.push(
  `${MARGIN_X} ${doc.y.toFixed(2)} m ${(PAGE_W - MARGIN_X).toFixed(2)} ${doc.y.toFixed(2)} l S`,
);
doc.y -= 4;

// ---- Summary ----
doc.sectionTitle("Professional Summary");
doc.paragraph(resume.summary);

// ---- Expertise ----
doc.sectionTitle("Technical Expertise");
for (const [label, items] of resume.expertise) {
  doc.ensure(30);
  doc.line(label, { size: 9.5, font: "F2", color: INK, dy: 3 });
  doc.paragraph(items, { size: 9, color: MUTED, indent: 0 });
}

// ---- Experience ----
doc.sectionTitle("Professional Experience");
for (const job of resume.experience) {
  doc.ensure(70);

  doc.line(job.role, { size: 11, font: "F2", color: INK, dy: 4 });

  // Employer on the left, period right-aligned on the same baseline.
  doc.setFill(MUTED);
  doc.ops.push(
    `BT /F1 9 Tf 1 0 0 1 ${MARGIN_X} ${doc.y.toFixed(2)} Tm (${esc(job.employer)}) Tj ET`,
  );
  const periodW = job.period.length * 8.2 * CH_W;
  doc.setFill(FAINT);
  doc.ops.push(
    `BT /F1 8.5 Tf 1 0 0 1 ${(PAGE_W - MARGIN_X - periodW).toFixed(2)} ${doc.y.toFixed(
      2,
    )} Tm (${esc(job.period)}) Tj ET`,
  );
  doc.y -= 13;

  doc.setFill(FAINT);
  doc.ops.push(
    `BT /F1 8 Tf 1 0 0 1 ${MARGIN_X} ${doc.y.toFixed(2)} Tm (${esc(
      job.location,
    )}) Tj ET`,
  );
  doc.y -= 13;

  for (const point of job.points) doc.bullet(point);
  doc.y -= 4;
}

// ---- Projects ----
doc.sectionTitle("Enterprise Projects");
for (const project of resume.projects) {
  doc.ensure(40);
  doc.line(project.name, { size: 10, font: "F2", color: INK, dy: 3 });
  doc.paragraph(project.detail, { size: 9, color: MUTED });
  doc.y -= 3;
}

// ---- Education ----
doc.sectionTitle("Education");
for (const edu of resume.education) {
  doc.ensure(40);
  doc.line(edu.degree, { size: 10, font: "F2", color: INK, dy: 3 });

  doc.setFill(MUTED);
  doc.ops.push(
    `BT /F1 9 Tf 1 0 0 1 ${MARGIN_X} ${doc.y.toFixed(2)} Tm (${esc(
      edu.institution,
    )}) Tj ET`,
  );
  const periodW = edu.period.length * 8.2 * CH_W;
  doc.setFill(FAINT);
  doc.ops.push(
    `BT /F1 8.5 Tf 1 0 0 1 ${(PAGE_W - MARGIN_X - periodW).toFixed(2)} ${doc.y.toFixed(
      2,
    )} Tm (${esc(edu.period)}) Tj ET`,
  );
  doc.y -= 13;

  doc.setFill(FAINT);
  doc.ops.push(
    `BT /F1 8 Tf 1 0 0 1 ${MARGIN_X} ${doc.y.toFixed(2)} Tm (${esc(
      edu.status,
    )}) Tj ET`,
  );
  doc.y -= 12;
}

const pages = doc.finish();
const pdf = buildPdf(pages);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, pdf);

console.log(`✓ wrote ${OUT}  (${pages.length} page${pages.length > 1 ? "s" : ""}, ${pdf.length} bytes)`);
