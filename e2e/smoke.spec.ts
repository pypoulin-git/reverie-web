import { test, expect } from "@playwright/test";

/**
 * Smoke E2E — pages clés de Reverie (mode démo).
 * Vraies pages, vrai serveur Next.js (port 3336), aucun mock de données internes :
 * sans NEXT_PUBLIC_SUPABASE_URL le site tourne en DEMO_MODE, qui est le
 * comportement réel déployé sur reverie-web-gamma.vercel.app.
 */

test.describe("Landing", () => {
  test("affiche le hero et les CTA", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /journal de reves/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Essayer gratuitement" })
    ).toBeVisible();
    // "Blog" existe aussi dans le footer — cibler la nav
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Blog" })
    ).toBeVisible();
  });
});

test.describe("Blog", () => {
  test("liste des articles et navigue vers un article", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
    const premierArticle = page.locator("a[href^='/blog/']").first();
    await expect(premierArticle).toBeVisible();
    await premierArticle.click();
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Mode démo", () => {
  test("/login redirige vers /app", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/\/app/);
  });

  test("le dashboard accueille l'utilisateur démo", async ({ page }) => {
    await page.goto("/app");
    await expect(page.getByText(/Bonjour Explorateur/)).toBeVisible();
  });

  test("le journal se charge", async ({ page }) => {
    await page.goto("/app/journal");
    await expect(
      page.getByRole("heading", { name: /Journal/ })
    ).toBeVisible();
  });

  test("nouveau rêve : le formulaire de saisie s'affiche", async ({ page }) => {
    await page.goto("/app/dream/new");
    await expect(
      page.getByPlaceholder(/J'etais dans un endroit etrange/)
    ).toBeVisible();
  });
});
