> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/immunization/

---

# Immunization

Variabel terkait status imunisasi tetanus dari ibu hamil dapat dikirimkan melalui *resource* `Immunization`.

Berikut pemetaan nilai untuk Immunization yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data status imunisasi tetanus:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Immunization.identifier[i]

Berisi data ID internal faskes untuk pencatatan imunisasi ini dengan tipe data `Identifier`.

### Immunization.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Immunization.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/immunization/{{organization-ihs-number}}/
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor ID organisasi induk yang didapatkan dari master sarana indeks.

### Immunization.identifier[i].value

Berisi kode atau nomor internal sub organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/immunization/1000004",
    "use": "official",
    "value": "I8734"
  }
]
```

## \*Immunization.status

Berisi data status proses imunisasi dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"completed"
```

## Immunization.statusReason

Berisi data alasan yang menyebabkan tidak dilakukannya vaksinasi dengan tipe data `CodeableConcept`.

### Immunization.statusReason.coding

Berisi data alasan yang menyebabkan tidak dilakukannya vaksinasi dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ImmunizationStatusReasonCodes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.hl7.org/CodeSystem/v3-ActReason",
  "code": "IMMUNE",
  "display": "immunity"
}
```

## \*Immunization.vaccineCode

Berisi dua skema pemilihan kode vaksin yang dituliskan pada elemen `Immunization.vaccineCode` dengan tipe data `CodeableConcept`, yang nilainya mengacu pada data terminologi akan menggunakan kode obat yang tersedia pada kf+a (kamus farmasi dan alat kesehatan).

1. **Pencatatan Pemberian Imunisasi dan Pencatatan Riwayat Imunisasi Berdasarkan Catatan Tertulis**

   * Terdapat 3 kelompok kode yang perlu dikirimkan:

     1. Kode produk vaksin aktual dari kamus farmasi dan alat kesehatan

        + Format kode: 93xxxxxx
        + Pemilihan kode disesuaikan dengan produk vaksin yang diadministrasikan ke pasien
     2. Kode CVX group

        + Kode kelompok vaksin yang dikeluarkan oleh Centers for Disease Control and Prevention (CDC)
     3. Kode CVX name

        + Kode jenis vaksin yang dikeluarkan oleh Centers for Disease Control and Prevention (CDC)
   * Panduan dan format pengisian dapat dilihat dalam Lampiran 4.
2. **Pencatatan Riwayat Imunisasi Berdasarkan Ingatan Masa Lalu**

   * Terdapat 2 kelompok kode yang perlu dikirimkan:

     1. Kode CVX group

        + Kode kelompok vaksin yang dikeluarkan oleh Centers for Disease Control and Prevention (CDC)
     2. Kode CVX name

        + Kode jenis vaksin yang dikeluarkan oleh Centers for Disease Control and Prevention (CDC)
        + Optional tergantung jenis imunisasi
        + Jenis imunisasi yang perlu dikirimkan kode CVX namenya adalah

          1. DPT-HB-Hib
          2. OPV
          3. IPV
          4. Campak Rubella/MR
          5. MMR

### Immunization.vaccineCode.coding

Berisi dua data skema pemilihan kode vaksin yang dituliskan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON** Kode CVX Group

```
{
  "system": "http://sys-ids.kemkes.go.id/kfa",
  "code": "VG45",
  "display": "HepB"
}
```

**Contoh JSON** Kode CVX Name

```
{
  "system": "http://hl7.org/fhir/sid/cvx",
  "code": "198",
  "display": "DTP-hepB-Hib Pentavalent Non-US"
}
```

## \*Immunization.patient

Berisi data pasien yang mendapatkan imunisasi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient`, yang nilainya memiliki format:

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

## Immunization.encounter

Berisi data kunjungan di mana proses imunisasi terjadi dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Encounter`. Wajib diisi apabila pencatatan data imunisasi yang dilaksanakan bersamaan dengan dilakukannya tindakan imunisasi oleh tenaga kesehatan, yang nilainya memiliki format:

```
"Encounter/{ID-resource-Encounter}"
```

Di mana isi dari parameter `{ID-resource-Encounter}` adalah ID *resource* `Encounter` yang didapatkan dari *server*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Encounter/8a224d91-5132-47d0-ae35-0fc70f24a776"
}
```

