> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/diagnostic-report/

---

# DiagnosticReport

Laporan hasil pemeriksaan akan dikirimkan melalui *resource* `DiagnosticReport`. Berikut adalah ketentuan pengisian laporan pemeriksaan penunjang laboratorium melalui *resource* `DiagnosticReport`.

Data di *resource* `DiagnosticReport` akan mereferensi ke hasil pemeriksaan laboratorium terkait pada *resource* `Observation` melalui `DiagnosticReport.result`, spesimen terkait pada *resource* `Specimen` melalui `DiagnosticReport.specimen`, dan permintaan pemeriksaan penunjang terkait pada *resource* `ServiceRequest` melalui `DiagnosticReport.basedOn`. Kode LOINC atau kode Pemeriksaan Penunjang Nasional digunakan pada elemen `DiagnosticReport.code` untuk merepresentasikan nama pemeriksaan yang dilaporkan. Referensi pemetaan parameter laboratorium ke kode LOINC dapat dilihat melalui **Lampiran LOINC Laboratorium**. Gunakan parameter pemeriksaan dengan kategori “Permintaan” atau “Permintaan & Hasil” pada *file* Terminologi Laboratorium melalui *resource* `DiagnosticReport`. Kode yang dicantumkan dalam `DiagnosticReport.code` akan sama dengan kode yang dicantumkan pada `ServiceRequest.code` terkait.

Satu *payload* atau satu *record* dari *resource* `DiagnosticReport` hanya dapat digunakan untuk 1 kode/laporan parameter laboratorium. Sehingga, apabila dilakukan permintaan 2 parameter laboratorium, sebagai contoh panel elektrolit dan hemoglobin, maka perlu mengirimkan 2 *payload* laporan melalui *resource* `DiagnosticReport` di mana 1 *payload* berisi 1 kode panel elektrolit dan 1 *payload* berisi kode parameter hemoglobin.

Berikut pemetaan nilai untuk DiagnosticReport yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data laporan hasil pemeriksaan:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## DiagnosticReport.identifier[i]

Berisi satu atau lebih daftar data mengenai ID internal faskes untuk laporan hasil ini. Ini adalah ID resmi yang diterbitkan oleh faskes untuk menandai laporan hasil pasien yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### DiagnosticReport.identifier[i].use

Berisi data dengan tipe data code, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### DiagnosticReport.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/diagnostic/{{organization-ihs-number}}/lab
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### DiagnosticReport.identifier[i].value

Berisi kode atau ID lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/diagnostic/10000004/lab",
    "use": "official",
    "value": "5234342"
  }
]
```

## DiagnosticReport.basedOn[i]

Berisi data pemeriksaan apa yang diminta. Misalnya, untuk pemeriksaan laboratorium dan *radiology* akan merefer ke permintaan laboratorium menggunakan *resource* `ServiceRequest` dengan tipe data Reference, yang direferensikan ke data yang tersimpan di *resource* `MedicationRequest` atau `ServiceRequest`, yang nilainya memiliki format:

```
[
  "ServiceRequest/{ID-resource-ServiceRequest}"
]
```

Di mana isi dari parameter {id-resource-ServiceRequest} adalah ID *resource* `ServiceRequest` yang didapatkan dari server.

**Contoh JSON**

```
[
  {
    "reference": "ServiceRequest/2e261ca8-0025-11ed-b939-0242ac120002"
  }
]
```

## \*DiagnosticReport.status

Berisi data status dari laporan pemeriksaan dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  "registered"
]
```

## DiagnosticReport.category[i]

Berisi satu atau lebih data kode yang mengklasifikasikan disiplin klinis, departemen, atau layanan diagnostik yang membuat laporan dengan tipe data `CodeableConcept`.

### DiagnosticReport.category[i].coding

Berisi data kode yang mengklasifikasikan jenis umum laporan yang dibuat dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
    "code": "AU",
    "display": "Audiology"
  }
]
```

## \*DiagnosticReport.code

Berisi data tipe laporan / nama laporan, untuk laporan pemeriksaan penunjang, maka akan digunakan kode LOINC. Apabila pemeriksaan penunjang tersebut tidak tersedia kodenya pada LOINC, akan menggunakan kode pemeriksaan penunjang nasional yang disiapkan oleh kementerian kesehatandengan tipe data `CodeableConcept`.

### \*DiagnosticReport.code.coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada data terminologi LOINC. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://loinc.org",
    "code": "11477-7",
    "display": "Microscopic observation [Identifier] in Sputum by Acid fast stain"
  }
]
```

## \*DiagnosticReport.subject

