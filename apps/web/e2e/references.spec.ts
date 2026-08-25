import { expect, test } from "@playwright/test";
import { ensureUser, loginViaUi, uniqueIdentifier, uniqueUser } from "./helpers";

test.describe("references (admin)", () => {
  test("creates a condition reference", async ({ page, request }) => {
    const user = uniqueUser("admin");
    await ensureUser(request, user);
    await loginViaUi(page, user.email, user.password);

    const code = uniqueIdentifier("icd");
    const display = `Diagnosis ${uniqueIdentifier()}`;

    await page.getByRole("link", { name: "Referensi Diagnosa" }).click();
    await expect(page.getByRole("heading", { name: "Referensi Kondisi" })).toBeVisible();
    await page.getByRole("button", { name: "Tambah Referensi" }).click();
    await page.getByLabel("Kode").fill(code);
    await page.getByLabel("Nama").fill(display);
    await page.getByRole("button", { name: "Simpan" }).click();

    await expect(page.getByText(display)).toBeVisible();
  });
});
