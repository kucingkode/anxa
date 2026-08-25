> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/observation/

---

# Observation

Pengiriman data hasil pemeriksaan pasien dapat dikirimkan menggunakan *resource* `Observation`.

Berikut pemetaan nilai untuk Observation yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pemeriksaan laboratorium:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Observation.identifier[i]

Berisi satu atau lebih daftar data mengenai ID internal faskes untuk observasi. Ini adalah ID resmi yang diterbitkan oleh faskes untuk menandai hasil observasi pasien, yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### Observation.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Observation.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/organization/{organization-ihs-number}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### Obsevation.identifier[i].value

Berisi kode atau ID lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/observation/1000001",
    "use": "official",
    "value": "R100005"
  }
]
```

## Observation.basedOn[i]

Berisi data suatu rencana, proposal atau permintaan yang dipenuhi oleh observasi. Misalnya, MedicationRequest mengharuskan pasien untuk melakukan tes laboratorium sebelum diberikan. Atau observasi merupakan bagian dari permintaan laboratorium yang menggunakan *resource* ServiceRequest dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CarePlan | DeviceRequest | ImmunizationRecommendation | MedicationRequest | NutritionOrder | ServiceRequest`, yang nilainya memiliki format:

```
"ServiceRequest/{id-resource-ServiceRequest}"
```

Di mana isi dari parameter `{id-resource-ServiceRequest}` adalah ID ServiceRequest yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

**Contoh JSON**

```
[
  {
    "reference": "ServiceRequest/2e261ca8-0025-11ed-b939-0242ac120002"
  }
]
```

## Observation.partOf[i]

Berisi data observasi bagian dari proses yang lebih besar. Contoh: hasil observasi merupakan bagian dari prosedur yang menggunakan *resource* Procedure dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `MedicationAdministration | MedicationDispense | MedicationStatement | Procedure | Immunization | ImagingStudy`, yang nilainya memiliki format:

```
"Procedure/{id-resource-Procedure}"
```

Di mana isi dari parameter `{id-resource-Procedure}` adalah ID Procedure yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

**Contoh JSON**

```
[
  {
    "reference": "Procedure/eaf09a48-0025-11ed-b939-0242ac120002"
  }
]
```

## \*Observation.status

Berisi data mengenai status dari hasil observasi dengan tipe data `code` yang nilainya mengacu pada data terminologi ObservationStatus. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"final"
```

## Observation.category[i]

Berisi kode yang mengklasifikasikan jenis observasi yang dilakukan dengan tipe data `CodeableConcept`.

### Observation.category[i].coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada data terminologi Observation Category Codes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
    "code": "vital-signs",
    "display": "Vital Signs"
  }
]
```

## \*Observation.code

Berisi kode observasi dengan tipe data `CodeableConcept`.

### \*Observation.code.coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada data terminologi LOINC Codes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://loinc.org",
    "code": "8867-4",
    "display": "Heart rate"
  }
]
```

## \*Observation.subject

Berisi data pasien yang memiliki hasil observasi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Group | Device | Location`, yang nilainya memiliki format:

```
"Patient/{patient-ihs-number}"
```

Di mana isi dari parameter `{patient-ihs-number}` adalah ID Patient yang didapatkan dari master pasien indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

**Contoh JSON**

```
{
  "reference": "Patient/100000030009"
}
```

## Observation.focus[i]

Berisi data mengenai fokus sebenarnya dari suatu observasi bila bukan terkait catatan observasi seorang pasien atau seseorang yang berhubungan dengan pasien seperti pasangan, orang tua, janin atau donor. Contoh: observasi janin pada catatan/rekam medis ibu dengan tipe data `Reference` yang direferensikan ke *resource* yang terkait sesuai dengan kasus yang ada.

## \*Observation.encounter

