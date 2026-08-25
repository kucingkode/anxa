import type { Patient } from "@simk/contracts";
import type { Patient as FhirPatient } from "fhir/r4";

/** SatuSehat system URI for the Indonesian NIK (national ID) identifier. */
export const NIK_SYSTEM = "https://fhir.kemkes.go.id/id/nik";

/**
 * Map a SIMK `Patient` domain model to a SatuSehat-compatible FHIR R4
 * `Patient` resource.
 *
 * Only the fields SatuSehat requires (or that SIMK tracks) are mapped; the
 * rest of the FHIR resource is left to SatuSehat defaults.
 */
export function toFhirPatient(patient: Patient): FhirPatient {
  const resource: FhirPatient = {
    resourceType: "Patient",
    identifier: [
      {
        use: "official",
        system: NIK_SYSTEM,
        value: patient.identifier,
      },
    ],
    name: [{ use: "official", text: patient.name }],
    gender: patient.gender,
  };

  if (patient.birthDate) {
    resource.birthDate = patient.birthDate;
  }

  if (patient.phone) {
    resource.telecom = [{ system: "phone", use: "mobile", value: patient.phone }];
  }

  return resource;
}
