> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/patient/

---

# Patient

Apabila melakukan pengiriman data kesehatan melalui SATUSEHAT yang memiliki elemen data terkait resource `Patient`, maka diperlukan informasi `{patient-ihs-number}` dari pasien yang bersangkutan. `{patient-ihs-number}` seorang pasien didapatkan dari *Master Patient Index* (MPI) Kementerian Kesehatan. MPI menyimpan data-data demografi pasien berskala nasional, mulai dari nama, tanggal lahir, alamat, IDentitas resmi yang diterbitkan pemerintah, dan lain lain. Setelah mendapatkan `{patient-ihs-number}`, ID dapat disimpan secara di masing-masing sistem internal fasyankes maupun partner non-fasyankes. `{patient-ihs-number}` akan mempermudah pelaporan pelayanan kesehatan yang berhubungan dengan pasien, karena partner tidak diwajibkan menyertakan data diri setiap ada pengiriman data `{patient-ihs-number}` juga dapat digunakan untuk melihat data diri pasien secara menyeluruh.

|  |  |
| --- | --- |
|  | Proses pencarian `{patient-ihs-number}` dari resource `Patient` dapat dilakukan melalui FHIR API dengan metode **GET**.  * Penjelasan tipe mandatoris, deskripsi dan format pengisian dari setiap elemen data/path di dalam resource `Patient` dapat dilihat **di sini**. * Metode pencarian data pasien di SATUSEHAT secara detail dapat dilihat pada panduan/playbook Master Patient Index (MPI), silakan klik **di sini**. * Dapat dilihat juga pada Postman SATUSEHAT, silakan klik **di sini**. * Dokumentasi ReST API SATUSEHAT (Katalog ReST API SATUSEHAT) dapat dilihat **di sini**. |

Data dari pasien yang bersangkutan akan dipetakan dengan menggunakan standar FHIR `DomainResource` dengan tipe Patient.

Berikut pemetaan nilai untuk Patient yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data pasien:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Daftar Data Pasien untuk Proses Uji Coba/Sandbox(Staging)

Silakan gunakan data pasien (`Patient`) *dummy* yang disediakan oleh SATUSEHAT di bawah ini saat proses uji coba pengiriman data (Sandbox).

|  |  |
| --- | --- |
|  | Data *dummy* ini **hanya dapat digunakan** pada *environment* Sandbox. |

### PatientID dan NIK

Tabel 1. Daftar Data Pasien

| NIK | Nama | Gender | birthDate | Nomor IHS |
| --- | --- | --- | --- | --- |
| 9271060312000001 | Ardianto Putra | male | 1992-01-09 | P02478375538 |
| 9204014804000002 | Claudia Sintia | female | 1989-11-03 | P03647103112 |
| 9104224509000003 | Elizabeth Dior | female | 1976-07-07 | P00805884304 |
| 9104223107000004 | Dr. Alan Bagus Prasetya | male | 1977-09-03 | P00912894463 |
| 9104224606000005 | Ghina Assyifa | female | 2004-08-21 | P01654557057 |
| 9104025209000006 | Salsabilla Anjani Rizki | female | 2001-04-16 | P02280547535 |
| 9201076001000007 | Theodore Elisjah | female | 1985-09-18 | P01836748436 |
| 9201394901000008 | Sonia Herdianti | female | 1996-06-08 | P00883356749 |
| 9201076407000009 | Nancy Wang | female | 1955-10-10 | P01058967035 |
| 9210060207000010 | Syarif Muhammad | male | 1988-11-02 | P02428473601 |

## \*Patient.identifier[i]

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor pasien yang dimiliki oleh lokasi induk yang setiap datanya direpresentasikan dengan tipe data `Identifier`.

### Patient.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Patient.identifier[i].system

Berisi data yang nilainya memiliki format:

```
https://fhir.kemkes.go.id/id/patient-ihs-number
```

Di mana isi dari parameter `{patient-ihs-number}` adalah ID Patient yang didapatkan dari master pasien indeks.

### Patient.identifier[i].value

Berisi kode atau nomor pasien.

**Contoh JSON**

```
[
  {
    "use": "official",
    "system": "https://fhir.kemkes.go.id/id/nik",
    "value": "################"
  },
  {
    "use": "official",
    "system": "https://fhir.kemkes.go.id/id/paspor",
    "value": "#########"
  },
  {
    "use": "official",
    "system": "https://fhir.kemkes.go.id/id/kk",
    "value": "###############"
  }
]
```

## Patient.active

