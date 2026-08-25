> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/episode-of-care/

---

# EpisodeOfCare

Saat pasien berkunjung untuk mendapatkan pelayanan ANC yang pertama kali, maka data *resource* `EpisodeOfCare` harus dikirimkan. Pembuatan *resource* `EpisodeOfCare` cukup dikirimkan satu kali saja saat pertama kali melakukan kunjungan ANC. *Response* balikan dari SATUSEHAT berupa UUID kemudian digunakan untuk menandai data `Encounter.episodeOfCare` selama pasien hamil. Adapun format pengiriman data dari *resource* `EpisodeOfCare` dapat dilihat dalam tabel berikut.

Berikut pemetaan nilai untuk EpisodeOfCare yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks pengiriman data kunjungan kehamilan:

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## EpisodeOfCare.identifier[i]

Berisi data ID lokal terkait program yang dijalankan dengan tipe data `Identifier`.

### EpisodeOfCare.identifier[i].use

Berisi data dengan tipe data code, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### EpisodeOfCare.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/episodeofcare/{{organization-ihs-number}}/
```

Di mana isi dari parameter `{organization-ihs-number}` adalah nomor ID organisasi induk yang didapatkan dari master sarana indeks.

### EpisodeOfCare.identifier[i].value

Berisi kode atau nomor internal sub organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/episode-of-care/10000004",
    "use": "official",
    "value": "EOC12345"
  }
]
```

## \*EpisodeOfCare.status

Berisi data status dari `EpisodeOfCare` dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"planned"
```

## EpisodeOfCare.statusHistory[i]

Berisi data riwayat perubahan status EpisodeOfCare dengan tipe data `BackboneElement`.

## \*EpisodeOfCare.statusHistory.status

Berisi data status `EpisodeOfCare` dengan tipe data `code`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## \*EpisodeOfCare.statusHistory.period

Berisi data durasi EpisodeOfCare berada dalam status yang ditentukan dengan tipe data `Period`.

### EpisodeOfCare.statusHistory.period.start

Diisi dengan waktu dimulainya suatu kategori status `EpisodeOfCare` dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

### EpisodeOfCare.statusHistory.period.end

Diisi dengan waktu berakhirnya suatu kategori status `EpisodeOfCare` dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-30"
```

## EpisodeOfCare.type[i]

Berisi data tipe `EpisodeOfCare` yang dilakukan dengan tipe data `CodeableConcept`.

### EpisodeOfCare.type[i].coding

Berisi data tipe `EpisodeOfCare` yang dilakukan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "https://terminology.kemkes.go.id/CodeSystem/episodeofcare-type",
  "code": "TB-SO",
  "value": "Tuberkulosis Sensitif Obat"
}
```

## EpisodeOfCare.diagnosis[i]

Berisi data kondisi atau diagnosa yang menjadi tujuan perawatan dengan tipe data `BackboneElement`.

## \*EpisodeOfCare.diagnosis.condition

Berisi data kondisi atau diagnosa yang menjadi tujuan perawatan dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Condition`, yang nilainya memiliki format:

```
{
  "reference": "Condition/4bbbe654-14f5-4ab3-a36e-a1e307f67bb8"
}
```

## EpisodeOfCare.diagnosis.role

Berisi data kondisi atau diagnosa yang menjadi tujuan perawatan dengan tipe data `CodeableConcept`.

### EpisodeOfCare.diagnosis.role.coding

Berisi data kondisi atau diagnosa yang menjadi tujuan perawatan dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.hl7.org/CodeSystem/diagnosis-role",
  "code": "AD",
  "display": "Admission diagnosis"
}
```

## EpisodeOfCare.diagnosis.rank

Berisi data yang jika ada lebih dari 1 kondisi, maka gunakan elemen rank untuk mengurutkan mana diagnosa yang lebih utama dengan tipe data `positiveInt`. Semakin kecil angkanya, maka semakin utama.

## \*EpisodeOfCare.patient

Berisi data informasi pasien yang menjadi fokus perawatan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient`, yang nilainya memiliki format:

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

## EpisodeOfCare.managingOrganization

Berisi data organisasi/institusi yang melakukan perawatan dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Organization`, yang nilainya memiliki format:

```
{
  "reference": "Organization/10000004"
}
```

## EpisodeOfCare.period

Berisi data interval dilakukannya perawatan terkait tuberkulosis dengan tipe data `Period`.

### EpisodeOfCare.period.start

Diisi dengan tanggal mulai pengobatan tuberkulosis dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

### EpisodeOfCare.period.end

Diisi dengan tanggal hasil akhir pengobatan tuberkulosis dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"2022-12-20"
```

## EpisodeOfCare.referralRequest[i]

Berisi data permintaan rujukan yang mengawali terjadinya `EpisodeOfCare` dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `ServiceRequest`.

## EpisodeOfCare.careManager

Berisi data care manager yang melakukan koordinasi untuk pasien dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Practitioner | PractitionerRole`.

## EpisodeOfCare.team[i]

Berisi data tim yang memfasilitasi perawatan dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `CareTeam`.

## EpisodeOfCare.account[i]

Berisi data akun yang digunakan untuk pembayaran perawatan dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Account`.
