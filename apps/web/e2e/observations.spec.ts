import { expect, test } from "@playwright/test";
import {
  createPatientApi,
  ensureUser,
  getToken,
  loginViaUi,
  startVisitApi,
  uniqueIdentifier,
  uniqueUser,
} from "./helpers";

test.describe("observations (doctor)", () => {
  test("records an observation against a visit", async ({ page, request }) => {
    const paramedic = uniqueUser("paramedic");
    const doctor = uniqueUser("doctor");
    await ensureUser(request, paramedic);
    await ensureUser(request, doctor);

    const patientName = `Pasien ${uniqueIdentifier()}`;
    const patient = await createPatientApi(
      request,
      await getToken(request, paramedic.email, paramedic.password),
      patientName,
      uniqueIdentifier("nik"),
    );
    const visitId = await startVisitApi(
      request,
      await getToken(request, paramedic.email, paramedic.password),
      patient.id,
    );

    await loginViaUi(page, doctor.email, doctor.password);
    await page.goto(`/patients/${patient.id}/visits/${visitId}`);

    await expect(page.getByRole("button", { name: "Tambah Observasi" })).toBeVisible();

    await page.getByRole("button", { name: "Tambah Observasi" }).click();
    await page.getByLabel("Kode").fill("8867-4");
    await page.getByLabel("Nilai").fill("80");
    await page.getByLabel("Satuan").fill("/min");
    await page.getByRole("button", { name: "Simpan" }).click();

    await expect(page.getByText("Observasi ditambahkan")).toBeVisible();
    await expect(page.getByText("8867-4")).toBeVisible();
  });
});
