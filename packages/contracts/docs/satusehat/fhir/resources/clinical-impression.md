> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/clinical-impression/

---

# ClinicalImpression

Pengiriman Data Prognosis dapat dikirimkan menggunakan *resource* `ClincalImpression`.

Berikut pemetaan nilai untuk ClinicalImpression yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks keterangan prognosis pasien:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## ClinicalImpression.identifier[i]

Berisi satu atau lebih daftar data ID internal faskes untuk data *clinical impression* yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### ClinicalImpression.identifier[i].use

Berisi data dengan tipe data code, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### ClinicalImpression.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/clinicalimpression/{{organization-ihs-number}}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor SATUSEHAT organisasi induk yang didapatkan dari master sarana indeks.

### ClinicalImpression.identifier[i].value

Berisi kode atau ID lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/clinicalimpression/1000004",
    "use": "official",
    "value": "Prognosis_000123"
  }
]
```

## \*ClinicalImpression.status

Digunakan untuk mengidentifikasi status alur kerja penilaian atau asesmen yang setiap datanya direpresentasikan dengan tipe data `code`, yang nilainya mengacu pada data terminologi EventStatus. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  "in-progress"
]
```

## ClinicalImpression.statusReason

Berisi informasi terkait alasan status dari asesmen dengan tipe data `CodeableConcept`.

### ClinicalImpression.statusReason.coding

Berisi data kode alasan status dari asesmen dengan tipe data `Coding`.

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

### ClinicalImpression.statusReason.text

Berisi alasan status asesmen dengan tipe data `text`.

**Contoh JSON**

```
[
  {
    "status": "completed",
    "description": "Bapak Budi Santoso terdiagnosa TB, dan tidak menunjukkan adanya resistensi obat"
  }
]
```

## ClinicalImpression.code

Berisi informasi mengenai kategori dari asesmen klinis yang dilakukan dengan tipe data `CodeableConcept`.

### ClinicalImpression.code.coding

Berisi data kode kategori dari asesmen klinis yang sedang dilakukan dengan tipe data `Coding`.

### ClinicalImpression.code.text

Berisi informasi mengenai kategori dari asesmen klinis yang dilakukan dengan tipe data `text`.

**Contoh JSON**

```
[
  {
    "status": "completed",
    "description": "Bapak Budi Santoso terdiagnosa TB, dan tidak menunjukkan adanya resistensi obat"
  }
]
```

## ClinicalImpression.description

Berisi Rangkuman konteks dan atau penyebab dilakukannya asesmen, kenapa dan di mana dilakukan, dan kondisi pasien apa yang mendasari dilakukannya suatu asesmen dengan tipe data `string`.

## \*ClinicalImpression.subject

Berkaitan dengan subjek dari `ClinicalImpression` itu sendiri yang pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Patient | Group`, yang nilainya memiliki format:

```
[
  "Patient/{patient-ihs-number}"
]
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

### ClinicalImpression.subject.reference

Berisi subjek dari `ClinicalImpression`, yang diisikan dengan `ID Patient`.

**Contoh JSON**

```
[
  {
    "reference": "Patient/100000030009"
  }
]
```

### ClinicalImpression.subject.display

Berisi Nama pasien dalam bentuk free text.

## \*ClinicalImpression.encounter

Berisi informasi terkait kunjungan di mana asesmen dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
[
  "Encounter/{id-resource-Encounter}"
]
```

Di mana isi dari parameter {id-resource-Encounter} adalah ID *resource* Encounter yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Encounter/4c4d890d-fd63-49e0-bad6-7df4dc443125"
  }
]
```

## ClinicalImpression.effective<?>

Berisi informasi mengenai waktu dilakukannya asesmen.

### ClinicalImpression.effective.effectiveDateTime

Berisi data mengenai kapan asesmen dilakukan dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

### ClinicalImpression.effective.effectivePeriod

Berisi data waktu dari asesmen dimulai sampai selesai (*arrived to finished*) dengan tipe data `Period`.

#### ClinicalImpression.effective.effectivePeriod.start

Diisi dengan waktu mulai, sama dengan waktu asesmen pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
[
  "2022-12-20"
]
```

#### ClinicalImpression.effective.effectivePeriod.end

Diisi dengan waktu selesai, sama dengan waktu selesai asesmen pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
[
  "2022-12-30"
]
```

## ClinicalImpression.date

Merupakan waktu data asesmen dicatat atau didokumentasikan. Pada bagian ini berisi data dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## ClinicalImpression.assessor

