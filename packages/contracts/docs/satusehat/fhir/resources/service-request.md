> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/service-request/

---

# ServiceRequest

Pengiriman data rencana tindak lanjut dapat dikirimkan menggunakan *resource* `ServiceRequest`.

Berikut pemetaan nilai untuk ServiceRequest yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data instruksi untuk tindak lanjut:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## ServiceRequest.identifier[i]

Berisi data id lokal dari masing-masing institusi terkait tindak lanjut/cara keluar dari rumah sakit dengan tipe data `Identifier`.

### ServiceRequest.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### ServiceRequest.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/servicerequest/{{organization-ihs-number}}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### ServiceRequest.identifier[i].value

Berisi kode atau nomor id lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/servicerequest/10080017",
    "use": "official",
    "value": "00001"
  }
]
```

## ServiceRequest.instantiatesCanonical[i]

Berisi data URL yang menunjuk ke protokol, pedoman, urutan pesanan, atau definisi lain yang ditetapkan FHIR yang dipatuhi seluruhnya atau sebagian oleh permintaan layanan ini dengan tipe data `canonical` yang nilainya mengacu pada data https://fhir.kemkes.go.id/r4/StructureDefinition/ActivityDefinition | Kamus Data Kesehatan Indonesia

## ServiceRequest.instantiatesUri[i]

Berisi data URL yang menunjuk ke protokol, pedoman, urutan pesanan, atau definisi lain yang dikelola secara eksternal yang dipatuhi seluruhnya atau sebagian oleh permintaan layanan ini dengan tipe data `uri`

## ServiceRequest.basedOn[i]

Berisi data suatu rencana atau permintaan yang dipenuhi oleh permintaan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CarePlan | ServiceRequest | MedicationRequest`.

## ServiceRequest.replaces[i]

Berisi data permintaan yang terjadi menggantikan permintaan yang telah diselesaikan atau dihentikan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `ServiceRequest`.

## ServiceRequest.requisition

