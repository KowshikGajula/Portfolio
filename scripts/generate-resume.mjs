#!/usr/bin/env node
/**
 * Generates public/resume.pdf — a real, downloadable PDF with no dependencies.
 *
 * Run with:  npm run resume
 *
 * EDIT THE `resume` OBJECT BELOW to change the content, then re-run.
 * Every field here is a placeholder by design; fill in your own details.
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
    "your.email@example.com",
    "linkedin.com/in/your-linkedin-handle",
    "github.com/KowshikGajula",
    "portfolio-three-nu-11.vercel.app",
  ],

  summary:
    "SAP ABAP Consultant specialising in SAP ECC and SAP S/4HANA technical development. " +
    "Custom enhancements, integrations, automation, reporting and enterprise application " +
    "development. Comfortable owning a requirement end to end — from reading the functional " +
    "specification, through design and implementation, to transport and production support.",

  expertise: [
    ["Core ABAP",
      "Classical & interactive reports, internal tables, Open SQL, data dictionary, modularization, ALV"],
    ["Enhancements",
      "BAdIs, user exits, enhancement framework, BAPIs, RFC"],
    ["SAP Forms",
      "Smart Forms, SAPscript, Adobe Forms, print programs"],
    ["SAP Integration",
      "IDocs, proxies, RFC, OData, REST APIs, XML"],
    ["SAP Technologies",
      "SAP ECC, SAP S/4HANA, ABAP on HANA, CDS views"],
    ["Development Tools",
      "SE11, SE38, SE37, SE80, SE24, SE18, SE19, ST22, SAT, ADT, Eclipse"],
  ],

  // EDIT: replace the periods and employers with your own history.
  experience: [
    {
      period: "2023 — Present",
      role: "SAP ABAP Consultant",
      employer: "Your Company",
      location: "India",
      points: [
        "Built a file-based integration that creates SAP PM work orders from an external GMAO/Sphere system, with response-file feedback of the SAP order number.",
        "Developed Smart Forms output for production order labels and quality certificates, including Zebra ZPL printer integration.",
        "Applied enhancement-framework techniques to extend standard processes without modifying core code.",
        "Handled production support: debugging, root-cause analysis and corrective development.",
      ],
    },
    {
      period: "2021 — 2023",
      role: "ABAP Developer",
      employer: "Your Previous Company",
      location: "India",
      points: [
        "Authored classical and ALV reports against ECC data models.",
        "Implemented BAPI and RFC based interfaces with structured error handling.",
        "Designed print programs and form layouts for business documents.",
      ],
    },
  ],

  projects: [
    {
      name: "Sphere / GMAO to SAP PM Integration",
      detail:
        "AL11 file processing, equipment and functional location mapping, BAPI_ALM_ORDER_MAINTAIN " +
        "with transaction control, structured logging and a response file carrying the SAP order number.",
    },
    {
      name: "SAP Production Order Label Printing",
      detail:
        "Custom Smart Forms and driver programs producing material, batch, quantity and shelf-life " +
        "labels through Zebra ZPL output.",
    },
    {
      name: "SAP Quality Certificate of Analysis (COA)",
      detail:
        "Dynamic Smart Forms certificate rendering inspection characteristics with their short texts, " +
        "merged with material and plant master data.",
    },
  ],

  certifications: [
    "Joule Certified Developer — SAP",
    "ABAP Backend Developer — SAP",
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
doc.sectionTitle("Selected Projects");
for (const project of resume.projects) {
  doc.ensure(40);
  doc.line(project.name, { size: 10, font: "F2", color: INK, dy: 3 });
  doc.paragraph(project.detail, { size: 9, color: MUTED });
  doc.y -= 3;
}

// ---- Certifications ----
doc.sectionTitle("Certifications");
for (const cert of resume.certifications) doc.bullet(cert);

const pages = doc.finish();
const pdf = buildPdf(pages);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, pdf);

console.log(`✓ wrote ${OUT}  (${pages.length} page${pages.length > 1 ? "s" : ""}, ${pdf.length} bytes)`);
