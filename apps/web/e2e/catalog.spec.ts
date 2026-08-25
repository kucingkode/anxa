import { expect, test } from "@playwright/test";
import { ensureUser, loginViaUi, uniqueIdentifier, uniqueUser } from "./helpers";

test.describe("catalog (logistic_admin)", () => {
  test("creates a manufacturer and a product", async ({ page, request }) => {
    const user = uniqueUser("logistic_admin");
    await ensureUser(request, user);
    await loginViaUi(page, user.email, user.password);

    const manufacturerName = `Manufaktur ${uniqueIdentifier()}`;
    const manufacturerId = uniqueIdentifier("mid");
    const productName = `Produk ${uniqueIdentifier()}`;
    const productCode = uniqueIdentifier("code");

    await page.getByRole("link", { name: "Manufaktur" }).click();
    await expect(page.getByRole("heading", { name: "Manufaktur" })).toBeVisible();
    await page.getByRole("button", { name: "Tambah Manufaktur" }).click();
    await page.getByLabel("Nama").fill(manufacturerName);
    await page.getByLabel("Identifier").fill(manufacturerId);
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText(manufacturerName)).toBeVisible();

    await page.getByRole("link", { name: "Produk" }).click();
    await expect(page.getByRole("heading", { name: "Produk" })).toBeVisible();
    await page.getByRole("button", { name: "Tambah Produk" }).click();
    await page.getByLabel("Nama Produk").fill(productName);
    await page.getByLabel("Kode").fill(productCode);
    await page.getByLabel("Satuan").fill("tablet");
    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: manufacturerName }).click();
    await page.getByRole("button", { name: "Simpan" }).click();

    await expect(page.getByText(productName)).toBeVisible();
  });
});