Berisi data suatu Identitas/ID/*Identifier* yang sama untuk seluruh permintaan yang tergabung dalam 1 gabungan atau kelompok dengan tipe data `Identifier`. Elemen ini bisa digunakan untuk permintaan multipel yang termasuk dalam suatu kelompok permintaan untuk kepentingan *billing* atau yang lainnya.

## \*ServiceRequest.status

Berisi satu atau lebih data status permintaan dengan tipe data `code`, yang nilainya mengacu pada data terminologi RequestStatus. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "draft"
  }
]
```

## \*ServiceRequest.intent

Berisi satu atau lebih data yang berkaitan dengan apakah permintaan adalah usulan, rencana, asli permintaan asli atau permintaan tiba-tiba dengan tipe data `code`, yang nilainya mengacu pada data terminologi RequestIntent. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"original-order"
```

## ServiceRequest.category[i]

Berisi data yang berkaitan dengan kode yang mengklasifikasikan pelayanan untuk tujuan pencarian, penyortiran, dan tampilan dengan tipe data `CodeableConcept`.

### ServiceRequest.category[i].coding

Berisi satu atau lebih data yang berkaitan dengan kode yang mengklasifikasikan pelayanan untuk tujuan pencarian, penyortiran, dan tampilan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "108252007",
    "display": "Laboratory procedure"
  }
]
```

## ServiceRequest.priority

Berisi data yang mengindikasikan seberapa cepat `ServiceRequest` harus ditangani dengan tipe data `code`.

**Contoh JSON**

```
"routine"
```

## ServiceRequest.doNotPerform

Berisi data yang ketika diisi dengan “true”, maka menunjukkan bahwa permintaan/tindakan ini TIDAK boleh dilakukan. Contoh: ketika dokter meminta untuk tidak melakukan pengukuran tekanan darah pada tangan kanan, maka `ServiceRequest.code` diisi dengan kode pengukuran tekanan darah, dan `ServiceRequest.doNotPerform` diisi dengan “true” dengan tipe data `boolean`.

## \*ServiceRequest.code

Berisi data format pengisian rencana tindak lanjut/cara keluar dari rumah sakit dengan pilihan jawaban “Dirujuk ke” dan “Rawat Inap” dengan tipe data `CodeableConcept`.

### ServiceRequest.code.coding

Berisi satu atau lebih data format pengisian rencana tindak lanjut/cara keluar dari rumah sakit dengan pilihan jawaban “Dirujuk ke” dan “Rawat Inap” dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "185389009",
    "display": "Follow-up visit"
  }
]
```

## ServiceRequest.orderDetail[i]

Berisi data tambahan detail atau instruksi terkait bagaimana permintaan dilakukan dengan tipe data `CodeableConcept`.

## ServiceRequest.quantity<?>

Berisi data jumlah layanan yang diminta berupa kuantitas

### ServiceRequest.quantityQuantity

Berisi data jumlah layanan yang diminta dengan tipe data `Quantity`.

### ServiceRequest.quantityRatio

Berisi data jumlah layanan yang diminta dengan tipe data `Ratio`.

### ServiceRequest.quantityRange

Berisi data jumlah layanan yang diminta dengan tipe data `Range`.

## \*ServiceRequest.subject

Berisi data individu terkait di mana permintaan dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Group | Location | Device`, yang nilainya memiliki format:

```
"Patient/{patient-ihs-number}"
```

Di mana isi dari parameter {patient-ihs-number} adalah ID `Patient` yang didapatkan dari master pasien indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Patient/100000030009"
}
```

## \*ServiceRequest.encounter

Berisi data kunjungan di mana permintaan ini dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
"Encounter/{ID-resource-Encounter}"
```

Di mana isi dari parameter `{id-resource-Encounter}` adalah ID *resource* `Encounter` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Encounter/2823ed1d-3e3e-434e-9a5b-9c579d192787",
  "display": "Kunjungan Budi Santoso di hari Selasa, 14 Juni 2022"
}
```

## ServiceRequest.occurrence<?>

Berisi data tanggal/waktu di mana layanan yang diminta harus terjadi

### \*ServiceRequest.occurenceDateTime

Berisi data informasi kapan kontrol harus terlaksana dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh JSON**

```
"2022-07-14"
```

### ServiceRequest.occurencePeriod

Berisi data waktu dari permintaan dimulai sampai selesai (*arrived to finished*) dengan tipe data `Period`.

#### ServiceRequest.occurencePeriod.start

Diisi dengan waktu mulai, sama dengan waktu permintaan pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

#### ServiceRequest.occurencePeriod.end

Diisi dengan waktu selesai, sama dengan waktu selesai permintaan pasien dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-30"
```

### ServiceRequest.occurenceTiming

Berisi data kapan permintaan dilakukan dengan tipe data `Timing`.

## ServiceRequest.asNeeded<?>

Berisi data prasyarat untuk melakukan layanan

### ServiceRequest.asNeededBoolean

Berisi data permintaan pemeriksaan penunjang dengan tipe data `boolean`.

### ServiceRequest.asNeededCodeableConcept

#### ServiceRequest.asNeededCodeableConcept.coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada ICD-10 versi 2010. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://hl7.org/fhir/sid/icd-10",
    "code": "R52.9",
    "display": "Pain, unspecified"
  }
]
```

## ServiceRequest.autheredOn

Berisi data kapan permintaan dibuat dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh JSON**

```
"2022-06-14T09:30:27+07:00"
```

## ServiceRequest.requester

Berisi data siapa yang melakukan permintaan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | Patient | RelatedPerson | Device`, yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah nomor SATUSEHAT ID Nakes yang didapatkan dari master Nakes indeks. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000001",
    "display": "Dokter Bronsig"
  }
]
```

## ServiceRequest.performerType

Berisi data yang berkaitan dengan jenis praktisi yang diharapkan melakukan layanan dengan tipe data `CodeableConcept`.

### ServiceRequest.performerType.coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "1421009",
    "display": "Specialized surgeon"
  }
]
```

## ServiceRequest.performer[i]

Berisi satu atau lebih data siapa yang diharapkan melakukan permintaan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | CareTeam | HealthcareService | Patient | Device | RelatedPerson`, yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah ID Nakes yang didapatkan dari master Nakes indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Practitioner/N10000005",
    "display": "Fatma"
  }
]
```

## ServiceRequest.locationCode[i]

Berisi data mengenai informasi lokasi di mana permintaan seharusnya terjadi, bisa dalam bentuk kode atau *free-text* dengan tipe data `CodeableConcept`.

### ServiceRequest.locationCode[i].coding

Berisi satu atau lebih data informasi lokasi di mana permintaan seharusnya terjadi, bisa dalam bentuk kode atau *free-text* dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
    "code": "OF",
    "display": "Outpatient Facility"
  }
]
```

## ServiceRequest.locationReference[i]

Berisi data satu atau lebih data informasi lokasi di mana permintaan seharusnya terjadi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location`, yang nilainya memiliki format:

```
"Location/{ID-resource-Location}"
```

Di mana isi dari parameter `{id-resource-Location}` adalah ID `Location` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Location/ef011065-38c9-46f8-9c35-d1fe68966a3e",
    "display": "Ruang 1A, Poliklinik Rawat Jalan"
  }
]
```

## ServiceRequest.reasonCode[i]

Berisi data yang berkaitan dengan penjelasan atau justifikasi mengenai mengapa pelayanan ini diminta dalam bentuk kode atau teks dengan tipe data `CodeableConcept`.

### ServiceRequest.reasonCode[i].coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada ICD-10 versi 2010. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

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

## ServiceRequest.reasonReference[i]

Berisi data alasan dilakukannya permintaan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition | Observation | DiagnosticReport | DocumentReference`.

## ServiceRequest.insurance[i]

Berisi data informasi asuransi atau klaim terkait untuk permintaan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Coverage | ClaimResponse`.

## ServiceRequest.supportingInfo[i]

Berisi data tambahan informasi klinis yang mendukung atau mempengaruhi permintaan ini. Dapat direferensikan ke seluruh *resource* yang ada di FHIR. Elemen ini dapat digunakan ketika ada informasi yang harus diisi saat permintaan ini dibuat (*ask at order entry question*/AOE). Contohnya adalah jumlah oksigen yang diinspirasi untuk perhitungan analisa gas darah dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Any`.

## ServiceRequest.specimen[i]

Berisi satu atau lebih data spesimen yang digunakan dalam pemeriksaan laboratorium dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Specimen`, yang nilainya memiliki format:

**Contoh JSON**

```
[
  {
    "reference": "Specimen/b3274b7b-5e81-4ae3-b650-7a6c31bb344c",
    "display": "Budi Santoso"
  }
]
```

## ServiceRequest.bodySite[i]

Berisi data yang berkaitan dengan lokasi anatomis yang mana prosedur harus dilakukan atau target terapi dengan tipe data `CodeableConcept`.

### ServiceRequest.bodySite[i].coding

Berisi satu atau lebih data dengan tipe data `Coding`. Nilainya mengacu pada SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "273000",
    "display": "Lateral myocardium"
  }
]
```

## ServiceRequest.note[i]

Berisi data komen tambahan lainnya terkait permintaan dengan tipe data `Annotation`.

## ServiceRequest.patientInstruction

Berisi data instruksi untuk pasien. Data terkait “Dalam Keadaan Darurat dapat Menghubungi” dapat diisikan dalam elemen ini dengan tipe data `string`.

**Contoh JSON**

```
"Kontrol setelah 1 bulan minum obat anti tuberkulosis. Dalam keadaan darurat dapat menghubungi hotline RS di nomor 14045"
```

## ServiceRequest.relevantHistory[i]

Berisi data peristiwa penting dalam riwayat permintaan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Provenance`.
