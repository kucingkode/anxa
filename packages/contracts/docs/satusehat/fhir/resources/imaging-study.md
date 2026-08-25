> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/imaging-study/

---

# ImagingStudy

Pengiriman informasi hasil radiologi dalam format DICOM akan dikirimkan oleh DICOM router. Setelah mendapatkan *file* DICOM dari PACS, DICOM router akan mengirimkan *file* tersebut ke National Imaging Data Repository (NIDR). NIDR akan mengembalikan Wado URL yang nantinya dapat digunakan untuk melihat hasil pencitraan yang telah tersimpan di NIDR. DICOM router kemudian akan melakukan POST informasi terkait DICOM melalui *resource* `ImagingStudy` ke SATUSEHAT. SATUSEHAT akan merespon dengan mengembalikan `ImagingStudy.id` ke DICOM Router. `ImagingStudy.id` ini perlu disimpan dan nantinya akan direferensikan ketika melakukan pengiriman data bacaan atau ekspertise dari hasil pemeriksaan radiologi.

Berikut pemetaan nilai untuk ImagingStudy yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data informasi DICOM oleh National Imaging Data Repository (NIDR):

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## \*ImagingStudy.identifier[i]

Berisi satu atau lebih data Identifier untuk keseluruhan studi dengan tipe data `Identifier`.

### \*ImagingStudy.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### \*ImagingStudy.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/accessionno/{{organization-ihs-number}}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### \*ImagingStudy.identifier[i].value

Berisi kode atau nomor id lokal yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/acsn/10000004",
    "use": "usual",
    "value": "210610114146"
  }
]
```

## \*ImagingStudy.status

Berisi satu atau lebih status dari data ImagingStudy dengan tipe data `code`.

**Contoh JSON**

```
"available"
```

## \*ImagingStudy.modality[i]

Berisi satu atau lebih daftar dari seluruh modalitas dalam studi pencitraan ini dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://dicom.nema.org/resources/ontology/DCM",
    "code": "OP",
    "display": "Ophthalmic Photography"
  }
]
```

## \*ImagingStudy.subject[i]

Berisi data pasien yang memiliki studi pencitraan tersebut dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Device | Group`, yang nilainya memiliki format:

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

## ImagingStudy.encounter

Berisi satu atau lebih data kunjungan di mana studi pencitraan dilakukan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
"Encounter/{ID-resource-Encounter}"
```

Di mana isi dari parameter `{id-resource-Encounter}` adalah ID *resource* `Encounter` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Encounter/0a26ca28-0ea3-486d-8fa9-6f9edd37e567"
  }
]
```

## ImagingStudy.started

Berisi data tanggal dan waktu di mana studi dimulai dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh JSON**

```
"started": "2021-06-10T11:41:46+07:00",
```

## \*ImagingStudy.basedOn[i]

Berisi satu atau lebih daftar permintaan diagnostik yang menghasilkan studi pencitraan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `CarePlan | ServiceRequest | Appointment | AppointmentResponse | Task`, yang nilainya memiliki format:

```
"ServiceRequest/{ID-resource-ServiceRequest}"
```

Di mana isi dari parameter `{id-resource-ServiceRequest}` adalah ID *resource* `ServiceRequest` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "ServiceRequest/83218f28-0027-4d3d-9981-94517f14223e"
  }
]
```

## ImagingStudy.referrer

Berisi data tenaga kesehatan yang meminta atau merujuk dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole` yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
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

## ImagingStudy.interpreter[i]

Berisi data yang membaca studi dan menafsirkan gambar atau konten lainnya dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole` yang nilainya memiliki format:

```
"Practitioner/{practitioner-ihs-number}"
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

## ImagingStudy.endpoint[i]

Berisi data Endpoint untuk mengakses studi (*query*, *view*, atau *retrieval*) dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Endpoint`.

## ImagingStudy.numberOfSeries

Berisi data jumlah series dalam study dengan tipe data `unsignedInt`.

## ImagingStudy.numberOfInstances

Berisi data jumlah instance dalam study dengan tipe data `unsignedInt`.

## ImagingStudy.procedureReferences

Berisi satu atau lebih data referensi prosedur yang dilakukan dengan tipe data `Reference`, direferensikan ke data yang tersimpan di *resource* `Procedure`, yang nilainya memiliki format:

```
"Procedure/{ID-resource-Procedure}"
```

Di mana isi dari parameter `{id-resource-Procedure}` adalah ID *resource* `Procedure` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Procedure/eaf09a48-0025-11ed-b939-0242ac120002"
  }
]
```

## ImagingStudy.procedureCode[i]

Berisi satu atau lebih kode prosedur yang dilakukan dengan tipe data `CodeableConcept`.

### ImagingStudy.procedureCode[i].coding

Berisi data kode prosedur yang dilakukan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi `LOINC`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## ImagingStudy.location

Berisi data lokasi di mana studi pencitraan terjadi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location`, yang nilainya memiliki format:

```
"Location/{id-resource-Location}"
```

