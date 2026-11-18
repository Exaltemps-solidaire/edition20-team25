import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois l'écran d'accueil du chatbot et ses 3 choix", async () => {
    await expect(page.getByRole("heading", { name: "ENDOmind · Chatbot" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /je n.ai pas encore fait de demande/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /j.ai reçu un refus/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /je veux juste savoir/i }),
    ).toBeVisible();
  });
});
