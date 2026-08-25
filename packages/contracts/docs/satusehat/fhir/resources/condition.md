> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/condition/

---

# Condition

Data diagnosis pasien dapat dikirimkan menggunakan *resource* `Condition`. Informasi diagnosis yang dimiliki pasien dilaporkan menggunakan kode ICD-10. Satu *payload* `Condition` hanya dapat digunakan untuk melaporkan 1 kode ICD-10. Sehingga apabila pasien memiliki 2 diagnosis, maka dikirimkan 2 *payload* `Condition` dengan 2 kode ICD-10 yang berbeda.

Berikut pemetaan nilai untuk Condition yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data diagnosis pasien:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Condition.identifier[i]

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor laporan hasil pemeriksaan atau data diagnosis pasien yang dimiliki oleh lokasi induk yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### Condition.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Condition.identifier[i].system

Berisi referensi sistem atau URL observasi ID lokal yang disimpan di sistem internal masing-masing organisasi. Pada bagian ini data yang disimpan nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/condition/{{organization-ihs-number}}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor ID organisasi induk yang didapatkan dari master sarana indeks.

### Condition.identifier[i].value

Berisi kode atau ID lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/condition/10000004",
    "use": "official",
    "value": "5234342"
  }
]
```

## Condition.clinicalStatus

Berisi informasi mengenai status klinis dari kondisi pasien dengan tipe data `CodeableConcept`.

### Condition.clinicalStatus.coding

Berisi satu atau lebih data kode status klinis dari kondisi pasien dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ConditionClinicalStatusCodes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
    "code": "active",
    "display": "Active"
  }
]
```

## Condition.verificationStatus

Berisi informasi mengenai Status verifikasi untuk mendukung status klinis suatu kondisi/penyakit dengan tipe data `CodeableConcept`.

### Condition.verificationStatus.coding

Berisi satu atau lebih data kode status verifikasi untuk mendukung status klinis suatu kondisi/ penyakit dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ConditionVerificationStatus. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "https://www.hl7.org/fhir/Codesystem-condition-ver-status",
    "code": "provisional",
    "display": "Provisional"
  }
]
```

## Condition.category[i]

Berisi satu atau lebih kategori kondisi apakah problem atau keluhan yang dirasakan pasien atau diagnosis pasien dengan tipe data `CodeableConcept`.

### Condition.category[i].coding

Berisi satu atau lebih data kode kategori kondisi apakah problem atau keluhan yang dirasakan pasien (diagnosis pasien) dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ConditionCategoryCodes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
    "code": "encounter-diagnosis",
    "display": "Encounter Diagnosis"
  }
]
```

## Condition.severity

Berisi data penilaian subjektif dari tingkat keparahan kondisi yang dievaluasi oleh dokter dengan tipe data `CodeableConcept`.

### Condition.severity.coding

Berisi satu atau lebih data penilaian subjektif dari tingkat keparahan kondisi yang dievaluasi oleh dokter dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "24484000",
    "display": "Severe"
  }
]
```

## \*Condition.code

Berisi kode diagnosis dengan tipe data `CodeableConcept`, yang nilainya mengacu pada dua data terminologi ICD-10 tahun 2010 (untuk melaporkan terkait diagnosis pasien saat kunjungan) dan http://terminology.kemkes.go.id/CodeSystem/clinical-term (untuk melaporkan kondisi saat meninggalkan rumah sakit). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Condition.code[i].coding

Berisi satu atau lebih data kode diagnosis dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ICD-10 tahun 2010. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://hl7.org/fhir/sid/icd-10",
    "code": "C47.0",
    "display": "Malignant neoplasm, peripheral nerves of head, face and neck"
  }
]
```

## Condition.bodySite[i]

Berisi data lokasi anatomis di mana kondisi/keluhan/diagnosis ini terjadi (bila relevan) dengan tipe data `CodeableConcept`.

### Condition.bodySite[i].coding

Berisi satu atau lebih data lokasi anatomis di mana kondisi/keluhan/diagnosis ini terjadi (bila relevan) dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "111002",
    "display": "Parathyroid gland"
  }
]
```

## \*Condition.subject

Berisi data subjek dari kondisi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di resource `Patient | Group`, yang nilainya memiliki format:

```
"Patient/{patient-ihs-number}"
```

Di mana isi dari parameter `{patient-ihs-number}` adalah ID `Patient` yang didapatkan dari master pasien indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  }
]
```

## \*Condition.encounter

Berisi data informasi terkait kunjungan di mana diagnosis ditegakkan yang setiap datanya direpresentasikan dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resources* `Encounter` di mana diagnosis ini dibuat, yang nilainya memiliki format:

