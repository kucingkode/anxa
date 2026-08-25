import { expect, test } from "@playwright/test";
import { ensureUser, loginViaUi, uniqueIdentifier, uniqueUser } from "./helpers";

test.describe("patients (paramedic)", () => {
  test("creates and lists a patient", async ({ page, request }) => {
    const user = uniqueUser("paramedic");
    await ensureUser(request, user);
    await loginViaUi(page, user.email, user.password);

    const patientName = `Budi ${uniqueIdentifier()}`;
    const nik = uniqueIdentifier("nik");

    await page.getByRole("link", { name: "Pasien" }).click();
    await expect(page.getByRole("heading", { name: "Pasien" })).toBeVisible();

    await page.getByRole("button", { name: "Tambah Pasien" }).click();
    await page.getByLabel("Nama Lengkap").fill(patientName);
    await page.getByLabel("NIK / IHS").fill(nik);
    await page.getByRole("button", { name: "Simpan" }).click();

    await expect(page.getByText(patientName).first()).toBeVisible();
  });

  test("shows read-only patient list for doctor", async ({ page, request }) => {
    const user = uniqueUser("doctor");
    await ensureUser(request, user);
    await loginViaUi(page, user.email, user.password);

    await page.getByRole("link", { name: "Pasien" }).click();
    await expect(page.getByRole("heading", { name: "Pasien" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Tambah Pasien" })).toHaveCount(0);
  });
});
