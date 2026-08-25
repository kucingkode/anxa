import { expect, test } from "@playwright/test";
import { ensureUser, loginViaUi, uniqueIdentifier, uniqueUser } from "./helpers";

test.describe("queues (paramedic)", () => {
  test("enqueues a patient", async ({ page, request }) => {
    const user = uniqueUser("paramedic");
    await ensureUser(request, user);
    await loginViaUi(page, user.email, user.password);

    const patientName = `Budi ${uniqueIdentifier()}`;
    const nik = uniqueIdentifier("nik");

    await page.getByRole("link", { name: "Pasien" }).click();
    await page.getByRole("button", { name: "Tambah Pasien" }).click();
    await page.getByLabel("Nama Lengkap").fill(patientName);
    await page.getByLabel("NIK / IHS").fill(nik);
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText(patientName).first()).toBeVisible();

    await page.getByRole("link", { name: "Antrean" }).click();
    await expect(page.getByRole("heading", { name: "Antrean" })).toBeVisible();
    await page.getByRole("button", { name: "Tambah Antrean" }).click();
    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: patientName }).click();
    await page.getByRole("button", { name: "Simpan" }).click();

    await expect(page.getByText("Antrean ditambahkan")).toBeVisible();
  });
});