Berisi data pasien yang memiliki hasil laporan tersebut dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Group | Device | Location | Organization | Procedure | Practitioner | Medication | Substance`, yang nilainya memiliki format:

```
[
  "Patient/{patient-ihs-number}"
]
```

Di mana isi dari parameter `{patient-ihs-number}` adalah nomor ID `Patient` yang didapatkan dari master pasien indeks.

**Contoh JSON**

```
[
  {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  }
]
```

## \*DiagnosticReport.encounter

Berisi data kunjungan di mana hasil laporan didapatkan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
[
  "Encounter/{ID-resource-Encounter}"
]
```

Di mana isi dari parameter {id-resource-Encounter} adalah ID *resource* `Encounter` yang didapatkan dari server.

**Contoh JSON**

```
[
  {
    "reference": "Encounter/0a26ca28-0ea3-486d-8fa9-6f9edd37e567"
  }
]
```

## DiagnosticReport.effective<?>

Berisi data waktu atau periode laporan yang diamati dinyatakan benar, pengisian dapat memilih salah satu dari tipe data berikut: `dateTime | Period | Timing | instant`.

### DiagnosticReport.effectiveDateTime

Berisi data waktu atau periode laporan atau kesimpulan yang diamati dinyatakan benar dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

### DiagnosticReport.effectivePeriod

Berisi data waktu dari periode laporan atau kesimpulan yang diamati dimulai sampai selesai *(arrived to finished)* dengan tipe data `Period`.

#### DiagnosticReport.effectivePeriod.start

Diisi dengan waktu mulai, sama dengan waktu periode laporan/kesimpulan yang diamati pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

#### DiagnosticReport.effectivePeriod.end

Diisi dengan waktu selesai, sama dengan waktu selesai periode laporan atau kesimpulan yang diamati pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-30"
```

## DiagnosticReport.issued

Berisi data tanggal dan waktu versi laporan ini tersedia, biasanya setelah hasilnya ditinjau/direview dan diverifikasi dengan tipe data instant dalam format `YYYY-MM-DDThh:mm:ss.sss+zz:zz`.

**Contoh Nilai**

```
"2015-02-07T13:28:17.239+02:00 or 2017-01-01T00:00:00Z"
```

## DiagnosticReport.performer[i]

Berisi data siapa yang berwenang mengeluarkan laporan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | CareTeam`, yang nilainya memiliki format:

```
[
  "Organization/{organization-ihs-number}"
]
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

**Contoh JSON**

```
[
  {
    "reference": "Organization/N10000001"
  }
]
```

## DiagnosticReport.resultInterpreter[i]

Berisi data individu utama yang melakukan interpretasi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | CareTeam`, yang nilainya memiliki format:

**Contoh JSON**

```
[
  {
    "Practitioner/{practitioner-ihs-number}"
  }
]
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

## DiagnosticReport.specimen[i]

Berisi data spesimen yang digunakan ketika observasi dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Specimen`, yang nilainya memiliki format:

**Contoh JSON**

```
[
  {
    "reference": "Specimen/9007e5e1-1ff6-4926-a191-9a0d07ce6e9c"
  }
]
```

|  |  |
| --- | --- |
|  | `DiagnosticReport.specimen[i]` **WAJIB** dikirimkan dipemeriksaan **laboratorium**. |

## DiagnosticReport.result[i]

Berisi data hasil pemeriksaan laboratorium dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Observation`, yang nilainya memiliki format:

```
[
  "Observation/{ID-resource-Observation}"
]
```

Di mana isi dari parameter {id-resource-Observation} adalah ID *resource* `Observation` yang didapatkan dari server.

**Contoh JSON**

```
[
  {
    "reference": "Observation/bf94ed99-6536-4bad-9e75-fc3bb32e0da0"
  }
]
```

## DiagnosticReport.imagingStudy[i]

Berisi data detail lengkap imaging terkait laporan hasil radiologi menggunakan DICOM dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `ImagingStudy`.

|  |  |
| --- | --- |
|  | `DiagnosticReport.imagingStudy[i]` **WAJIB** dikirimkan dipemeriksaan **radiologi**. |

## DiagnosticReport.media[i]

Berisi data *key images* dari laporan hasil dengan format non-DICOM, video, atau audio dengan tipe data `BackboneElement`.

## DiagnosticReport.media.comment

Berisi komentar atau penjelasan terkait media/gambar yang ada dengan tipe data `string`.

## \*DiagnosticReport.media.link

Berisi sumber gambar dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Image`.

## DiagnosticReport.conclusion

Berisi data kesimpulan atau interpretasi dari hasil laboratorium dengan tipe data `string`.

## DiagnosticReport.conclusionCode[i]

Berisi data kesimpulan atau interpretasi dari hasil laboratorium dengan tipe data `CodeableConcept`.

## DiagnosticReport.presentedForm[i]

Berisi data representasi *rich text* dari seluruh hasil dengan tipe data `Attachment`.
