> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/medication-dispense/

---

# MedicationDispense

Pengiriman data pengeluaran/dispense obat akan menggunakan 2 *resources* yaitu `Medication` dan `MedicationDispense`. *Resource* `Medication` akan mencatatkan data umum terkait obat yang akan di *dispense*. Sedangkan *resource* `MedicationDispense` akan digunakan untuk mengirimkan data terkait proses *dispense* obat, seperti jumlah yang di *dispense*, instruksi minum obat dan lain-lain. Kedua data ini dikirimkan secara bersamaan sebagai 1 paket yaitu `Medication` dan `MedicationDispense`. Satu *payload* `Medication` dan `MedicationDispense` hanya digunakan untuk *dispense*/pengeluaran 1 jenis obat saja. Apabila terdapat 2 jenis obat yang dikeluarkan, maka dikirimkan 2 paket `Medication` dan `MedicationDispense`.

Berikut pemetaan nilai untuk MedicationDispense yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data laporan hasil pemeriksaan:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## MedicationDispense.identifier[i]

Terdapat dua ID lokal dispense obat yang perlu dikirimkan, yaitu:

1. ID Lokal dispense secara umum Merupakan ID lokal di masing-masing institusi yang merepresentasikan suatu dispense terhadap satu resep yang dibuat oleh dokter (dapat terdiri dari lebih dari 1 obat dalam 1 resep).
2. ID Lokal dispense per-item obat Merupakan ID lokal di masing-masing institusi untuk setiap obat yang di dispense dalam suatu resep.

Contoh: 1 dispense terdiri dari 2 obat. Maka terdapat 2 *record* `MedicationDispense` dengan ketentuan:

1. `MedicationDispense` #1 ID lokal dispense secara umum = 12345678
   ID lokal per-item obat#1 = 12345678-1
2. `MedicationDispense` #2 ID lokal dispense secara umum = 12345678
   ID lokal per-item obat#1 = 12345678-2

### MedicationDispense.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### MedicationDispense.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/medicationdispense/{{organization-ihs-number}}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor ID organisasi induk yang didapatkan dari master sarana indeks.

### MedicationDispense.identifier[i].value

Berisi kode atau ID lokal peresepan obat yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON ID lokal dispense secara umum**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/prescription/10000004",
    "use": "official",
    "value": "123456788"
  }
]
```

**Contoh JSON ID lokal Dispense per-item OBAT**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/prescription-item/10000004",
    "use": "official",
    "value": "123456788-1"
  }
]
```

## MedicationDispense.partOf[i]

Berisi data dari proses pemberian obat merupakan bagian dari suatu prosedur dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Procedure`.

## \*MedicationDispense.status

Berisi data yang berkaitan dengan kode spesifik yang menunjukkan status pengobatan saat ini yang umumnya akan berupa status aktif atau komplit dengan tipe data `code` yang nilainya mengacu pada `MedicationDispense Status`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"completed"
```

## MedicationDispense.category

Berisi data yang berkaitan dengan tipe permintaan pengobatan, seperti pengobatan yang diberikan/dikonsumsi pada rawat inap atau rawat jalan dengan tipe data `CodeableConcept`.

### MedicationDispense.category.coding

Berisi satu atau lebih data yang berkaitan dengan tipe permintaan pengobatan, seperti pengobatan yang diberikan/dikonsumsi pada rawat inap atau rawat jalan dengan tipe data `Coding`, yang nilainya mengacu pada `MedicationDispense category`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/fhir/CodeSystem/medicationdispense-category",
    "code": "outpatient",
    "display": "Outpatient"
  }
]
```

## MedicationDispense.medicationReference

Berisi data yang berkaitan dengan sediaan obat yang diberikan kepada pasien dengan tipe data `Reference` yang nilainya mengacu pada `Medication.id` yang didapat setelah mengirimkan *resource* `Medication`.

**Contoh JSON**

```
{
  "reference": "Medication/2b78a453-dd36-4d5f-8264-d575e3321a8b",
  "display": "Obat Anti Tuberculosis / Rifampicin 150 mg / Isoniazid 75 mg / Pyrazinamide 400 mg / Ethambutol 275 mg Kaplet Salut Selaput (KIMIA FARMA)"
}
```

## \*MedicationDispense.subject

Berisi satu atau lebih data informasi pasien yang mendapatkan obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Group`, yang nilainya memiliki format:

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

## MedicationDispense.context

