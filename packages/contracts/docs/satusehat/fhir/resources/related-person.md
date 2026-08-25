> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/related-person/

---

# RelatedPerson

Pengiriman data informasi orang terkait dapat dikirimkan menggunakan *resource* `Observation`.

Berikut pemetaan nilai untuk RelatedPerson yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks informasi orang terkait:

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## RelatedPerson.identifier[i]

Berisi satu atau lebih daftar data mengenai tanda pengenal untuk seseorang dalam lingkup tertentu dengan tipe data `Identifier`.

### RelatedPerson.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse.

### RelatedPerson.identifier[i].system

Berisi data yang nilainya memiliki format:

```
"https://fhir.kemkes.go.id/id/nik"
```

### RelatedPerson.identifier[i].value

Berisi kode atau nomor pengidentifikasi yang relevan dan unik dengan tipe data `string`.

**Contoh JSON**

```
[
  {
    "use": "official",
    "system": "https://fhir.kemkes.go.id/id/nik",
    "value": "################"
  }
]
```

## RelatedPerson.active

Berisi data mengenai apakah rekaman orang terkait ini aktif digunakan dengan tipe data `boolean`.

**Contoh Nilai**

```
true
```

## \*RelatedPerson.patient

Berisi data mengenai pasien mana yang berhubungan dengan orang terkait dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Patient`.

**Contoh JSON**

```
{
  "reference": "Patient/P02029102701"
}
```

## RelatedPerson.relationship[i]

Berisi data hubungan antara pasien dan orang yang terkait dengan tipe data `CodeableConcept`.

### RelatedPerson.relationship[i].coding

Berisi data hubungan antara pasien dan orang yang terkait dengan tipe data `Coding`.

**Contoh JSON**

```
[
  {
    "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
    "code": "NMTH",
    "display": "natural mother"
  }
]
```

## RelatedPerson.name[i]

Berisi satu atau lebih daftar data mengenai nama orang terkait dengan tipe data `HumanName`.

**Contoh JSON**

```
[
  {
    "use": "official",
    "text": "Jane Smith"
  }
]
```

## RelatedPerson.telecom[i]

Berisi data detail kontak orang terkait mis. nomor telepon atau alamat *email* dengan tipe data `ContactPoint`.

### RelatedPerson.telecom[i].system

Berisi data jenis kontak dengan tipe data `code`, yang nilainya mengacu pada data terminologi ContactPointSystem.

### RelatedPerson.telecom[i].value

Berisi data nomor telepon dan alamat *email* dengan tipe data `string`.

### RelatedPerson.telecom[i].use

Berisi data penggunaan kontak dengan tipe data `code`, yang nilainya mengacu pada data terminologi ContactPointUse.

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

## RelatedPerson.gender

Berisi satu atau lebih data jenis kelamin orang terkait untuk keperluan administrasi dan pencatatan dengan tipe data `code`.

**Contoh Nilai**

```
"female"
```

## RelatedPerson.birthDate

Berisi data tanggal lahir orang terkait dengan tipe data `date`.

**Contoh Nilai**

```
"2023-03-08"
```

## RelatedPerson.address[i]

Berisi data alamat di mana orang terkait dapat dihubungi atau dikunjungi dengan tipe data `Address`.

### RelatedPerson.address[i].use

Berisi data alamat orang terkait dengan tipe data `code`, yang nilainya mengacu pada data terminologi AddressUse.

### RelatedPerson.address[i].line

Berisi satu atau lebih data nomor rumah, nomor apartemen, nama jalan dan informasi alamat serupa dengan tipe data `string`.

### RelatedPerson.address[i].city

Berisi satu atau lebih data mengenai nama kota, kotamadya, pinggiran kota, desa atau komunitas lain atau pusat pengiriman dengan tipe data `string`.

### RelatedPerson.address[i].postalCode

Berisi data kode pos dengan tipe data `string`.

### RelatedPerson.address[i].country

Berisi data kode negara berdasarkan ISO 3316 2-letter (contoh: ID) dengan dengan tipe data `string`.

**Contoh JSON**

```
[
  {
    "use": "home",
    "line": [
        "Gd. Prof. Dr. Sujudi Lt.5, Jl. H.R. Rasuna Said Blok X5 Kav. 4-9 Kuningan"
    ],
    "city": "Jakarta",
    "postalCode": "12950",
    "country": "ID"
  }
]
```

## RelatedPerson.photo[i]

Berisi data gambar orang terkait dengan tipe data `Attachment`.

## RelatedPerson.period

Berisi periode waktu selama hubungan ini aktif. Jika tidak ada tanggal yang ditentukan, maka intervalnya tidak diketahui dengan tipe data `Period`.

## RelatedPerson.communication[i]

Berisi data bahasa yang dapat digunakan untuk berkomunikasi tentang kesehatan pasien dengan tipe data `BackboneElement`.

## \*RelatedPerson.communication.language

Berisi kode ISO-639-1 alpha 2 dalam huruf kecil untuk bahasa tersebut, secara opsional diikuti dengan tanda hubung dan kode ISO-3166-1 alpha 2 untuk wilayah dalam huruf besar; misalnya "en" untuk bahasa Inggris, atau "en-US" untuk bahasa Inggris Amerika versus "en-EN" untuk bahasa Inggris dengan tipe data `CodeableConcept`.

### \*RelatedPerson.communication.language.coding

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

## RelatedPerson.communication.preferred

Berisi indikator preferensi bahasa yang menunjukkan apakah pasien lebih suka bahasa tersebut atau tidak (pasien menguasai bahasa lain sampai tingkat tertentu) dengan tipe data `boolean`.

**Contoh Nilai**

```
true
```
