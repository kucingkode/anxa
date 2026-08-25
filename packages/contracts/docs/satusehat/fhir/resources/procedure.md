> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/procedure/

---

# Procedure

Pengiriman data tindakan/prosedur medis yang dilakukan terhadap seorang pasien baik tindakan diagnostik maupun tindakan terapetik dapat dikirimkan melalui *resource* `Procedure`. Tindakan yang dilaporkan dapat berupa tindakan non-invasif (konsultasi, edukasi) maupun invasif (contoh operasi). Standar kode tindakan/prosedur medis yang dikirimkan ke SATUSEHAT menggunakan kode ICD-9 CM.

Berikut pemetaan nilai untuk Procedure yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data tindakan/prosedur medis:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Procedure.identifier[i]

Berisi data id internal faskes untuk prosedur ini. Ini adalah ID resmi yang diterbitkan oleh faskes untuk menandai prosedur yang dilakukan ke pasien, yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### Procedure.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Procedure.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/procedure/{{organization-ihs-number}}/
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### Procedure.identifier[i].value

Berisi kode atau ID lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/procedure/1000001",
    "use": "official",
    "value": "5234342"
  }
]
```

## Procedure.instantiatesCanonical[i]

Berisi data mengenai URL yang mengarah ke protokol, panduan, rangkaian pesanan, atau definisi lain yang ditentukan oleh FHIR yang dipatuhi seluruhnya atau sebagian oleh rosedur ini dengan tipe data `canonical`.

## Procedure.instantiatesUri[i]

Berisi data mengenai URL yang menunjuk ke protokol, panduan, rangkaian pesanan, atau definisi lain yang dikelola secara eksternal yang dipatuhi seluruhnya atau sebagian oleh prosedur ini dengan tipe data `uri`.

## Procedure.basedOn[i]

Berisi data yang merekam permintaan dilakukannya tindakan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CarePlan | ServiceRequest`, yang nilainya memiliki format:

```
"ServiceRequest/{id-resource-ServiceRequest}"
```

Di mana isi dari parameter `{id-resource-ServiceRequest}` adalah ID ServiceRequest yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "ServiceRequest/cc52bfcd-6cb2-4c0a-87a7-d5906f74bed9"
  }
]
```

## Procedure.partOf[i]

Berisi data peristiwa/kejadian yang lebih bisa di mana prosedur merupakan bagian, komponen atau langkah dari peristiwa tersebut dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Procedure | Observation | MedicationAdministration`.

## \*Procedure.status

Berisi data yang menyatakan kondisi suatu prosedur yang umumnya dalam keadaan masih berlangsung atau telah selesai dengan tipe data `code`, yang nilainya mengacu pada data terminologi EventStatus. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"completed"
```

## Procedure.statusReason

Berisi data yang berkaitan dengan alasan suatu prosedur saat ini dengan tipe data `CodeableConcept`.

### Procedure.statusReason.coding

Berisi satu atau lebih data status prosedur saat ini dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi SNOMED CT ProcedureNotPerformedReason(SNOMED-CT). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "182840001",
    "display": "Drug treatment stopped - medical advice"
  }
]
```

## Procedure.category

Berisi data yang berkaitan dengan klasifikasi prosedur yang dapat digunakan untuk pencarian, penyusunan, dan tampilan dengan tipe data `CodeableConcept`.

### Procedure.category.coding

Berisi satu atau lebih data yang berkaitan dengan klasifikasi prosedur yang dapat digunakan untuk pencarian, penyusunan, dan tampilan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi SNOMED CT (http://www.hl7.org/fhir/codesystem-snomedct.html). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "103693007",
    "display": "Diagnostic procedure"
  }
]
```

## \*Procedure.code

Berisi data berkaitan dengan kode tindakan kepada pasien dengan tipe data `CodeableConcept`.

### \*Procedure.code.coding

Berisi data kode tindakan kepada pasien dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ICD-9 CM. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://hl7.org/fhir/sid/icd-9-cm",
    "code": "87.44",
    "display": "Routine chest x-ray, so described"
  }
]
```

## \*Procedure.subject

Berisi data subjek pasien yang memiliki hasil laporan tersebut dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Group`, yang nilainya memiliki format:

```
"Patient/{patient-ihs-number}"
```

Di mana isi dari parameter `{patient-ihs-number}` adalah ID Patient yang didapatkan dari master pasien indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  }
]
```

## \*Procedure.encounter

