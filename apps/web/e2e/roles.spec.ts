import { expect, test } from "@playwright/test";
import { ensureUser, loginViaUi, uniqueIdentifier, uniqueUser } from "./helpers";

test.describe("roles (admin)", () => {
  test("creates a custom role", async ({ page, request }) => {
    const user = uniqueUser("admin");
    await ensureUser(request, user);
    await loginViaUi(page, user.email, user.password);

    const roleName = `Peran ${uniqueIdentifier()}`;

    await page.getByRole("link", { name: "Peran" }).click();
    await expect(page.getByRole("heading", { name: "Peran" })).toBeVisible();
    await page.getByRole("button", { name: "Tambah Peran" }).click();
    await page.getByLabel("Nama").fill(roleName);
    await page.getByRole("button", { name: "Simpan" }).click();

    await expect(page.getByText(roleName)).toBeVisible();
  });
});