Berisi data kunjungan di mana hasil observasi didapatkan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter` di mana observasi ini dibuat, yang nilainya memiliki format:

```
"Encounter/{id-resource-Encounter}"
```

Di mana isi dari parameter `{id-resource-Encounter}` adalah ID Encounter yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Encounter/2823ed1d-3e3e-434e-9a5b-9c579d192787",
    "display": "Pemeriksaan Fisik Nadi Budi Santoso di hari Selasa, 14 Juni 2022"
  }
]
```

## Observation.effective<?>

Berisi data mengenai waktu/periode atau waktu yang relevan secara klinis untuk observasi.

### Observation.effectiveDateTime

Berisi data mengenai kapan observasi dilakukan dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh JSON**

```
"2022-07-14"
```

### Observation.effectivePeriod

Berisi data waktu dari observasi dimulai sampai selesai *(arrived to finished)* dengan tipe data `Period`.

#### Observation.Period.start

Diisi dengan waktu mulai, sama dengan waktu observasi pasien dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2022-12-20T07:00:00+07:00"
```

#### Observation.Period.end

Diisi dengan waktu selesai, sama dengan waktu selesai observasi pasien dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2022-12-30T08:00:00+07:00"
```

### Observation.effectiveTiming

Berisi data kapan observasi dilakukan dengan tipe data `Timing`.

### Observation.effectiveInstant

Berisi data tanggal dan waktu observasi tersedia, biasanya setelah hasilnya ditinjau/direview dan diverifikasi dengan tipe data `instant`.

## Observation.issued

Berisi data tanggal dan waktu versi observasi ini tersedia, biasanya setelah hasilnya ditinjau/direview dan diverifikasi dengan tipe data `instant`, dalam format `YYYY-MM-DDThh:mm:ss.sss+zz:zz`.

**Contoh Nilai**

```
"2022-07-14T14:27:00+07:00"
```

## Observation.performer[i]

Berisi data siapa yang bertanggung jawab untuk menyatakan nilai observasi sebagai "benar" dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | CareTeam | Patient | RelatedPerson`, yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah ID Nakes yang didapatkan dari master Nakes indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000001"
  }
]
```

## Observation.value<?>

Berisi data mengenai informasi hasil aktual dari pengamatan.

### Observation.valueQuantity

Berisi data hasil observasi berupa numerik dengan satuan dengan tipe data `Quantity`.

**Contoh JSON**

```
{
  "value": 80,
  "unit": "beats/minute",
  "system": "http://unitsofmeasure.org",
  "code": "/min"
}
```

### Observation.valueCodeableConcept

Berisi data hasil observasi berupa kode dengan tipe data `CodeableConcept`.

### Observation.valueString

Berisi data hasil observasi berupa *string/text* dengan tipe data `string`.

### Observation.valueBooelean

Berisi data hasil observasi Ya/Tidak *(true/false)* dengan tipe data `boolean`.

### Observation.valueInteger

Berisi data hasil observasi berupa numerik tanpa memerlukan satuan dengan tipe data `integer`.

### Observation.valueRange

Berisi data hasil observasi berupa range dengan tipe data `Range`.

### Observation.valueRatio

Berisi data hasil observasi berupa rasio dengan tipe data `Ratio`.

### Observation.valueSampledData

Berisi data yang berasal dari serangkaian pengukuran yang dilakukan oleh alat, yang mungkin memiliki batas atas dan bawah. Tipe data juga mendukung lebih dari satu dimensi dengan tipe data `SampledData`.

### Observation.valueTime

Berisi data hasil observasi dalam satuan waktu yaitu hh:mm:ss dengan tipe data `time`.

### Observation.valueDateTime

Berisi data hasil observasi dalam bentuk tanggal, tanggal-waktu, atau tanggal parsial (cth. Tahun saja atau tahun + bulan) dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2018", "1973-06", "1905-08-23", "2015-02-07T13:28:17-05:00" atau "2017-01-01T00:00:00.000Z"
```

### Observation.valuePeriod

Berisi data hasil observasi berupa tanggal/waktu mulai dan berakhir dengan tipe data `Period`.

#### Observation.valuePeriod.start

Diisi dengan waktu mulai, sama dengan waktu observasi pasien dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2022-12-20T07:00:00+07:00"
```