Berisi data mengenai informasi terkait kode atau nomor kunjungan yang dimiliki oleh lokasi induk dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
"Encounter/{id-resource-Encounter}"
```

Di mana isi dari parameter `{id-resource-Encounter}` adalah ID Encounter yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Encounter/2823ed1d-3e3e-434e-9a5b-9c579d192787",
    "display": "Tindakan Rontgen Dada Budi Santoso pada Selasa tanggal 14 Juni 2022"
  }
]
```

## Procedure.performed<?>

Berisi data mengenai perkiraan atau tanggal aktual (tanggal-waktu) periode, atau usia saat prosedur dilakukan.

## Procedure.performedDateTime

Berisi data mengenai kapan prosedur dilakukan dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## Procedure.performedPeriod

Berisi data waktu dari prosedur dimulai sampai selesai *(arrived to finished)* dengan tipe data `Period`.

### Procedure.Period.start

Diisi dengan waktu mulai, sama dengan waktu mulai prosedur pasien dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

Contoh Nilai

```
"2022-06-14T13:31:00+01:00"
```

### Procedure.Period.end

Diisi dengan waktu selesai, sama dengan waktu selesai prosedur pasien dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

Contoh Nilai

```
"2022-06-14T14:27:00+01:00"
```

## Procedure.performedString

Berisi data mengenai kapan prosedur dilakukan dengan tipe data `string`.

## Procedure.performedAge

Berisi data mengenai kapan prosedur dilakukan dengan tipe data `Age`.

## Procedure.performedRange

Berisi data mengenai kapan prosedur dilakukan dengan tipe data `Range`.

## Procedure.recorder

Berisi data mengenai siapa yang mencatatkan data tindakan yang dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | RelatedPerson | Practitioner | PractitionerRole`.

## Procedure.asserter

Berisi data individu yang membuat pernyataan prosedur dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | RelatedPerson | Practitioner | PractitionerRole`.

## Procedure.performer[i]

Berisi data mengenai orang yang melakukan prosedur dengan tipe data `BackboneElement`.

## Procedure.performer.function

Berisi data yang membedakan jenis keterlibatan pelaku dalam prosedur. Misalnya, ahli bedah, ahli anestesi, dan ahli endoskopi dengan tipe data `CodeableConcept`.

### Procedure.performer.function.coding

Berisi satu atau lebih data yang membedakan jenis keterlibatan pelaku dalam prosedur. Misalnya, ahli bedah, ahli anestesi, dan ahli endoskopi dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ProcedurePerformerRoleCodes SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## \*Procedure.performer.actor

Berisi data yang menunjukkan siapa yang melakukan prosedur tersebut dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | Patient | RelatedPerson | Device |` yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah ID Nakes yang didapatkan dari master Nakes indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000001",
    "display": "Dokter Bronsig"
  }
]
```

## Procedure.performer.onBehalfOf

Berisi data organisasi di mana tindakan dilakukan, dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Organization` yang nilainya memiliki format:

```
"Organization/{organization-ihs-number}"
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Organization/1000004"
  }
]
```

## Procedure.location

Berisi data lokasi prosedur atau tindakan medis dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location`, yang nilainya memiliki format:

```
"Location/{id-resource-Location}"
```

Di mana isi dari parameter `{id-resource-Location}` adalah ID Location yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Location/08f9fc38-f899-4c3c-ba42-be4baa4dbd54",
    "display": "Ruang 1A, Poliklinik Rawat Jalan"
  }
]
```

## Procedure.reasonCode[i]

Berisi data mengenai alasan tindakan dilakukan dengan tipe data `CodeableConcept`.

### Procedure.reasonCode[i].coding

Berisi data mengenai alasan tindakan dilakukan dengan tipe data `Coding` yang nilainya mengacu pada kode ICD-10 versi 2010. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://hl7.org/fhir/sid/icd-10",
    "code": "A15.0",
    "display": "Tuberculosis of lung, confirmed by sputum microscopy with or without culture"
  }
]
```

## Procedure.reasonReference[i]

Berisi data mengenai alasan tindakan dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition | Observation | Procedure | DiagnosticReport | DocumentReference`.

## Procedure.bodySite[i]

Berisi data yang berkaitan dengan informasi detail dan lokasi anatomis dari pemberian tindakan dengan tipe data `CodeableConcept`.

### Procedure.bodySite[i].coding

Berisi data informasi lokasi anatomi dari pemberian tindakan dengan tipe data `Coding` yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "302551006",
    "display": "Entire Thorax"
  }
]
```

