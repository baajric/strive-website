// Full-page screenshots of a website for the portfolio.
//   node scripts/capture-site.mjs <url> <slug>
// Writes public/projects/<slug>/desktop.jpg and mobile.jpg using the locally installed Chrome.

import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const [url, slug] = process.argv.slice(2);
if (!url || !slug) {
  console.error("Usage: node scripts/capture-site.mjs <url> <slug>");
  process.exit(1);
}

const outDir = path.join("public", "projects", slug);
await mkdir(outDir, { recursive: true });

const shots = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, maxHeight: 7000, mobile: false },
  { name: "mobile", viewport: { width: 390, height: 844 }, maxHeight: 5000, mobile: true },
];

// Cookie banners get the privacy-friendly answer; newsletter/discount popups are hidden.
async function clearOverlays(page) {
  const reject = page.getByRole("button", {
    name: /^(decline|reject|reject all|ablehnen|alle ablehnen|nur notwendige|nur erforderliche|deny)/i,
  });
  try {
    await reject.first().click({ timeout: 1500 });
  } catch {}
  await page.keyboard.press("Escape").catch(() => {});
  await page.evaluate(() => {
    const popup = /cookie|consent|newsletter|popup|modal|klaviyo|privy|gift|overlay/i;
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position !== "fixed" && style.position !== "sticky") continue;
      const r = el.getBoundingClientRect();
      const cover = (r.width * r.height) / (innerWidth * innerHeight);
      const label = `${el.id} ${typeof el.className === "string" ? el.className : ""} ${el.getAttribute("role") ?? ""}`;
      if (cover > 0.25 || popup.test(label) || el.getAttribute("role") === "dialog") {
        el.style.setProperty("display", "none", "important");
      }
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  });
}

const browser = await chromium.launch({ channel: "chrome" });
try {
  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: shot.viewport,
      deviceScaleFactor: shot.mobile ? 2 : 1,
      isMobile: shot.mobile,
      hasTouch: shot.mobile,
      // Sites that animate content in on scroll show it immediately with reduced motion.
      reducedMotion: "reduce",
      locale: "de-DE",
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    await clearOverlays(page);

    // Scroll through once so lazy images load, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    // Popups often appear on a timer, so clear again right before the shot.
    await clearOverlays(page);

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const file = path.join(outDir, `${shot.name}.jpg`);
    await page.screenshot({
      path: file,
      type: "jpeg",
      quality: 82,
      fullPage: true,
      clip: { x: 0, y: 0, width: shot.viewport.width, height: Math.min(height, shot.maxHeight) },
    });
    console.log(`saved ${file}`);
    await context.close();
  }
} finally {
  await browser.close();
}
