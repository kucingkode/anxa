# SatuSehat Documentation Notes

Extracted knowledge from the official SATUSEHAT Platform documentation
(playbook) for FHIR R4 integration. Each file below keeps a
`Sumber asli` (original source) link back to the page it was scraped from.

> Source portal: <https://satusehat.kemkes.go.id/platform/docs/id/playbook/>
> (SATUSEHAT Platform, versi 7.23 — dikelola oleh Kementerian Kesehatan RI)

## Authentication

- [Pengajuan dan Verifikasi Akses](authentication/registration.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/authentication/registration/>
- [Akses Token](authentication/token.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/authentication/apis/token/>

## Prerequisites (Onboarding APIs)

- [Organization](prerequisites/organization.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/onboardings/apis/organization/>
- [Location](prerequisites/location.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/onboardings/apis/location/>
- [Practitioner](prerequisites/practitioner.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/onboardings/apis/practitioner/>
- [Patient](prerequisites/patient.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/onboardings/apis/patient/>

## Integration APIs (Interoperabilitas)

- [Encounter](integrations/encounter.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/encounter/>
- [Condition](integrations/condition.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/condition/>
- [Observation](integrations/observation.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/observation/>
- [Composition](integrations/composition.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/composition/>
- [Procedure](integrations/procedure.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/procedure/>
- [Medication](integrations/medication.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/medication/>
- [MedicationRequest](integrations/medication-request.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/medication-request/>
- [MedicationDispense](integrations/medication-dispense.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/medication-dispense/>
- [ServiceRequest](integrations/service-request.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/service-request/>
- [Specimen](integrations/specimen.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/specimen/>
- [DiagnosticReport](integrations/diagnostic-report.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/diagnostic-report/>
- [EpisodeOfCare](integrations/episode-of-care.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/episode-of-care/>
- [AllergyIntolerance](integrations/allergy-intolerance.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/allergy-intolerance/>
- [ClinicalImpression](integrations/clinical-impression.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/clinical-impression/>
- [HealthcareService](integrations/healthcare-service.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/healthcare-service/>
- [Appointment](integrations/appointment.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/appointment/>
- [AppointmentResponse](integrations/appointment-response.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/appointment-response/>
- [PractitionerRole](integrations/practitioner-role.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/practitioner-role/>
- [Slot](integrations/slot.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/slot/>
- [Immunization](integrations/immunization.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/immunization/>
- [ImagingStudy](integrations/imaging-study.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/imaging-study/>
- [CarePlan](integrations/care-plan.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/care-plan/>
- [FamilyMemberHistory](integrations/family-member-history.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/family-member-history/>
- [QuestionnaireResponse](integrations/questionnaire-response.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/questionnaire-response/>
- [RelatedPerson](integrations/related-person.md) — <https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/related-person/>

## FHIR

- [Framework FHIR](fhir/framework.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/framework/>

### FHIR — Data Types

- [Primitif](fhir/data-type/primitive.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/data-type/primitive/>
- [Umum](fhir/data-type/general.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/data-type/general/>
- [Metadata](fhir/data-type/metadata.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/data-type/metadata/>
- [Khusus](fhir/data-type/special.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/data-type/special/>

### FHIR — Resources (Prerequisites)

- [Organization](fhir/resources/organization.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/organization/>
- [Location](fhir/resources/location.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/location/>
- [Practitioner](fhir/resources/practitioner.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/practitioner/>
- [Patient](fhir/resources/patient.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/patient/>

### FHIR — Resources (Interoperability)

- [Encounter](fhir/resources/encounter.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/encounter/>
- [Condition](fhir/resources/condition.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/condition/>
- [Observation](fhir/resources/observation.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/observation/>
- [Composition](fhir/resources/composition.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/composition/>
- [Procedure](fhir/resources/procedure.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/procedure/>
- [Medication](fhir/resources/medication.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/medication/>
- [MedicationRequest](fhir/resources/medication-request.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/medication-request/>
- [MedicationDispense](fhir/resources/medication-dispense.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/medication-dispense/>
- [DiagnosticReport](fhir/resources/diagnostic-report.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/diagnostic-report/>
- [AllergyIntolerance](fhir/resources/allergy-intolerance.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/allergy-intolerance/>
- [ClinicalImpression](fhir/resources/clinical-impression.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/clinical-impression/>
- [Immunization](fhir/resources/immunization.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/immunization/>
- [ImagingStudy](fhir/resources/imaging-study.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/imaging-study/>
- [EpisodeOfCare](fhir/resources/episode-of-care.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/episode-of-care/>
- [CarePlan](fhir/resources/care-plan.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/care-plan/>
- [QuestionnaireResponse](fhir/resources/questionnaire-response.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/questionnaire-response/>
- [ServiceRequest](fhir/resources/service-request.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/service-request/>
- [Specimen](fhir/resources/specimen.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/specimen/>
- [RelatedPerson](fhir/resources/related-person.md) — <https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/related-person/>

## Master Data

### Master Patient Index (MPI)

- [Pendahuluan](master-data/mpi-preliminary.md) — <https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-patient-index/preliminary/>
- [ReST API](master-data/mpi-rest-api.md) — <https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-patient-index/rest-api-mpi/>

### Master Sarana Index (MSI)

- [Pendahuluan](master-data/msi-preliminary.md) — <https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-sarana-index/preliminary/>
- [ReST API](master-data/msi-rest-api.md) — <https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-sarana-index/rest-api-msi/>

### Master Wilayah

- [Pendahuluan](master-data/wilayah-preliminary.md) — <https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-wilayah/preliminary/>
- [ReST API](master-data/wilayah-rest-api.md) — <https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-wilayah/rest-api-wilayah/>

### Kamus Farmasi & Alat Kesehatan (KFA)

- [Pendahuluan](master-data/kfa-preliminary.md) — <https://satusehat.kemkes.go.id/platform/docs/id/master-data/kfa/preliminary/>
- [ReST API](master-data/kfa-rest-api.md) — <https://satusehat.kemkes.go.id/platform/docs/id/master-data/kfa/rest-api-kfa/>

## KYC (Know Your Customer)

- [Panduan Integrasi (Tenaga IT Fasyankes)](kyc/guide-it-fasyankes.md) — <https://satusehat.kemkes.go.id/platform/docs/id/kyc/kyc-doc/guide-it-fasyankes/>
- [ReST API](kyc/rest-api-kyc.md) — <https://satusehat.kemkes.go.id/platform/docs/id/kyc/kyc-doc/rest-api-kyc/>