## Procedure.outcome

Berisi data yang berkaitan dengan jenis perubahan yang terjadi pada alat selama prosedur dengan tipe data `CodeableConcept`.

### Procedure.outcome[i].coding

Berisi data yang berkaitan dengan jenis perubahan yang terjadi pada alat selama prosedur dengan tipe data `Coding` yang nilainya mengacu pada data terminologi SNOMED CT (http://www.hl7.org/fhir/codesystem-snomedct.html). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "385669000",
    "display": "Successful"
  }
]
```

## Procedure.report[i]

Berisi data laporan yang dihasilkan dari suatu tindakan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `DiagnosticReport | DocumentReference | Composition`.

## Procedure.complication[i]

Berisi data komplikasi yang terjadi setelah dilakukan prosedur dengan tipe data `CodeableConcept`.

### Procedure.complication[i].coding

Berisi data komplikasi yang terjadi setelah dilakukan prosedur dengan tipe data `Coding` yang nilainya mengacu pada kode ICD-10 versi 2010. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://hl7.org/fhir/sid/icd-10",
    "code": "A41.9",
    "display": "Sepsis, unspecified"
  }
]
```

## Procedure.complicationDetail[i]

Berisi data kondisi yang terjadi akibat dari prosedur dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition`. Nilainya memiliki format:

```
"Condition/{id-resource-Condition}"
```

Di mana isi dari parameter `{id-resource-Condition}` adalah ID Condition yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Condition/08f9fc38-f899-4c3c-ba42-be4baa4dbd54",
    "display": "Tuberculosis of lung, confirmed by sputum microscopy with or without culture"
  }
]
```

## Procedure.followUp[i]

Berisi data instruksi untuk tindak lanjut *(follow-up)* dari tindakan medis dengan tipe data `CodeableConcept`.

### Procedure.followUp[i].coding

Berisi data kode tindak lanjut prosedur dengan tipe data `Coding` yang nilainya mengacu pada data terminologi SNOMED CT ProcedureFollowUpCodes(SNOMEDCT). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Procedure.note[i]

## Procedure.note[i].authorReference

Berisi data catatan tambahan terkait tindakan medis yang dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner`, yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah ID Nakes yang didapatkan dari master Nakes indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000001",
    "display": "Dokter Bronsig"
  }
]
```

## Procedure.note[i].note.time

Berisi data mengenai catatan waktu prosedur dilakukan dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh JSON**

```
{
  "time": "2015-02-07T13:28:17-05:00"
}
```

## Procedure.note[i].note.text

Berisi data mengenai catatan prosedur dengan tipe data `Annotation`.

**Contoh JSON**

```
[
  {
    "text": "Rontgen thorax melihat perluasan infiltrat dan kavitas."
  }
]
```

## Procedure.focalDevice[i]

Berisi data mengenai erangkat yang ditanamkan, dilepas, atau dimanipulasi (kalibrasi, penggantian baterai, pemasangan prostesis, pemasangan penyedot luka, dll.) sebagai bagian utama dari prosedur dengan tipe data `BackboneElement`.

## Procedure.focalDevice.action

Berisi data mengenai informasi terkait alat yang diimplant, dilepaskan, atau dimanipulasi (kalibrasi, penggantian baterai, pemakaian protesa) selama tindakan dilakukan dengan tipe data `CodeableConcept`.

### Procedure.focalDevice.action.coding

Berisi data perubahan yang terjadi pada alat selama tindakan dengan tipe data `Coding` yang nilainya mengacu pada data terminologi SNOMED CT ProcedureDeviceActionCodes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "360325005",
    "display": "Simple removal - action"
  }
]
```

## \*Procedure.focalDevice.manipulated

Berisi data perubahan yang terjadi pada alat selama tindakan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Device`.

## Procedure.usedReference[i]

Berisi data barang/bahan/item yang digunakan dalam prosedur dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Device | Medication | Substance`.

## Procedure.usedCode[i]

Berisi data yang berkaitan dengan item yang digunakan dalam melakukan suatu prosedur dengan tipe data `CodeableConcept`.

### Procedure.usedCode[i].coding

Berisi data yang berkaitan dengan item yang digunakan dalam melakukan suatu prosedur engan tipe data `Coding` yang nilainya mengacu pada data terminologi FHIRDeviceTypes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/kfa",
    "code": "Kode KFA",
    "display": "Nama produk sesuai KFA"
  }
]
```
