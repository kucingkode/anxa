> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/medication-request/

---

# MedicationRequest

Penjelasan tipe mandatoris, deskripsi dan format pengisian dari setiap elemen data/*path* di dalam *resource* `Medication`, dan contoh pengiriman data atau *payload* dari data peresepan obat dapat dilihat dalam *Postman Collection* pada Petunjuk Teknis SATUSEHAT (Juknis SATSET).

Berikut pemetaan nilai untuk MedicationRequest yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data terkait peresepan obat:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## MedicationRequest.identifier[i]

Berisi satu atau lebih data mengenai ID internal faskes untuk peresepan obat. Ini adalah ID resmi yang diterbitkan oleh faskes untuk menandai data peresepan obat, yang setiap datanya direpresentasikan dengan tipe data Identifier.

Untuk informasi lebih lanjut terdapat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### MedicationRequest.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### MedicationRequest.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/prescription/{{organization-ihs-number}}/{{subsystem}}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor ID organisasi induk yang didapatkan dari master sarana indeks.

### MedicationRequest.identifier[i].value

Berisi kode atau ID lokal peresepan obat yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON ID Lokal Pemprosesan OBAT**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/prescription/10000004",
    "use": "official",
    "value": "123456788"
  }
]
```

**Contoh JSON ID Lokal Peresepan per-item OBAT**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/prescription-item/10000004",
    "use": "official",
    "value": "123456788-1"
  }
]
```

## \*MedicationRequest.status

Berisi data berkaitan dengan kode spesifik yang menunjukkan status pengobatan saat ini yang umumnya akan berupa status aktif atau komplit dengan tipe data `code`, yang nilainya mengacu pada data terminologi `medicationrequest Status` (http://hl7.org/fhir/CodeSystem/medicationrequest-status). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"completed"
```

## MedicationRequest.statusReason

Berisi data yang menjelaskan alasan status terkini dari `MedicationRequest` dengan tipe data `CodeableConcept`, yang nilainya merujuk pada `MedicationRequest Status Reason Codes`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### MedicationRequest.statusReason.coding

Berisi data yang berkaitan dengan data yang menjelaskan alasan status terkini dari `MedicationRequest` dengan tipe data `Coding`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/medicationrequest-status-reason",
    "code": "altchoice",
    "display": "Try another treatment first"
  }
]
```

## \*MedicationRequest.intent

Berisi data berkaitan dengan tujuan pengobatan yang diresepkan apakah usulan, rencana, atau rencana pengobatan asli dengan tipe data `code`, yang nilainya mengacu pada data terminologi `medicationRequest Intent` (http://hl7.org/fhir/CodeSystem/medicationrequest-intent). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"order"
```

## MedicationRequest.category[i]

Berisi data berkaitan dengan tipe permintaan pengobatan, seperti pengobatan yang diberikan/dikonsumsi pada rawat inap atau rawat jalan dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi `MedicationRequest Category Codes` (http://terminology.hl7.org/CodeSystem/medicationrequest-category). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### MedicationRequest.category[i].coding

Berisi data yang berkaitan dengan tipe permintaan pengobatan, seperti pengobatan yang diberikan/dikonsumsi pada rawat inap atau rawat jalan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/medicationrequest-category",
    "code": "outpatient",
    "display": "Outpatient"
  }
]
```

## MedicationRequest.priority

Berisi data yang mengindikasikan seberapa cepat permintaan pengobatan sebaiknya ditangani terkait dengan permintaan lainnya dengan tipe data `code`, yang nilainya mengacu pada data terminologi `RequestPriority` (http://hl7.org/fhir/request-priority). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"routine"
```

## MedicationRequest.reportedBoolean

Berisi data yang menunjukkan apakah data `Medication Request` yang diinput berasal dari resep yang langsung dituliskan oleh dokter atau diinput ulang oleh tenaga kesehatan lain (resep sekunder) dengan format pengisian adalah `boolean` di mana;

1. true = data peresepan merupakan data sekunder
2. false = data peresepan merupakan resep asli

## MedicationRequest.medicationReference

Berisi data informasi obat yang diresepkan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Medication`, yang nilainya memiliki format:

```
"Medication/{ID-resource-Medication}"
```

Di mana isi dari parameter `{ID-resource-Medication}` adalah ID dari *resource* *Medication* yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Medication/8f299a19-5887-4b8e-90a2-c2c15ecbe1d1",
  "display": "Obat Anti Tuberculosis / Rifampicin 150 mg / Isoniazid 75 mg / Pyrazinamide 400 mg / Ethambutol 275 mg Kaplet Salut Selaput (KIMIA FARMA)"
}
```

## \*MedicationRequest.subject

Berisi data informasi pasien yang diresepkan obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Group`, yang nilainya memiliki format:

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

## MedicationRequest.encounter

Berisi data informasi terkait kunjungan di mana peresepan obat dilakukan. **WAJIB** diisi apabila peresepan obat terjadi di rumah sakit dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
"Encounter/{ID-resource-Encounter}"
```

Di mana isi dari parameter `{ID-resource-Encounter}` adalah ID dari *resource* `Encounter` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Encounter/2823ed1d-3e3e-434e-9a5b-9c579d192787"
}
```

## MedicationRequest.authoredOn

Berisi data waktu peresepan dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

```
"2022-08-04"
```

## MedicationRequest.requester

Berisi data siapa yang melakukan peresepan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | Patient | RelatedPerson | Device`, yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah nomor ID NAKES organisasi induk yang didapatkan dari master NAKES indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Practitioner/N10000001",
  "display": "Dokter Bronsig"
}
```

## MedicationRequest.performer

Berisi satu atau lebih data mengenai siapa yang akan melakukan administrasi obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | Patient | Device | RelatedPerson | CareTeam`.

## MedicationRequest.performerType

Berisi data yang mengindikasikan jenis pelaku atau pemberi pengobatan dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### MedicationRequest.performerType.coding

Berisi data yang mengindikasikan jenis pelaku atau pemberi pengobatan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "158994007",
    "display": "Staff nurse"
  }
]
```

## MedicationRequest.recorder

Berisi data mengenai siapa yang mencatatkan resep ke dalam sistem dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole`, yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah nomor ID NAKES organisasi induk yang didapatkan dari master NAKES indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Practitioner/N10000001",
  "display": "Budi Santoso"
}
```

## MedicationRequest.reasonCode[i]

Berisi data mengenai alasan atau indikasi untuk meminta atau tidak meminta pengobatan dengan tipe data `CodeableConcept`.

### MedicationRequest.reasonCode[i].coding

Berisi data mengenai alasan atau indikasi untuk meminta atau tidak meminta pengobatan dengan tipe data `Coding` yang nilainya mengacu pada kode `ICD-10 code versi 2010`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

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

## MedicationRequest.reasonReference[i]

Berisi data mengenai alasan dilakukanya peresepan obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition | Observation`.

## MedicationRequest.basedOn[i]

Berisi data mengenai informasi terkait peresepan obat memenuhi permintaan apa dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CarePlan | MedicationRequest | ServiceRequest | ImmunizationRecommendation`.

## MedicationRequest.courseOfTherapyType

Berisi satu atau lebih data yang mendeskripsikan keseluruhan pola pemberian obat pada pasien dengan tipe data `CodeableConcept`.

### MedicationRequest.courseOfTherapyType.coding

Berisi data yang mendeskripsikan keseluruhan pola pemberian obat pada pasien dengan tipe data `Coding` yang nilainya mengacu pada data terminologi `MedicationRequest Course of Therapy Codes`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/medicationrequest-course-of-therapy",
    "code": "continuous",
    "display": "Continuing long term therapy"
  }
]
```

## MedicationRequest.insurance[i]

Berisi data mengenai informasi terkait asuransi yang melingkupi peresepan obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Coverage | ClaimResponse`.

## MedicationRequest.note[i]

Berisi satu atau lebih data catatan tambahan untuk peresepan obat yang tidak bisa diakomodir di elemen lain dengan tipe data `Annotation`.

## MedicationRequest.dosageInstruction[i]

Berisi satu atau lebih daftar data mengenai urutan aturan pemakaian dari obat masing-masing lokasi induk yang setiap datanya direpresentasikan dengan tipe data `Dosage`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

### MedicationRequest.dosageInstruction[i].sequence

Berisi data paket aturan pakai dengan nilai sequence dengan tipe data `integer`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

### MedicationRequest.dosageInstruction[i].text

Berisi satu atau lebih data aturan pakai obat dalam bentuk naratif dengan tipe data `string`.

### MedicationRequest.dosageInstruction[i].additionalInstruction

Berisi data yang berkaitan dengan instruksi tambahan bagi pasien mengenai bagaimana penggunaan obat (contoh: dikonsumsi saat makan,dll) atau terkait peringatan yang perlu diperhatikan bagi pasien mengenai obat yang akan digunakan dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

#### MedicationRequest.dosageInstruction[i].additionalInstruction[i].coding

Berisi data yang berkaitan dengan instruksi tambahan bagi pasien mengenai bagaimana penggunaan obat dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "311501008",
    "display": "Half to one hour before food"
  }
]
```

### MedicationRequest.dosageInstrution[i].patientInstruction

Berisi data instruksi aturan pakai dengan orientasi pasien dengan tipe data `string`.

### MedicationRequest.dosageInstruction[i].timing

Berisi satu atau lebih daftar data kapan obat diadministrasikan dengan tipe data `Timing`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

#### MedicationRequest.dosageInstruction[i].timing.event

Berisi data waktu spesifik suatu kejadian terjadi dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

#### MedicationRequest.dosageInstruction[i].timing.repeat

Berisi data aturan kapan suatu obat harus dikonsumsi dengan tipe data `Element`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**).

##### MedicationRequest.dosageInstruction[i].timing.repeat.bounds<?>

Berisi satu atau lebih daftar data diantaranya:

###### MedicationRequest.dosageInstruction[i].timing.repeat.boundsDuration

Berisi data batas/durasi suatu obat dikonsumsi contoh 10 hari dengan tipe data `Duration`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.boundsRange

Berisi data range suatu obat dikonsumsi dengan tipe data `Range`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.boundsPeriod

Berisi data periode suatu obat dikonsumsi dengan tipe data `Period`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.count

Berisi data jumlah repetisi yang diinginkan dengan tipe data `positiveInt`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.countMax

Berisi data apabila diisi, menjadi batas atas rentang repetisi yang diinginkan dengan tipe data `positiveInt`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.duration

Berisi data durasi atau lama pemberian obat dengan tipe data `decimal`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.durationMax

Berisi data apabila terisi, maka menjadi batas atas durasi yang diinginkan dengan tipe data `decimal`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.durationUnit

Berisi data unit dari durasi dalam `UCUM` (http://unitsofmeasure.org) dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

###### MedicationRequest.dosageInstruction[i].timing.repeat.frequency

Berisi data frekuensi pengulangan dalam jangka waktu (period) tertentu dengan tipe data `positiveInt`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.frequencyMax

Berisi data apabila terisi, maka menjadi batas atas frekuensi yang diinginkan dalam jangka waktu tertentu dengan tipe data `positiveInt`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.period

Berisi data jangka waktu/durasi waktu di mana repetisi akan terjadi dengan tipe data `decimal`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.periodMax

Berisi data apabila terisi, maka menjadi batas atas jangka waktu yang diinginkan dengan tipe data `decimal`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationRequest.dosageInstruction[i].timing.repeat.periodUnit

Berisi data unit dari period dalam `UCUM` (http://unitsofmeasure.org) dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

###### MedicationRequest.dosageInstruction[i].timing.repeat[i].dayOfWeek

Berisi data jika satu atau lebih hari dalam seminggu disediakan, maka konsumsi obat hanya terjadi pada hari yang ditentukan, dengan tipe data `code`, yang nilainya mengacu pada data terminologi `DaysOfWeek` (http://hl7.org/fhir/days-of-week). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

###### MedicationRequest.dosageInstruction[i].timing.repeat[i].timeOfDay

Berisi data waktu yang ditentukan dalam sehari untuk konsumsi yang akan dilakukan dengan tipe data `time`.

###### MedicationRequest.dosageInstruction[i].timing.repeat[i].when

Berisi data perkiraan periode waktu di suatu hari, berpotensi terkait dengan peristiwa kehidupan sehari-hari yang menunjukkan kapan obat harus dikonsumsi dengan tipe data `code`, yang nilainya mengacu pada data terminologi `TimingEvent` (http://hl7.org/fhir/event-timing) dan (http://terminology.hl7.org/CodeSystem/v3-TimingEvent). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

###### MedicationRequest.dosageInstruction[i].timing.repeat.offset

Berisi data Jumlah menit sebelum atau sesudah suatu kejadian dengan tipe data `unsignedInt`.

**Contoh JSON** `MedicationRequest.dosageInstruction[i].timing.repeat`

```
[
  {
    "frequency": 1,
    "period": 1,
    "periodUnit": "d"
  }
]
```

#### MedicationRequest.dosageInstruction[i].timing.code

Berisi data aturan kapan suatu obat harus dikonsumsi dengan tipe data `CodeableConcept`.

##### MedicationRequest.dosageInstruction[i].timing.code.coding

Berisi data kode untuk aturan kapan suatu obat harus dikonsumsi dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi `GTSAbbreviation` (http://terminology.hl7.org/CodeSystem/v3-GTSAbbreviation). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-GTSAbbreviation",
    "code": "BID",
    "display": "BID"
  }
]
```

### MedicationRequest.dosageInstruction[i].site

Berisi data yang berkaitan dengan bagian tubuh pasien yang digunakan untuk memasukkan obat dengan tipe data `CodeableConcept`, yang nilainya merujuk pada `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

#### MedicationRequest.dosageInstruction[i].site.coding

Berisi data yang berkaitan dengan bagian tubuh pasien yang digunakan untuk memasukkan obat dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "206007",
    "display": "Structure of gluteus maximus muscle"
  }
]
```

### MedicationRequest.dosageInstruction[i].route

Berisi data yang berkaitan dengan cara/rute yang digunakan untuk memasukkan obat ke dalam tubuh pasien dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi WHO ATC/DDD. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

#### MedicationRequest.dosageInstruction.route[i].coding

Berisi data yang berkaitan dengan cara/rute yang digunakan untuk memasukkan obat ke dalam tubuh pasien dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://www.whocc.no/atc",
    "code": "O",
    "display": "Oral"
  }
]
```

### MedicationRequest.dosageInstruction[i].method

Berisi data yang berkaitan dengan teknik pemberian obat kepada pasien dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

#### MedicationRequest.dosageInstruction[i].method.coding

Berisi data yang berkaitan dengan teknik pemberian obat kepada pasien pasien dengan tipe data `Coding`.

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "417924000",
    "display": "Apply"
  }
]
```

### MedicationRequest.dosageInstruction[i].doseAndRate[i].type

Berisi data yang berkaitan dengan jenis atau laju pengobatan yang diresepkan dengan tipe data `CodeableConcept` yang nilainya mengacu pada data terminologi `DoseAndRateType`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

#### MedicationRequest.dosageInstruction[i].doseAndRate[i].type.coding

Berisi data yang berkaitan dengan jenis atau laju pengobatan yang diresepkan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/dose-rate-type",
    "code": "ordered",
    "display": "Ordered"
  }
]
```

### MedicationRequest.dosageInstruction[i].doseAndRate.dose[x]

Berisi data jumlah obat yang diberikan perdosis. Format pengisian dapat memilih salah satu dari element `doseAndRate` berikut ini.

#### MedicationRequest.dosageInstruction[i].doseAndRate[i].doseRange

Berisi data jumlah obat yang diberikan perdosis dituliskan dalam bentuk range dengan tipe data `Range`, yang nilai satuan kekuatan zat aktif dapat mengacu pada tiga data terminologi, yaitu `UCUM` (http://unitsofmeasure.org), `OrderableDrugForm` (http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm), dan `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON low**

```
{
  "value": 1,
  "unit": "TAB",
  "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
  "code": "TAB"
}
```

**Contoh JSON high**

```
{
  "value": 2,
  "unit": "TAB",
  "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
  "code": "TAB"
}
```

#### MedicationRequest.dosageInstruction[i].doseAndRate[i].doseQuantity

Berisi data jumlah obat yang diberikan perdosis dituliskan dalam bentuk kuantitas dengan tipe data `SimpleQuantity`, yang nilai satuan kekuatan zat aktif mengacu pada tiga data terminologi, yaitu: `UCUM` (http://unitsofmeasure.org), `OrderableDrugForm` (http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm), dan `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "value": 4,
  "unit": "TAB",
  "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
  "code": "TAB"
}
```

### MedicationRequest.dosageInstruction[i].doseAndRate[i].rate<?>

Berisi data Jumlah obat per satuan waktu (laju pemberian obat, contoh 100 ml/jam, atau 500 ml dalam 2 jam).

#### MedicationRequest.dosageInstruction[i].doseAndRate[i].rateRatio

Berisi data Jumlah obat per satuan waktu (laju pemberian obat, contoh 100 ml/jam, atau 500 ml dalam 2 jam) dengan tipe data `Ratio`.

#### MedicationRequest.dosageInstruction[i].doseAndRate[i].rateRange

Berisi data Jumlah obat per satuan waktu (laju pemberian obat, contoh 100 ml/jam, atau 500 ml dalam 2 jam) dengan tipe data `Range`.

#### MedicationRequest.dosageInstruction[i].doseAndRate.[i]rateQuantity

Berisi data Jumlah obat per satuan waktu (laju pemberian obat, contoh 100 ml/jam, atau 500 ml dalam 2 jam) dengan tipe data `SimpleQuantity`.

**Contoh JSON MedicationRequest.dosageInstruction.doseAndRate[i].rate<?>**

```
{
  "system": "http://unitsofmeasure.org",
  "code": "mL",
  "value": 8
}
```

### MedicationRequest.dosageInstruction[i].maxDosePerPeriod

Berisi satu atau lebih data batas maksimal pemberian obat per satuan waktu dengan tipe data `Ratio`.

### MedicationRequest.dosageInstruction[i].maxDosePerAdministration

Berisi Batas maksimal pemberian obat per administrasi dengan tipe data `SimpleQuantity`.

### MedicationRequest.dosageInstruction[i].maxDosePerLifeTime

Berisi Batas maksimal pemberian obat selama seumur hidup dengan tipe data `SimpleQuantity`.

## MedicationRequest.dispenseRequest.dispenseInterval

Berisi data yang Berkaitan dengan periode waktu minimal yang harus dilakukan antara pengeluaran obat dengan tipe data `Duration` yang nilai satuan kekuatan zat aktifnya merujuk pada `CommonUCUMCodesForDuration`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "value": 1,
  "unit": "days",
  "system": "http://unitsofmeasure.org",
  "code": "d"
}
```

## MedicationRequest.dispenseRequest.validityPeriod

Berisi data Periode waktu peresepan obat valid dengan tipe data `Period`.

**Contoh JSON**

```
{
  "start": "2022-01-01",
  "end": "2022-01-30"
}
```

## MedicationRequest.dispenseRequest.numberOfRepeatsAllowed

Berisi satu atau lebih data terkait Berapa kali resep obat dapat diulang (iter). Angka yang tertulis merupakan jumlah resep boleh diulang diluar resep asli. Contoh bila diisi dengan angka “3”, maka resep dapat digunakan untuk 4 kali dispense (original + 3x iter) dengan tipe data `unsignedInt`.

## MedicationRequest.dispenseRequest.quantity

Berisi data jumlah obat yang diberikan dalam 1 kali resep dengan tipe data `SimpleQuantity`, yang nilai satuan kekuatan zat aktif mengacu pada tiga data terminologi, yaitu `OrderableDrugForm` (http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm), `UCUM` (http://unitsofmeasure.org), dan `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "value": 120,
  "unit": "TAB",
  "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
  "code": "TAB"
}
```

## MedicationRequest.dispenseRequest.expectedSupplyDuration

Berisi data identifikasi periode waktu selama produk yang diberikan diharapkan digunakan atau lamanya waktu pengeluaran yang diharapkan dengan tipe data `Duration`.

**Contoh JSON**

```
{
  "value": 30,
  "unit": "days",
  "system": "http://unitsofmeasure.org",
  "code": "d"
}
```

## MedicationRequest.dispenseRequest.performer

Berisi data organisasi yang ditunjuk untuk melakukan dispensing obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Organization`.

**Contoh JSON**

```
{
  "reference": "Organization/10000004"
}
```

## \*MedicationRequest.substitution.allowed<?>

Berisi data informasi apakah obat yang diresepkan boleh disubstitusi. Format pengiriman dapat memilih salah satu dari element `allowed` berikut ini:

### MedicationRequest.substitution.allowedBoolean

Berisi data informasi apakah obat yang diresepkan boleh disubstitusi dengan tipe data `boolean`.

### MedicationRequest.substitution.allowedCodeableConcept

Berisi data informasi apakah obat yang diresepkan boleh disubstitusi dengan tipe data `CodeableConcept`.

#### MedicationRequest.substitution.allowedCodeableConcept.coding

Berisi data informasi apakah obat yang diresepkan boleh disubstitusi dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi (https://terminology.hl7.org/3.1.0/CodeSystem-v3-substanceAdminSubstitution.html). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "https://terminology.hl7.org/3.1.0/CodeSystem-v3-substanceAdminSubstitution.html",
    "code": "EC",
    "display": "Equivalent composition"
  }
]
```

## MedicationRequest.substitution.reason

Berisi data yang mengindikasikan alasan untuk mengganti atau mengapa penggantian harus/tidak harus dilakukan dengan tipe data `CodeableConcept`.

### MedicationRequest.substitution.reason.coding

Berisi data yang mengindikasikan alasan untuk mengganti atau mengapa penggantian harus/tidak harus dilakukan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi (https://terminology.hl7.org/3.1.0/CodeSystem-v3-ActReason.html). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ActReason",
    "code": "CT",
    "display": "continuing therapy"
  }
]
```
