import { describe, expect, it } from "vitest";
import type { Patient } from "@simk/contracts";
import { NIK_SYSTEM, toFhirPatient } from "../../../src/infrastructure/out/satusehat/fhir/patient.js";

const basePatient: Patient = {
  id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  name: "Budi Santoso",
  identifier: "3273010101010001",
  gender: "male",
  createdAt: "2026-08-19T00:00:00.000Z",
};

describe("toFhirPatient", () => {
  it("maps the minimal required fields", () => {
    const fhir = toFhirPatient(basePatient);

    expect(fhir.resourceType).toBe("Patient");
    expect(fhir.identifier?.[0]).toMatchObject({
      use: "official",
      system: NIK_SYSTEM,
      value: "3273010101010001",
    });
    expect(fhir.name?.[0]).toMatchObject({ use: "official", text: "Budi Santoso" });
    expect(fhir.gender).toBe("male");
  });

  it("maps birthDate when present", () => {
    const fhir = toFhirPatient({ ...basePatient, birthDate: "1990-01-15" });
    expect(fhir.birthDate).toBe("1990-01-15");
  });

  it("omits birthDate when absent", () => {
    const fhir = toFhirPatient(basePatient);
    expect(fhir.birthDate).toBeUndefined();
  });

  it("maps phone to a telecom ContactPoint", () => {
    const fhir = toFhirPatient({ ...basePatient, phone: "081234567890" });
    expect(fhir.telecom?.[0]).toMatchObject({
      system: "phone",
      use: "mobile",
      value: "081234567890",
    });
  });

  it("omits telecom when phone is absent", () => {
    const fhir = toFhirPatient(basePatient);
    expect(fhir.telecom).toBeUndefined();
  });
});