Berisi data apakah catatan pasien aktif digunakan dengan tipe data `boolean`.

**Contoh JSON**

```
true
```

## \*Patient.name[i]

Berisi satu atau lebih daftar data mengenai nama pasien dengan tipe data `HumanName`.

### Patient.name[i].use

Berisi data nama pasien dengan tipe data `code`.

### Patient.name[i].text

Berisi data nama lengkap pasien dengan tipe data `string`.

**Contoh JSON** `Patient.name`

```
[
  {
    "use": "official",
    "text": "John Smith"
  }
]
```

### Patient.name[i].family

Berisi data nama belakang pasien dengan tipe data `string`.

### Patient.name[i].given

Berisi data nama tengah pasien dengan tipe data `string`.

### Patient.name[i].prefix

Berisi data nama yang diperoleh sebagai gelar karena status akademik, hukum, pekerjaan atau kebangsawanan yang muncul di awal nama pasien dengan tipe data `string`.

### Patient.name[i].suffix

Berisi data nama yang diperoleh sebagai gelar karena status akademik, hukum, pekerjaan atau kebangsawanan yang muncul di akhir nama pasien dengan tipe data `string`.

### Patient.name[i].period

Berisi periode waktu ketika nama pasien sedang digunakan dengan tipe data `Period`.

## Patient.telecom[i]

Berisi satu atau lebih detail kontak untuk individu dengan tipe data `ContactPoint`.

**Contoh JSON**

```
[
  {
    "system": "phone",
    "value": "08123456789",
    "use": "mobile"
  },
  {
    "system": "phone",
    "value": "+622123456789",
    "use": "home"
  },
  {
    "system": "email",
    "value": "[email protected]",
    "use": "home"
  }
]
```

## Patient.gender

Berisi data jenis kelamin pasien dengan tipe data `code`, yang nilainya mengacu pada salah satu data di terminologi dengan nama AdministrativeGender. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"female"
```

## Patient.birthDate

Berisi data tanggal lahir pasien dengan tipe data `date` dalam format `YYYY-MM-DD`.

**Contoh Nilai**

```
"1945-11-17"
```

## Patient.deceased<?>

Berisi data yang menunjukkan apakah individu tersebut meninggal atau tidak.

### Patient.deceasedBoolean

Berisi data yang menunjukkan apakah individu tersebut meninggal atau tidak dengan tipe data `boolean`.

**Contoh JSON**

```
"false"
```

### Patient.deceasedDateTime

Berisi data yang menunjukkan apakah individu tersebut meninggal atau tidak dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## Patient.address[i]

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor alamat pasien yang dimiliki oleh lokasi induk yang setiap datanya direpresentasikan dengan tipe data `Address`.

### Patient.address[i].use

Berisi data penggunaan alamat pasien dengan tipe data `code`, yang nilainya mengacu pada data terminologi AddressUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Patient.address[i].line

Berisi satu atau lebih data nama, blok, no jalan atau no rumah dengan tipe data `string`.

### Patient.address[i].city

Berisi satu atau lebih data kota dengan tipe data `string`.

### Patient.address[i].postalCode

Berisi data kode pos dengan tipe data `string`.

### Patient.address[i].country

Berisi data kode negara berdasarkan ISO 3316 2-letter (contoh: ID) dengan dengan tipe data `string`.

### Patient.address.extension[i]

Berisi satu atau lebih data bertipe `Extension` yang digunakan untuk menyimpan kode wilayah administratif dari lokasi organisasi, pasien, atau entitas lain, yang nilai dan strukturnya mengacu pada *extension* tambahan dengan nama AdministrativeCode.

**Contoh JSON** `Patient.address`

```
[
  {
    "use": "home",
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
                "valueCode": "2"
             },
             {
                "url": "rw",
                "valueCode": "2"
             }
          ]
        }
     ]
  }
]
```

## Patient.maritalStatus

Berisi data status perkawinan (sipil) pasien dengan tipe data `CodeableConcept`.

### Patient.maritalStatus.coding

Berisi data status perkawinan (sipil) terakhir pasien dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi Marital Status Codes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
    "code": "M",
    "display": "Married"
  }
]
```

## \*Patient.multipleBirth<?>

Berisi data apakah pasien adalah bagian dari kelahiran lebih dari satu bayi.

### Patient.multipleBirthBoolean

Berisi data apakah pasien adalah bagian dari kelahiran lebih dari satu bayi dengan tipe data `boolean`.

**Contoh JSON**

```
"false"
```

### Patient.multipleBirthInteger