Berisi data informasi terkait kunjungan di mana dispense obat dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter | EpisodeOfCare`, yang nilainya memiliki format:

```
"Encounter/{ID-resource-Encounter}"
```

Di mana isi dari parameter `{ID-resource-Encounter}` adalah ID dari *resource* `Encounter` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

```
{
  "reference": "Encounter/2823ed1d-3e3e-434e-9a5b-9c579d192787"
}
```

## MedicationDispense.performer[i]

Berisi data informasi terkait siapa yang memberikan obat dengan tipe data `BackboneElement`.

### MedicationDispense.performer.function

Berisi data indikasikan jenis pelaku/pemberi pengobatan dengan tipe data `CodeableConcept` yang nilainya mengacu pada: `MedicationDispense performer Function Codes`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

#### MedicationDispense.performer.function.coding

Berisi data indikasikan jenis pelaku/pemberi pengobatan dengan tipe data `Coding` yang nilainya mengacu pada data terminologi `MedicationDispense performer Function Codes`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/medicationdispense-performer-function",
    "code": "dataenterer",
    "display": "Data Enterer"
  }
]
```

### \*MedicationDispense.performer.actor

Berisi data informasi terkait siapa yang memberikan obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | Patient | https://fhir.kemkes.go.id/r4/StructureDefinition/Device | RelatedPerson` yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah nomor ID NAKES yang didapatkan dari master practitioner indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Practitioner/N10000003",
  "display": "John Miller"
}
```

## MedicationDispense.location

Berisi data lokasi di mana obat diberikan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location.id`, yang nilainya memiliki format:

```
"Location/{ID-resource-Location}"
```

Di mana isi dari parameter `{ID-resource-Location}` adalah ID dari *resource* `Location` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Location/52e135eb-1956-4871-ba13-e833e662484d",
  "display": "Apotek RSUD Jati Asih"
}
```

## MedicationDispense.authorizingPrescription[i]

Berisi data otorisasi resep dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `MedicationRequest.id`, yang nilainya memiliki format:

**Contoh JSON**

```
{
  "reference": "MedicationRequest/b5293e6d-31c6-4111-8214-609ae5890838"
}
```

## MedicationDispense.quantity

Berisi data jumlah obat yang dikeluarkan dalam bentuk numerical dengan tipe data `SimpleQuantity`, yang nilai satuan kekuatan zat aktif dapat mengacu pada data terminologi `OrderableDrugForm` (http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm) dan `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
    "code": "TAB",
    "value": 120
  }
]
```

## MedicationDispense.daysSupply

Berisi data jumlah pengobatan yang dinyatakan dalam satuan hari dengan tipe data `SimpleQuantity`.

**Contoh JSON**

```
[
  {
    "value": 30,
    "unit": "Day",
    "system": "http://unitsofmeasure.org",
    "code": "d"
  }
]
```

## MedicationDispense.whenPrepared

Berisi data yang berkaitan dengan kapan obat dikemas dan dicek dengan tipe data `dateTime` dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2022-01-15T10:20:00Z",
```

## MedicationDispense.whenHandedOver

Berisi data yang berisikan data waktu pemberian obat kepada pasien atau penanggungjawab pasien dengan tipe data `dateTime` dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh Nilai**

```
"2022-01-15T16:20:00Z",
```

## MedicationDispense.dosageInstruction[i].sequence

Berisi data urutan aturan pemakaian dari obat dengan tipe data `integer`. Apabila dalam peresepan aturan pakai akan selalu sama dari awal sampai akhir, maka cukup menuliskan 1 paket aturan pakai dengan nilai sequence=1. Apabila terdapat perubahan aturan pakai dalam peresepan, contoh *tapering-down*, maka perlu dituliskan 2 paket aturan pakai dengan paket pertama nilai sequence=1, sedangkan paket aturan pakai kedua dengan nilai sequence=2

### MedicationDispense.dosageInstruction[i].text

Berisi data aturan pakai obat dalam bentuk naratif dengan tipe data `string`.

### MedicationDispense.dosageInstruction[i].additionalInstruction

Berisi data yang berkaitan dengan instruksi tambahan bagi pasien mengenai bagaimana penggunaan obat dengan tipe data `CodeableConcept`.

#### MedicationDispense.dosageInstruction[i].additionalInstruction[i].coding

