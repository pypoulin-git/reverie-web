import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for reverie-web smoke tests.
 * Runs against a local dev server on port 3336 (3334 = ordi-guide, 3335 = ciel-natal).
 * CI runs against the Vercel preview URL via BASE_URL env var.
 * Sans NEXT_PUBLIC_SUPABASE_URL le site tourne en DEMO_MODE (aucun mock interne).
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3336",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run dev -- -p 3336",
        url: "http://localhost:3336",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