Berisi informasi mengenai klinisi yang melakukan asesmen. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Practitioner` dan `PractitionerRole`, yang nilainya memiliki format:

```
[
  "Practitioner/{practitioner-ihs-number}"
]
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah ID Nakes yang didapatkan dari master practitioner indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000001"
  }
]
```

## ClinicalImpression.previous

Berisi referensi terhadap asesmen sebelumnya. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `ClinicalImpression`.

## ClinicalImpression.problem[i]

Berisi daftar kondisi atau masalah yang relevan pada pasien. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Condition` dan `AllergyIntolerance`.

## ClinicalImpression.investigation[i]

Berisi satu atau lebih rangkaian pemeriksaan (tanda, gejala, dll.). Pengelompokan investigasi yang sebenarnya sangat bervariasi tergantung pada jenis dan konteks penilaian. Investigasi ini dapat mencakup data yang dihasilkan selama proses penilaian, atau data yang dihasilkan dan dicatat sebelumnya yang berkaitan dengan hasil dengan tipe data `BackboneElement`.

## \*ClinicalImpression.investigation.code

Berisi kelompok nama atau kode investigasi yang dilakukan untuk melakukan asesmen. Berkaitan dengan tanda, gejala, klinis, diagnostik namun tidak terbatasi dan kelompok lain seperti riwayat paparan/keluarga/perjalanan/nutrisi dapat digunakan dengan tipe data `CodeableConcept`.

## ClinicalImpression.investigation.item[i]

Berisi catatan terhadap investigasi atau tindakan yang dilakukan untuk asesmen ini. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Observation | QuestionnaireResponse | FamilyMemberHistory | DiagnosticReport | RiskAssessment | ImagingStudy | Media`.

## ClinicalImpression.protocol[i]

Berisi referensi terhadap protokol klinis tertentu yang diterbitkan yang diikuti selama asesmen ini, dan/atau yang memberikan bukti untuk mendukung diagnosis dengan tipe data `uri`.

## ClinicalImpression.summary

Berisi ringkasan teks dari investigasi dan diagnosis dengan tipe data `string`.

## ClinicalImpression.finding[i]

Berisi data temuan atau diagnosis spesifik yang dianggap mungkin atau relevan dengan pengobatan yang sedang berlangsung dengan tipe data `BackboneElement`.

## ClinicalImpression.finding.itemCodeableConcept

Berisi teks atau kode spesifik terkait temuan atau diagnosis yang relevan terhadap perawatan yang dilakukan dengan tipe data `CodeableConcept`.

### ClinicalImpression.finding.item.CodeableConcept.coding

Berisi data kode spesifik terkait temuan atau diagnosis yang relevan dengan tipe data `Coding` yang nilainya mengacu pada data terminologi ICD-10 code versi 2010. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://hl7.org/fhir/sid/icd-10",
    "code": "R40.0",
    "display": "Somnolence"
  }
]
```

### ClinicalImpression.finding.item.CodeableConcept.text

Berisi teks terkait temuan atau diagnosis yang relevan terhadap perawatan yang dilakukan dengan tipe data `text`.

## ClinicalImpression.finding.itemReference

Berisi informasi referensi spesifik terkait temuan atau diagnosis yang relevan terhadap perawatan yang dilakukan. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Condition | Observation | Media`.

## ClinicalImpression.finding.basis

Berisi informasi mengenai investigasi yang mendukung temuan atau diagnosis dalam bentuk teks dengan tipe data `string`.

## \*ClinicalImpression.prognosisCodeableConcept[i]

Berisi informasi perkiraan kemungkinan *outcome* atau luaran dari kondisi pasien dengan tipe data `CodeableConcept`.

### ClinicalImpression.prognosisCodeableConcept[i].coding

Berisi data kode *outcome* atau luaran kondisi pasien dengan tipe data `Coding`.

**Contoh JSON**

```
[
  {
    "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
    "code": "PR000001",
    "display": "Prognosis baik"
  }
]
```

### ClinicalImpression.prognosisCodeableConcept.text

Berisi informasi perkiraan kemungkinan *outcome* atau luaran dari kondisi pasien dengan tipe data `text`.

**Contoh JSON**

```
[
  {
    "status": "completed",
    "description": "Bapak Budi Santoso terdiagnosa TB, dan tidak menunjukkan adanya resistensi obat"
  }
]
```

## ClinicalImpression.prognosisReference[i]

Berisi informasi mengenai referensi kemungkinan *outcome* atau luaran pasien dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di resource `RiskAssessment`.

## ClinicalImpression.supportingInfo[i]

Berisi informasi mengenai referensi data yang mendukung pada bagian `ClinicalImpression` ini. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di semua *resource* FHIR yang tersedia.

## ClinicalImpression.note[i]

Berisi komentar tentang kesan atau *impression*, biasanya direkam setelah kesan itu sendiri dibuat, meskipun catatan tambahan oleh penulis asli juga dapat muncul dengan tipe data `Annotation`.