Berisi data yang berkaitan dengan instruksi tambahan bagi pasien mengenai bagaimana penggunaan obat dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh Nilai**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "311501008",
    "display": "Half to one hour before food"
  }
]
```

### MedicationDispense.dosageInstrution[i].patientInstruction

Berisi data instruksi aturan pakai dengan orientasi pasien dengan tipe data `string`.

### MedicationDispense.dosageInstruction[i].timing

Berisi data kapan obat diadministrasikan dengan tipe data `Timing`.

#### MedicationDispense.dosageInstruction[i].timing.event

Berisi data waktu spesifik suatu kejadian terjadi dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

#### MedicationDispense.dosageInstruction[i].timing.repeat

Berisi data aturan kapan suatu obat harus dikonsumsi dengan tipe data `Element`.

##### MedicationDispense.dosageInstruction[i].timing.repeat.bounds[x]

Berisi satu atau lebih daftar data diantaranya:

###### MedicationDispense.dosageInstruction[i].timing.repeat.boundsDuration

Berisi data batas/durasi suatu obat dikonsumsi contoh 10 hari dengan tipe data `Duration`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.boundsRange

Berisi data range suatu obat dikonsumsi dengan tipe data `Range`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.boundsPeriod

Berisi data periode suatu obat dikonsumsi dengan tipe data `Period`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.count

Berisi data jumlah repetisi yang diinginkan dengan tipe data `positiveInt`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.countMax

Berisi data apabila diisi, menjadi batas atas rentang repetisi yang diinginkan dengan tipe data `positiveInt`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.duration

Berisi data durasi atau lama pemberian obat dengan tipe data `decimal`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.durationMax

Berisi data apabila terisi, maka menjadi batas atas durasi yang diinginkan dengan tipe data `decimal`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.durationUnit

Berisi data unit dari durasi dalam `UCUM` (http://unitsofmeasure.org) dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

###### MedicationDispense.dosageInstruction[i].timing.repeat.frequency

Berisi data frekuensi pengulangan dalam jangka waktu (period) tertentu dengan tipe data `positiveInt`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.frequencyMax

Berisi data apabila terisi, maka menjadi batas atas frekuensi yang diinginkan dalam jangka waktu tertentu dengan tipe data `positiveInt`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.period

Berisi data Jangka waktu/durasi waktu di mana repetisi akan terjadi dengan tipe data `decimal`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.periodMax

Berisi data apabila terisi, maka menjadi batas atas jangka waktu yang diinginkan dengan tipe data `decimal`. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

###### MedicationDispense.dosageInstruction[i].timing.repeat.periodUnit

Berisi data unit dari period dalam `UCUM` (http://unitsofmeasure.org) dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

###### MedicationDispense.dosageInstruction[i].timing.repeat[i].dayOfWeek

Berisi data jika satu atau lebih hari dalam seminggu disediakan, maka konsumsi obat hanya terjadi pada hari yang ditentukan, dengan tipe data `code`, yang nilainya mengacu pada data terminologi `DaysOfWeek` (http://hl7.org/fhir/days-of-week). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

###### MedicationDispense.dosageInstruction[i].timing.repeat[i].timeOfDay

Berisi data waktu yang ditentukan dalam sehari untuk konsumsi yang akan dilakukan dengan tipe data `time`.

###### MedicationDispense.dosageInstruction[i].timing.repeat[i].when

Berisi data perkiraan periode waktu di suatu hari, berpotensi terkait dengan peristiwa kehidupan sehari-hari yang menunjukkan kapan obat harus dikonsumsi dengan tipe data `code`, yang nilainya mengacu pada dua data terminologi `TimingEvent` (http://hl7.org/fhir/event-timing) dan (http://terminology.hl7.org/CodeSystem/v3-TimingEvent). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

###### MedicationDispense.dosageInstruction[i].timing.repeat.offset

Berisi data Jumlah menit sebelum atau sesudah suatu kejadian dengan tipe data `unsignedInt`.

**Contoh JSON** `MedicationDispense.dosageInstruction[i].timing.repeat`

```
[
  {
    "frequency": 1,
    "period": 1,
    "periodUnit": "d"
  }
]
```

#### MedicationDispense.dosageInstruction[i].timing.code

Berisi data aturan kapan suatu obat harus dikonsumsi dengan tipe data `CodeableConcept`.

##### MedicationDispense.dosageInstruction[i].timing.code.coding

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

### MedicationDispense.dosageInstruction[i].site

Berisi data yang berkaitan dengan bagian tubuh pasien yang digunakan untuk memasukkan obat dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi `SNOMED CT`. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

#### MedicationDispense.dosageInstruction[i].site.coding

Berisi data yang berkaitan dengan bagian tubuh pasien yang digunakan untuk memasukkan obat dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

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

### MedicationDispense.dosageInstruction[i].route

Berisi data yang berkaitan dengan cara/rute yang digunakan untuk memasukkan obat ke dalam tubuh pasien yang nilainya mengacu pada salah satu data terminologi dengan nama dengan tipe data `CodeableConcept`.

#### MedicationDispense.dosageInstruction[i].route.coding

Berisi data yang berkaitan dengan cara/rute yang digunakan untuk memasukkan obat ke dalam tubuh pasien yang nilainya mengacu pada salah satu data terminologi dengan nama dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi `WHO ATC/DDD`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://www.whocc.no/atc",
    "code": "implant",
    "display": "Implant"
  }
]
```