#### Observation.valuePeriod.end

Diisi dengan waktu selesai, sama dengan waktu selesai observasi pasien dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2022-12-30T08:00:00+07:00"
```

## Observation.dataAbsentReason

Berisi data alasan hasil tidak tersedia dengan tipe data `CodeableConcept`.

### Observation.dataAbsentReason.coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada data terminologi DataAbsentReason. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
    "code": "unknown",
    "display": "Unknown"
  }
]
```

## Observation.interpretation[i]

Berisi data hasil kesimpulan dari observasi yang dilakukan dengan tipe data `CodeableConcept`.

### Observation.interpretation[i].coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada data terminologi Observation Interpretation Codes dan (http://terminology.kemkes.go.id/CodeSystem/clinical-term). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
    "code": "_GeneticObservationInterpretation",
    "display": "GeneticObservationInterpretation"
  }
]
```

## Observation.note[i]

Berisi data komentar tentang hasil observasi yang dapat mencakup pernyataan umum tentang observasi, atau pernyataan tentang nilai hasil yang signifikan, tidak terduga, atau tidak dapat diandalkan dengan tipe data `Annotation`.

## Observation.bodySite

Berisi data yang berkaitan dengan bagian tubuh yang diobservasi dengan tipe `CodeableConcept`.

### Observation.bodySite.coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada SNOMED CT Body Structures. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "106004",
    "display": "Structure of posterior carpal region"
  }
]
```

## Observation.method

Berisi data mekanisme atau metode yang dilakukan untuk melakukan observasi dengan tipe `CodeableConcept`.

### Observation.method.coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada ObservationMethods. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Observation.specimen

Berisi data spesimen yang digunakan ketika observasi dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Specimen`.

## Observation.device

Berisi data mengenai alat yang digunakan untuk menghasilkan data observasi, dengan tipe data `Reference`, data alat menggunakan referensi ke data yang tersimpan di *resource* `Device` atau `DeviceMetric`.

## Observation.referenceRange[i]

Berisi data panduan tentang cara menginterpretasikan nilai dengan membandingkannya dengan rentang nilai normal atau yang direkomendasikan. Rentang nilai normal dapat lebih dari satu apabila berbeda pada setiap populasi target dengan tipe data `BackboneElement`.

## Observation.referenceRange.low

Berisi data nilai batas bawah rentang referensi dengan tipe data `SimpleQuantity`.

## Observation.referenceRange.high

Berisi data nilai batas atas rentang referensi dengan tipe data `SimpleQuantity`.

## Observation.referenceRange.type

Berisi data yang berkaitan dengan rentang referensi kualifikasi yang digunakan untuk observasi dengan tipe data `CodeableConcept`.

### Observation.referenceRangeType.coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada Observation Reference Range Meaning Codes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/referencerange-meaning",
    "code": "type",
    "display": "Type"
  }
]
```

## Observation.referenceRange.appliesTo[i]

Berisi data mengenai kode untuk menunjukkan populasi target yang berlaku untuk rentang referensi ini, dengan tipe data `CodeableConcept`.

### Observation.referenceRange.age

Berisi satu atau lebih data mengenai usia saat rentang referensi ini berlaku. Ini adalah usia neonatus (mis. jumlah minggu saat aterm) dengan tipe data `Range`.

### Observation.referenceRange.text

Berisi data rentang referensi berbasis teks dalam pengamatan yang dapat digunakan ketika rentang kuantitatif tidak sesuai untuk pengamatan, dengan tipe data `string`. Contohnya adalah nilai referensi "Negatif" atau daftar atau tabel "normal".

## Observation.hasMember[i]