## \*Immunization.occurrence<?>

Berisi data mengenai tanggal vaksin diberikan atau akan diberikan.

### Immunization.occurenceDateTime

Berisi data kapan vaksin diadministrasikan dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

### Immunization.occurrenceString

Berisi data kapan vaksin diadministrasikan dengan tipe data `string`.

## Immunization.recorded

Berisi data kapan pencatatan vaksin dicatatkan (kemungkinan terjadi setelah vaksin diadministrasikan) dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## Immunization.primarySource

Berisi data apakah sumber informasi data vaksinasi berasal dari orang yang melakukan administrasi vaksin. Format pengisian dengan tipe data `boolean` *(true/false)* \* true: informasi data vaksinasi bersumber langsung dari orang yang melakukan administrasi vaksin (tenaga kesehatan yang langsung mengadministrasikan atau tenaga kesehatan/tenaga lainnya yang melihat dan bertugas melakukan pencatatan data imunisasi yang dilakukan secara langsung oleh tenaga kesehatan yang melakukan administrasi vaksin). \* false: informasi data vaksinasi bukan bersumber langsung dari orang yang melakukan administrasi vaksin. Bila “false”, maka isi elemen `Immunization.reportOrigin`.

## Immunization.reportOrigin

Berisi sumber data vaksinasi apabila data vaksinasi tidak berdasarkan informasi langsung dari orang yang melakukan administrasi vaksin dengan tipe data `CodeableConcept` yang mengacu pada `Immunization Origin Codes`. Elemen ini diisi apabila `Immunization.primarySource` = false.

## Immunization.reportOrigin.coding

Berisi sumber data vaksinasi apabila data vaksinasi yang didapatkan sekunder atau diisi oleh orang selain yang mengadministrasikan vaksin dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.hl7.org/CodeSystem/immunization-origin",
  "code": "provider",
  "display": "Other Provider"
}
```

## Immunization.location

Berisi data fasilitas pelayanan kesehatan di mana proses imunisasi terjadi dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Location`, yang nilainya memiliki format:

```
"Location/{ID-resource-Location}"
```

Di mana isi dari parameter `{ID-resource-Location}` adalah ID dari *resource* `Location` yang didapatkan dari *server*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Location/ef011065-38c9-46f8-9c35-d1fe68966a3e",
  "display": "Ruang 1A, Poliklinik Rawat Jalan"
}
```

## Immunization.manufacturer

Berisi data nama pabrik pembuat/produksi vaksin dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Organization`, yang nilainya memiliki format:

```
"Organization/{organization-ihs-number}"
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor ID organisasi induk yang didapatkan dari master sarana indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Organization/110000304"
}
```

## Immunization.lotNumber

Berisi data nomor batch vaksin yang diberikan dengan tipe data `string`. Elemen ini **wajib** diisi pada kasus imunisasi yang dilakukan langsung oleh tenaga kesehatan.

## Immunization.expirationDate

Berisi data tanggal kadaluarsa vaksin yang diberikan dengan tipe data `date` dalam format `YYYY-MM-DD`.Elemen ini **wajib** diisi pada kasus imunisasi yang dilakukan langsung oleh tenaga kesehatan.

## Immunization.site

Berisi data bagian tubuh pasien yang digunakan untuk pemberian vaksin dengan tipe data `CodeableConcept`.

### Immunization.site.coding

Berisi data bagian tubuh pasien yang digunakan untuk pemberian vaksin dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi *Vaccine Administered Value Set*. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.hl7.org/CodeSystem/v3-ActSite",
  "code": "LA",
  "display": "Left Arm"
}
```

## Immunization.route

Berisi data rute atau cara memasukkan vaksinasi ke dalam tubuh dengan tipe data `CodeableConcept`.

### Immunization.route.coding

Berisi data rute atau cara memasukkan vaksinasi ke dalam tubuh dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi WHO ATC/DDD. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "https://www.whocc.no/atc_ddd_index/",
  "code": "inj.intramuscular",
  "display": "Injection Intramuscular"
}
```