### MedicationDispense.dosageInstruction[i].method

Berisi data yang berkaitan dengan teknik pemberian obat kepada pasien dengan tipe data `CodeableConcept`.

#### MedicationDispense.dosageInstruction[i].method.coding

Berisi data yang berkaitan dengan teknik pemberian obat kepada pasien dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi `SNOMED CT`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

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

### MedicationDispense.dosageInstruction[i].doseAndRate.type

Berisi data yang berkaitan dengan jenis atau laju pengobatan yang diresepkan dengan tipe data `CodeableConcept`.

#### MedicationDispense.dosageInstruction[i].doseAndRate.type[i].coding

Berisi data yang berkaitan dengan jenis atau laju pengobatan yang diresepkan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi `DoseAndRateType`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

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

### MedicationDispense.dosageInstruction[i].doseAndRate.dose<?>

Berisi data jumlah obat yang diberikan perdosis.

#### MedicationDispense.dosageInstruction[i].doseAndRate.doseRange

Berisi data jumlah obat yang diberikan perdosis dengan tipe data `Range`.

**Contoh JSON**

```
[
  {
    "value": "1",
    "unit": "TAB",
    "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
    "code": "TAB"
  }
]
```

#### MedicationDispense.dosageInstruction[i].doseAndRate.doseQuantity

Berisi data jumlah obat yang diberikan perdosis dengan tipe data `SimpleQuantity`.

**Contoh JSON**

```
[
  {
    "value": 4,
    "unit": "TAB",
    "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
    "code": "TAB"
  }
]
```

### MedicationDispense.dosageInstruction[i].doseAndRate.rate[x]

Berisi data jumlah obat per satuan waktu (laju pemberian obat, contoh 100 ml/jam, atau 500 ml dalam 2 jam).

#### MedicationDispense.dosageInstruction[i].doseAndRate.rateRatio

Berisi data jumlah obat per satuan waktu (laju pemberian obat, contoh 100 ml/jam, atau 500 ml dalam 2 jam) dengan tipe data `Ratio`.

#### MedicationDispense.dosageInstruction[i].doseAndRate.rateRange

Berisi data jumlah obat per satuan waktu (laju pemberian obat, contoh 100 ml/jam, atau 500 ml dalam 2 jam) dengan tipe data `Range`.

#### MedicationDispense.dosageInstruction[i].doseAndRate.rateQuantity

Berisi data jumlah obat per satuan waktu (laju pemberian obat, contoh 100 ml/jam, atau 500 ml dalam 2 jam) dengan tipe data `SimpleQuantity`.

**Contoh JSON** `MedicationDispense.dosageInstruction[i].doseAndRate.rate`

```
[
  {
    "system": "http://unitsofmeasure.org",
    "code": "mL",
    "value": "8"
  }
]
```

### MedicationDispense.dosageInstruction[i].maxDosePerPeriod

Berisi data batas maksimal pemberian obat per satuan waktu dengan tipe data `Ratio`.

### MedicationDispense.dosageInstruction[i].maxDosePerAdministration

Berisi data batas maksimal pemberian obat per administrasi dengan tipe data `SimpleQuantity`.

### MedicationDispense.dosageInstruction[i].maxDosePerLifeTime

Berisi data batas maksimal pemberian obat selama seumur hidup dengan tipe data `SimpleQuantity`.

## \*MedicationDispense.substitution.wasSubstituted

Berisi data informasi apakah obat dilakukan substitusi dengan tipe data `boolean`.

## MedicationDispense.substitution.type

Berisi data kode yang menandakan apakah obat yang berbeda dikeluarkan dari apa yang diresepkan dengan tipe data `CodeableConcept`.

### MedicationDispense.substitution.type.coding

Berisi data kode yang menandakan apakah obat yang berbeda dikeluarkan dari apa yang diresepkan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-substanceAdminSubstitution",
    "code": "E",
    "display": "equivalent"
  }
]
```

## MedicationDispense.substitution.reason[i]

Berisi data indikasikan alasan untuk mengganti atau mengapa penggantian harus/tidak harus dilakukan dengan tipe data `CodeableConcept`.

### MedicationDispense.substitution.reason[i].coding

Berisi data indikasikan alasan untuk mengganti atau mengapa penggantian harus/tidak harus dilakukan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

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

## MedicationDispense.substitution.responsibleParty[i]

Berisi data individu yang bertanggung jawab utama terhadap substitusi obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole`.
