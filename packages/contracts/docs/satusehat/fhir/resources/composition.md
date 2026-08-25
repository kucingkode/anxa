> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/composition/

---

# Composition

Data klasifikasi diet dari pasien yang bersangkutan akan dipetakan dengan menggunakan standar FHIR DomainResource dengan tipe `Composition`.

Berikut pemetaan nilai untuk Composition yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data diet pasien:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Composition.identifier

Berisi satu atau lebih daftar data id internal faskes untuk dokumen/composition ini yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### Composition.identifier.use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Composition.identifier.system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/composition/{{organization-ihs-number}}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor ID organisasi induk yang didapatkan dari master sarana indeks.

### Composition.identifier.value

Berisi kode atau nomor ID lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/composition/10000004",
    "use": "official",
    "value": "P20240001"
  }
]
```

## \*Composition.status

Berisi status dari dokumen yang setiap datanya direpresentasikan dengan tipe data `code`, yang nilainya mengacu pada data terminologi CompositionStatus. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"preliminary"
```

## \*Composition.type

Berkaitan dengan menspesifikan jenis komposisi khusus (contoh: riwayat kesehatan, ringkasan pulang, dan catatan progres). Hal ini biasanya disamakan dengan tujuan dari pembuatan komposisi yang mengacu pada: LOINC dengan tipe data `CodeableConcept`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### \*Composition.type.coding

Berisi satu atau lebih kode status klinis dari data diet pasien dengan tipe data `Coding` yang nilainya mengacu pada data terminologi LOINC. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://loinc.org",
    "code": "18842-5",
    "display": "Discharge Summary"
  }
]
```

## Composition.category[i]

Berkaitan dengan kategori dari `Composition`. Hal ini biasanya disamakan dengan tujuan dari pembuatan komposisi dengan tipe data `CodeableConcept`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Composition.category[i].coding

Berisi data kode kategori `Composition` dengan tipe data `Coding` yang nilainya mengacu pada data terminologi LOINC. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://loinc.org",
    "code": "LP173421-1",
    "display": "Report"
  }
]
```

## \*Composition.subject

Berkaitan dengan subjek dari `Composition` itu sendiri yang setiap datanya direpresentasikan dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di resource `Patient`, yang nilainya memiliki format:

```
"Patient/{patient-ihs-number}"
```

Di mana isi dari parameter `{patient-ihs-number}` adalah nomor ID `Patient` yang didapatkan dari master pasien indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  }
]
```

## Composition.encounter

Berisi informasi terkait kunjungan di mana diagnosis ditegakkan yang setiap datanya direpresentasikan dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di resources `Encounter` di mana diagnosis ini dibuat, yang nilainya memiliki format:

```
"Encounter/{id-resource-Encounter}"
```

Di mana isi dari parameter {id-resource-Encounter} adalah ID resource `Encounter` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Encounter/4c4d890d-fd63-49e0-bad6-7df4dc443125"
  }
]
```

## \*Composition.date

Berisi waktu terakhir composition dibuat atau diedit dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
[
  "2015-02-07T13:28:17.239+02:00 or 2017-01-01T00:00:00Z"
]
```

## \*Composition.author[i]

Berisi informasi siapa saja yang membuat `Composition`. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Device | Patient | RelatedPerson | Organization`, yang nilainya memiliki format:

```
[
  "Practitioner/{practitioner-ihs-number}"
]
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah ID NAKES yang didapatkan dari master Nakes indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000001",
    "display": "Dokter Bronsig"
  }
]
```

## \*Composition.title

Berisi judul dari dokumen `Composition` dengan tipe data `string`.

**Contoh JSON**

```
[
  {
    "title": "Resume Medis Rawat Jalan"
  }
]
```

## Composition.confidentiality

Berisi status terkait kerahasiaan dokumen yang setiap datanya direpresentasikan dengan tipe data `code`, yang nilainya mengacu pada data terminologi v3.ConfidentialityClassification . Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Composition.attester[i]

Berisi satu atau lebih data peserta yang telah membuktikan keakuratan komposisi/dokumen dengan tipe `BackboneElement`.

## \*Composition.attester.mode

Berisi informasi bagaimana seorang individu mengautentifikasi sebuah dokumen yang setiap datanya direpresentasikan dengan tipe data `code`, yang nilainya mengacu pada data terminologi Composition Attestation Mode. Wajib diisi ketika mengirimkan data `Composition.attester`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Composition.attester.time

Berisi informasi mengenai kapan dokumen diautentifikasi dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2015-02-07T13:28:17.239+02:00 or 2017-01-01T00:00:00Z"
```

## Composition.attester.party

Berisi informasi siapa saja yang melakukan autentifikasi. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Patient | RelatedPerson | Practitioner | PractitionerRole | Organization` yang nilainya memiliki format:

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

## Composition.custodian

