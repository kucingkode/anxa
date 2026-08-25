> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/location/

---

# Location

Contoh Struktur Lokasi

Struktur lokasi merupakan lokasi fisik yang dapat berupa bangunan, ruangan yang menjadi tempat di mana layanan kesehatan dilakukan. Institusi yang akan melakukan integrasi ke SATUSEHAT perlu melakukan registrasi atau mengirimkan data terkait struktur lokasi yang tersedia di dalam institusi tersebut. Data struktur lokasi yang dimaksud adalah detail dan informasi posisi untuk tempat fisik di mana layanan disediakan dan sumber daya dan peserta dapat disimpan, ditemukan, ditampung, atau diakomodasi. Contoh struktur lokasi dapat dilihat dalam Gambar 2. Setiap lokasi dari struktur tersebut perlu dikirimkan datanya ke SATUSEHAT untuk keperluan informasi di mana suatu layanan dilakukan.

Data struktur dikirimkan menggunakan *resource* `Location` dengan metode `POST`. Template pengisian struktur lokasi dapat diakses pada link berikut: Template Registrasi Organization & Location.

Berikut pemetaan nilai untuk Location yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data lokasi fasilitas pelayanan kesehatan:

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Location.identifier[i]

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor internal sub lokasi yang dimiliki oleh lokasi induk yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### Location.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Location.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/location/{organization-ihs-number}
```

Di mana isi dari parameter {organization-ihs-number} adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### Location.identifier[i].value

BerIsi kode atau nomor internal lokasi.

**Contoh JSON**

```
[
  {
    "use": "official",
    "system": "http://sys-ids.kemkes.go.id/location/1000001",
    "value": "G-2-R-1A"
  }
]
```

## Location.status

Berisi data status lokasi dengan tipe data `code`, yang nilainya mengacu pada data terminologi LocationStatus. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"active"
```

## Location.operationalStatus

Berisi data status operasional lokasi, terutama digunakan untuk bed/kamar dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi Hl7VSBedStatus. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
{
  "system": "http://terminology.hl7.org/CodeSystem/v2-0116",
  "code": "O",
  "display": "Occupied"
}
```

## Location.name

Berisi data nama lokasi dengan tipe data `string`.

**Contoh JSON**

```
"Ruang 1A IRJT",
```

## Location.alias[i]

Berisi data nama lain lokasi dengan tipe data `string`.

## Location.description

Berisi data deskripsi lokasi dengan tipe data `string`.

**Contoh JSON**

```
"Ruang 1A, Poliklinik Bedah Rawat Jalan Terpadu, Lantai 2, Gedung G",
```

## Location.mode

Berisi data terkait apakah suatu lokasi merupakan lokasi spesifik (contoh: Ruang Operasi A, Kamar Rawat Inap 215, dll) atau kelompok/kelas lokasi (contoh: Ruang Operasi, Kamar Rawat Inap, dll) dengan tipe data `code`, yang nilainya mengacu pada data terminologi LocationMode. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"instance",
```

## Location.type[i]

Berisi data tipe lokasi dengan tipe data `CodeableConcept`.

### Location.type[i].coding

