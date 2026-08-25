> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/care-plan/

---

# CarePlan

Pengiriman data Rencana Tindak Lanjut dapat dikirimkan menggunakan *resource* `CarePlan`.

Berikut pemetaan nilai untuk CarePlan yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data rencana tindak lanjut:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## CarePlan.identifier[i]

Berisi data ID internal faskes untuk `CarePlan` ini. Ini adalah ID resmi yang diterbitkan oleh faskes untuk menandai `CarePlan` pasien dengan tipe data `Identifier`.

### CarePlan.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### CarePlan.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/careplan/{{organization-ihs-number}}/
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor ID organisasi induk yang didapatkan dari master sarana indeks.

### CarePlan.identifier[i].value

Berisi kode atau nomor internal sub organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/careplan/1000004",
    "use": "official",
    "value": "98457729"
  }
]
```

## CarePlan.instantiatesCanonical[i]

Berisi data URL yang menunjuk ke protokol, pedoman, kuesioner, atau definisi lain yang ditetapkan FHIR yang dipatuhi seluruhnya atau sebagian oleh `CarePlan` ini dengan tipe data `canonical` (`PlanDefinition | Questionnaire | Measure | ActivityDefinition | OperationDefinition`).

## CarePlan.instantiatesUri[i]

Berisi data URL yang menunjuk ke protokol, panduan, kuesioner, atau definisi lain yang dikelola secara eksternal yang dipatuhi seluruhnya atau sebagian oleh `CarePlan` ini dengan tipe data `uri`.

## CarePlan.basedOn[i]

Berisi data `CarePlan` yang dipenuhi seluruhnya atau sebagian oleh rencana tindak lanjut/perawatan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CarePlan`.

**Contoh JSON**

```
{
  "reference": "CarePlan/6bf4f0f4-d5b2-4cb0-bc8a-c629e549f6a9"
}
```

## CarePlan.replaces[i]

Berisi data rencana perawatan yang telah selesai atau dihentikan di mana fungsinya diambil alih oleh rencana perawatan baru ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CarePlan`.

**Contoh JSON**

```
{
  "reference": "CarePlan/6bf4f0f4-d5b2-4cb0-bc8a-c629e549f6a9"
}
```

## CarePlan.partOf[i]

Berisi data rencana perawatan yang lebih besar di mana rencana perawatan ini merupakan komponen atau salah satu bagian langkahnya dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CarePlan`.

**Contoh JSON**

```
{
  "reference": "CarePlan/6bf4f0f4-d5b2-4cb0-bc8a-c629e549f6a9"
}
```

## \*CarePlan.status

Berisi data yang menunjukkan apakah rencana tersebut sedang ditindaklanjuti, mewakili rencana masa akan datang atau sekarang menjadi catatan historis dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"draft"
```

## \*CarePlan.intent

Berisi data tingkat kewernangan terkait dengan rencana perawatan dan di mana rencatan perawatan sesuai dengan *workflow*/alur kerja dari sistem dan menunjukkan tingkat kewenangan/kesengajaan terkait dengan rencana perawatan dan di mana rencana perawatan sesuai dengan rantai alur kerja dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"proposal"
```

## CarePlan.category[i]

Berisi data tipe dari perawatan dengan tipe data `CodeableConcept`.

### CarePlan.category.coding

Berisi data tipe dari perawatan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://snomed.info/sct",
  "code": "736372004",
  "display": "Discharge care plan"
}
```

## CarePlan.title

Berisi data nama rencana perawatan dengan tipe data `string`.

## CarePlan.description

Berisi data uraian tentang ruang lingkup rencana dengan tipe data `string`.

## \*CarePlan.subject

Berisi data pasien atau kelompok yang memiliki rencana perawatan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Group`, yang nilainya memiliki format:

```
"Patient/{patient-ihs-number}"
```

Di mana isi dari parameter `{patient-ihs-number}` adalah nomor ID pasien yang didapatkan dari master pasien indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Patient/100000030009",
  "display": "Budi Santoso"
}
```

## CarePlan.encounter

Berisi data data kunjungan di mana rencana perawatan ini dibuat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
"Encounter/{ID-resource-Encounter}"
```

