#!/usr/bin/env python3
"""Generates public/og.png — the 1200x630 Open Graph card.

Run with:  python scripts/generate_og.py

Renders a standalone HTML card in headless Chrome so the typography and
gradient match the site exactly, then writes it to public/og.png.
"""
import asyncio
import os
from playwright.async_api import async_playwright

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "og.png")
W, H = 1200, 630

HTML = """<!doctype html>
<html class="dark">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    background: #04060d;
    color: #e9effc;
    font-family: Inter, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 68px 68px;
    mask-image: radial-gradient(ellipse 85% 75% at 30% 40%, #000 30%, transparent 78%);
    -webkit-mask-image: radial-gradient(ellipse 85% 75% at 30% 40%, #000 30%, transparent 78%);
  }
  .glow-a {
    position: absolute; left: -220px; top: -260px;
    width: 760px; height: 760px; border-radius: 50%;
    background: radial-gradient(circle, rgba(10,110,209,0.42), transparent 62%);
    filter: blur(40px);
  }
  .glow-b {
    position: absolute; right: -240px; bottom: -300px;
    width: 720px; height: 720px; border-radius: 50%;
    background: radial-gradient(circle, rgba(34,211,238,0.26), transparent 62%);
    filter: blur(40px);
  }
  .rule {
    position: absolute; left: 0; right: 0; top: 0; height: 3px;
    background: linear-gradient(90deg, #0a6ed1 0%, #2f88f5 48%, #22d3ee 100%);
  }
  .wrap {
    position: relative; z-index: 2;
    height: 100%; padding: 72px 78px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .top { display: flex; align-items: center; gap: 20px; }
  .mark {
    width: 66px; height: 66px; border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 25px;
  }
  .mark span {
    background: linear-gradient(110deg, #0a6ed1 0%, #2f88f5 48%, #22d3ee 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .who { display: flex; flex-direction: column; gap: 5px; }
  .name {
    font-family: 'Space Grotesk', sans-serif; font-weight: 600;
    font-size: 27px; letter-spacing: -0.02em;
  }
  .role {
    font-family: 'JetBrains Mono', monospace; font-size: 14px;
    text-transform: uppercase; letter-spacing: 0.2em; color: #59a4ff;
  }
  h1 {
    font-family: 'Space Grotesk', sans-serif; font-weight: 600;
    font-size: 68px; line-height: 1.05; letter-spacing: -0.035em;
    max-width: 940px;
  }
  h1 .grad {
    background: linear-gradient(110deg, #0a6ed1 0%, #2f88f5 48%, #22d3ee 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .bottom {
    display: flex; align-items: center; justify-content: space-between;
    font-family: 'JetBrains Mono', monospace; font-size: 16px;
    text-transform: uppercase; letter-spacing: 0.16em; color: #6d7a96;
  }
  .tags { display: flex; gap: 14px; }
  .tag {
    padding: 9px 18px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04); color: #9aa7c1;
  }
  .avail { display: flex; align-items: center; gap: 11px; color: #34d399; }
  .dot { width: 11px; height: 11px; border-radius: 50%; background: #34d399; }
</style>
</head>
<body>
  <div class="rule"></div>
  <div class="grid"></div>
  <div class="glow-a"></div>
  <div class="glow-b"></div>

  <div class="wrap">
    <div class="top">
      <div class="mark"><span>KG</span></div>
      <div class="who">
        <div class="name">Kowshik Gajula</div>
        <div class="role">SAP ABAP Consultant</div>
      </div>
    </div>

    <h1>Engineering Enterprise Solutions<br><span class="grad">with SAP ABAP.</span></h1>

    <div class="bottom">
      <div class="tags">
        <div class="tag">SAP ECC</div>
        <div class="tag">S/4HANA</div>
        <div class="tag">ABAP</div>
        <div class="tag">Integrations</div>
      </div>
      <div class="avail"><span class="dot"></span>Available for consulting</div>
    </div>
  </div>
</body>
</html>
"""


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="chrome")
        page = await browser.new_page(viewport={"width": W, "height": H})
        await page.set_content(HTML, wait_until="networkidle")
        await page.wait_for_timeout(1800)  # let webfonts settle
        await page.screenshot(path=OUT)
        await browser.close()
    print(f"wrote {os.path.abspath(OUT)} ({os.path.getsize(OUT)} bytes)")


asyncio.run(main())
