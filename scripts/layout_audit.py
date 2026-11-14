import asyncio, json, sys
from playwright.async_api import async_playwright

# Usage: python scripts/layout_audit.py [url]
URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173/"

VIEWPORTS = [
    (1920, 1080, "wide"),
    (1440, 900, "desktop"),
    (1024, 768, "tablet-l"),
    (768, 1024, "tablet"),
    (390, 844, "phone"),
    (360, 740, "phone-sm"),
]

AUDIT = """() => {
  const de = document.documentElement;
  const res = {
    hOverflow: de.scrollWidth - de.clientWidth,
    sections: {},
    clipped: [],
    tinyText: [],
    offscreen: [],
  };

  // Sections all present with sane heights
  for (const id of ['home','about','experience','work','expertise','education','contact']) {
    const el = document.getElementById(id);
    if (!el) { res.sections[id] = 'MISSING'; continue; }
    const r = el.getBoundingClientRect();
    res.sections[id] = Math.round(r.height);
  }

  // Any element wider than the viewport that is NOT clipped by an ancestor.
  // Decorative glows and the marquee intentionally sit outside the viewport
  // inside overflow-hidden wrappers — those must not be reported.
  const vw = de.clientWidth;
  const isClipped = (el) => {
    // Stop at <body>: it deliberately carries overflow-x:hidden and would
    // otherwise mark every element as clipped, silencing the check entirely.
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (getComputedStyle(p).overflowX !== 'visible') return true;
    }
    return false;
  };
  document.querySelectorAll('main *, footer *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.right > vw + 1.5 || r.left < -1.5) {
      if (getComputedStyle(el).position === 'fixed') return;
      if (isClipped(el)) return;
      res.offscreen.push({
        tag: el.tagName, cls: (el.className.toString()||'').slice(0,70),
        left: Math.round(r.left), right: Math.round(r.right)
      });
    }
  });

  // Text clipped by overflow-hidden ancestors (excluding intentional masks)
  document.querySelectorAll('main h1, main h2, main h3, main p, footer p').forEach(el => {
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
      const cs = getComputedStyle(el);
      if (cs.overflow === 'hidden' || cs.overflowX === 'hidden') {
        res.clipped.push((el.tagName + ' ' + (el.className||'').toString().slice(0,60)));
      }
    }
  });

  // Suspiciously small rendered text. The design's intentional floor for
  // uppercase mono micro-labels is 0.62rem (9.92px); anything below that is
  // an accident.
  document.querySelectorAll('main p, main li, main a, footer p').forEach(el => {
    if (!el.textContent.trim()) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs > 0 && fs < 9.9) res.tinyText.push({ fs, t: el.textContent.trim().slice(0,30) });
  });

  res.offscreen = res.offscreen.slice(0, 8);
  res.tinyText = res.tinyText.slice(0, 5);
  res.clipped = res.clipped.slice(0, 5);
  return res;
}"""


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(channel="chrome")
        all_ok = True
        for w, h, tag in VIEWPORTS:
            page = await b.new_page(viewport={"width": w, "height": h})
            errs = []
            page.on("pageerror", lambda e: errs.append(str(e)))
            await page.goto(URL, wait_until="networkidle", timeout=60000)
            await page.wait_for_timeout(2600)
            out = await page.evaluate(AUDIT)
            status = "OK"
            if out["hOverflow"] > 1:
                status = "H-OVERFLOW"
                all_ok = False
            if out["offscreen"]:
                status = status + " OFFSCREEN"
                all_ok = False
            if errs:
                status = status + " JS-ERROR"
                all_ok = False
            missing = [k for k, v in out["sections"].items() if v == "MISSING" or (isinstance(v, int) and v < 200)]
            if missing:
                status = status + " SECTION:" + ",".join(missing)
                all_ok = False
            print(f"[{status:>16}] {tag:10} {w}x{h}  hOverflow={out['hOverflow']}  "
                  f"sections={ {k: v for k, v in out['sections'].items()} }")
            if out["offscreen"]:
                print("     offscreen:", json.dumps(out["offscreen"], indent=2))
            if out["clipped"]:
                print("     clipped:", out["clipped"])
            if out["tinyText"]:
                print("     tinyText:", out["tinyText"])
            if errs:
                print("     errors:", errs)
            await page.close()
        await b.close()
        print("\n>>> LAYOUT AUDIT:", "PASS" if all_ok else "ISSUES FOUND")


asyncio.run(main())