```
"Encounter/{ID-resource-Encounter}"
```

Di mana isi dari parameter {id-resource-Encounter} adalah ID *resource* `Encounter` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Encounter/2b2d0a3e-082a-4fe9-ae13-da9c3b5e422f"
  }
]
```

## Condition.onset<?>

Berisi data mengenai estimasi atau tanggal aktual (tanggal-waktu) kondisi dimulai, menurut pendapat dokter.

### Condition.onsetDateTime

Berisi data mengenai kapan kondisi dimulai menurut pendapat dokter dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

### Condition.onsetAge

Berisi data mengenai usia suatu kondisi dimulai menurut pendapat dokter dengan tipe data `Age`.

### Condition.onsetPeriod

Berisi data waktu dari kondisi menurut pendapat dokter dimulai sampai selesai *(arrived to finished)* dengan tipe data `Period`.

#### Condition.Period.start

Diisi dengan waktu mulai, sama dengan waktu kondisi pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

#### Condition.Period.end

Diisi dengan waktu selesai, sama dengan waktu selesai kondisi pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-30"
```

### Condition.onsetRange

Berisi data kondisi berupa *range* dengan tipe data `Range`.

### Condition.onsetString

Berisi data kondisi berupa *string/text* dengan tipe data `string`.

## Condition.abatement<?>

Berisi data mengenai tanggal atau perkiraan kondisi teratasi atau mengalami remisi.

### Condition.abatementDateTime

Berisi data kondisi tanggal atau tanggal perkiraan saat kondisi tersebut teratasi atau mengalami remisi dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

### Condition.abatementAge

Berisi data kondisi tanggal atau tanggal perkiraan saat kondisi tersebut teratasi atau mengalami remisi dengan tipe data `Age`.

### Condition.abatementPeriod

Berisi data kondisi waktu perkiraan teratasi atau mengalami remisi dari kondisi dimulai sampai selesai *(arrived to finished)* dengan tipe data `Period`.

#### Condition.abatementPeriod.start

Diisi dengan waktu mulai, sama dengan waktu tanggal atau tanggal perkiraan saat kondisi tersebut teratasi atau mengalami remisi dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

#### Condition.abatementPeriod.end

Diisi dengan waktu selesai, sama dengan tanggal atau tanggal perkiraan saat kondisi tersebut teratasi atau mengalami remisi dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-30"
```

### Condition.abatementRange

Berisi data kondisi tanggal atau tanggal perkiraan saat kondisi tersebut teratasi atau mengalami remisi dengan tipe data `Range`.

### Condition.abatementString

Berisi data kondisi tanggal atau tanggal perkiraan saat kondisi tersebut teratasi atau mengalami remisi berupa *string/text* dengan tipe data `string`.

## Condition.recordedDate

Berisi data kondisi yang menunjukkan kapan Kondisi/keluhan ini tercatat dalam sistem (tanggal yang dibuat oleh sistem) dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## Condition.recorder

Berisi data individu yang merekam dan bertanggung jawab atas data yang diisikan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Patient | RelatedPerson`, yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah ID Nakes organisasi induk yang didapatkan dari master Nakes indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000001",
    "display": "Dokter Bronsig"
  }
]
```

## Condition.asserter

Berisi data individu yang membuat pernyataan kondisi/keluhan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Patient | RelatedPerson`.

## Condition.stage[i]

Berisi satu atau lebih data mengenai tahap klinis atau tingkat suatu kondisi, dapat mencakup penilaian keparahan formal dengan tipe data `BackboneElement`.

## Condition.stage.summary

Berisi data dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Condition.stage.assessment[i]

Berisi satu atau lebih data assessment dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `ClinicalImpression | DiagnosticReport | Observation`.

## Condition.stage.type

Berisi data dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Condition.evidence[i]

Berisi satu atau lebih data pernyataan/bukti pendukung yang menjadi dasar status verifikasi kondisi, seperti bukti yang menguatkan atau menyanggah kondisi dengan tipe data `BackboneElement`.

## Condition.evidence.code[i]

Berisi satu atau lebih data bukti pendukung yang menjadi dasar status verifikasi penyakit dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Condition.evidence.detail[i]

Berisi satu atau lebih data bukti pendukung yang menjadi dasar status verifikasi penyakit dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di semua *resource* FHIR yang tersedia.

## Condition.note[i]

Berisi satu atau lebih data informasi tambahan tentang Kondisi/ Keluhan/ Penyakit dengan tipe data `Annotation` (https://www.hl7.org/fhir/datatypes.html#Annotation).