## Immunization.doseQuantity

Berisi data jumlah dosis vaksinasi yang diberikan dalam 1 pemberian dengan tipe data `SimpleQuantity`.

**Contoh JSON**

```
{
  "value": 1,
  "unit": "mL",
  "system": "http://unitsofmeasure.org",
  "code": "mL"
}
```

## Immunization.performer[i]

Berisi data tenaga kesehatan yang melakukan pemberian vaksin dengan tipe data `BackboneElement`. Terdapat 2 elemen yang dapat diisi dalam `Immunization.performer`.

## Immunization.performer.function

Berisi data peran tenaga kesehatan dalam proses vaksin/imunisasi dengan tipe data `CodeableConcept`.

### Immunization.performer.function.coding

Berisi data peran tenaga kesehatan dalam proses vaksin/imunisasi dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi Immunization Function Codes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.hl7.org/CodeSystem/v2-0443",
  "code": "OP",
  "display": "Ordering Provider"
}
```

## \*Immunization.performer.actor

Berisi data tenaga kesehatan atau organisasi yang memberikan imunisasi/vaksin dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization`, yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
```

**Dan**

```
"Organization/{organization-ihs-number}"
```

Di mana isi dari parameter `{practitioner-ihs-number}` adalah ID NAKES yang didapatkan dari master NAKES indeks dan `{organization-ihs-number}` adalah ID Organisasi induk yang didapatkan dari master Sarana indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Practitioner/N10000001",
  "display": "Dokter Bronsig"
}
```

## Immunization.note[i]

Berisi data catatan atau keterangan tambahan terkait imunisasi/vaksin yang dibutuhkan dengan tipe data `Annotation`. Terdapat 3 elemen yang dapat diisi dalam `Immunization.note`.

## Immunization.reasonCode[i]

Berisi data kategori imunisasi yang dilakukan berdasarkan hierarki yang tertulis di Peraturan Menteri Kesehatan No. 12 tahun 2017 tentang Penyelenggaraan Imunisasi dengan tipe data `CodeableConcept`. Khusus **imunisasi rutin (IM-Rutin)**, wajib dikirimkan tambahan klasifikasi waktu pemberian imunisasi rutin yaitu Imunisasi Ideal dan Kejar.

### Immunization.reasonCode[i].coding

Berisi data kategori imunisasi yang dilakukan berdasarkan hierarki dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.kemkes.go.id/CodeSystem/immunization-routine-timing",
  "code": "IM-Ideal",
  "display": "Imunisasi Ideal"
}
```

## Immunization.reasonReference[i]

Berisi data kondisi, observasi atau hasil diagnosis yang menjadi dasar dilakukannya imunisasi dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Condition | Observation | DiagnosticReport`.

## Immunization.isSubpotent

Berisi data indikasi sub potensi dosis pemberian vaksin. Format pengisian dengan tipe data `boolean` (true/false).

## Immunization.subpotentReason[i]

Berisi data alasan yang mendasari sub potensi pemberian vaksin dengan tipe data `CodeableConcept`.

### Immunization.subpotentReason[i].coding

Berisi data alasan yang mendasari sub potensi pemberian vaksin dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi Immunization Subpotent Reason. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.hl7.org/CodeSystem/immunization-subpotent-reason",
  "code": "Partial",
  "display": "Partial Dose"
}
```

## Immunization.education[i]

Berisi data materi edukasi yang diberikan kepada pasien ketika pemberian vaksin dengan tipe data `BackboneElement`. Terdapat 4 elemen yang dapat diisi dalam `Immunization.education`.

## Immunization.education.documentType

Berisi data identifier untuk materi edukasi imunisasi dengan tipe data `string`.

## Immunization.education.reference

Berisi data rujukan materi edukasi imunisasi dengan tipe data `uri`.

## Immunization.education.publicationDate

Berisi data tanggal dilakukannya proses publikasi materi edukasi imunisasi/vaksin dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## Immunization.education.presentationDate

Berisi data tanggal dilakukannya proses presentasi materi edukasi imunisasi/vaksin dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## Immunization.programEligibility[i]

Berisi data eligibilitas pasien untuk mendapatkan subsidi vaksin/imunisasi dengan tipe data `CodeableConcept`.

### Immunization.programEligibility[i].coding

Berisi data eligibilitas pasien untuk mendapatkan subsidi vaksin/imunisasi dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Immunization.fundingSource

Berisi data sumber pembiayaan imunisasi/vaksin yang diberikan dengan tipe data `CodeableConcept`.

### Immunization.fundingSource.coding

Berisi data sumber pembiayaan imunisasi/vaksin yang diberikan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi Immunization Funding Source. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.hl7.org/CodeSystem/immunization-funding-source",
  "code": "private",
  "display": "Private"
}
```

