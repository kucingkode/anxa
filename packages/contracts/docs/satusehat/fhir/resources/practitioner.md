> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/practitioner/

---

# Practitioner

Apabila melakukan pengiriman data kesehatan melalui SATUSEHAT yang memiliki elemen data terkait tenaga kesehatan, maka diperlukan informasi `{practitioner-ihs-number}` dari tenaga kesehatan yang bersangkutan. `{practitioner-ihs-number}` seorang tenaga kesehatan didapatkan dari *Master Nakes Index* (MNI) Kementerian Kesehatan. MNI menyimpan data-data Nakes dari seluruh sumber yang secara resmi menerbitkan daftar tenaga kesehatan. Setelah mendapatkan `{practitioner-ihs-number}`, ID tersebut dapat disimpan di masing-masing sistem internal fasilitas kesehatan.

Proses pencarian SATUSEHAT ID dari tenaga kesehatan `{practitioner-ihs-number}` dapat dilakukan melalui FHIR API dengan metode **GET**.

## Practitioner

Data dari praktisi kesehatan yang bersangkutan akan dipetakan dengan menggunakan standar FHIR `DomainResource` dengan tipe Practitioner. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Daftar Data Tenaga Kesehatan untuk Proses Uji Coba/Sandbox(Staging)

Silakan gunakan data nakes (`Practitioner`) *dummy* yang disediakan oleh SATUSEHAT di bawah ini saat proses uji coba pengiriman data (Sandbox).

|  |  |
| --- | --- |
|  | Data *dummy* ini **hanya dapat digunakan** pada *environment* Sandbox. |

### PractitionerID dan NIK

Tabel 1. Daftar Data Practitioner

| NIK | Nama | Gender | birthDate | Nomor IHS |
| --- | --- | --- | --- | --- |
| 7209061211900001 | dr. Alexander | male | 1994-01-01 | 10009880728 |
| 3322071302900002 | dr. Yoga Yandika, Sp.A | male | 1995-02-02 | 10006926841 |
| 3171071609900003 | dr. Syarifuddin, Sp.Pd. | male | 1988-03-03 | 10001354453 |
| 3207192310600004 | dr. Nicholas Evan, Sp.B. | male | 1986-04-04 | 10010910332 |
| 6408130207800005 | dr. Dito Arifin, Sp.M. | male | 1985-05-05 | 10018180913 |
| 3217040109800006 | dr. Olivia Kirana, Sp.OG | female | 1984-06-06 | 10002074224 |
| 3519111703800007 | dr. Alicia Chrissy, Sp.N. | female | 1982-07-07 | 10012572188 |
| 5271002009700008 | dr. Nathalie Tan, Sp.PK. | female | 1981-08-08 | 10018452434 |
| 3313096403900009 | Sheila Annisa S.Kep | female | 1980-09-09 | 10014058550 |
| 3578083008700010 | apt. Aditya Pradhana, S.Farm. | female | 1980-10-10 | 10001915884 |

## Practitioner.identifier[i]

Berisi satu atau lebih daftar data mengenai informasi terkait identitas tenaga kesehatan dengan tipe data `Identifier`.

## Practitioner.active

Berisi data apakah catatan tenaga kesehatan ini aktif digunakan dengan tipe data `boolean`.

## Practitioner.name[i]

Berisi satu atau lebih data mengenai nama tenaga kesehatan dengan tipe data `HumanName`.

## Practitioner.telecom[i]

Berisi satu atau lebih data mengenai detail kontak tenaga kesehatan seperti nomor telepon atau alamat *email* dengan tipe data `ContactPoint`.

## Practitioner.address[i]

Berisi satu atau lebih data mengenai alamat tenaga kesehatan dengan tipe data `Address`.

### Practitioner.address.use

Berisi data penggunaan alamat dengan tipe data `code`.

### Practitioner.address.type

Berisi data jenis alamat dengan tipe data `code`.

### Practitioner.address.text

Berisi satu atau lebih data mengenai representasi alamat seperti yang seharusnya ditampilkan dengan tipe data `string`.

### Practitioner.address.line[i]

Berisi data alamat lengkap tenaga kesehatan dengan tipe data `string`.

### Practitioner.address.city

Berisi satu atau lebih data mengenai nama kota, kotamadya, pinggiran kota, desa atau komunitas lain atau pusat pengiriman dengan tipe data `string`.

### Practitioner.address.district

Berisi satu atau lebih data mengenai nama wilayah administrasi dengan tipe data `string`.

### Practitioner.address.state

Berisi satu atau lebih data mengenai Sub-unit negara dengan kedaulatan terbatas di negara yang diatur secara federal dengan tipe data `string`.

### Practitioner.address.postalCode

Berisi data kode pos yang menunjuk wilayah yang ditentukan oleh layanan pos dengan tipe data `string`.

### Practitioner.address.country

Berisi data kode negara berdasarkan ISO 3316 2-letter (contoh: ID) dengan tipe data `string`.

### Practitioner.address.period

Berisi data jangka waktu saat alamat sedang digunakan dengan tipe data `Period`.

## Practitioner.gender

Berisi satu atau lebih data mengenai informasi jenis kelamin tenaga kesehatan untuk keperluan administrasi dan pencatatan dengan tipe data `code`.

## Practitioner.birthDate

Berisi satu atau lebih data mengenai informasi tanggal lahir tenaga kesehatan dengan tipe data `date`.

## Practitioner.photo[i]

Berisi satu atau lebih data gambar tenaga kesehatan dengan tipe data `Attachment`.

## Practitioner.qualification[i]

Berisi satu atau lebih data mengenai informasi sertifikasi resmi, pelatihan, dan lisensi yang mengotorisasi atau berkaitan dengan penyediaan perawatan oleh praktisi dengan tipe data `BackboneElement`.

## Practitioner.qualification.identifier[i]

Berisi data mengenai informasi identitas khusus yang berlaku untuk kualifikasi tenaga kesehatan dengan tipe data `Identifier`.

## \*Practitioner.qualification.code

Berisi data mengenai representasi kode kualifikasi dengan tipe data `CodeableConcept`.

### \*Practitioner.qualification.code.coding

Berisi data mengenai representasi kode kualifikasi dengan tipe data `Coding`.

## Practitioner.qualification.period

Berisi data mengenai informasi periode kualifikasi berlaku dengan tipe data `Period`.

## Practitioner.qualification.issuer

Berisi data mengenai informasi organisasi yang mengatur dan menerbitkan kualifikasi dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Organization`.

## Practitioner.communication[i]

Berisi data mengenai informasi bahasa yang dapat digunakan tenaga kesehatan dalam berkomunikasi dengan pasien dengan tipe data `CodeableConcept`.

### Practitioner.communication[i].coding

Berisi data mengenai informasi bahasa yang dapat digunakan tenaga kesehatan dalam berkomunikasi dengan pasien dengan tipe data `Coding`.
