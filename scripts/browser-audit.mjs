import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';

const port = 4322;
const origin = `http://127.0.0.1:${port}`;
const astroCli = path.resolve('node_modules/astro/bin/astro.mjs');
const artifacts = path.resolve('artifacts');
await mkdir(artifacts, { recursive: true });

const server = spawn(process.execPath, [astroCli, 'preview', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, NO_COLOR: '1' },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverOutput = '';
server.stdout.on('data', (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on('data', (chunk) => { serverOutput += chunk.toString(); });

async function waitForServer() {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The preview server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not start.\n${serverOutput}`);
}

const routes = [
  '/',
  '/projects/',
  '/projects/higher-education-website/',
  '/projects/smart-table-medical-document-validation/',
  '/projects/guitar-marketplace/',
  '/projects/sentiment-analysis-system/',
  '/projects/company-profile-website/',
  '/projects/mobile-application-development/',
];

const browserErrors = [];

async function revealPage(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const items = [...document.querySelectorAll('[data-reveal]')];
    for (const item of items) {
      item.scrollIntoView({ block: 'center', behavior: 'auto' });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}

try {
  await waitForServer();
  const browser = await chromium.launch({ headless: true });

  try {
    for (const viewport of [
      { width: 320, height: 720 },
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1280, height: 900 },
      { width: 1440, height: 1000 },
      { width: 1920, height: 1080 },
    ]) {
      const context = await browser.newContext({ viewport });
      await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
      const page = await context.newPage();
      page.on('console', (message) => {
        if (message.type() === 'error') browserErrors.push(`${viewport.width}px console: ${message.text()}`);
      });
      page.on('pageerror', (error) => browserErrors.push(`${viewport.width}px page error: ${error.message}`));

      const response = await page.goto(origin, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, `Homepage failed at ${viewport.width}px`);
      assert.equal(await page.locator('h1').count(), 1, `Homepage H1 count failed at ${viewport.width}px`);
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      assert.ok(
        overflow.scrollWidth <= overflow.clientWidth,
        `Horizontal overflow at ${viewport.width}px: ${overflow.scrollWidth}px > ${overflow.clientWidth}px`,
      );

      const heroGeometry = await page.evaluate(() => {
          const nameLines = [...document.querySelectorAll('.hero h1 > span')];
          const visual = document.querySelector('.hero-visual');
          const copy = document.querySelector('.hero-copy');
          const radar = document.querySelector('.visual-stage');
          if (!visual || !copy || !radar || nameLines.length === 0) return null;
          const lineRights = nameLines.map((line) => {
            const range = document.createRange();
            range.selectNodeContents(line);
            return range.getBoundingClientRect().right;
          });
          const radarRect = radar.getBoundingClientRect();
          return {
            nameRight: Math.max(...lineRights),
            copyRight: copy.getBoundingClientRect().right,
            visualLeft: visual.getBoundingClientRect().left,
            radarWidth: radarRect.width,
            radarHeight: radarRect.height,
          };
      });
      assert.ok(heroGeometry, `Hero geometry could not be measured at ${viewport.width}px`);
      assert.ok(
        heroGeometry.nameRight <= heroGeometry.copyRight,
        `Hero name crossed its text column at ${viewport.width}px: ${heroGeometry.nameRight}px > ${heroGeometry.copyRight}px`,
      );
      assert.ok(
        Math.abs(heroGeometry.radarWidth - heroGeometry.radarHeight) <= 1,
        `Radar is not square at ${viewport.width}px: ${heroGeometry.radarWidth}px × ${heroGeometry.radarHeight}px`,
      );

      if (viewport.width >= 1280) {
        assert.ok(
          heroGeometry.nameRight <= heroGeometry.visualLeft,
          `Hero name crossed into the visual at ${viewport.width}px: ${heroGeometry.nameRight}px > ${heroGeometry.visualLeft}px`,
        );
      }

      if (viewport.width === 375) {
        const menuButton = page.locator('[data-menu-toggle]');
        await menuButton.click();
        assert.equal(await menuButton.getAttribute('aria-expanded'), 'true', 'Mobile menu did not open');
        await page.keyboard.press('Escape');
        assert.equal(await menuButton.getAttribute('aria-expanded'), 'false', 'Escape did not close menu');
        assert.equal(await menuButton.evaluate((element) => element === document.activeElement), true, 'Menu focus was not restored');

        await page.locator('[data-copy-email]').click();
        await page.locator('[data-copy-status]').filter({ hasText: 'copied to clipboard' }).waitFor();
        await revealPage(page);
        await page.screenshot({ path: path.join(artifacts, 'home-375.png'), fullPage: true });
      }

      if (viewport.width === 1440) {
        await revealPage(page);
        await page.screenshot({ path: path.join(artifacts, 'home-1440.png'), fullPage: true });
      }


      if (viewport.width === 1920) {
        await revealPage(page);
        await page.screenshot({ path: path.join(artifacts, 'home-1920.png'), fullPage: true });
      }

      await context.close();
    }

    const routeContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const routePage = await routeContext.newPage();
    routePage.on('console', (message) => {
      if (message.type() === 'error') browserErrors.push(`Route console: ${message.text()}`);
    });
    routePage.on('pageerror', (error) => browserErrors.push(`Route page error: ${error.message}`));

    for (const route of routes) {
      const response = await routePage.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, `Direct navigation failed: ${route}`);
      assert.equal(await routePage.locator('h1').count(), 1, `Incorrect H1 count: ${route}`);
      await routePage.reload({ waitUntil: 'networkidle' });
      assert.equal(await routePage.locator('h1').count(), 1, `Direct refresh failed: ${route}`);
      if (route === '/projects/higher-education-website/') {
        await revealPage(routePage);
        await routePage.screenshot({ path: path.join(artifacts, 'case-study-1280.png'), fullPage: true });
      }
    }
    routePage.removeAllListeners('console');
    const missingResponse = await routePage.goto(`${origin}/route-that-does-not-exist`, { waitUntil: 'networkidle' });
    assert.equal(missingResponse?.status(), 404, 'Missing route did not return HTTP 404');
    assert.equal(await routePage.locator('h1').count(), 1, 'Custom 404 page is missing its H1');
    await routeContext.close();

    const reducedContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      reducedMotion: 'reduce',
    });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(origin, { waitUntil: 'networkidle' });
    assert.equal(await reducedPage.locator('.reveal-ready').count(), 0, 'Reduced motion still initialized reveal animation');
    await reducedContext.close();

    const noScriptContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      javaScriptEnabled: false,
    });
    const noScriptPage = await noScriptContext.newPage();
    const noScriptResponse = await noScriptPage.goto(`${origin}/projects/higher-education-website/`);
    assert.equal(noScriptResponse?.status(), 200, 'No-JavaScript case study failed');
    assert.equal(await noScriptPage.locator('h1').isVisible(), true, 'Core content is hidden without JavaScript');
    await noScriptContext.close();

    assert.deepEqual(browserErrors, [], `Browser errors detected:\n${browserErrors.join('\n')}`);
  } finally {
    await browser.close();
  }

  console.log('Browser audit passed: 6 viewports, hero-boundary checks, 8 routes with refresh, mobile interactions, 404, reduced motion, no-JS, and console checks.');
  console.log(`Screenshots: ${path.join(artifacts, 'home-375.png')} and ${path.join(artifacts, 'home-1440.png')}`);
} finally {
  server.kill();
}