Berisi data tipe fungsi lokasi dengan tipe data `Coding`, terutama digunakan untuk informasi terkait lokasi kamar *(bed)*. Nilainya mengacu pada data terminologi ServiceDeliveryLocationRoleType. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
    "code": "ICU",
    "display": "Intensive care unit"
  }
]
```

## Location.telecom[i]

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor internal sub lokasi yang dimiliki oleh lokasi induk yang setiap datanya direpresentasikan dengan tipe data `ContactPoint`.

### Location.telecom[i].system

Berisi data jenis kontak dengan tipe data `code`, yang nilainya mengacu pada data terminologi ContactPointSystem. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Location.telecom[i].value

Berisi data nomor/*email*/website kontak dengan tipe data `string`.

### Location.telecom[i].use

Berisi data penggunaan kontak dengan tipe data `code`, yang nilainya mengacu pada data terminologi ContactPointUse. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON** `Location.telecom`

```
[
  {
    "system": "phone",
    "use": "work",
    "value": "+6221-783042654"
  }
]
```

## Location.address

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor internal sub lokasi yang dimiliki oleh lokasi induk yang setiap datanya direpresentasikan dengan tipe data `Address`.

### Location.address.use

Berisi data penggunaan alamat dengan tipe data `code`, yang nilainya mengacu pada data terminologi AddressUse. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Location.address.line

Berisi data alamat lengkap organisasi dengan tipe data `string`. Data tersebut dapat dibagi-bagi menjadi beberapa data `string`.

### Location.address.city

Berisi satu atau lebih data mengenai nama kota, kotamadya, pinggiran kota, desa atau komunitas lain atau pusat pengiriman dengan tipe data `string`.

### Location.address.postalCode

Berisi data kode pos organisasi dengan tipe data `string`.

### Location.address.country

Berisi data kode negara berdasarkan ISO 3316 2-letter (contoh: ID) dengan tipe data `string`.

### Location.address.extension

Berisi satu atau lebih data bertipe `Extension` yang digunakan untuk menyimpan kode wilayah administratif dari lokasi organisasi, pasien, atau entitas lain, yang nilai dan strukturnya mengacu pada extension tambahan dengan nama AdministrativeCode.

**Contoh JSON** `Location.address`

```
{
  "use": "work",
  "line": [
      "Gd. Prof. Dr. Sujudi Lt.5, Jl. H.R. Rasuna Said Blok X5 Kav. 4-9 Kuningan"
  ],
  "city": "Jakarta",
  "postalCode": "12950",
  "country": "ID",
  "extension": [
      {
          "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
          "extension": [
              {
                  "url": "province",
                  "valueCode": "10"
              },
              {
                  "url": "city",
                  "valueCode": "1010"
              },
              {
                  "url": "district",
                  "valueCode": "1010101"
              },
              {
                  "url": "village",
                  "valueCode": "1010101101"
              },
              {
                  "url": "rt",
                  "valueCode": "1"
              },
              {
                  "url": "rw",
                  "valueCode": "2"
              }
          ]
      }
   ]
}
```

## Location.physicalType.coding

Berisi satu atau lebih daftar data mengenai informasi terkait tipe fisik lokasi dengan tipe data `Coding`, yang nilainya mengacu pada terminologi LocationType. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
    "code": "ro",
    "display": "Room"
  }
]
```

## Location.position

Berisi data lokasi secara geografis *(longitude, latitude, altitude)* dengan tipe data `BackboneElement`.

## \*Location.position.longitude

Berisi data informasi mengenai garis bujur dengan tipe data `decimal`.

## \*Location.position.latitude

Berisi data informasi mengenai garis lintang dengan tipe data `decimal`.

## Location.position.altitude

Berisi data informasi mengenai ketinggian dengan tipe data `decimal`.

**Contoh JSON**

```
{
  "longitude": -6.23115426275766,
  "latitude": 106.83239885393944,
  "altitude": 0
}
```

## Location.managingOrganization

Berisi data organisasi pengelola lokasi dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Organization`, yang nilainya memiliki format:

Tahap 1

```
"Organization/{organization-ihs-number}"
```

Tahap 2

```
"Organization/{id-suborganisasi}"
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks atau selaku organisasi pengelola lokasi dan `{id-suborganisasi}` adalah ID suborganisasi yang didapatkan dari hasil *response* apabila suborganisasi tersebut selaku organisasi pengelola lokasi. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

* Lokasi kompleks **RSUD Jati Asih** dikelola oleh organisasi **RSUD Jati Asih** yang memiliki nomor **IHS** adalah

  ```
  "100000004"
  ```
