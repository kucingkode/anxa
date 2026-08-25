> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/encounter/

---

# Encounter

Kunjungan pasien dapat didefinisikan sebagai interaksi pasien terhadap suatu layanan fasyankes. Sebagai contoh, dalam satu rangkaian rawat jalan, seluruh rangkaian dapat didefinisikan sebagai satu “Encounter”. Data-data kunjungan pasien yang direkam meliputi kapan pertemuan tersebut mulai dan selesai, siapa tenaga kesehatan yang melayani, siapa subjek dari pelayanannya, dan informasi pendukung lainnya.

Berikut pemetaan nilai untuk Encounter yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data kunjungan:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## \*Encounter.identifier[i]

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor kunjungan yang dimiliki oleh lokasi induk yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### Encounter.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Encounter.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/encounter/{organization-ihs-number}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### Encounter.identifier[i].value

Berisi kode atau ID lokal/nomor kunjungan lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/encounter/10000004",
    "use": "official",
    "value": "P20240001"
  }
]
```

## \*Encounter.status

Berisi data status tahapan dari pertemuan pasien dengan tipe data `code`, yang nilainya mengacu pada data terminologi EncounterStatus. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  "arrived"
]
```

## \*Encounter.statusHistory.status

Berisi satu atau lebih data penyimpanan riwayat status dari kunjungan pasien dengan tipe data `code`. Terdapat 3 status yang wajib dikirimkan datanya yaitu *arrived, In-progress,* dan *finished*, yang nilainya mengacu pada data terminologi EncounterStatus. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  "arrived"
]
```

## \*Encounter.statusHistory.period

Berisi satu atau lebih data penyimpanan waktu/log dari kunjungan pasien dengan tipe data `Period`.

### \*Encounter.statusHistory.period.start

Diisi dengan waktu mulai, sama dengan waktu dimulainya suatu status kunjungan dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-06-14T07:00:00+07:00"
```

### \*Encounter.statusHistory.period.end

Diisi dengan waktu selesai, sama dengan waktu berakhirnya suatu status kunjungan dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-06-14T08:00:00+07:00"
```

## \*Encounter.class

Berisi data klasifikasi dari pertemuan pasien dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama ActEncounterCode. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
    "code": "AMB",
    "display": "ambulatory"
  }
]
```

## \*Encounter.classHistory.class

Berisi data penyimpanan riwayat klasifikasi dari kunjungan pasien dengan tipe data `Coding`. yang nilainya mengacu pada salah satu data terminologi dengan nama ActEncounterCode. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
    "code": "AMB",
    "display": "ambulatory"
  }
]
```

## \*Encounter.classHistory.period

Berisi satu atau lebih data klasifikasi kunjungan dengan tipe data `Period`.

### Encounter.classHistory.period.start

Diisi dengan waktu mulai, sama dengan waktu dimulainya suatu klasifikasi kunjungan dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-06-14T07:00:00+07:00"
```

### Encounter.statusHistory.period.end

Diisi dengan waktu selesai, sama dengan waktu berakhirnya suatu klasifikasi kunjungan dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-06-14T08:00:00+07:00"
```

## Encounter.type[i]

Berisi satu atau lebih data tipe spesifik dari kunjungan (contoh: konsultasi *e-mail, surgical day-care, skilled nursing, rehabilitation*) dengan tipe data `CodeableConcept`.

### Encounter.type[i].coding

Berisi satu atau lebih data tipe spesifik dari kunjungan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi EncounterType. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/encounter-type",
    "code": "ADMS",
    "display": "Annual diabetes mellitus screening"
  }
]
```

## Encounter.serviceType

Berisi data tipe spesifik dari layanan yang diberikan dengan tipe data `CodeableConcept`.

#### Encounter.serviceType.coding

Berisi data tipe spesifik dari layanan yang diberikan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ServiceType. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/service-type",
    "code": "7",
    "display": "Friendly Visiting"
  }
]
```

## Encounter.priority

Berisi data indikasi urgensi dari kunjungan dengan tipe data `CodeableConcept`.

### Encounter.priority.coding

Berisi data indikasi urgensi dari kunjungan dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama ActPriority. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ActPriority",
    "code": "A",
    "display": "ASAP"
  }
]
```

## \*Encounter.subject

Berisi data subjek dari pertemuan pasien dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient`, yang nilainya memiliki format:

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

## Encounter.episodeOfCare[i]

Berisi data informasi episode perawatan yang dilakukan pada kunjungan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `EpisodeOfCare`, yang nilainya memiliki format:

```
"EpisodeOfCare/{id-resource-EpisodeOfCare}"
```

Di mana isi dari parameter {id-resource-EpisodeOfCare} adalah ID EpisodeOfCare yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
  "reference": "EpisodeOfCare/260aa42f-d8d6-49a9-9d40-bb47c95effff"
  }
]
```

## Encounter.basedOn[i]

Berisi data permintaan yang mendasari kunjungan ini. Misalnya, kunjungan didasari oleh permintaan rujukan menggunakan *resource* `ServiceRequest` dengan tipe data `Reference`, yang nilainya memiliki format:

```
"ServiceRequest/{id-resource-ServiceRequest}"
```

Di mana isi dari parameter {id-resource-ServiceRequest} adalah ID ServiceRequest yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

## Encounter.participant.type[i]

Berisi satu atau lebih data partisipan pertemuan pasien dengan tipe data `CodeableConcept`.

### Encounter.participant.type.coding

Berisi satu atau lebih data partisipan pertemuan pasien dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama ParticipantType. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
    "code": "ATND",
    "display": "attender"
  }
]
```

## Encounter.participant.individual

Berisi data partisipan dari pertemuan, diisikan dengan SATUSEHAT ID dokter/tenaga kesehatan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner`, yang nilainya memiliki format:

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

## \*Encounter.period

Berisi data waktu dari pertemuan dimulai sampai selesai (*arrived to finished*) dengan tipe data `Period`.

### Encounter.period.start

Diisi dengan waktu mulai, sama dengan waktu kedatangan pasien dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2022-06-14T07:00:00+07:00"
```

### Encounter.period.end

Diisi dengan waktu selesai, sama dengan waktu kepulangan pasien dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2022-06-14T08:00:00+07:00"
```

## Encounter.length

Berisi data jumlah waktu terjadinya kunjungan dengan tipe data `Duration`.

## Encounter.reasonCode[i]

Berisi satu atau lebih data kode alasan terjadinya kunjungan dengan tipe data `CodeableConcept`.

## \*Encounter.reasonCode[i].coding

Berisi satu atau lebih data kode alasan terjadinya kunjungan dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama EncounterReasonCodes. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Encounter.reasonReference[i]

Berisi satu atau lebih data alasan yang mendasari terjadinya kunjungan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition | Procedure | Observation | ImmunizationRecommendation`, yang nilainya memiliki format:

```
"Condition/{id-condition}"
```

Di mana isi dari parameter {id-condition} adalah ID Condition yang didapatkan dari hasil *response*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

## \*Encounter.diagnosis.condition

Berisi satu atau lebih data diagnosis dari pasien. Diagnosa bisa berupa diagnosa awal dan/atau pulang dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition | Procedure`. Condition dalam diagnosa dapat dicatat lebih dari 1. Nilainya memiliki format:

```
"Condition/{id-resource-Condition}"
```

Di mana isi dari parameter {id-resource-Condition} adalah ID Condition yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
  "reference": "Condition/4bbbe654-14f5-4ab3-a36e-a1e307f67bb8",
  "display": "Tuberculosis of lung, confirmed by sputum microscopy with or without culture"
  }
]
```

## \*Encounter.diagnosis.use

Berisi satu atau lebih data penggunaan kode untuk mendeskripsikan jenis diagnosa dengan tipe data `CodeableConcept`.

### Encounter.diagnosis.use.coding

Berisi satu atau lebih data penggunaan kode untuk mendeskripsikan jenis diagnosa dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama DiagnosisRole. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "https://www.hl7.org/fhir/Codesystem-diagnosis-role",
    "code": "AD",
    "display": "Admission diagnosis"
  }
]
```

## \*Encounter.diagnosis.rank

Jika ada lebih dari 1 kondisi, maka gunakan elemen `rank` untuk mengurutkan mana diagnosa yang lebih utama. Semakin kecil angkanya, maka semakin utama, dengan tipe data `positiveInt`.

## Encounter.account[i]