Di mana isi dari parameter {id-resource-Location} adalah ID `Location` yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
[
  {
    "reference": "Location/ef011065-38c9-46f8-9c35-d1fe68966a3e",
    "display": "Ruang 1A, Poliklinik Rawat Jalan",
  }
]
```

## ImagingStudy.reasonCode[i]

Berisi satu atau lebih kode alasan dilakukannya studi pencitraan dengan tipe data `CodeableConcept`.

### ImagingStudy.reasonCode[i].coding

Berisi data kode alasan dilakukannya studi pencitraan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## ImagingStudy.reasonReference[i]

Berisi satu atau lebih alasan dilakukannya studi pencitraan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Condition | Observation | Media | DiagnosticReport | DocumentReference`.

## ImagingStudy.note[i]

Berisi satu atau lebih komen atau catatan dari studi pencitraan dengan tipe data `Annotation`.

## ImagingStudy.description

Berisi satu atau lebih deskripsi yang dituliskan oleh institusi yang melakukan studi pencitraan dengan tipe data `string`.

## ImagingStudy.series[i]

Berisi satu atau lebih data studi memiliki *series of instances* dengan tipe data `BackboneElement`.

## \*ImagingStudy.series.uid

Berisi data DICOM Series Instance UID untuk series ini dengan tipe data `id`.

**Contoh JSON**

```
[
  {
    "uid": "1.2.48.670589.30.39.0.1.966169786508.1664950724077.1"
  }
]
```

## ImagingStudy.series.number

Berisi data Identifier numerik pada series ini dengan tipe data `unsignedInt`.

## \*ImagingStudy.series.modality

Berisi data modalitas dari instances pada series ini dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://dicom.nema.org/resources/ontology/DCM",
    "code": "CT",
    "display": "Computed Tomography"
  }
]
```

## ImagingStudy.series.description

Berisi data ringkasan singkat yang dapat dibaca manusia dari series dengan tipe data `string`.

## ImagingStudy.series.numberOfInstances

Berisi data jumlah instances pada series ini dengan tipe data `unsignedInt`.

## ImagingStudy.series.endpoint[i]

Berisi data Endpoint untuk mengakses series (*query*, *view*, atau *retrieval*) dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Endpoint`.

## ImagingStudy.series.bodySite

Berisi data bagian tubuh yang dilakukan pemeriksaan pencitraan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "6757004",
    "display": "Structure of right knee region (body structure)"
  }
]
```

## ImagingStudy.series.laterality

Berisi data lateralitas dari bagian tubuh yang dilakukan pemeriksaan pencitraan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://snomed.info/sct",
    "code": "24028007",
    "display": "Right"
  }
]
```

## ImagingStudy.series.specimen[i]

Berisi data spesimen yang dicitrakan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Specimen`.

## ImagingStudy.series.started

Berisi data tanggal dan waktu di mana series dimulai dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## ImagingStudy.series.performer[i]

Berisi data mengenai siapa atau apa yang melakukan series dan bagaimana mereka terlibat dengan tipe data `BackboneElement`.

## ImagingStudy.series.performer.function

Berisi data tipe jenis keterlibatan performer dalam pengambilan series dengan tipe data `CodeableConcept`.

### ImagingStudy.series.performer.function.coding

Berisi satu atau lebih data tipe jenis keterlibatan performer dalam pengambilan series dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
    "code": "CON",
    "display": "consultant",
  }
]
```

## \*ImagingStudy.series.performer.actor

Berisi data yang menunjukkan siapa atau apa yang melakukan pengambilan series. Apabila elemen `ImagingStudy.series.performer` akan diisi, maka elemen `ImagingStudy.series.performer.actor` wajib diisi, dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole | Organization | CareTeam | Patient | Device | RelatedPerson`.

## ImagingStudy.series.instance[i]

Berisi data Satu *Service-Object Pair* (SOP) instance dalam series ini dengan tipe data `BackboneElement`.

## \*ImagingStudy.series.instance.uid

Berisi data DICOM SOP Instance UID untuk gambar atau konten DICOM ini dengan tipe data `id`.

## \*ImagingStudy.series.instance.sopClass

Berisi data tipe DICOM instance (Nama lain: SOPClassUID) dengan tipe data `Coding`.

## ImagingStudy.series.instance.number

Berisi data Nomor instance dalam series ini (Nama lain: InstanceNumber) dengan tipe data `unsignedInt`.

## ImagingStudy.series.instance.title

Berisi satu atau lebih data deskripsi dari instance dengan tipe data `string`.

**Contoh JSON** `ImagingStudy.series.instance`

```
[
  {
    "uid": "2.16.380.31256.1.2449191199178232.20210610114930875.1.1",
    "sopClass":
      {
        "system": "urn:ietf:rfc:3986",
        "code": "urn:oid:1.2.840.10008.5.1.4.1.1.77.1.5.1"
      },
    "number": 7,
    "title": "ORIGINAL\\PRIMARY"
  }
]
```