## Immunization.reaction[i]

Berisi data reaksi yang terjadi setelah pemberian vaksin/imunisasi atau Kejadian Ikutan Pasca Imunisasi (KIPI) dengan tipe data `BackboneElement`. Terdapat 3 elemen yang dapat diisi dalam `Immunization.reaction`.

## Immunization.reaction.date

Berisi data waktu ketika reaksi vaksin terjadi dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## Immunization.reaction.detail

Berisi data informasi detail mengenai reaksi vaksin dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Observation`, yang nilainya memiliki format:

**Contoh JSON**

```
{
  "reference": "Observation/7399f354-1d8d-4483-a519-874c883ee021"
}
```

## Immunization.reaction.reported

Berisi data yang mengindikasikan apakah reaksi vaksin dilaporkan sendiri oleh pasien. Format pengisian dengan tipe data `boolean` (true/false).

## Immunization.protocolApplied[i]

Berisi data protokol pemberian vaksin yang diikuti oleh tenaga kesehatan pemberi vaksin dengan tipe data `BackboneElement`. Terdapat 5 elemen yang dapat diisi dalam `Immunization.protocolApplied`.

## Immunization.protocolApplied.series

Berisi data nama serial vaksin dengan tipe data `string`.

## Immunization.protocolApplied.authority

Berisi data pihak yang bertanggungjawab untuk mempublikasikan rekomendasi protokol vaksin dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Organization`, yang nilainya memiliki format:

**Contoh JSON**

```
{
  "reference": "Organization/10000000432"
}
```

## Immunization.protocolApplied.targetDisease[i]

Berisi data jenis penyakit yang dicegah dengan pemberian vaksin dengan tipe data `CodeableConcept`.

### Immunization.protocolApplied.targetDisease[i].coding

Berisi data jenis penyakit yang dicegah dengan pemberian vaksin dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ICD-10 code versi 2010. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://hl7.org/fhir/sid/icd-10",
  "code": "B05.9",
  "display": "Measles without complication",
}
```

## \*Immunization.protocolApplied.doseNumber<?>

Berisi data urutan dosis vaksin dalam seri pemberian vaksin. Contoh: Pasien mendapatkan vaksin ke 1 COVID dari 2 rangkaian vaksin, maka ini diisi 1. Apabila elemen `Immunization.protocolApplied` diisi, maka elemen `Immunization.protocolApplied.doseNumber<?>` wajib diisi. Format Pengisian dapat memilih salah satu dari elemen berikut:

### Immunization.protocolApplied.doseNumberPositiveInt

Berisi data urutan dosis vaksin dalam seri pemberian vaksin yang direkomendasikan untuk diisi dengan tipe data `positiveInt`.

### Immunization.protocolApplied.doseNumberString

Berisi data urutan dosis vaksin dalam seri pemberian vaksin dengan tipe data `string`.

## Immunization.protocolApplied.seriesDoses<?>

Berisi data jumlah dosis yang dianjurkan untuk mencapai imunitas. Format Pengisian dapat memilih salah satu dari elemen berikut:

### Immunization.protocolApplied.seriesDosesPositiveInt

Berisi data jumlah dosis yang dianjurkan untuk mencapai imunitas dengan tipe data `positiveInt`.

### Immunization.protocolApplied.seriesDosesString

Berisi data jumlah dosis yang dianjurkan untuk mencapai imunitas dengan tipe data `string`.
