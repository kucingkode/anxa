> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/organization/

---

# Organization

Contoh Struktur Organisasi

Organisasi merupakan data terkait struktur organisasi yang ada di dalam suatu institusi. Data struktur organisasi ini akan dijadikan referensi saat data pelayanan kesehatan dikirimkan ke SATUSEHAT. Institusi yang akan melakukan integrasi ke SATUSEHAT perlu melakukan registrasi atau mengirimkan data terkait struktur organisasi yang tersedia di dalam institusi tersebut (selanjutnya disebut suborganisasi). Institusi yang termasuk dalam kategori fasilitas pelayanan kesehatan (selanjutnya disebut organisasi induk), akan mendapatkan nomor SATUSEHAT dari Kementerian Kesehatan setelah melakukan registrasi. Organisasi induk selanjutnya akan mengirimkan struktur organisasi/suborganisasi yang ada dalam institusi tersebut. Contoh struktur organisasi dapat dilihat dalam Gambar 1. Setiap suborganisasi di bawah organisasi induk perlu dikirimkan datanya ke SATUSEHAT.

Data suborganisasi dikirimkan menggunakan resource `Organization` dengan metode `POST`. Resource `Organization` digunakan untuk mencatat data sekelompok orang atau organisasi dengan tujuan yang sama. Hal ini ditunjukkan dengan adanya struktur pengurus dari organisasi tersebut. Template pengisian organisasi dapat diakses pada tautan berikut: Template Registrasi Organization & Location.

Berikut pemetaan nilai untuk Organization yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data organisasi fasilitas pelayanan kesehatan:

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Organization.identifier[i]

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor internal sub organisasi yang dimiliki oleh organisasi induk yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### Organization.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Organization.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/organization/{organization-ihs-number}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### Organization.identifier[i].value

Berisi kode atau nomor internal sub organisasi.

**Contoh JSON**

```
[
  {
    "use": "official",
    "system": "http://sys-ids.kemkes.go.id/organization/1000079374",
    "value": "Pos Imunisasi LUBUK BATANG"
  }
]
```

## Organization.active

Berisi data status keaktifan data organisasi dengan tipe data `boolean`.

```
true
```

## Organization.type[i]

Berisi data tipe organisasi dengan tipe data `CodeableConcept`.

### Organization.type[i].coding

Berisi data tipe organisasi dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi OrganizationType. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/organization-type",
    "code": "dept",
    "display": "Hospital Department"
  }
]
```

## Organization.name

Berisi data nama organisasi dengan tipe data `string`.

**Contoh JSON**

```
"Pos Imunisasi"
```

## Organization.alias[i]

Berisi data nama lain/pengganti organisasi dengan tipe data `string`.

## Organization.telecom[i]

Berisi data kontak organisasi secara umum dengan tipe data `ContactPoint` yang dapat diisi > 1 jenis kontak (nomor telepon, *email*, website).

### Organization.telecom[i].system

Berisi data jenis kontak dengan tipe data `code`, yang nilainya mengacu pada data terminologi ContactPointSystem. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Organization.telecom[i].value

Berisi data nomor/*email*/website kontak organisasi dengan tipe data `string`.

### Organization.telecom[i].use

Berisi data penggunaan kontak organisasi dengan tipe data `code`, yang nilainya mengacu pada data terminologi ContactPointUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON** `Organization.telecom`

```
[
  {
    "system": "phone",
    "value": "+6221-783042654",
    "use": "work"
  },
  {
    "system": "email",
    "value": "[email protected]",
    "use": "work"
  },
  {
    "system": "url",
    "value": "[email protected]",
    "use": "work"
  }
]
```

## Organization.address[i]

Berisi satu atau lebih data bertipe `Address` yang digunakan untuk mengisi alamat organisasi secara umum dan dapat diisi >1 alamat.

### Organization.address[i].use

Berisi data penggunaan alamat organisasi dengan tipe data `code`, yang nilainya mengacu pada data terminologi AddressUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Organization.address[i].type

Berisi data jenis alamat organisasi dengan tipe data `code`, yang nilainya mengacu pada data terminologi AddressType. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Organization.address[i].line

Berisi satu atau lebih data nama, blok, no jalan atau no rumah dengan tipe data `string`.

### Organization.address[i].city

Berisi satu atau lebih data mengenai nama kota, kotamadya, pinggiran kota, desa atau komunitas lain atau pusat pengiriman dengan tipe data `string`.

### Organization.address[i].postalCode

Berisi data kode pos dengan tipe data `string`.

### Organization.address[i].country

Berisi data kode negara berdasarkan ISO 3316 2-letter (contoh: ID) dengan dengan tipe data `string`.

### Organization.address[i].extension

Berisi satu atau lebih data bertipe `Extension` yang digunakan untuk menyimpan kode wilayah administratif dari lokasi organisasi, pasien, atau entitas lain, yang nilai dan strukturnya mengacu pada extension tambahan dengan nama AdministrativeCode.

**Contoh JSON** `Organization.address`

```
[
  {
    "use": "work",
    "type": "both",
    "line": [
        "Jalan Jati Asih"
    ],
    "city": "Jakarta",
    "postalCode": "55292",
    "country": "ID",
    "extension": [
        {
            "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
            "extension": [
                {
                    "url": "province",
                    "valueCode": "31"
                },
                {
                    "url": "city",
                    "valueCode": "3171"
                },
                {
                    "url": "district",
                    "valueCode": "317101"
                },
                {
                    "url": "village",
                    "valueCode": "31710101"
                }
            ]
        }
    ]
  }
],
```

## Organization.partOf

Berisi data yang **WAJIB** diisi apabila terdapat organisasi bagian dari organisasi lain (suborganisasi) dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Organization`, yang nilainya memiliki format:

Tahap 1

```
"Organization/{organization-ihs-number}"
```

Tahap 2

```
"Organization/{id-suborganisasi}"
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks dan `{id-suborganisasi}` adalah ID suborganisasi yang didapatkan dari hasil *response*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

* **RSUD Jati Asih** mendaftarkan organisasi **Direktorat Medik, Keperawatan, dan Penunjang**.
* **RSUD Jati Asih** memiliki nomor **IHS** adalah

  ```
  "100000004"
  ```
* **JSON** Organization.partOf untuk mendaftarkan organisasi **Direktorat Medik, Keperawatan, dan Penunjang**.

```
{
  "reference": "Organization/10000004"
}
```

* Hasil response di atas adalah **id Direktorat Medik, Keperawatan, dan Penunjang** dengan nomor **id** adalah

  ```
  "f2f269ff-0c7a-4769-9821-5c27b3fa3b9c"
  ```
* **RSUD Jati Asih** mendaftarkan organisasi **Instalasi Rawat Jalan** yang merupakan bagian dari **Direktorat Medik, Keperawatan, dan Penunjang**.
* **JSON** `Organization.partOf` mendaftarkan organisasi **Instalasi Rawat Jalan** dengan **uuid Direktorat Medik, Keperawatan, dan Penunjang**.

```
{
  "reference": "Organization/f2f269ff-0c7a-4769-9821-5c27b3fa3b9c",
  "display": "Direktorat Medik, Keperawatan, dan Penunjang RSUD Jati Asih"
}
```

## Organization.contact[i]

Berisi data kontak organisasi untuk tujuan tertentu dengan tipe data `BackboneElement`.

## Organization.contact.purpose

Berisi data kontak organisasi untuk tujuan tertentu (billing, administrasi, HR, dll.) dengan tipe data `CodeableConcept`.

### \*Organization.contact.purpose.coding

Berisi data kode yang dapat digunakan untuk menunjukkan kontak tujuan dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi ContactEntityType. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
    "code": "BILL",
    "display": "Billing"
  }
]
```

## Organization.contact.name

Berisi data nama *contact person* terkait dengan tipe data `HumanName`.

### Organization.contact.name.use

Berisi data penggunaan kontak dengan tipe data `code`, yang nilainya mengacu pada data terminologi NameUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Organization.contact.name.text

Berisi nama lengkap kontak dengan tipe data `string`.

**Contoh JSON**

```
{
  "text": "Dadang Sujatmiko",
  "use": "official"
}
```

## Organization.contact.telecom[i]

Berisi data kontak organisasi secara umum dengan tipe data `ContactPoint` yang dapat diisi > 1 jenis kontak (nomor telepon, *email*, website). Format pengisian sama dengan `Organization.telecom`.

## Organization.contact.address

Berisi data alamat terkait dengan tipe data `Address` yang digunakan untuk mengisi alamat secara umum dan dapat diisi >1 alamat. Format pengisian sama dengan `Organization.address`.

## Organization.endpoint[i]

Berisi informasi yang menyediakan akses ke layanan yang dioperasikan untuk organisasi dengan tipe data `Reference` yang nilainya mengacu pada Kamus Data Kesehatan Indonesia.
