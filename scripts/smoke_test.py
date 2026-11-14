import asyncio, sys, json
from playwright.async_api import async_playwright

# Usage: python scripts/smoke_test.py [url]
URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173/"

CONSOLE_ERRORS = []
PAGE_ERRORS = []

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="chrome")
        page = await browser.new_page(viewport={"width": 1440, "height": 950})

        page.on("console", lambda m: CONSOLE_ERRORS.append(f"[{m.type}] {m.text}")
                if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e: PAGE_ERRORS.append(str(e)))

        await page.goto(URL, wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(2500)

        checks = {}

        # --- structural ---
        checks["title"] = await page.title()
        checks["h1"] = (await page.locator("h1").first.inner_text()).replace("\n", " ")
        for sec in ["home", "about", "expertise", "work", "architecture", "journey", "contact"]:
            checks[f"section#{sec}"] = await page.locator(f"#{sec}").count() == 1
        checks["nav_links"] = await page.locator("header nav a[href^='#']").count()
        checks["skill_cards"] = await page.locator("#expertise article").count()
        checks["project_cards"] = await page.locator("#work article").count()
        checks["arch_stages"] = await page.locator("#architecture [role='tab']").count()
        checks["timeline_entries"] = await page.locator("#journey article").count()
        checks["form_fields"] = await page.locator("#contact input, #contact textarea").count()

        # --- WebGL / Vanta canvas ---
        await page.wait_for_timeout(2500)
        checks["vanta_canvas"] = await page.locator("#home canvas").count()

        # --- resume link ---
        href = await page.locator("a[download]").first.get_attribute("href")
        checks["resume_href"] = href
        resp = await page.request.get(URL.rstrip("/") + "/resume.pdf")
        checks["resume_status"] = resp.status
        checks["resume_bytes"] = len(await resp.body())

        # --- interactions ---
        # project filter
        await page.locator("#work button", has_text="Smart Forms").first.click()
        await page.wait_for_timeout(700)
        checks["filtered_projects"] = await page.locator("#work article").count()
        await page.locator("#work button", has_text="All").first.click()
        await page.wait_for_timeout(700)
        checks["all_projects"] = await page.locator("#work article").count()

        # expand case study
        await page.locator("#work button[aria-expanded]").first.click()
        await page.wait_for_timeout(800)
        checks["case_study_open"] = await page.locator("#work button[aria-expanded='true']").count()
        checks["case_study_blocks"] = await page.locator("#work h4").count()

        # architecture tab
        await page.locator("#architecture [role='tab']").nth(3).click()
        await page.wait_for_timeout(700)
        checks["arch_panel_text"] = (await page.locator("#stage-detail h3").inner_text())

        # theme toggle
        before = await page.evaluate("document.documentElement.classList.contains('dark')")
        await page.locator("header button[aria-label*='theme']").click()
        await page.wait_for_timeout(600)
        after = await page.evaluate("document.documentElement.classList.contains('dark')")
        checks["theme_toggled"] = f"{before} -> {after}"

        # form validation (submit empty)
        await page.locator("#contact button[type='submit']").click()
        await page.wait_for_timeout(700)
        checks["validation_errors"] = await page.locator("#contact [role='alert']").count()

        # screenshots
        await page.screenshot(path="smoke-desktop.png", full_page=False)
        await page.evaluate("window.scrollTo(0,0)")
        await page.wait_for_timeout(400)

        # mobile
        await page.set_viewport_size({"width": 390, "height": 844})
        await page.wait_for_timeout(1200)
        await page.screenshot(path="smoke-mobile.png")
        checks["mobile_menu_btn"] = await page.locator("button[aria-label='Open menu']").count()
        await page.locator("button[aria-label='Open menu']").click()
        await page.wait_for_timeout(700)
        checks["mobile_menu_open"] = await page.locator("a[href='#work']").count()
        await page.screenshot(path="smoke-mobile-menu.png")

        await browser.close()

    print(json.dumps(checks, indent=2))
    print("\n=== PAGE ERRORS ===")
    print("\n".join(PAGE_ERRORS) or "(none)")
    print("\n=== CONSOLE ERRORS/WARNINGS ===")
    print("\n".join(CONSOLE_ERRORS) or "(none)")

asyncio.run(main())