Berisi data apakah pasien adalah bagian dari kelahiran lebih dari satu bayi dengan tipe data `integer`.

## Patient.photo[i]

Berisi satu atau lebih gambar pasien dengan tipe data `Attachment`.

## Patient.contact[i]

Berisi satu atau lebih daftar data mengenai nama penjamin dengan tipe data `BackboneElement`.

## Patient.contact.relationship[i]

Berisi satu atau lebih daftar data mengenai hubungan penjamin dan pasien dengan tipe data `CodeableConcept`.

### Patient.contact.relationship.coding

Berisi data mengenai hubungan antara pasien dan orang yang dihubungi dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi PatientContactRelationship. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON** `Patient.contact`

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
    "code": "C"
  }
]
```

## Patient.contact.name

Berisi satu atau lebih daftar data mengenai nama penjamin dengan tipe data `HumanName`

### Patient.contact.name.use

Berisi data nama penjamin dengan tipe data `code`.

### Patient.contact.name.text

Berisi data nama penjamin dengan tipe data `string`.

**Contoh JSON** `Patient.contact[i].name`

```
{
  "use": "official",
  "text": "Jane Smith"
}
```

## Patient.contact.telecom[i]

Berisi satu atau lebih daftar data mengenai informasi terkait kode atau nomor penjamin yang setiap datanya direpresentasikan dengan tipe data `ContactPoint`.

### Patient.contact[i].telecom[i].system

Berisi data jenis kontak dengan tipe data `code`, yang nilainya mengacu pada data terminologi ContactPointSystem. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Patient.contact[i].telecom[i].value

Berisi data nomor/*email*/website kontak dengan tipe data `string`.

### Patient.contact[i].telecom[i].use

Berisi data penggunaan kontak dengan tipe data `code`, yang nilainya mengacu pada data terminologi ContactPointUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON** `Patient.contact[i].telecom`

```
[
  {
    "system": "phone",
    "value": "0690383372",
    "use": "mobile"
  }
]
```

## Patient.contact.address

Berisi satu atau lebih daftar data mengenai alamat penjamin dan pasien dengan tipe data `Address`.

## Patient.contact.gender

Berisi data jenis kelamin penjamin pasien dengan tipe data `code`.

## Patient.contact.organization

Berisi data organisasi penjamin pasien dengan tipe data `Reference`.

## Patient.contact.period

Berisi data waktu untuk dihubungi berkaitan dengan pasien ini dengan tipe data `Period`.

## Patient.communication[i]

Berisi satu atau lebih bahasa yang dapat digunakan untuk berkomunikasi dengan pasien tentang kesehatannya dengan tipe data `BackboneElement`.

## \*Patient.communication.language

Berisi bahasa yang dapat digunakan untuk berkomunikasi dengan pasien tentang kesehatannya dengan tipe data `CodeableConcept`.

### Patient.communication.language.coding

Berisi data bahasa yang dapat digunakan untuk berkomunikasi dengan pasien tentang kesehatannya dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi CommonLanguages. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "urn:ietf:bcp:47",
    "code": "id-ID",
    "display": "Indonesian"
  }
]
```

## Patient.communication.preferred

Berisi data indikator preferensi bahasa dengan tipe data `boolean`.

**Contoh JSON**

```
"true"
```

## Patient.generalPractitioner[i]

Berisi satu atau lebih penyedia perawatan primer yang dinominasikan oleh pasien dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Organization | Practitioner | PractitionerRole`.

## Patient.managingOrganization

Berisi data organisasi yang merupakan penjaga catatan pasien dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Organization`.

## Patient.link[i]

Berisi satu atau lebih tautan ke sumber daya pasien lain yang menyangkut orang yang sebenarnya sama dengan tipe data `BackboneElement`.

## \*Patient.link.other

Berisi data pasien lain atau sumber daya orang terkait yang dirujuk tautan tersebut dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient`, yang nilainya memiliki format:

**Contoh JSON**

```
{
  "reference": "Patient/P02478375538",
}
```

## \*Patient.link.type

Berisi data jenis tautan antara sumber daya pasien ini dan sumber daya pasien lainnya dengan tipe data `code`.

## Patient.extension:birthPlace

Berisi data tempat lahir pasien dengan tipe data `Extension`(`Address`), yang nilai dan strukturnya mengacu pada extension tambahan dengan url https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace.

**Contoh JSON**

```
[
  {
    "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace",
    "valueAddress": {
       "city": "Bandung",
       "country": "ID"
    }
  },
  {
    "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus",
    "valueCode": "WNI"
  }
]
```