Berisi informasi mengenai organisasi yang melakukan pemeliharaan terhadap dokumen dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Organization` yang nilainya memiliki format:

```
[
  "Organization/{organization-ihs-number}"
]
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi yang didapatkan dari Master Sarana Indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Organization/10000004"
  }
]
```

## Composition.relatesTo[i]

Berisi satu atau lebih data mengenai informasi hubungan komposisi ini dengan komposisi atau dokumen lain yang sudah ada dengan tipe data `BackboneElement`.

## \*Composition.relatesTo.code

Berisi informasi mengenai tipe hubungan antar dokumen yang setiap datanya direpresentasikan dengan tipe data `code`, yang nilainya mengacu pada data terminologi DocumentRelationshipType.

|  |  |
| --- | --- |
|  | Apablia `Composition.relatesTo` digunakan, maka `Composition.relatesTo[i].code` dan `Composition.relatesTo[i].target` wajib di kirimkan. |

## \*Composition.relatesTo.target<?>

Merupakan target dari hubungan antar dokumen.

### Composition.relatesTo.target.targetIdentifier

Berisi target dari hubungan antar dokumen dengan tipe data `Identifier`.

### Composition.relatesTo.target.targetReference

Berisi target dari hubungan antar dokumen dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Composition` yang nilainya memiliki format:

```
[
  "Composition/{ID-resource-Composition}"
]
```

Di mana isi dari parameter {id-resource-Composition} adalah ID `Composition` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

## Composition.event[i]

Berisi satu atau lebih data layanan klinis, seperti kolonoskopi atau usus buntu, didokumentasikan dengan tipe data `BackboneElement`.

## Composition.event.code[i]

Berisi satu atau lebih data kode yang digunakan untuk mendokumentasikan informasi layanan klinis yang setiap datanya direpresentasikan dengan tipe data `CodeableConcept`.

## Composition.event.period

Berisi informasi mengenai periode yang dicakup oleh dokumentasi layanan klinis dengan tipe data `Period`.

## Composition.event.detail[i]

Berisi satu atau lebih data mengenai detail event layanan klinis dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Resource`.

## Composition.section[i]

Berisi data awal dari bagian yang membentuk komposisi dengan tipe data `BackboneElement`.

## Composition.section.title

Berisi informasi mengenai judul dari bagian `Composition` dengan tipe data `string`.

## Composition.section.code

Berisi data informasi yang berkaitan dengan kode yang mengidentifikasi jenis konten yang terkandung dalam bagian dimaksud yang harus konsisten dengan judul bagian dengan tipe data `CodeableConcept`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Composition.section.code.coding

Berisi satu atau lebih data kode status yang mengidentifikasi jenis konten yang terkandung dalam bagian dimaksud yang harus konsisten dengan judul bagian dengan tipe data `Coding` yang nilainya mengacu pada data terminologi LOINC.

**Contoh JSON**

```
[
  {
    "system": "http://loinc.org",
    "code": "42334-2",
    "display": "Discharge diet (narrative)"
  }
]
```

## Composition.section.author[i]

Berisi satu atau lebih data mengenai individu yang menuliskan bagian dari `Composition`. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Device | Patient | RelatedPerson | Organization`.

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000001",
    "display": "Dokter Bronsig"
  }
]
```

## Composition.section.focus

Berisi data mengenai

## Composition.section.text

Berisi data mengenai ringkasan teks yang diambil dari `Composition` dengan tipe data `Narrative`.

### Composition.section.text.status

Berisi status dari ringkasan teks yang diambil, di mana setiap datanya direpresentasikan dengan tipe data `code` yang mengacu pada `CodeSystem` (https://hl7.org/FHIR/codesystem-narrative-status.html).

**Contoh JSON**

```
[
  {
    "status": "additional"
  }
]
```

### Composition.section.text.div

Berisi informasi yang berkaitan dengan konten narasi faktual pada versi `XHTML` yang terbagi dan mengikuti.

## Composition.section.mode

Berisi informasi mengenai bagaimana suatu entri disiapkan untuk dijadikan ke dalam dokumentasi `Composition` yang setiap datanya direpresentasikan dengan tipe data `code` yang mengacu pada `CodeSystem` (http://hl7.org/fhir/list-mode). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Composition.section.orderedBy

Berisi informasi mengenai bagaimana suatu urutan item dalam bagian `Composition` diurutkan dengan tipe data `CodeableConcept`.

### Composition.section.orderedBy.coding

Berisi data kode urutan item `Composition` dengan tipe data `coding` yang nilainya mengacu pada data terminologi LOINC. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/list-order",
    "code": "user",
    "display": "Sorted by User"
  }
]
```

## Composition.section.entry[i]

Berisi satu atau lebih data mengenai referensi data yang mendukung pada bagian Composition ini. Pada bagian ini berisi data dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di semua *resource* yang ada dalam FHIR.

## Composition.section.emptyReason

Berisi informasi mengenai alasan mengapa suatu bagian dari `Composition` kosong yang setiap datanya direpresentasikan dengan tipe data `CodeableConcept`.

### Composition.section.emptyReason.coding

Berisi data kode status mengapa suatu `Composition` kosong dengan tipe data `Coding` yang nilainya mengacu pada data terminologi LOINC. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/list-empty-reason",
    "code": "nilknown",
    "display": "Nil Known"
  }
]
```

## Composition.section.section[i]

Berisi data sub-bagian dengan tipe data `see (section)`.