* **JSON** Location.managingOrganization **RSUD Jati Asih**

  ```
  {
    "reference": "Organization/10000004",
    "display": "RSUD Jati Asih"
  }
  ```
* Hasil response di atas adalah **id Direktorat Medik, Keperawatan, dan Penunjang** dengan nomor **id** adalah

  ```
  "f2f269ff-0c7a-4769-9821-5c27b3fa3b9c"
  ```
* **RSUD Jati Asih** mendaftarkan organisasi **Instalasi Rawat Jalan** yang merupakan bagian dari **Direktorat Medik, Keperawatan, dan Penunjang**.
* **Contoh JSON** `Organization.partOf` mendaftarkan organisasi **Instalasi Rawat Jalan** dengan **uuid Direktorat Medik, Keperawatan, dan Penunjang**.

```
{
  "reference": "Organization/f2f269ff-0c7a-4769-9821-5c27b3fa3b9c",
  "display": "Direktorat Medik, Keperawatan, dan Penunjang RSUD Jati Asih"
}
```

## Location.partOf

Berisi data lokasi bagian dari lokasi lain (sub lokasi) dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Location`, yang nilainya memiliki format:

```
"Location/{id-resource-Location}"
```

Di mana isi dari parameter `{id-resource-Location}` adalah ID Location yang didapatkan dari server. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

* Lokasi kompleks **RSUD Jati Asih** dikelola oleh organisasi **RSUD Jati Asih** yang memiliki nomor id adalah

  ```
  "4adccec5-776d-435e-9ac5-98763cb216bb"
  ```
* **Gedung Alamanda** merupakan bagian dari **RSUD Jati Asih**.

  ```
  {
    "reference": "Location/4adccec5-776d-435e-9ac5-98763cb216bb"
  }
  ```

## Location.hoursOfOperation[i]

Berisi data mengenai informasi hari/jam berapa lokasi ini beroperasi dalam satu minggu dengan tipe data `BackboneElement`.

## Location.hoursOfOperation.daysOfWeek[i]

Berisi satu atau lebih data kode hari, dengan tipe data `code`, yang nilainya mengacu pada terminologi DaysOfWeek. Untuk informasi data terminologi apa yang digunakan dapat mengacu pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

## Location.hoursOfOperation.allDay

Berisi data apabila beroperasi setiap hari dengan tipe data `boolean`.

## Location.hoursOfOperation.openingTime

Berisi data jam beroperasi dengan tipe data `time`.

## Location.hoursOfOperation.closingTime

Berisi data jam tutup dengan tipe data `time`.

**Contoh JSON** `Location.hoursOfOperation[i]`

```
[
  {
  "daysOfWeek": ["mon", "tue", "wed", "thu", "fri"],
  "allDay": false,
  "openingTime": "07:00:00",
  "closingTime": "17:00:00"
  }
]
```

## Location.availabilityExceptions

Berisi data kapan jam buka lokasi berbeda dari biasanya (contoh: Libur Nasional) dengan tipe data `string`.

**Contoh JSON**

```
"Libur Nasional"
```

## Location.endpoint[i]

Berisi informasi yang menyediakan akses ke layanan yang dioperasikan untuk lokasi tersebut dengan tipe data `Reference` yang nilainya mengacu pada Kamus Data Kesehatan Indonesia

## \*Location.extension.serviceClass

Berisi data bertipe `CodeableConcept` yang digunakan untuk mendefinisikan ruang kelas perawatan seperti Kelas 1, Kelas 2, Kelas 3, Kelas VIP, dan Kelas VVIP. Kelas Perawatan diatas VVIP pada Implementasi lapangan didefinisikan juga sebagai kelas VVIP. Misal seperti President Suite, Deluxe Class, dll menyesuaikan setiap fasyankes, akan dikirimkan datanya menggunakan kode kelas VVIP. Nilai dan strukturnya mengacu pada extension tambahan dengan nama LocationServiceClass.