Di mana isi dari parameter `{ID-resource-Encounter}` adalah ID dari *resource* `Encounter` yang didapatkan dari *server*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Encounter/0a26ca28-0ea3-486d-8fa9-6f9edd37e567"
}
```

## CarePlan.period

Berisi data periode dari rencana perawatan dengan tipe data `Period`.

## CarePlan.created

Berisi data waktu catatan rencana perawatan dibuat dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## CarePlan.author

Berisi data siapa yang membuat dan bertanggung jawab terhadap rencana perawatan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Practitioner | PractitionerRole | Device | RelatedPerson | Organization | CareTeam` yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah nomor ID NAKES yang didapatkan dari master practitioner indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Practitioner/N10000001",
  "display": "Dokter Bronsig"
}
```

## CarePlan.contributor[i]

Berisi data individu atau organisasi yang memberikan rencana perawatan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Practitioner | PractitionerRole | Device | RelatedPerson | Organization | CareTeam` yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah nomor ID NAKES yang didapatkan dari master practitioner indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Practitioner/N10000001",
  "display": "Dokter Bronsig"
}
```

## CarePlan.careTeam[i]

Berisi data identifikasi seluruh individu dan organisasi yang diharapkan terlibat dalam perawatan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CareTeam`.

**Contoh JSON**

```
{
  "reference": "CareTeam/fd336a22-1dfe-486e-b232-2e6a36b468f2"
}
```

## CarePlan.addresses[i]

Berisi data identifikasi kondisi atau permasalahan yang akan dihandle dan atau dimitigasi oleh perawatan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition`.

**Contoh JSON**

```
{
  "reference": "CareTeam/e9902564-05f0-4549-ae3b-4ac9648a9afa"
}
```

## CarePlan.supportingInfo[i]

Berisi data informasi tambahan yang mendukung rencana perawatan ini. Dapat berisi informasi terkait komorbiditas, prosedur terakhir, limitasi, dan asesmen terakhir dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di semua *resource* yang ada di FHIR.

## CarePlan.goal[i]

Berisi data tujuan dari dilaksanakannya rencana perawatan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Goal`.

## CarePlan.activity[i]

Berisi data informasi terkait tindakan yang direncanakan dalam rencana perawatan. Dapat berupa obat yang digunakan, tes laboratorium yang harus dilakukan, pemantauan kondisi, edukasi, dsb dengan tipe data `BackboneElement`.

## CarePlan.activity.outcomeCodeableConcept[i]

Berisi data luaran atau hasil dari aktivitas. Contoh, hasil dari edukasi dapat berupa pasien paham atau tidak dengan tipe data `CodeableConcept`.

### CarePlan.activity.outcomeCodeableConcept.coding

Berisi data luaran atau hasil dari aktivitas. Contoh, hasil dari edukasi dapat berupa pasien paham atau tidak dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## CarePlan.activity.outcomeReference[i]

Berisi data luaran atau hasil dari aktivitas dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di semua *resource* yang ada di FHIR.

## CarePlan.activity.progress[i]

Berisi data komentar terkait status atau progres dari aktivitas dengan tipe data `Annotation`.

## CarePlan.activity.reference

Berisi data detail aktivitas yang diusulkan dan direpresentasikan dalam *resource* spesifik dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Appointment | CommunicationRequest | DeviceRequest | MedicationRequest | NutritionOrder | Task | ServiceRequest | VisionPrescription | RequestGroup`.

## CarePlan.activity.detail

Berisi data ringkasan sederhana dari rencana aktivitas yang akan dilakukan dengan tipe data `BackboneElement`. `CarePlan.activity[i].detail` digunakan ketika `CarePlan.activity.reference` tidak digunakan (pilih salah satu).

## CarePlan.activity.detail.kind

Berisi data jenis aktivitas dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"Appointment"
```

## CarePlan.activity.detail.instantiatesCanonical[i]

Berisi data URL yang menunjuk ke protokol, pedoman, kuesioner, atau definisi lain yang ditetapkan FHIR yang dipatuhi seluruhnya atau sebagian oleh aktivitas rencana perawatan ini dengan tipe data `canonical(PlanDefinition | ActivityDefinition | Questionnaire | Measure | OperationDefinition)`.

## CarePlan.activity.detail.instantiatesUri[i]

Berisi data URL yang menunjuk ke protokol, panduan, kuesioner, atau definisi lain yang dikelola secara eksternal yang dipatuhi seluruhnya atau sebagian oleh aktivitas rencana perawatan ini dengan tipe data `uri`.

