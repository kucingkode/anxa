> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/specimen/

---

# Specimen

Pengiriman data spesimen yang digunakan pada pemeriksaan laboratorium dapat dikirimkan menggunakan *resource* `Specimen`. Data spesimen yang dapat dikirimkan antara lain jenis spesimen, waktu pengambilan spesimen, metode pengambilan spesimen, pasien terkait, kunjungan terkait, waktu spesimen diterima, tenaga kesehatan yang melakukan pengambilan sampel, permintaan terkait.

Satu *payload* atau satu *record* dari *resource* `Specimen` hanya dapat digunakan untuk 1 kode jenis spesimen. Sehingga, apabila diambil 2 jenis spesimen, sebagai contoh spesimen darah dan urin, maka perlu mengirimkan 2 *payload* di mana 1 *payload* berisi 1 kode spesimen darah dan 1 *payload* berisi kode spesimen urin.

Berikut pemetaan nilai untuk Specimen yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data spesimen:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Specimen.identifier[i]

Berisi data id lokal dari masing-masing institusi terkait permintaan pemeriksaan penunjang dengan tipe data `Identifier`.

### Specimen.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Specimen.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/specimen/{organization-ihs-number}
```

Di mana isi dari paramete `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### Specimen.identifier[i].value

Berisi kode atau nomor internal sub organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/specimen/10000004",
    "use": "official",
    "value": "00001"
  }
]
```

## Specimen.accesssionIdentifier

Berisi data identifier tambahan yang diberikan oleh laboratorium ketika mendapatkan spesimen (*accessioning specimen*). Identifier ini tidak harus sama dengan `Specimen.identifier`, tergantung dengan prosedur yang ada di laboratorium tersebut dengan tipe data `Identifier`.

## \*Specimen.status

Berisi satu atau lebih data status kondisi dan ketersediaan spesimen dengan tipe data `code`, yang nilainya mengacu pada data terminologi SpecimenStatus. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"available"
```

## \*Specimen.type

Berisi data jenis spesimen dengan tipe data `CodeableConcept`, yang nilainya mengacu pada kode SNOMED-CT yang tersedia dalam Global Patient Set. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Specimen.type.coding

Berisi data jenis spesimen dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "119294007",
    "display": "Dried blood specimen"
  }
]
```

## \*Specimen.subject

Berisi data subjek dari spesimen yang diambil dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Group | Device | Substance | Location`, yang nilainya memiliki format:

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

## Specimen.receivedTime

Berisi data kapan spesimen diterima oleh laboratorium dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh JSON**

```
"receivedTime": "2022-06-14T08:25:00+07:00",
```

## Specimen.parent[i]

Berisi data spesimen di mana spesimen ini berasal dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Specimen`.

## Specimen.request[i]

Berisi data permintaan yang mendasari diambilnya specimen dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `ServiceRequest`.

**Contoh JSON**

```
[
  {
    "reference": "ServiceRequest/61419a9c-51f9-4491-a6d0-e40e7c0eb7ab"
  }
]
```

## Specimen.collection

Berisi data mengenai detail pengambilan spesimen dengan tipe data `BackboneElement`

## Specimen.collection.collector

Berisi data siapa yang mengambil spesimen dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole`.

## Specimen.collection.collected<?>

Berisi data waktu diambilnya spesimen.

### Specimen.collection.collectedDateTime

Berisi data mengenai kapan diambilnya spesimen dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh JSON**

```
"2022-06-14T08:15:00+07:00"
```

### Specimen.collection.collectedPeriod

Berisi data waktu dari spesimen dimulai sampai selesai (*arrived to finished*) dengan tipe data `Period`.

#### Specimen.collection.collectedPeriod.start

Diisi dengan waktu mulai, sama dengan waktu spesimen pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

#### Specimen.collection.collectedPeriod.end

Diisi dengan waktu selesai, sama dengan waktu selesai spesimen pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-30"
```

## Specimen.collection.duration

Berisi data berapa lama durasi pengambilan spesimen dengan tipe data `Duration`.

## Specimen.collection.quantity

Berisi data berapa banyak jumlah spesimen yang diambil (misalnya volume darah) dengan tipe data `SimpleQuantity`.

## Specimen.collection.method

Berisi data kode yang menspesifikan teknik pengambilan spesimen dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data kode SNOMED-CT yang tersedia dalam `Global Patient Set` dari SNOMED Internasional. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Specimen.collection.method.coding

Berisi data kode yang menspesifikan teknik pengambilan spesimen dengan tipe data `Coding`,

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "115985003",
    "display": "Sweat collection by iontophoresis procedure (regime/therapy)"
  }
]
```

## Specimen.collection.bodySite