Berisi data *resource* terkait yang dimiliki oleh kelompok observasi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Observation | QuestionnaireResponse | MolecularSequence`.

## Observation.derivedFrom[i]

Berisi data target *resource* yang mewakili pengukuran di mana hasil observasi didapatkan dengan tipe data `Reference`, contohnya perhitungan anion gap atau pengukuran janin berdasarkan gambar ultrasound yang direferensikan ke data yang tersimpan di *resource* `DocumentReference | ImagingStudy | Media | QuestionnaireResponse | Observation | MolecularSequence`. Contohnya perhitungan anion gap atau pengukuran janin berdasarkan gambar ultrasound.

## Observation.component[i]

Berisi data mengenai beberapa pengamatan komponen. Pengamatan komponen ini dinyatakan sebagai pasangan nilai kode terpisah yang berbagi atribut yang sama dengan tipe data `BackboneElement`.

## \*Observation.component.code

Berisi satu atau lebih jenis observasi komponen (kode/jenis) dengan tipe data `CodeableConcept`.

## Observation.component.value<?>

Berisi data mengenai informasi hasil komponen aktual dari pengamatan.

### Observation.component.valueQuantity

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `Quantity`.

### Observation.component.valueCodeableConcept

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `CodeableConcept`.

### Observation.component.valueString

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `string`.

### Observation.component.valueBoolean

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe `boolean`.

### Observation.component.valueInteger

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `integer`.

### Observation.component.valueRange

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `Range`

### Observation.component.valueRatio

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `Ratio`.

### Observation.component.valueSampledData

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `SampledData`.

### Observation.component.valueTime

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `time`.

### Observation.component.valueDateTime

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

### Observation.component.valuePeriod

Berisi data mengenai informasi hasil komponen aktual dari pengamatan dengan tipe data `Period`.

## Observation.component.dataAbsentReason

Berisi data mengenai alasan mengapa nilai yang diharapkan dalam elemen `Observation.component.value[x]` hilang dengan tipe data `CodeableConcept`.

## Observation.component.interpretation[i]

Berisi satu atau lebih data penilaian kategoris dari nilai observasi dengan tipe data `CodeableConcept`. Misalnya, tinggi, rendah, normal.

## Observation.component.referenceRange[i]

Berisi data panduan tentang cara menginterpretasikan nilai dengan membandingkan rentang normal atau yang direkomendasikan dengan tipe data `BackboneElement`. Beberapa rentang referensi ditafsirkan sebagai **ATAU**. Dengan kata lain, untuk mewakili dua populasi target yang berbeda, dua elemen referenceRange akan digunakan.

## Observation.component.referenceRange.low

Berisi data mengenai nilai batas bawah rentang referensi.

## Observation.component.referenceRange.high

Berisi data mengenai nilai batas atas rentang referensi.

## Observation.component.referenceRange.type

Berisi satu atau lebih data mengenai kode untuk menunjukkan bagian mana dari populasi referensi yang ditargetkan berlaku dengan tipe data `CodeableConcept`. Misalnya, kisaran normal atau terapeutik.

## Observation.component.referenceRange.appliesTo[i]

Berisi satu atau lebih data mengenai kode untuk menunjukkan populasi target yang berlaku untuk rentang referensi ini dengan tipe data `CodeableConcept`. Misalnya, rentang referensi mungkin didasarkan pada populasi normal atau jenis kelamin atau ras tertentu. Beberapa applyTo ditafsirkan sebagai **DAN** dari populasi target. Misalnya, untuk mewakili populasi target wanita Afrika-Amerika, kode wanita dan kode untuk Afrika-Amerika akan digunakan.

## Observation.component.referenceRange.age

Berisi data mengenai usia saat rentang referensi ini berlaku dengan tipe data `Range`. Ini adalah usia neonatus (mis. jumlah minggu saat aterm).

## Observation.component.referenceRange.text

Berisi data mengenai rentang referensi berbasis teks dalam pengamatan yang dapat digunakan ketika rentang kuantitatif tidak sesuai untuk pengamatan dengan tipe data `string`. Contohnya adalah nilai referensi "Negatif" atau daftar atau tabel "normal".
