> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/allergy-intolerance/

---

# AllergyIntolerance

Pasien mungkin memiliki informasi alergi terhadap zat atau bahan tertentu. Informasi tersebut dapat dimasukkan menggunakan *resource* `AllergyIntolerance`.

Berikut pemetaan nilai untuk AllergyIntolerance yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data alergi:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## AllergyIntolerance.identifier[i]

Berisi satu atau lebih daftar data id internal faskes untuk data alergi ini. Ini adalah id resmi yang diterbitkan oleh masing-masing faskes untuk menandai alergi pasien dengan tipe data `Identifier`.

### AllergyIntolerance.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### AllergyIntolerance.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/allergy/{{organization-ihs-number}}/
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### AllergyIntolerance.identifier[i].value

Berisi kode atau id lokal/nomor pencatatan alergi lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/allergy/1000004",
    "use": "official",
    "value": "98457729"
  }
]
```

## AllergyIntolerance.clinicalStatus

Berisi satu atau lebih data yang berkaitan dengan status klinis alergi atau intoleransi pasien dengan tipe data `CodeableConcept`.

### AllergyIntolerance.clinicalStatus.coding

Berisi data yang berkaitan dengan status klinis alergi atau intoleransi pasien dengan tipe data `Coding`, yang nilainya merujuk pada data terminologi AllergyIntolerance Clinical Status Codes. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
    "code": "active",
    "display": "Active"
  }
]
```

## AllergyIntolerance.verificationStatus

Berisi satu atau lebih data yang berkaitan dengan pernyataan tentang kepastian berhubungan dengan kecenderungan atau potensial dari reaksi terhadap substansi teridentifikasi dengan tipe data `CodeableConcept`.

### AllergyIntolerance.verificationStatus.coding

Berisi data yang berkaitan dengan pernyataan tentang kepastian berhubungan dengan kecenderungan atau potensial dari reaksi terhadap substansi teridentifikasi dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi AllergyIntoleranceVerificationStatusCodes Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
    "code": "unconfirmed",
    "display": "Unconfirmed"
  }
]
```

## AllergyIntolerance.type

Berisi data identifikasi dari mekanisme fisiologis penyebab risiko reaksi terhadap zat dengan tipe data `code`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"allergy"
```

## \*AllergyIntolerance.category[i]

Berisi data yang berkaitan dengan kategori dari zat atau allergen dengan tipe data `code`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"food"
```

## AllergyIntolerance.criticality

Berisi data yang berkaitan dengan potensi bahaya klinis atau tingkat keseriusan dari reaksi terhadap zat dengan tipe data `code`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"low"
```

## \*AllergyIntolerance.code

Berisi satu atau lebih data kode untuk menunjukkan zat atau alergen yang menyebabkan alergi atau intoleransi dan juga kondisi di mana tidak diketahui kondisi alerginya dengan tipe data `CodeableConcept`.

### AllergyIntolerance.code.coding

Berisi data kode untuk menunjukkan zat atau alergen yang menyebabkan alergi atau intoleransi dan juga kondisi di mana tidak diketahui kondisi alerginya dengan tipe data `Coding`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "89811004",
    "display": "Gluten (substance)"
  }
]
```

## \*AllergyIntolerance.patient

Berisi satu atau lebih pasien yang memiliki alergi atau intoleransi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient` , yang nilainya memiliki format:

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

## AllergyIntolerance.encounter

Berisi satu atau lebih data kunjungan di mana data alergi dicatatkan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter` , yang nilainya memiliki format:

```
"Encounter/{id-resource-Encounter}"
```

Di mana isi dari parameter {id-resource-Encounter} adalah ID Encounter yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Encounter/0a26ca28-0ea3-486d-8fa9-6f9edd37e567"
  }
]
```

## AllergyIntolerance.onset<?>

Berisi data mengenai perkiraan atau tanggal aktual, tanggal-waktu, dan atau usia saat alergi atau intoleransi teridentifikasi.

### AllergyIntolerance.onsetDateTime

Berisi data mengenai kapan alergi atau intoleransi diidentifikasi dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

### AllergyIntolerance.onsetAge