Berisi data lokasi pengambilan sampel dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data lokasi tubuh SNOMED-CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "106004",
    "display": "Posterior carpal region"
  }
]
```

## Specimen.collection.fastingStatus<?>

Berisi data durasi puasa makan/minum/keduanya sebelum pengambilan sampel.

### Specimen.collection.fastingStatusCodeableConcept

Berisi data durasi puasa makan/minum/keduanya sebelum pengambilan sampel dengan tipe data `Coding`, yang nilainya memiliki format:

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v2-0916",
    "code": "F",
    "display": "Patient was fasting prior to the procedure"
  }
]
```

### Specimen.collection.fastingStatusDuration

Berisi data durasi puasa yang dilakukan pasien dengan tipe data `Duration`.

## Specimen.processing[i]

Berisi data metode atau langkah pemrosesan spesimen dengan tipe data `BackboneElement`.

## Specimen.processing.description

Berisi data deskripsi naratif dari prosedur dengan tipe data `string`.

## Specimen.processing.procedure

Berisi data metode prosesing kode yang digunakan untuk memproses spesimen dengan tipe data `CodeableConcept`.

### Specimen.processing.procedure.coding

Berisi data metode prosesing kode yang digunakan untuk memproses spesimen dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "313513005",
    "display": "Sweat weight measurement (procedure)"
  }
]
```

## Specimen.processing.additive[i]

Berisi data material aditif yang diberikan selama pemrosesan spesimen dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Substance`.

## Specimen.processing.time<?>

Berisi data waktu pemrosesan spesimen.

### Specimen.processing.timeDateTime

Berisi data mengenai waktu pemrosesan spesimen dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

### Specimen.processing.timePeriod

Berisi data waktu dari pemrosesan spesimen dimulai sampai selesai (*arrived to finished*) dengan tipe data `Period`.

#### Specimen.processing.timePeriod.start

Diisi dengan waktu mulai, sama dengan waktu spesimen pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

#### Specimen.processing.timePeriod.end

Diisi dengan waktu selesai, sama dengan waktu selesai spesimen pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-30"
```

## Specimen.container[i]

Berisi data kontainer/wadah penampungan spesimen dengan tipe data `BackboneElement`.

## Specimen.container.identifier[i]

Berisi data id Kontainer yang bisa mencakup barcode atau label dari laboratorium dengan tipe data `Identifier`.

## Specimen.container.description

Berisi data deskripsi naratif dari kontainer/wadah dengan tipe data `string`.

## Specimen.container.type

Berisi data tipe kontainer dari spesimen (*slide*, *aliquot*, dll) dengan tipe data `CodeableConcept`.

### Specimen.container.type.coding

Berisi data tipe kontainer dari spesimen dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi Valueset-specimen-container-type - FHIR v4.0.1. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "22566001",
    "display": "Cytology brush, device"
  }
]
```

## Specimen.container.capacity

Berisi data kapasitas (volume atau ukuran lainnya) dari kontainer dengan tipe data `SimpleQuantity`.

## Specimen.container.specimenQuantity

Berisi data jumlah spesimen di dalam kontainer (volume, dimensi, lainnya) dengan tipe data `SimpleQuantity`.

## Specimen.container.additive<?>

Berisi data zat yang digunakan untuk mengawetkan, menjaga kualitas, atau meningkatkan kualitas spesimen.

## Specimen.container.additiveCodeableConcept

Berisi data zat yang digunakan untuk mengawetkan, menjaga kualitas, atau meningkatkan kualitas spesimen dengan tipe data `CodeableConcept`.

### Specimen.container.additiveCodeableConcept.coding

Berisi data zat yang digunakan untuk mengawetkan, menjaga kualitas, atau meningkatkan kualitas spesimen dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi HL7 Version 2 Table 0371. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v2-0371",
    "code": "ACDA",
    "display": "ACD Solution A"
  }
]
```

## Specimen.container.additiveReference

Berisi data zat yang digunakan untuk mengawetkan, menjaga kualitas, atau meningkatkan kualitas spesimen dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Substance`.

## Specimen.condition[i]

Berisi data yang menjelaskan kondisi spesimen dengan tipe data `CodeableConcept`.

### Specimen.condition[i].coding

Berisi data yang menjelaskan kondisi spesimen dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v2-0493",
    "code": "AUT",
    "display": "Autolyzed"
  }
]
```

## Specimen.note[i]

Berisi data keterangan tambahan spesimen dengan tipe data `Annotation`.

## \*Specimen.extension:transportedTime

Berisi data mengenai kapan diambilnya spesimen dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY-MM-DDThh:mm:ss+zz:zz`.

## Specimen.extension:transportedPerson

Berisi data keterangan subjek yang mengirimkan spesimen dengan tipe data `ContactDetail`.

## Specimen.extension:ReceivedPerson

Berisi data keterangan subjek yang menerima spesimen, dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner`.
