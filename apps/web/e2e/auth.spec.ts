import { expect, test } from "@playwright/test";
import { ensureUser, loginViaUi, uniqueUser } from "./helpers";

test.describe("authentication", () => {
  test("redirects unauthenticated users to /login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("button", { name: "Masuk" })).toBeVisible();
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("nobody@simk.dev");
    await page.getByLabel("Kata Sandi").fill("wrong-password");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("logs in with valid credentials", async ({ page, request }) => {
    const user = uniqueUser("admin");
    await ensureUser(request, user);

    await loginViaUi(page, user.email, user.password);

    await expect(page.getByText("Selamat datang di SIMK")).toBeVisible();
    await expect(page.getByRole("link", { name: "Pengguna" })).toBeVisible();
  });
});