Berisi data mengenai kapan alergi atau intoleransi diidentifikasi dengan tipe data `Age`.

### AllergyIntolerance.onsetPeriod

Berisi data waktu dari alergi atau intoleransi dimulai sampai selesai (*arrived to finished*) dengan tipe data `Period`.

#### AllergyIntolerance.onsetPeriod.start

Diisi dengan waktu mulai, sama dengan waktu identifikasi alergi atau intoleransi pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

#### AllergyIntolerance.onsetPeriod.end

Diisi dengan waktu selesai, sama dengan waktu selesai identifikasi alergi atau intoleransi pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-30"
```

### AllergyIntolerance.onsetRange

Berisi data mengenai kapan alergi atau intoleransi diidentifikasi dengan tipe data `Range`.

### AllergyIntolerance.onsetString

Berisi data mengenai kapan alergi atau intoleransi diidentifikasi dengan tipe data `string`.

## AllergyIntolerance.recordedDate

Berisi data alergi yang menunjukkan kapan alergi atau intoleransi ini tercatat dalam sistem (tanggal yang dibuat oleh sistem) dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## AllergyIntolerance.recorder

Berisi data individu yang mencatat kondisi dan bertanggung jawab terhadap informasinya dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner |PractitionerRole | Patient | RelatedPerson`, yang nilainya memiliki format:

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

## AllergyIntolerance.asserter

Berisi sumber informasi dari data alergi yang dicatatkan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | RelatedPerson | Practitioner |PractitionerRole`.

## AllergyIntolerance.lastOccurrence

Berisi data mengenai kapan reaksi alergi terjadi dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## AllergyIntolerance.note[i]

Berisi satu atau lebih data informasi terkait alergi berupa teks yang belum terakomodasi dalam elemen lain dengan tipe data `Annotation`.

## AllergyIntolerance.reaction[i]

Berisi satu atau lebih detail data tentang setiap peristiwa reaksi merugikan yang terkait dengan paparan zat yang teridentifikasi dengan tipe data `BackboneElement`.

## AllergyIntolerance.reaction.substance

Berisi satu atau lebih data zat atau substansi spesifik yang menimbulkan kejadian reaksi alergi atau intoleransi dengan tipe data `CodeableConcept`.

### AllergyIntolerance.reaction.substance.coding

Berisi data zat atau substansi spesifik yang menimbulkan kejadian reaksi alergi atau intoleransi dengan tipe data `Coding`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
    "code": "AL000024",
    "display": "Kuning telur"
  }
]
```

## \*AllergyIntolerance.reaction.manifestation[i]

Berisi satu atau lebih data tanda dan gejala yang diobservasi atau terkait dengan reaksi terhadap alergen dengan tipe data `CodeableConcept`.

### AllergyIntolerance.reaction.manifestation.coding

Berisi data tanda dan gejala yang diobservasi atau terkait dengan reaksi terhadap alergen dengan tipe data `Coding`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "126485001",
    "display": "Urticaria (disorder)"
  }
]
```

## AllergyIntolerance.reaction.description

Berisi satu atau lebih data mengenai deskripsi manifestasi reaksi alergi dalam bentuk teks secara detail bila diperlukan dengan tipe data `string`.

## AllergyIntolerance.reaction.onset

Berisi data mengenai kapan reaksi alergi terjadi dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## AllergyIntolerance.reaction.severity

Berisi data mengenai penilaian klinis dari tingkat keparahan reaksi dengan tipe data `code`.

## AllergyIntolerance.reaction.exposureRoute

Berisi data identifikasi rute paparan terhadap zat atau substansi alergen dengan tipe data `CodeableConcept`.

### AllergyIntolerance.reaction.exposureRoute.coding

Berisi data identifikasi rute paparan terhadap zat atau substansi alergen dengan tipe data `Coding`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "6064005",
    "display": "Topical route"
  }
]
```

## AllergyIntolerance.reaction.note[i]

Berisi satu atau lebih data informasi tambahan dalam bentuk teks untuk melaporkan kejadian terkait alergi yang belum terakomodasi pada elemen lain dengan tipe data `Annotation`.