## CarePlan-activity-detail-code

Berisi data kode aktivitas yang akan dilakukan dengan tipe data `CodeableConcept`.

### CarePlan.activity.detail.code.coding

Berisi data kode aktivitas yang akan dilakukan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## CarePlan.activity.detail.reasonCode[i]

Berisi data alasan dilakukannya aktivitas dengan tipe data `CodeableConcept`.

### CarePlan.activity.detail.reasonCode.coding

Berisi data alasan dilakukannya aktivitas dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## CarePlan.activity.detail.reasonReference[i]

Berisi data alasan dilakukannya aktivitas dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition | Observation | DiagnosticReport | DocumentReference`.

## CarePlan.activity.detail.goal[i]

Berisi data tujuan dari aktivitas ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Goal`.

**Contoh JSON**

```
{
  "reference": "Goal/29143f0c-bbff-4c20-a7e2-d0dec498c174"
}
```

## \*CarePlan.activity.detail.status

Berisi data status atau progres dari aktivitas dengan tipe data `code`. **Wajib** diisi apabila `CarePlan.activity.detail` diisi. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"not-started"
```

## CarePlan.activity.detail.statusReason

Berisi data alasan dari status aktivitas dengan tipe data `CodeableConcept`.

### CarePlan.activity.detail.statusReason.coding

Berisi data alasan dari status aktivitas dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## CarePlan.activity.detail.doNotPerform

Berisi data bila *true*, maka aktivitas tidak boleh dilakukan dalam rencana perawatan, bila *false* atau dikosongkan, aktivitas boleh dilakukan dalam rencana perawatan dengan tipe data `boolean`.

## CarePlan.activity.detail.scheduled<?>

Berisi data kapan aktivitas dilakukan. Pengisian dapat memilih dari salah satu elemen berikut:

### CarePlan.activity.detail.scheduledTiming

Berisi data kapan aktivitas dilakukan dengan tipe data `Timing`.

### CarePlan.activity.detail.scheduledPeriod

Berisi data kapan aktivitas dilakukan dengan tipe data `Period`.

### CarePlan.activity.detail.scheduledString

Berisi data kapan aktivitas dilakukan dengan tipe data `string`.

## CarePlan.activity.detail.location

Berisi data lokasi dilakukannya aktivitas dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location`, yang nilainya memiliki format:

```
"Location/{ID-resource-Location}"
```

Di mana isi dari parameter `{ID-resource-Location}` adalah ID dari `Location` yang didapatkan dari *server*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Location/ef011065-38c9-46f8-9c35-d1fe68966a3e",
  "display": "Ruang 1A, Poliklinik Rawat Jalan"
}
```

## CarePlan.activity.detail.performer[i]

Berisi data siapa yang akan terlibat dalam aktivitas dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | RelatedPerson | Patient | CareTeam | HealthcareService | Device` yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah nomor ID NAKES yang didapatkan dari master `practitioner` indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Practitioner/N10000001",
  "display": "Dokter Bronsig"
}
```

## CarePlan.activity.detail.product<?>

Berisi data produk yang diberikan dalam aktivitas. Dapat berupa makanan, obat atau produk lainnya. Pengisian dapat memilih dari salah satu elemen berikut:

### CarePlan.activity.detail.productCodeableConcept

Berisi data produk yang diberikan dalam aktivitas dengan tipe data `CodeableConcept`.

#### CarePlan.activity.detail.productCodeableConcept.coding

Berisi data produk yang diberikan dalam aktivitas dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### CarePlan.activity.detail.productReference

Berisi data produk yang diberikan dalam aktivitas dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Medication | Substance`.

## CarePlan.activity.detail.dailyAmount

Berisi data kuantitas yang dikonsumsi setiap hari dengan tipe data `SimpleQuantity`.

## CarePlan.activity.detail.quantity

Berisi data kuantitas yang diharapkan disediakan, diadministrasikan, dan dikonsumsi oleh subjek dengan tipe data `SimpleQuantity`.

## CarePlan.activity.detail.description

Berisi data deskripsi tambahan untuk aktivitas yang akan dilakukan dengan tipe data `string`.

## CarePlan.note[i]

Berisi data komentar atau catatan umum dari rencana perawatan yang tidak tercover di elemen lain dengan tipe data `Annotation`.