Berisi satu atau lebih data akun yang digunakan untuk penagihan/*billing* untuk pertemuan ini dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Account`, yang nilainya memiliki format:

```
"Account/{id-account}"
```

Di mana isi dari parameter {id-account} adalah ID Account yang didapatkan dari hasil *response*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

## Encounter.hospitalization.preAdmissionIdentifier

Berisi data pre-admisi dengan tipe data `Identifier`.

## Encounter.hospitalization.origin

Berisi data lokasi atau organisasi asal pasien sebelum terjadi admisi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location | Organization`, yang nilainya memiliki format:

```
"Location/{id-resource-Location}"
```

Di mana isi dari parameter {id-resource-Location} adalah ID Location yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

**Contoh JSON**

* Lokasi kompleks **RSUD Jati Asih** dikelola oleh organisasi **RSUD Jati Asih** yang memiliki nomor id

```
4adccec5-776d-435e-9ac5-98763cb216bb
```

* **Gedung Alamanda** merupakan bagian dari **RSUD Jati Asih**.

```
[
  {
    "reference": "Location 4adccec5-776d-435e-9ac5-98763cb216bb"
  }
]
```

## Encounter.hospitalization.admitSource

Berisi data asal di mana sebelum pasien dirawat/admisia dengan tipe data `CodeableConcept`.

### Encounter.hospitalization.admitSource.coding

Berisi data asal di mana sebelum pasien dirawat/admisia dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama AdmitSource. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/admit-source",
    "code": "hosp-trans",
    "display": "Transferred from other hospital"
  }
]
```

## Encounter.hospitalization.reAdmission

Berisi data tipe readmisi yang terjadi (bila ada). Bila elemen ini kosong, maka kunjungan tidak dianggap sebagai readmisi dengan tipe data `CodeableConcept`.

### Encounter.hospitalization.reAdmission.coding

Berisi data tipe readmisi yang terjadi (bila ada). Bila elemen ini kosong, maka kunjungan tidak dianggap sebagai readmisi dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama Hl7VSReAdmissionIndicator. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v2-0092",
    "code": "R",
    "display": "Re-admission"
  }
]
```

## Encounter.hospitalization.dietPreference[i]

Berisi satu atau lebih data preferensi diet yang dilaporkan oleh pasien dengan tipe data `CodeableConcept`.

### Encounter.hospitalization.dietPreference[i].coding

Berisi satu atau lebih data preferensi diet yang dilaporkan oleh pasien dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama Diet. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/diet",
    "code": "vegetarian",
    "display": "Vegetarian"
  }
]
```

## Encounter.hospitalization.specialArrangement[i]

Berisi satu atau lebih data permintaan khusus yang dibuat untuk kunjungan rawat inap ini seperti penyediaan peralatan khusus dan lain-lain dengan tipe data `CodeableConcept`.

### Encounter.hospitalization.specialArrangement[i].coding

Berisi satu atau lebih data permintaan khusus yang dibuat untuk kunjungan rawat inap ini seperti penyediaan peralatan khusus dan lain-lain dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama SpecialArrangements. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/encounter-special-arrangements",
    "code": "wheel",
    "display": "Wheelchair"
  }
]
```

## Encounter.hospitalization.destination

Berisi data lokasi atau organisasi tempat pasien dipulangkan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location | Organization`, yang nilainya memiliki format:

```
"Location/{id-resource-Location}"
```

Di mana isi dari parameter {id-resource-Location} adalah ID Location yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

**Contoh JSON**

* Lokasi kompleks **RSUD Jati Asih** dikelola oleh organisasi **RSUD Jati Asih** yang memiliki nomor id

```
"4adccec5-776d-435e-9ac5-98763cb216bb"
```

* **Gedung Alamanda** merupakan bagian dari **RSUD Jati Asih**.

```
[
  {
    "reference": "Location 4adccec5-776d-435e-9ac5-98763cb216bb"
  }
]
```

## Encounter.hospitalization.dischargeDisposition

Berisi data kategori atau tipe lokasi setelah pasien dipulangkan dengan tipe data `CodeableConcept`.

### Encounter.hospitalization.dischargeDisposition.coding

Berisi satu atau lebih data kategori atau tipe lokasi setelah pasien dipulangkan dengan tipe data `Coding`, yang nilainya mengacu pada salah satu data terminologi dengan nama DischargeDisposition. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/discharge-disposition",
    "code": "rehab",
    "display": "Rehabilitation"
  }
]
```

## \*Encounter.location[i]

Berisi data lokasi dari pertemuan pasien. Dapat diisi oleh ruangan periksa pasien / poli pemeriksaannya dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location`, yang nilainya memiliki format:

```
"Location/{id-resource-Location}"
```

Di mana isi dari parameter {id-resource-Location} adalah ID Location yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

**Contoh JSON**

```
[
  {
    "reference": "Location/408ba28c-3115-4df5-85c6-60f15b44e7fa",
    "display": "Ruang 1A, Poliklinik Rawat Jalan"
  }
]
```

## Encounter.location.extension:serviceClass.value

Berisi tipe data `CodeableConcept` yang digunakan untuk mendefinisikan kelas perawatan yang sedang dijalani pasien seperti Kelas 1, Kelas 2, Kelas 3, Kelas VIP, dan Kelas VVIP. Nilai dan strukturnya mengacu pada extension tambahan dengan nama `serviceClass`.

## Encounter.location.extension:serviceClass.upgradeClassIndicator

Berisi tipe data `CodeableConcept` yang digunakan untuk menyimpan informasi Perubahan Kelas Perawatan seperti Kelas Tetap Perawatan, Kenaikan Kelas Perawatan, Penurunan Kelas Perawatan, dan Titip Kelas Perawatan. Nilai dan strukturnya mengacu pada extension tambahan dengan nama `serviceClass`.

## \*Encounter.serviceProvider

Berisi data organisasi pengelola lokasi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Organization`, yang nilainya memiliki format:

```
"Organization/{organization-ihs-number}"
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

**Contoh JSON**

```
[
  {
    "reference": "Organization/1000004"
  }
]
```

## Encounter.partOf

Berisi data kunjungan di mana kunjungan ini menjadi bagiannya (secara administratif atau dalam waktu) dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
"Encounter/{id-encounter}"
```

Di mana isi dari parameter {id-encounter} adalah ID Encounter yang didapatkan dari hasil *response*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

**Contoh JSON**

```
{
  "reference": "Encounter/0a26ca28-0ea3-486d-8fa9-6f9edd37e567"
}
```
