> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-sarana-index/rest-api-msi/

---

# ReST API

## 1. Autentikasi

Untuk melakukan transaksi data dari Master Sarana Index (MSI), perlu dilakukan proses autentikasi terlebih dahulu agar mendapatkan akses yang tersedia. Autentikasi yang digunakan oleh MSI mengikuti standar protokol OAuth 2 dengan tipe pemberian akses (*grant type*) adalah `client_credentials`.

Autentikasi menggunakan *grant type* `client_credentials` adalah proses autentikasi yang dilakukan antara *server to server*, sehingga tidak ada proses registrasi atau *log in* di sini. Autentikasi dengan tipe tersebut hanya memerlukan data berupa `client_id` dan `client_server`, dimana nilai tersebut didapatkan ketika pihak yang ingin menggunakan atau mengakses MSI ini telah melakukan pengajuan, terdaftar, serta mendapatkan persetujuan dari **Kementerian Kesehatan Republik Indonesia**.

Cara Mendapatkan Nilai dari `client_id` dan `client_secret`

Pastikan sistem RME fasyankes telah terverifikasi di SATUSEHAT Platform (SSP) dan fasyankes sudah melakukan proses pemutakhiran data di aplikasi DFO/REGFASYANKES/RS ONLINE. Untuk informasi lebih lanjut dapat dilihat pada Panduan Registrasi.

|  |  |
| --- | --- |
|  | **Berikut ini ketentuan Kode Akses API:**  1. **Client ID** (**Client Secret**) hanya dapat digunakan oleh 1 **Organization ID**. 2. Terdapat validasi apabila **Client ID** (**Client Secret**) mengirimkan data **Organization ID** yang berbeda. *Response error* sebagai berikut:  ```    "text": "resource cannot be accessed due to business rule"    ``` 3. Kode Akses API bersifat **RAHASIA** di mana unik, personal, dan khusus disediakan hanya untuk Partner Interoperabilitas SATUSEHAT yang telah terverifikasi di SATUSEHAT Platform (SSP). 4. Partner Interoperabilitas SATUSEHAT, **DILARANG** menduplikasi, mempublikasi, dan/atau mendistribusikan dalam bentuk apapun, sebagian/keseluruhan informasi kode akses API kepada pihak yang tidak sah dan tidak berkepentingan. |

|  |  |
| --- | --- |
|  | Setiap teks yang berwarna **biru muda**, dapat diklik untuk melompat ke bagian yang direferensikan. |

Pada bagian ini akan dijelaskan spesifikasi untuk **ReST API Master Sarana Index (MSI)**, yang mempunyai *endpoint* berdasarkan jenis lingkungan pengembangannya (*development environment*) yaitu:

**Autentikasi**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1
* **Production**: https://api-satusehat.kemkes.go.id/oauth2/v1

**API MSI**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/masterdata
* **Production**: https://api-satusehat.kemkes.go.id/masterdata

|  |  |
| --- | --- |
|  | Semua penerapan, penjelasan, dan contoh yang akan dibahas akan menggunakan *environment sandbox*. |

|  |  |
| --- | --- |
|  | Untuk melakukan beberapa *request* ke ReST API SATUSEHAT yang akan dijelaskan atau dicontohkan di bagian ini, **WAJIB** melakukan proses autentikasi terlebih dahulu.  Setiap *request* diperlukan sebuah nilai token bertipe `Bearer` yang akan dimasukkan pada *header* `Authorization: Bearer <access_token>`.  Nilai `<access_token>` didapatkan dari properti `access_token` dari hasil *response* yang secara detail dijelaskan di artikel terkait **Akses Token**. |

## 2. *Postman Collection*

Silakan mengunduh *Postman Collection* untuk melihat contoh/melakukan workshop secara mandiri pada website *Postman Collection* MSI melalui web *browser* Anda.

## 3. Akses Token

### Mendapatkan Token

Melakukan proses autentikasi untuk mendapatkan akses token yang akan dipakai pada setiap *request* ReST API SATUSEHAT selanjutnya.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken
```

#### HTTP Verb/Method

```
POST
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam bentuk *URL Encoded*, **WAJIB** diisi dengan `application/x-www-form-urlencoded` |

#### Query String

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*grant_type` | `string` | Tipe permintaan akses (*grant*) Oauth2, **WAJIB** diisi dengan `client_credentials`. |

#### Body (`application/x-www-form-urlencoded`)

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*client_id` | `string` | Nilai *client ID* yang telah didapatkan dari **Kementerian Kesehatan Republik Indonesia** setelah melakukan pengajuan via *email*, **WAJIB** diisi. Nilai ini bisa disamakan seperti *username* yang akan digunakan untuk akses aplikasi. |
| `*client_secret` | `string` | Nilai *client secret* yang telah didapatkan dari **Kementerian Kesehatan Republik Indonesia** setelah melakukan pengajuan via *email*, **WAJIB** diisi. Nilai ini bisa disamakan seperti kata sandi (*password*) yang akan digunakan untuk akses aplikasi. |

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
client_id: <client-id>
client_secret: <client-secret>
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Dari hasil *response* ini, **PERLU** disimpan nilai akses token yang didapat dari properti `access_token`, di mana tipe token (lihat properti `token_type`) tersebut adalah `BearerToken`. Nilai akses token tersebut **WAJIB** selalu digunakan sebagai nilai dari *header* `Authorization: Bearer <access_token>` saat melakukan *request* lainnya dari ReST API SATUSEHAT.

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "refresh_token_expires_in": "0",
  "api_product_list": "[api-sandbox]",
  "api_product_list_json": [
        "api-sandbox"
  ],
  "organization_name": "ihs-prod-1",
  "developer.email": "<email-dev>",
  "token_type": "BearerToken",
  "issued_at": "1671109805593",
  "client_id": "<client-id>",
  "access_token": "<access-token>",
  "application_name": "992291b8-a613-40aa-b27c-41e480c7585f",
  "scope": "",
  "expires_in": "3599",
  "refresh_count": "0",
  "status": "approved"
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "resourceType": "OperationOutcome",
  "issue": [{
    "severity": "invalid",
    "code": "value",
    "details": {
      "text": "The user or system was not able to be authenticated (either client_id or client_secret combination is unacceptable)"
      }
    }
  ]
}
```

#### 5xx *Server Error* (`Content-Type: text/plain`)

Sistem akan mengembalikan pesan *error* bila terjadi kesalahan pada sisi server saat memproses data yang telah dikirimkan.

**Contoh Data**

```
Gateway Timeout
```

### Contoh Penggunaan/Kode

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

#### cURL (Windows)

```
curl --insecure --location \
  --header "Content-Type: application/x-www-form-urlencoded" ^
  --data-urlencode "client_id=<client-id>" ^
  --data-urlencode "client_secret=<client-secret>" ^
  --request POST ^
  "https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=<client-id>' \
  --data-urlencode 'client_secret=<client-secret>' \
  --request POST \
  'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken
   ```
3. Lalu pilih *request method* `POST`.
4. Pada tab **Params**, di bagian **Query Params**:

   1. masukkan nilai `grant_type` pada kotak masukkan pada kolom **KEY**,
   2. lalu masukkan nilai `` client_credentials` `` pada kotak masukkan pada kolom **VALUE**.
5. Pada tab **Body**:

   1. pilih **x-www-form-urlencoded**,
   2. masukkan nilai `client_id` pada kotak masukkan pada kolom **KEY**,
   3. lalu masukkan nilai *client ID* yang sudah didapatkan dari **Kementerian Kesehatan Republik Indonesia** pada kotak masukkan pada kolom **VALUE**,
   4. selanjutnya masukkan nilai `client_secret` pada kotak masukkan pada kolom **KEY**,
   5. terakhir masukkan nilai *client secret* yang sudah didapatkan dari **Kementerian Kesehatan Republik Indonesia** pada kotak masukkan pada kolom **VALUE**.
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## 4. API Master Sarana Index

## 4.1. Master Sarana *Index* - Multi Sarana

|  |  |
| --- | --- |
|  | Master Sarana Index - Multi Sarana digunakan apabila ingin menampilkan data `jenis_sarana` lebih dari satu. |

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
```

#### HTTP Verb/Method

```
GET
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |

#### Query String

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*limit` | `number` | Isi dengan nomor banyaknya barisan dalam 1 halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `*page` | `number` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `10`. |
| `*jenis_sarana` | `number` | |  |  | | --- | --- | |  | Jika parameter `jenis_sarana` ingin di-*input* multi maka ditambahkan key `jenis_sarana` seseuai kebutuhan. |  Isi dengan kode jenis sarana. Kode unik yang ditetapkan untuk menentukan sarana fasyankes.  |  |  | | --- | --- | |  | 1. Rumah sakit (**`104`**) 2. Klinik (**`103`**) 3. PUSKESMAS (**`102`**) 4. Praktek mandiri (**`101`**) |  Contoh: `104` dan `103` |
| kode\_satusehat | `number` | Isi dengan nomer kode SATUSEHAT (10 digit)  Contoh: `1000201991`. |
| kode\_sarana | `string` | Isi dengan nomer kode fasyankes dari sumber data utama  Contoh: `1235959` |
| nama | `string` | Isi dengan nama fasyankes  Contoh: `pratama` |
| kode\_provinsi | `string` | Isi dengan nomer kode dagri provinsi (2 digit)  Contoh: `35` |
| kode\_kabkota | `string` | Isi dengan nomer kode dagri kabupaten / kota (4 digit)  Contoh: `3603` |
| kode\_kecamatan | `string` | Isi dengan nomer kode dagri kecamatan (6 digit)  Contoh: `350105` |
| status\_aktif | `string` | Isi dengan status aktif dari jenis sarana fasyankes `true` atau `false`  Contoh: `true` |
| status\_sarana | `string` | Isi dengan status verifikasi saranan (`draft`, `verified`, `valid`, `reverified`)  Contoh `verifed` |
| sumber\_identifier | `string` | Untuk mengisi identifier memilih sumber data yang diinginkan di bawah ini:  |  |  | | --- | --- | |  | 1. satset = Satu Sehat 2. dto\_msfi = DTO - MSFI 3. yankes\_praktik\_mandiri = Yankes - Praktik Mandiri 4. yankes\_klinik = Yankes - Klinik 5. yankes\_rs = Yankes - RS 6. puskesmas\_pusdatin\_baru = Puskesmas Pusdatin (Baru) 7. puskesmas\_pusdatin\_lama = Puskesmas Pusdatin (Lama) 8. sisdmk\_sarana = SISDMK Sarana 9. yankes\_praktik\_mandiri\_kmk = Yankes - Praktik Mandiri (KMK 2022) 10. yankes\_klinik\_kmk = Yankes - Klinik (KMK 2022) 11. yankes\_utd = Yankes - UTD 12. yankes\_utd\_kmk = Yankes - UTD (KMK 2022) 13. yankes\_labkes = Yankes - Labkes 14. yankes\_labkes\_kmk = Yankes - Labkes (KMK 2022) |  Misal, pilih sumber data dari SISDMK, gunakan kode identifier Contoh: `sisdmk_sarana`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| identifier\_kode\_sarana | `string` | Untuk mengisi kode identifier sarana, masukkan kode sarana pada sumber  Misal, kode sarana di sistem SISDMK, maka Contoh: `R3508055`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| lower\_bound\_updated\_at | `string` | Isi seperti update\_date from  Contoh: `2023-08-15` |
| upper\_bound\_updated\_at | `string` | Isi seperti update\_date to  Contoh: `2023-08-15` |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

```
DATA STRUCTURE:
{ (1)
  *status_code: integer (2)
  *message: string (3)
  *page: integer (4)
  *total_page: integer (5)
  *data: [{ (6)
    *kode_satusehat: string (7)
    *kode_sarana: string (8)
    *nama: string (9)
    *telp: string (10)
    *email: string (11)
    *website: string (12)
    *longitude: string (13)
    *latitude: string (14)
    *operasional: boolean (15)
    *wilayah_perairan_darat: string (16)
    *wilayah_karakteristik: string (17)
    *sarana_administrasi: { (18)
      *kode: string (19)
      *nama: string (20)
      *kode_sarana: string (21)
      *status_aktif: boolean (22)
      *status_sarana: string (23)
    }
    *alamat: string (24)
    *provinsi: { (25)
      *kode: number (26)
      *nama: string (27)
      *kode_bps: string (28)
      *kode_lama: string (29)
    }
    *kabkota: { (30)
      *kode: number (31)
      *nama: string (32)
      *kode_bps: string (33)
      *kode_lama: string (34)
    }
    *jenis_sarana: { (35)
      *kode: string (36)
      *nama: string (37)
      *nama_alt: string (38)
    }
    *subjenis: { (39)
      *kode: string (40)
      *nama: string (41)
      *nama_alt: string (42)
    }
    *kelas_sarana: { (43)
      *kode: string (44)
      *nama: string (45)
    }
    *status_sarana: string (46)
    *status_aktif: boolean (47)
  }]
}
```

|  |  |
| --- | --- |
| **1** | Respon yang diterima berupa `object`. |
| **2** | Properti `status_code` bertipe `integer`, berisi informasi kode hasil respon yang diterima |
| **3** | Properti `message` bertipe `string`, berisi informasi hasil dari respon yang diterima |
| **4** | Properti `page` bertipe `integer`, berisi berapa baris halaman yang ingin ditampilkan |
| **5** | Properti `total_page` bertipe `integer`, total dari hasil pencarian |
| **6** | Properti `data` bertipe `array of objects`, bila kosong akan mengembalikan array kosong. Setiap object item berisi data FASYANKES (Rumah Sakit, Klinik, Puskesmas, Praktek Mandiri). |
| **7** | Properti `kode_satusehat` bertipe `string`, berisi informasi kode satu sehat (10 digit) |
| **8** | Properti `kode_sarana` bertipe `string`, berisi informasi kode FASYANKES |
| **9** | Properti `nama` bertipe `string`, berisi informasi nama FASYANKES |
| **10** | Properti `telp` bertipe `string`, berisi informasi nomer telepon FASYANKES |
| **11** | Properti `email` bertipe `string`, berisi informasi alamat *email* FASYANKES |
| **12** | Properti `website` bertipe `string`, berisi informasi *website* FASYANKES |
| **13** | Properti `longtitude` bertipe `string`, garis bujur contoh : 106.821810 |
| **14** | Properti `latitude` bertipe `string`, garis lintang contoh : -6.193125 |
| **15** | Properti `operasional` bertipe `boolean`, mengindikasikan apakah ada sarana FASYANKES beroperasi (*true*) atau tidak (*false*). |
| **16** | Properti `wilayah_perairan_darat` bertipe `string`, wilayah perairan darat |
| **17** | Properti `wilayah_karakteristik` bertipe `string`, wilayah karakteristik |
| **18** | Properti `sarana_administrasi` bertipe `object`, data sarana administrasi |
| **19** | Properti `kode` bertipe `string`, kode satusehat (10 digit) dari FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **20** | Properti `nama` bertipe `string`, nama FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **21** | Properti `kode_sarana` bertipe `string`, kode FASYANKES dari sumber data utama yang dinyatakan sebagai induk untuk administratif |
| **22** | Properti `status_aktif` bertipe `string`, status keaktifan dari FASYANKES (*true*) atau tidak (*false*) |
| **23** | Properti `status_sarana` bertipe `string`, status administrasi dari FASYANKES yang dinyatakan sebagai induk untuk administratif yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **24** | Properti `alamat` bertipe `string`, berisi informasi alamat FASYANKES |
| **25** | Properti `provinsi` bertipe `object`, berisi data letak provinsi FASYANKES |
| **26** | Properti `kode` bertipe `string`, berisi informasi kode dagri provinsi FASYANKES |
| **27** | Properti `nama` bertipe `string`, berisi informasi nama provinsi FASYANKES |
| **28** | Properti `kode_bps` bertipe `string`, kode BPS provinsi FASYANKES |
| **29** | Properti `kode_lama` bertipe `string`, kode dagri provinsi yang lama (sebelum pemekaran) FASYANKES |
| **30** | Properti `kabkota` bertipe `object`, berisi data letak kabupaten/kota sarana |
| **31** | Properti `kode` bertipe `string`, berisi informasi kode dagri kabupaten/kota |
| **32** | Properti `nama` bertipe `string` berisi informasi nama kabupaten/kota |
| **33** | Properti `kode_bps` bertipe `string`, kode BPS kabupaten kota FASYANKES |
| **34** | Properti `kode_lama` bertipe `string`, kode dagri kabupaten kota yang lama (sebelum pemekaran) FASYANKES |
| **35** | Properti `jenis_sarana` bertipe `object`, berisi data jenis sarana |
| **36** | Properti `kode` bertipe `string`, berisi informasi id jenis sarana |
| **37** | Properti `nama` bertipe `string` berisi informasi deskripsi atau nama dari jenis sarana |
| **38** | Properti `nama_alt` bertipe `string` berisi informasi nama alternatif dari jenis sarana |
| **39** | Properti `subjenis` bertipe `object`, berisi data sub-jenis sarana |
| **40** | Properti `kode` bertipe `string`, berisi informasi id sub-jenis sarana |
| **41** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari jenis sarana |
| **42** | Properti `nama_alt` bertipe `string`, berisi informasi nama alternatif dari jenis sarana |
| **43** | Properti `kelas_sarana` bertipe `object`, berisi data dari kelas sarana |
| **44** | Properti `kode` bertipe `string`, berisi informasi id kelas sarana |
| **45** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari kelas sarana |
| **46** | Properti `status_sarana` bertipe `string`, berisi informasi status administrasi dari FASYANKES yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **47** | Properti `status_aktif` bertipe `boolean`, berisi informasi dari status keaktifan sarana FASYANKES (*true*) atau tidak (*false*). |

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status_code": 200,
  "message": "Success",
  "page": 1,
  "total_page": 1849,
  "data": [
      {
          "kode_satusehat": "1000156689",
          "kode_sarana": "1230458",
          "nama": "Klinik TelkoMedika Health Center 19 Bogor",
          "telp": "082128617274_",
          "email": "[email protected]",
          "website": null,
          "longitude": null,
          "latitude": null,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": null,
          "sarana_administrasi": {
              "kode": null,
              "nama": null,
              "kode_sarana": null,
              "status_aktif": null,
              "status_sarana": null
          },
          "alamat": "Jl. Pengadilan No. 14, RT. 02/ RW. 01, Kelurahan Pabaton, Kecamatan Bogor Tengah, Kota Bogor",
          "provinsi": {
              "kode": "32",
              "nama": "Jawa Barat",
              "kode_bps": "32",
              "kode_lama": "32"
          },
          "kabkota": {
              "kode": "3271",
              "nama": "Kota Bogor",
              "kode_bps": "3271",
              "kode_lama": "3271"
          },
          "jenis_sarana": {
              "kode": "103",
              "nama": "Klinik",
              "nama_alt": "Klinik"
          },
          "subjenis": {
              "kode": "10301",
              "nama": "Klinik Pratama",
              "nama_alt": null
          },
          "kelas_sarana": {
              "kode": null,
              "nama": null
          },
          "status_sarana": "valid",
          "status_aktif": true
      },
      /* lompat beberapa data */
      {
          "kode_satusehat": "1000208262",
          "kode_sarana": "1232475",
          "nama": "Satria Namira Husada 49",
          "telp": "0811324033___",
          "email": "[email protected]",
          "website": null,
          "longitude": null,
          "latitude": null,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": null,
          "sarana_administrasi": {
              "kode": null,
              "nama": null,
              "kode_sarana": null,
              "status_aktif": null,
              "status_sarana": null
          },
          "alamat": "Jl. Raya Buduran No 337 Buduran Sidoarjo",
          "provinsi": {
              "kode": "35",
              "nama": "Jawa Timur",
              "kode_bps": "35",
              "kode_lama": "35"
          },
          "kabkota": {
              "kode": "3515",
              "nama": "Kab. Sidoarjo",
              "kode_bps": "3515",
              "kode_lama": "3515"
          },
          "jenis_sarana": {
              "kode": "103",
              "nama": "Klinik",
              "nama_alt": "Klinik"
          },
          "subjenis": {
              "kode": "10301",
              "nama": "Klinik Pratama",
              "nama_alt": null
          },
          "kelas_sarana": {
              "kode": null,
              "nama": null
          },
          "status_sarana": "valid",
          "status_aktif": true
      },
      {
        "kode_satusehat": "1000262775",
        "kode_sarana": "3275070",
        "nama": "RS umum Daerah Teluk Pucung",
        "telp": null,
        "email": null,
        "website": null,
        "longitude": null,
        "latitude": null,
        "operasional": true,
        "wilayah_perairan_darat": null,
        "wilayah_karakteristik": null,
        "sarana_administrasi": {
            "kode": null,
            "nama": null,
            "kode_sarana": null,
            "status_aktif": null,
            "status_sarana": null
        },
        "alamat": "Jl. Lingkar Utara Kel. Teluk Pucung Kec. Bekasi Utara",
        "provinsi": {
            "kode": "32",
            "nama": "Jawa Barat",
            "kode_bps": "32",
            "kode_lama": "32"
        },
        "kabkota": {
            "kode": "3275",
            "nama": "Kota Bekasi",
            "kode_bps": "3275",
            "kode_lama": "3275"
        },
        "jenis_sarana": {
            "kode": "104",
            "nama": "Rumah Sakit",
            "nama_alt": "RS"
        },
        "subjenis": {
            "kode": "10401",
            "nama": "Rumah Sakit Umum",
            "nama_alt": "RSU"
        },
        "kelas_sarana": {
            "kode": "nakes",
            "nama": "Pendidikan & Pelatihan Tenaga Kesehatan"
        },
        "status_sarana": "valid",
        "status_aktif": true
    },
    /* lompat beberapa data */
    {
        "kode_satusehat": "1000260600",
        "kode_sarana": "9110011",
        "nama": "RS Umum Pratama Type D Kab. Maybrat",
        "telp": "085244394272_",
        "email": null,
        "website": null,
        "longitude": null,
        "latitude": null,
        "operasional": true,
        "wilayah_perairan_darat": null,
        "wilayah_karakteristik": null,
        "sarana_administrasi": {
            "kode": null,
            "nama": null,
            "kode_sarana": null,
            "status_aktif": null,
            "status_sarana": null
        },
        "alamat": "Jl. Susumuk-Kumurkek Sonere Aifat Maybrat Papua Barat",
        "provinsi": {
            "kode": "96",
            "nama": "Papua Barat Daya",
            "kode_bps": null,
            "kode_lama": "96"
        },
        "kabkota": {
            "kode": "9605",
            "nama": "Kab. Maybrat",
            "kode_bps": "9110",
            "kode_lama": "9210"
        },
        "jenis_sarana": {
            "kode": "104",
            "nama": "Rumah Sakit",
            "nama_alt": "RS"
        },
        "subjenis": {
            "kode": "10401",
            "nama": "Rumah Sakit Umum",
            "nama_alt": "RSU"
        },
        "kelas_sarana": {
            "kode": "other",
            "nama": "Sarana Kesehatan Lainnya"
        },
        "status_sarana": "valid",
        "status_aktif": true
    }

  ]
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "status_code": 400,
  "message": "limit cannot be more than 2000",
  "data": null
}
```

#### 5xx *Server Error* (`Content-Type: text/plain`)

Sistem akan mengembalikan pesan *error* bila terjadi kesalahan pada sisi server saat memproses data yang telah dikirimkan.

**Contoh Data**

```
Gateway Timeout
```

### Contoh Penggunaan/Kode

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

#### cURL (Windows)

```
curl --location ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana"
```

#### cURL (Linux)

```
curl --location \
  --header 'Authorization: Bearer {bearer_token}' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4.2. Master Sarana *Index* - Rumah Sakit

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
```

#### HTTP Verb/Method

```
GET
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |

#### Query String

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*limit` | `number` | Isi dengan nomor banyaknya barisan dalam 1 halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `*page` | `number` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `10`. |
| `*jenis_sarana` | `number` | Isi dengan kode jenis sarana. Kode unik yang ditetapkan untuk menentukan sarana fasyankes.  |  |  | | --- | --- | |  | 1. Rumah sakit (**`104`**) 2. Klinik (**`103`**) 3. PUSKESMAS (**`102`**) 4. Praktek mandiri (**`101`**) |  Contoh: `104`. |
| kode\_satusehat | `number` | Isi dengan nomer kode SATUSEHAT (10 digit)  Contoh: `1000201991`. |
| kode\_sarana | `string` | Isi dengan nomer kode fasyankes dari sumber data utama  Contoh: `1235959` |
| nama | `string` | Isi dengan nama fasyankes  Contoh: `pratama` |
| kode\_provinsi | `string` | Isi dengan nomer kode dagri provinsi (2 digit)  Contoh: `35` |
| kode\_kabkota | `string` | Isi dengan nomer kode dagri kabupaten / kota (4 digit)  Contoh: `3603` |
| kode\_kecamatan | `string` | Isi dengan nomer kode dagri kecamatan (6 digit)  Contoh: `350105` |
| status\_aktif | `string` | Isi dengan status aktif dari jenis sarana fasyankes `true` atau `false`  Contoh: `true` |
| status\_sarana | `string` | Isi dengan status verifikasi saranan (`draft`, `verified`, `valid`, `reverified`)  Contoh `verifed` |
| sumber\_identifier | `string` | Untuk mengisi identifier memilih sumber data yang diinginkan di bawah ini:  |  |  | | --- | --- | |  | 1. satset = Satu Sehat 2. dto\_msfi = DTO - MSFI 3. yankes\_praktik\_mandiri = Yankes - Praktik Mandiri 4. yankes\_klinik = Yankes - Klinik 5. yankes\_rs = Yankes - RS 6. puskesmas\_pusdatin\_baru = Puskesmas Pusdatin (Baru) 7. puskesmas\_pusdatin\_lama = Puskesmas Pusdatin (Lama) 8. sisdmk\_sarana = SISDMK Sarana 9. yankes\_praktik\_mandiri\_kmk = Yankes - Praktik Mandiri (KMK 2022) 10. yankes\_klinik\_kmk = Yankes - Klinik (KMK 2022) 11. yankes\_utd = Yankes - UTD 12. yankes\_utd\_kmk = Yankes - UTD (KMK 2022) 13. yankes\_labkes = Yankes - Labkes 14. yankes\_labkes\_kmk = Yankes - Labkes (KMK 2022) |  Misal, pilih sumber data dari SISDMK, gunakan kode identifier Contoh: `sisdmk_sarana`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| identifier\_kode\_sarana | `string` | Untuk mengisi kode identifier sarana, masukkan kode sarana pada sumber  Misal, kode sarana di sistem SISDMK, maka Contoh: `R3508055`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| lower\_bound\_updated\_at | `string` | Isi seperti update\_date from  Contoh: `2023-08-15` |
| upper\_bound\_updated\_at | `string` | Isi seperti update\_date to  Contoh: `2023-08-15` |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

```
DATA STRUCTURE:
{ (1)
  *status_code: integer (2)
  *message: string (3)
  *page: integer (4)
  *total_page: integer (5)
  *data: [{ (6)
    *kode_satusehat: string (7)
    *kode_sarana: string (8)
    *nama: string (9)
    *telp: string (10)
    *email: string (11)
    *website: string (12)
    *longitude: string (13)
    *latitude: string (14)
    *operasional: boolean (15)
    *wilayah_perairan_darat: string (16)
    *wilayah_karakteristik: string (17)
    *sarana_administrasi: { (18)
      *kode: string (19)
      *nama: string (20)
      *kode_sarana: string (21)
      *status_aktif: boolean (22)
      *status_sarana: string (23)
    }
    *alamat: string (24)
    *provinsi: { (25)
      *kode: number (26)
      *nama: string (27)
      *kode_bps: string (28)
      *kode_lama: string (29)
    }
    *kabkota: { (30)
      *kode: number (31)
      *nama: string (32)
      *kode_bps: string (33)
      *kode_lama: string (34)
    }
    *jenis_sarana: { (35)
      *kode: string (36)
      *nama: string (37)
      *nama_alt: string (38)
    }
    *subjenis: { (39)
      *kode: string (40)
      *nama: string (41)
      *nama_alt: string (42)
    }
    *kelas_sarana: { (43)
      *kode: string (44)
      *nama: string (45)
    }
    *status_sarana: string (46)
    *status_aktif: boolean (47)
  }]
}
```

|  |  |
| --- | --- |
| **1** | Respon yang diterima berupa `object`. |
| **2** | Properti `status_code` bertipe `integer`, berisi informasi kode hasil respon yang diterima |
| **3** | Properti `message` bertipe `string`, berisi informasi hasil dari respon yang diterima |
| **4** | Properti `page` bertipe `integer`, berisi berapa baris halaman yang ingin ditampilkan |
| **5** | Properti `total_page` bertipe `integer`, total dari hasil pencarian |
| **6** | Properti `data` bertipe `array of objects`, bila kosong akan mengembalikan array kosong. Setiap object item berisi data FASYANKES (Rumah Sakit, Klinik, Puskesmas, Praktek Mandiri). |
| **7** | Properti `kode_satusehat` bertipe `string`, berisi informasi kode satu sehat (10 digit) |
| **8** | Properti `kode_sarana` bertipe `string`, berisi informasi kode FASYANKES |
| **9** | Properti `nama` bertipe `string`, berisi informasi nama FASYANKES |
| **10** | Properti `telp` bertipe `string`, berisi informasi nomer telepon FASYANKES |
| **11** | Properti `email` bertipe `string`, berisi informasi alamat *email* FASYANKES |
| **12** | Properti `website` bertipe `string`, berisi informasi *website* FASYANKES |
| **13** | Properti `longtitude` bertipe `string`, garis bujur contoh : 106.821810 |
| **14** | Properti `latitude` bertipe `string`, garis lintang contoh : -6.193125 |
| **15** | Properti `operasional` bertipe `boolean`, mengindikasikan apakah ada sarana FASYANKES beroperasi (*true*) atau tidak (*false*). |
| **16** | Properti `wilayah_perairan_darat` bertipe `string`, wilayah perairan darat |
| **17** | Properti `wilayah_karakteristik` bertipe `string`, wilayah karakteristik |
| **18** | Properti `sarana_administrasi` bertipe `object`, data sarana administrasi |
| **19** | Properti `kode` bertipe `string`, kode satusehat (10 digit) dari FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **20** | Properti `nama` bertipe `string`, nama FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **21** | Properti `kode_sarana` bertipe `string`, kode FASYANKES dari sumber data utama yang dinyatakan sebagai induk untuk administratif |
| **22** | Properti `status_aktif` bertipe `string`, status keaktifan dari FASYANKES (*true*) atau tidak (*false*) |
| **23** | Properti `status_sarana` bertipe `string`, status administrasi dari FASYANKES yang dinyatakan sebagai induk untuk administratif yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **24** | Properti `alamat` bertipe `string`, berisi informasi alamat FASYANKES |
| **25** | Properti `provinsi` bertipe `object`, berisi data letak provinsi FASYANKES |
| **26** | Properti `kode` bertipe `string`, berisi informasi kode dagri provinsi FASYANKES |
| **27** | Properti `nama` bertipe `string`, berisi informasi nama provinsi FASYANKES |
| **28** | Properti `kode_bps` bertipe `string`, kode BPS provinsi FASYANKES |
| **29** | Properti `kode_lama` bertipe `string`, kode dagri provinsi yang lama (sebelum pemekaran) FASYANKES |
| **30** | Properti `kabkota` bertipe `object`, berisi data letak kabupaten/kota sarana |
| **31** | Properti `kode` bertipe `string`, berisi informasi kode dagri kabupaten/kota |
| **32** | Properti `nama` bertipe `string` berisi informasi nama kabupaten/kota |
| **33** | Properti `kode_bps` bertipe `string`, kode BPS kabupaten kota FASYANKES |
| **34** | Properti `kode_lama` bertipe `string`, kode dagri kabupaten kota yang lama (sebelum pemekaran) FASYANKES |
| **35** | Properti `jenis_sarana` bertipe `object`, berisi data jenis sarana |
| **36** | Properti `kode` bertipe `string`, berisi informasi id jenis sarana |
| **37** | Properti `nama` bertipe `string` berisi informasi deskripsi atau nama dari jenis sarana |
| **38** | Properti `nama_alt` bertipe `string` berisi informasi nama alternatif dari jenis sarana |
| **39** | Properti `subjenis` bertipe `object`, berisi data sub-jenis sarana |
| **40** | Properti `kode` bertipe `string`, berisi informasi id sub-jenis sarana |
| **41** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari jenis sarana |
| **42** | Properti `nama_alt` bertipe `string`, berisi informasi nama alternatif dari jenis sarana |
| **43** | Properti `kelas_sarana` bertipe `object`, berisi data dari kelas sarana |
| **44** | Properti `kode` bertipe `string`, berisi informasi id kelas sarana |
| **45** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari kelas sarana |
| **46** | Properti `status_sarana` bertipe `string`, berisi informasi status administrasi dari FASYANKES yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **47** | Properti `status_aktif` bertipe `boolean`, berisi informasi dari status keaktifan sarana FASYANKES (*true*) atau tidak (*false*). |

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status_code": 200,
  "message": "Success",
  "page": 1,
  "total_page": 340,
  "data": [
      {
          "kode_satusehat": "1000262775",
          "kode_sarana": "3275070",
          "nama": "RS umum Daerah Teluk Pucung",
          "telp": null,
          "email": null,
          "website": null,
          "longitude": null,
          "latitude": null,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": null,
          "sarana_administrasi": {
              "kode": null,
              "nama": null,
              "kode_sarana": null,
              "status_aktif": null,
              "status_sarana": null
          },
          "alamat": "Jl. Lingkar Utara Kel. Teluk Pucung Kec. Bekasi Utara",
          "provinsi": {
              "kode": "32",
              "nama": "Jawa Barat",
              "kode_bps": "32",
              "kode_lama": "32"
          },
          "kabkota": {
              "kode": "3275",
              "nama": "Kota Bekasi",
              "kode_bps": "3275",
              "kode_lama": "3275"
          },
          "jenis_sarana": {
              "kode": "104",
              "nama": "Rumah Sakit",
              "nama_alt": "RS"
          },
          "subjenis": {
              "kode": "10401",
              "nama": "Rumah Sakit Umum",
              "nama_alt": "RSU"
          },
          "kelas_sarana": {
              "kode": "nakes",
              "nama": "Pendidikan & Pelatihan Tenaga Kesehatan"
          },
          "status_sarana": "valid",
          "status_aktif": true
      },
      /* lompat beberapa data */
      {
          "kode_satusehat": "1000260600",
          "kode_sarana": "9110011",
          "nama": "RS Umum Pratama Type D Kab. Maybrat",
          "telp": "085244394272_",
          "email": null,
          "website": null,
          "longitude": null,
          "latitude": null,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": null,
          "sarana_administrasi": {
              "kode": null,
              "nama": null,
              "kode_sarana": null,
              "status_aktif": null,
              "status_sarana": null
          },
          "alamat": "Jl. Susumuk-Kumurkek Sonere Aifat Maybrat Papua Barat",
          "provinsi": {
              "kode": "96",
              "nama": "Papua Barat Daya",
              "kode_bps": null,
              "kode_lama": "96"
          },
          "kabkota": {
              "kode": "9605",
              "nama": "Kab. Maybrat",
              "kode_bps": "9110",
              "kode_lama": "9210"
          },
          "jenis_sarana": {
              "kode": "104",
              "nama": "Rumah Sakit",
              "nama_alt": "RS"
          },
          "subjenis": {
              "kode": "10401",
              "nama": "Rumah Sakit Umum",
              "nama_alt": "RSU"
          },
          "kelas_sarana": {
              "kode": "other",
              "nama": "Sarana Kesehatan Lainnya"
          },
          "status_sarana": "valid",
          "status_aktif": true
      }
  ]
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "status_code": 400,
  "message": "limit cannot be more than 2000",
  "data": null
}
```

#### 5xx *Server Error* (`Content-Type: text/plain`)

Sistem akan mengembalikan pesan *error* bila terjadi kesalahan pada sisi server saat memproses data yang telah dikirimkan.

**Contoh Data**

```
Gateway Timeout
```

### Contoh Penggunaan/Kode

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

#### cURL (Windows)

```
curl --location ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana"
```

#### cURL (Linux)

```
curl --location \
  --header 'Authorization: Bearer {bearer_token}' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4.3. Master Sarana *Index* - Klinik

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
```

#### HTTP Verb/Method

```
GET
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |

#### Query String

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*limit` | `number` | Isi dengan nomor banyaknya barisan dalam 1 halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `*page` | `number` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `10`. |
| `*jenis_sarana` | `number` | Isi dengan kode jenis sarana. Kode unik yang ditetapkan untuk menentukan sarana fasyankes.  |  |  | | --- | --- | |  | 1. Rumah sakit (**`104`**) 2. Klinik (**`103`**) 3. PUSKESMAS (**`102`**) 4. Praktek mandiri (**`101`**) |  Contoh: `103`. |
| kode\_satusehat | `number` | Isi dengan nomer kode SATUSEHAT(10 digit)  Contoh: `1000201991`. |
| kode\_sarana | `string` | Isi dengan nomer kode fasyankes dari sumber data utama  Contoh: `1235959` |
| nama | `string` | Isi dengan nama fasyankes  Contoh: `pratama` |
| kode\_provinsi | `string` | Isi dengan nomer kode dagri provinsi (2 digit)  Contoh: `35` |
| kode\_kabkota | `string` | Isi dengan nomer kode dagri kabupaten / kota (4 digit)  Contoh: `3603` |
| kode\_kecamatan | `string` | Isi dengan nomer kode dagri kecamatan (6 digit)  Contoh: `350105` |
| status\_aktif | `string` | Isi dengan status aktif dari jenis sarana fasyankes `true` atau `false`  Contoh: `true` |
| status\_sarana | `string` | Isi dengan status verifikasi saranan (`draft`, `verified`, `valid`, `reverified`)  Contoh `verifed` |
| sumber\_identifier | `string` | Untuk mengisi identifier memilih sumber data yang diinginkan di bawah ini:  |  |  | | --- | --- | |  | 1. satset = Satu Sehat 2. dto\_msfi = DTO - MSFI 3. yankes\_praktik\_mandiri = Yankes - Praktik Mandiri 4. yankes\_klinik = Yankes - Klinik 5. yankes\_rs = Yankes - RS 6. puskesmas\_pusdatin\_baru = Puskesmas Pusdatin (Baru) 7. puskesmas\_pusdatin\_lama = Puskesmas Pusdatin (Lama) 8. sisdmk\_sarana = SISDMK Sarana 9. yankes\_praktik\_mandiri\_kmk = Yankes - Praktik Mandiri (KMK 2022) 10. yankes\_klinik\_kmk = Yankes - Klinik (KMK 2022) 11. yankes\_utd = Yankes - UTD 12. yankes\_utd\_kmk = Yankes - UTD (KMK 2022) 13. yankes\_labkes = Yankes - Labkes 14. yankes\_labkes\_kmk = Yankes - Labkes (KMK 2022) |  Misal, pilih sumber data dari SISDMK, gunakan kode identifier Contoh: `sisdmk_sarana`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| identifier\_kode\_sarana | `string` | Untuk mengisi kode identifier sarana, masukkan kode sarana pada sumber  Misal, kode sarana di sistem SISDMK, maka Contoh: `R3508055`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| lower\_bound\_updated\_at | `string` | Isi seperti update\_date from  Contoh: `2023-08-15` |
| upper\_bound\_updated\_at | `string` | Isi seperti update\_date to  Contoh: `2023-08-15` |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

```
DATA STRUCTURE:
{ (1)
  *status_code: integer (2)
  *message: string (3)
  *page: integer (4)
  *total_page: integer (5)
  *data: [{ (6)
    *kode_satusehat: string (7)
    *kode_sarana: string (8)
    *nama: string (9)
    *telp: string (10)
    *email: string (11)
    *website: string (12)
    *longitude: string (13)
    *latitude: string (14)
    *operasional: boolean (15)
    *wilayah_perairan_darat: string (16)
    *wilayah_karakteristik: string (17)
    *sarana_administrasi: { (18)
      *kode: string (19)
      *nama: string (20)
      *kode_sarana: string (21)
      *status_aktif: boolean (22)
      *status_sarana: string (23)
    }
    *alamat: string (24)
    *provinsi: { (25)
      *kode: number (26)
      *nama: string (27)
      *kode_bps: string (28)
      *kode_lama: string (29)
    }
    *kabkota: { (30)
      *kode: number (31)
      *nama: string (32)
      *kode_bps: string (33)
      *kode_lama: string (34)
    }
    *jenis_sarana: { (35)
      *kode: string (36)
      *nama: string (37)
      *nama_alt: string (38)
    }
    *subjenis: { (39)
      *kode: string (40)
      *nama: string (41)
      *nama_alt: string (42)
    }
    *kelas_sarana: { (43)
      *kode: string (44)
      *nama: string (45)
    }
    *status_sarana: string (46)
    *status_aktif: boolean (47)
  }]
}
```

|  |  |
| --- | --- |
| **1** | Respon yang diterima berupa `object`. |
| **2** | Properti `status_code` bertipe `integer`, berisi informasi kode hasil respon yang diterima |
| **3** | Properti `message` bertipe `string`, berisi informasi hasil dari respon yang diterima |
| **4** | Properti `page` bertipe `integer`, berisi berapa baris halaman yang ingin ditampilkan |
| **5** | Properti `total_page` bertipe `integer`, total dari hasil pencarian |
| **6** | Properti `data` bertipe `array of objects`, bila kosong akan mengembalikan array kosong. Setiap object item berisi data FASYANKES (Rumah Sakit, Klinik, Puskesmas, Praktek Mandiri). |
| **7** | Properti `kode_satusehat` bertipe `string`, berisi informasi kode satu sehat (10 digit) |
| **8** | Properti `kode_sarana` bertipe `string`, berisi informasi kode FASYANKES |
| **9** | Properti `nama` bertipe `string`, berisi informasi nama FASYANKES |
| **10** | Properti `telp` bertipe `string`, berisi informasi nomer telepon FASYANKES |
| **11** | Properti `email` bertipe `string`, berisi informasi alamat *email* FASYANKES |
| **12** | Properti `website` bertipe `string`, berisi informasi *website* FASYANKES |
| **13** | Properti `longtitude` bertipe `string`, garis bujur contoh : 106.821810 |
| **14** | Properti `latitude` bertipe `string`, garis lintang contoh : -6.193125 |
| **15** | Properti `operasional` bertipe `boolean`, mengindikasikan apakah ada sarana FASYANKES beroperasi (*true*) atau tidak (*false*). |
| **16** | Properti `wilayah_perairan_darat` bertipe `string`, wilayah perairan darat |
| **17** | Properti `wilayah_karakteristik` bertipe `string`, wilayah karakteristik |
| **18** | Properti `sarana_administrasi` bertipe `object`, data sarana administrasi |
| **19** | Properti `kode` bertipe `string`, kode satusehat (10 digit) dari FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **20** | Properti `nama` bertipe `string`, nama FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **21** | Properti `kode_sarana` bertipe `string`, kode FASYANKES dari sumber data utama yang dinyatakan sebagai induk untuk administratif |
| **22** | Properti `status_aktif` bertipe `string`, status keaktifan dari FASYANKES (*true*) atau tidak (*false*) |
| **23** | Properti `status_sarana` bertipe `string`, status administrasi dari FASYANKES yang dinyatakan sebagai induk untuk administratif yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **24** | Properti `alamat` bertipe `string`, berisi informasi alamat FASYANKES |
| **25** | Properti `provinsi` bertipe `object`, berisi data letak provinsi FASYANKES |
| **26** | Properti `kode` bertipe `string`, berisi informasi kode dagri provinsi FASYANKES |
| **27** | Properti `nama` bertipe `string`, berisi informasi nama provinsi FASYANKES |
| **28** | Properti `kode_bps` bertipe `string`, kode BPS provinsi FASYANKES |
| **29** | Properti `kode_lama` bertipe `string`, kode dagri provinsi yang lama (sebelum pemekaran) FASYANKES |
| **30** | Properti `kabkota` bertipe `object`, berisi data letak kabupaten/kota sarana |
| **31** | Properti `kode` bertipe `string`, berisi informasi kode dagri kabupaten/kota |
| **32** | Properti `nama` bertipe `string` berisi informasi nama kabupaten/kota |
| **33** | Properti `kode_bps` bertipe `string`, kode BPS kabupaten kota FASYANKES |
| **34** | Properti `kode_lama` bertipe `string`, kode dagri kabupaten kota yang lama (sebelum pemekaran) FASYANKES |
| **35** | Properti `jenis_sarana` bertipe `object`, berisi data jenis sarana |
| **36** | Properti `kode` bertipe `string`, berisi informasi id jenis sarana |
| **37** | Properti `nama` bertipe `string` berisi informasi deskripsi atau nama dari jenis sarana |
| **38** | Properti `nama_alt` bertipe `string` berisi informasi nama alternatif dari jenis sarana |
| **39** | Properti `subjenis` bertipe `object`, berisi data sub-jenis sarana |
| **40** | Properti `kode` bertipe `string`, berisi informasi id sub-jenis sarana |
| **41** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari jenis sarana |
| **42** | Properti `nama_alt` bertipe `string`, berisi informasi nama alternatif dari jenis sarana |
| **43** | Properti `kelas_sarana` bertipe `object`, berisi data dari kelas sarana |
| **44** | Properti `kode` bertipe `string`, berisi informasi id kelas sarana |
| **45** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari kelas sarana |
| **46** | Properti `status_sarana` bertipe `string`, berisi informasi status administrasi dari FASYANKES yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **47** | Properti `status_aktif` bertipe `boolean`, berisi informasi dari status keaktifan sarana FASYANKES (*true*) atau tidak (*false*). |

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status_code": 200,
  "message": "Success",
  "page": 1,
  "total_page": 1503,
  "data": [
      {
          "kode_satusehat": "1000156689",
          "kode_sarana": "1230458",
          "nama": "Klinik TelkoMedika Health Center 19 Bogor",
          "telp": "082128617274_",
          "email": "[email protected]",
          "website": null,
          "longitude": null,
          "latitude": null,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": null,
          "sarana_administrasi": {
              "kode": null,
              "nama": null,
              "kode_sarana": null,
              "status_aktif": null,
              "status_sarana": null
          },
          "alamat": "Jl. Pengadilan No. 14, RT. 02/ RW. 01, Kelurahan Pabaton, Kecamatan Bogor Tengah, Kota Bogor",
          "provinsi": {
              "kode": "32",
              "nama": "Jawa Barat",
              "kode_bps": "32",
              "kode_lama": "32"
          },
          "kabkota": {
              "kode": "3271",
              "nama": "Kota Bogor",
              "kode_bps": "3271",
              "kode_lama": "3271"
          },
          "jenis_sarana": {
              "kode": "103",
              "nama": "Klinik",
              "nama_alt": "Klinik"
          },
          "subjenis": {
              "kode": "10301",
              "nama": "Klinik Pratama",
              "nama_alt": null
          },
          "kelas_sarana": {
              "kode": null,
              "nama": null
          },
          "status_sarana": "valid",
          "status_aktif": true
      },
      /* lompat beberapa data */
      {
          "kode_satusehat": "1000208262",
          "kode_sarana": "1232475",
          "nama": "Satria Namira Husada 49",
          "telp": "0811324033___",
          "email": "[email protected]",
          "website": null,
          "longitude": null,
          "latitude": null,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": null,
          "sarana_administrasi": {
              "kode": null,
              "nama": null,
              "kode_sarana": null,
              "status_aktif": null,
              "status_sarana": null
          },
          "alamat": "Jl. Raya Buduran No 337 Buduran Sidoarjo",
          "provinsi": {
              "kode": "35",
              "nama": "Jawa Timur",
              "kode_bps": "35",
              "kode_lama": "35"
          },
          "kabkota": {
              "kode": "3515",
              "nama": "Kab. Sidoarjo",
              "kode_bps": "3515",
              "kode_lama": "3515"
          },
          "jenis_sarana": {
              "kode": "103",
              "nama": "Klinik",
              "nama_alt": "Klinik"
          },
          "subjenis": {
              "kode": "10301",
              "nama": "Klinik Pratama",
              "nama_alt": null
          },
          "kelas_sarana": {
              "kode": null,
              "nama": null
          },
          "status_sarana": "valid",
          "status_aktif": true
      }
  ]
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "status_code": 400,
  "message": "limit cannot be more than 2000",
  "data": null
}
```

#### 5xx *Server Error* (`Content-Type: text/plain`)

Sistem akan mengembalikan pesan *error* bila terjadi kesalahan pada sisi server saat memproses data yang telah dikirimkan.

**Contoh Data**

```
Gateway Timeout
```

### Contoh Penggunaan/Kode

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

#### cURL (Windows)

```
curl --location ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana"
```

#### cURL (Linux)

```
curl --location \
  --header 'Authorization: Bearer {bearer_token}' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4.4. Master Sarana *Index* - PUSKESMAS

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
```

#### HTTP Verb/Method

```
GET
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |

#### Query String

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*limit` | `number` | Isi dengan nomor banyaknya barisan dalam 1 halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `*page` | `number` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `10`. |
| `*jenis_sarana` | `number` | Isi dengan kode jenis sarana. Kode unik yang ditetapkan untuk menentukan sarana fasyankes.  |  |  | | --- | --- | |  | 1. Rumah sakit (**`104`**) 2. Klinik (**`103`**) 3. PUSKESMAS (**`102`**) 4. Praktek mandiri (**`101`**) |  Contoh: `102`. |
| kode\_satusehat | `number` | Isi dengan nomer kode SATUSEHAT (10 digit)  Contoh: `1000201991`. |
| kode\_sarana | `string` | Isi dengan nomer kode fasyankes dari sumber data utama  Contoh: `1235959` |
| nama | `string` | Isi dengan nama fasyankes  Contoh: `pratama` |
| kode\_provinsi | `string` | Isi dengan nomer kode dagri provinsi (2 digit)  Contoh: `35` |
| kode\_kabkota | `string` | Isi dengan nomer kode dagri kabupaten / kota (4 digit)  Contoh: `3603` |
| kode\_kecamatan | `string` | Isi dengan nomer kode dagri kecamatan (6 digit)  Contoh: `350105` |
| status\_aktif | `string` | Isi dengan status aktif dari jenis sarana fasyankes `true` atau `false`  Contoh: `true` |
| status\_sarana | `string` | Isi dengan status verifikasi saranan (`draft`, `verified`, `valid`, `reverified`)  Contoh `verifed` |
| sumber\_identifier | `string` | Untuk mengisi identifier memilih sumber data yang diinginkan di bawah ini:  |  |  | | --- | --- | |  | 1. satset = Satu Sehat 2. dto\_msfi = DTO - MSFI 3. yankes\_praktik\_mandiri = Yankes - Praktik Mandiri 4. yankes\_klinik = Yankes - Klinik 5. yankes\_rs = Yankes - RS 6. puskesmas\_pusdatin\_baru = Puskesmas Pusdatin (Baru) 7. puskesmas\_pusdatin\_lama = Puskesmas Pusdatin (Lama) 8. sisdmk\_sarana = SISDMK Sarana 9. yankes\_praktik\_mandiri\_kmk = Yankes - Praktik Mandiri (KMK 2022) 10. yankes\_klinik\_kmk = Yankes - Klinik (KMK 2022) 11. yankes\_utd = Yankes - UTD 12. yankes\_utd\_kmk = Yankes - UTD (KMK 2022) 13. yankes\_labkes = Yankes - Labkes 14. yankes\_labkes\_kmk = Yankes - Labkes (KMK 2022) |  Misal, pilih sumber data dari SISDMK, gunakan kode identifier Contoh: `sisdmk_sarana`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| identifier\_kode\_sarana | `string` | Untuk mengisi kode identifier sarana, masukkan kode sarana pada sumber  Misal, kode sarana di sistem SISDMK, maka Contoh: `R3508055`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| lower\_bound\_updated\_at | `string` | Isi seperti update\_date from  Contoh: `2023-08-15` |
| upper\_bound\_updated\_at | `string` | Isi seperti update\_date to  Contoh: `2023-08-15` |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

```
DATA STRUCTURE:
{ (1)
  *status_code: integer (2)
  *message: string (3)
  *page: integer (4)
  *total_page: integer (5)
  *data: [{ (6)
    *kode_satusehat: string (7)
    *kode_sarana: string (8)
    *nama: string (9)
    *telp: string (10)
    *email: string (11)
    *website: string (12)
    *longitude: string (13)
    *latitude: string (14)
    *operasional: boolean (15)
    *wilayah_perairan_darat: string (16)
    *wilayah_karakteristik: string (17)
    *sarana_administrasi: { (18)
      *kode: string (19)
      *nama: string (20)
      *kode_sarana: string (21)
      *status_aktif: boolean (22)
      *status_sarana: string (23)
    }
    *alamat: string (24)
    *provinsi: { (25)
      *kode: number (26)
      *nama: string (27)
      *kode_bps: string (28)
      *kode_lama: string (29)
    }
    *kabkota: { (30)
      *kode: number (31)
      *nama: string (32)
      *kode_bps: string (33)
      *kode_lama: string (34)
    }
    *jenis_sarana: { (35)
      *kode: string (36)
      *nama: string (37)
      *nama_alt: string (38)
    }
    *subjenis: { (39)
      *kode: string (40)
      *nama: string (41)
      *nama_alt: string (42)
    }
    *kelas_sarana: { (43)
      *kode: string (44)
      *nama: string (45)
    }
    *status_sarana: string (46)
    *status_aktif: boolean (47)
  }]
}
```

|  |  |
| --- | --- |
| **1** | Respon yang diterima berupa `object`. |
| **2** | Properti `status_code` bertipe `integer`, berisi informasi kode hasil respon yang diterima |
| **3** | Properti `message` bertipe `string`, berisi informasi hasil dari respon yang diterima |
| **4** | Properti `page` bertipe `integer`, berisi berapa baris halaman yang ingin ditampilkan |
| **5** | Properti `total_page` bertipe `integer`, total dari hasil pencarian |
| **6** | Properti `data` bertipe `array of objects`, bila kosong akan mengembalikan array kosong. Setiap object item berisi data FASYANKES (Rumah Sakit, Klinik, Puskesmas, Praktek Mandiri). |
| **7** | Properti `kode_satusehat` bertipe `string`, berisi informasi kode satu sehat (10 digit) |
| **8** | Properti `kode_sarana` bertipe `string`, berisi informasi kode FASYANKES |
| **9** | Properti `nama` bertipe `string`, berisi informasi nama FASYANKES |
| **10** | Properti `telp` bertipe `string`, berisi informasi nomer telepon FASYANKES |
| **11** | Properti `email` bertipe `string`, berisi informasi alamat *email* FASYANKES |
| **12** | Properti `website` bertipe `string`, berisi informasi *website* FASYANKES |
| **13** | Properti `longtitude` bertipe `string`, garis bujur contoh : 106.821810 |
| **14** | Properti `latitude` bertipe `string`, garis lintang contoh : -6.193125 |
| **15** | Properti `operasional` bertipe `boolean`, mengindikasikan apakah ada sarana FASYANKES beroperasi (*true*) atau tidak (*false*). |
| **16** | Properti `wilayah_perairan_darat` bertipe `string`, wilayah perairan darat |
| **17** | Properti `wilayah_karakteristik` bertipe `string`, wilayah karakteristik |
| **18** | Properti `sarana_administrasi` bertipe `object`, data sarana administrasi |
| **19** | Properti `kode` bertipe `string`, kode satusehat (10 digit) dari FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **20** | Properti `nama` bertipe `string`, nama FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **21** | Properti `kode_sarana` bertipe `string`, kode FASYANKES dari sumber data utama yang dinyatakan sebagai induk untuk administratif |
| **22** | Properti `status_aktif` bertipe `string`, status keaktifan dari FASYANKES (*true*) atau tidak (*false*) |
| **23** | Properti `status_sarana` bertipe `string`, status administrasi dari FASYANKES yang dinyatakan sebagai induk untuk administratif yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **24** | Properti `alamat` bertipe `string`, berisi informasi alamat FASYANKES |
| **25** | Properti `provinsi` bertipe `object`, berisi data letak provinsi FASYANKES |
| **26** | Properti `kode` bertipe `string`, berisi informasi kode dagri provinsi FASYANKES |
| **27** | Properti `nama` bertipe `string`, berisi informasi nama provinsi FASYANKES |
| **28** | Properti `kode_bps` bertipe `string`, kode BPS provinsi FASYANKES |
| **29** | Properti `kode_lama` bertipe `string`, kode dagri provinsi yang lama (sebelum pemekaran) FASYANKES |
| **30** | Properti `kabkota` bertipe `object`, berisi data letak kabupaten/kota sarana |
| **31** | Properti `kode` bertipe `string`, berisi informasi kode dagri kabupaten/kota |
| **32** | Properti `nama` bertipe `string` berisi informasi nama kabupaten/kota |
| **33** | Properti `kode_bps` bertipe `string`, kode BPS kabupaten kota FASYANKES |
| **34** | Properti `kode_lama` bertipe `string`, kode dagri kabupaten kota yang lama (sebelum pemekaran) FASYANKES |
| **35** | Properti `jenis_sarana` bertipe `object`, berisi data jenis sarana |
| **36** | Properti `kode` bertipe `string`, berisi informasi id jenis sarana |
| **37** | Properti `nama` bertipe `string` berisi informasi deskripsi atau nama dari jenis sarana |
| **38** | Properti `nama_alt` bertipe `string` berisi informasi nama alternatif dari jenis sarana |
| **39** | Properti `subjenis` bertipe `object`, berisi data sub-jenis sarana |
| **40** | Properti `kode` bertipe `string`, berisi informasi id sub-jenis sarana |
| **41** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari jenis sarana |
| **42** | Properti `nama_alt` bertipe `string`, berisi informasi nama alternatif dari jenis sarana |
| **43** | Properti `kelas_sarana` bertipe `object`, berisi data dari kelas sarana |
| **44** | Properti `kode` bertipe `string`, berisi informasi id kelas sarana |
| **45** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari kelas sarana |
| **46** | Properti `status_sarana` bertipe `string`, berisi informasi status administrasi dari FASYANKES yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **47** | Properti `status_aktif` bertipe `boolean`, berisi informasi dari status keaktifan sarana FASYANKES (*true*) atau tidak (*false*). |

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status_code": 200,
  "message": "Success",
  "page": 1,
  "total_page": 1045,
  "data": [
      {
          "kode_satusehat": "1000112243",
          "kode_sarana": "1070266",
          "nama": "TOMADEA MALEI",
          "telp": null,
          "email": null,
          "website": null,
          "longitude": -0.10839,
          "latitude": 119.71305,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": "sangat_terpencil",
          "sarana_administrasi": {
              "kode": null,
              "nama": null,
              "kode_sarana": null,
              "status_aktif": null,
              "status_sarana": null
          },
          "alamat": "JL. Kesehatan Ds. Malei, Kec. Balaesang Tanjung, 94355",
          "provinsi": {
              "kode": "72",
              "nama": "Sulawesi Tengah",
              "kode_bps": "72",
              "kode_lama": "72"
          },
          "kabkota": {
              "kode": "7203",
              "nama": "Kab. Donggala",
              "kode_bps": "7205",
              "kode_lama": "7203"
          },
          "jenis_sarana": {
              "kode": "102",
              "nama": "Pusat Kesehatan Masyarakat",
              "nama_alt": "Puskesmas"
          },
          "subjenis": {
              "kode": "10201",
              "nama": "Puskesmas Perawatan (Rawat Inap)",
              "nama_alt": null
          },
          "kelas_sarana": {
              "kode": null,
              "nama": null
          },
          "status_sarana": "valid",
          "status_aktif": true
      },
      /* lompat beberapa data */
      {
          "kode_satusehat": "1000107157",
          "kode_sarana": "1030465",
          "nama": "JAMPANG TENGAH",
          "telp": "0266 6465009 - 081210353412",
          "email": null,
          "website": null,
          "longitude": 106.79913,
          "latitude": -7.05783,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": "perdesaan",
          "sarana_administrasi": {
              "kode": null,
              "nama": null,
              "kode_sarana": null,
              "status_aktif": null,
              "status_sarana": null
          },
          "alamat": "Jl. Raya Bojonglopang RT 05 RW 02 Desa Jampangtengah Kecamatan Jampangtengah",
          "provinsi": {
              "kode": "32",
              "nama": "Jawa Barat",
              "kode_bps": "32",
              "kode_lama": "32"
          },
          "kabkota": {
              "kode": "3202",
              "nama": "Kab. Sukabumi",
              "kode_bps": "3202",
              "kode_lama": "3202"
          },
          "jenis_sarana": {
              "kode": "102",
              "nama": "Pusat Kesehatan Masyarakat",
              "nama_alt": "Puskesmas"
          },
          "subjenis": {
              "kode": "10201",
              "nama": "Puskesmas Perawatan (Rawat Inap)",
              "nama_alt": null
          },
          "kelas_sarana": {
              "kode": null,
              "nama": null
          },
          "status_sarana": "valid",
          "status_aktif": true
      }
  ]
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "status_code": 400,
  "message": "limit cannot be more than 2000",
  "data": null
}
```

#### 5xx *Server Error* (`Content-Type: text/plain`)

Sistem akan mengembalikan pesan *error* bila terjadi kesalahan pada sisi server saat memproses data yang telah dikirimkan.

**Contoh Data**

```
Gateway Timeout
```

### Contoh Penggunaan/Kode

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

#### cURL (Windows)

```
curl --location ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana"
```

#### cURL (Linux)

```
curl --location \
  --header 'Authorization: Bearer {bearer_token}' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4.5. Master Sarana *Index* - Praktik Mandiri

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
```

#### HTTP Verb/Method

```
GET
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |

#### Query String

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*limit` | `number` | Isi dengan nomor banyaknya barisan dalam 1 halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `*page` | `number` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `10`. |
| `*jenis_sarana` | `number` | Isi dengan kode jenis sarana. Kode unik yang ditetapkan untuk menentukan sarana fasyankes.  |  |  | | --- | --- | |  | 1. Rumah sakit (**`104`**) 2. Klinik (**`103`**) 3. PUSKESMAS (**`102`**) 4. Praktek mandiri (**`101`**) |  Contoh: `101`. |
| kode\_satusehat | `number` | Isi dengan nomer kode SATUSEHAT (10 digit)  Contoh: `1000201991`. |
| kode\_sarana | `string` | Isi dengan nomer kode fasyankes dari sumber data utama  Contoh: `1235959` |
| nama | `string` | Isi dengan nama fasyankes  Contoh: `pratama` |
| kode\_provinsi | `string` | Isi dengan nomer kode dagri provinsi (2 digit)  Contoh: `35` |
| kode\_kabkota | `string` | Isi dengan nomer kode dagri kabupaten / kota (4 digit)  Contoh: `3603` |
| kode\_kecamatan | `string` | Isi dengan nomer kode dagri kecamatan (6 digit)  Contoh: `350105` |
| status\_aktif | `string` | Isi dengan status aktif dari jenis sarana fasyankes `true` atau `false`  Contoh: `true` |
| status\_sarana | `string` | Isi dengan status verifikasi saranan (`draft`, `verified`, `valid`, `reverified`)  Contoh `verifed` |
| sumber\_identifier | `string` | Untuk mengisi identifier memilih sumber data yang diinginkan di bawah ini:  |  |  | | --- | --- | |  | 1. satset = Satu Sehat 2. dto\_msfi = DTO - MSFI 3. yankes\_praktik\_mandiri = Yankes - Praktik Mandiri 4. yankes\_klinik = Yankes - Klinik 5. yankes\_rs = Yankes - RS 6. puskesmas\_pusdatin\_baru = Puskesmas Pusdatin (Baru) 7. puskesmas\_pusdatin\_lama = Puskesmas Pusdatin (Lama) 8. sisdmk\_sarana = SISDMK Sarana 9. yankes\_praktik\_mandiri\_kmk = Yankes - Praktik Mandiri (KMK 2022) 10. yankes\_klinik\_kmk = Yankes - Klinik (KMK 2022) 11. yankes\_utd = Yankes - UTD 12. yankes\_utd\_kmk = Yankes - UTD (KMK 2022) 13. yankes\_labkes = Yankes - Labkes 14. yankes\_labkes\_kmk = Yankes - Labkes (KMK 2022) |  Misal, pilih sumber data dari SISDMK, gunakan kode identifier Contoh: `sisdmk_sarana`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| identifier\_kode\_sarana | `string` | Untuk mengisi kode identifier sarana, masukkan kode sarana pada sumber  Misal, kode sarana di sistem SISDMK, maka Contoh: `R3508055`  |  |  | | --- | --- | |  | Apabila menggunakan `sumber_identifier` dan `identifier_kode_sarana`, maka paramater `sumber_identifier` dan `identifier_kode_sarana` menjadi penting. | |
| lower\_bound\_updated\_at | `string` | Isi seperti update\_date from  Contoh: `2023-08-15` |
| upper\_bound\_updated\_at | `string` | Isi seperti update\_date to  Contoh: `2023-08-15` |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

```
DATA STRUCTURE:
{ (1)
  *status_code: integer (2)
  *message: string (3)
  *page: integer (4)
  *total_page: integer (5)
  *data: [{ (6)
    *kode_satusehat: string (7)
    *kode_sarana: string (8)
    *nama: string (9)
    *telp: string (10)
    *email: string (11)
    *website: string (12)
    *longitude: string (13)
    *latitude: string (14)
    *operasional: boolean (15)
    *wilayah_perairan_darat: string (16)
    *wilayah_karakteristik: string (17)
    *sarana_administrasi: { (18)
      *kode: string (19)
      *nama: string (20)
      *kode_sarana: string (21)
      *status_aktif: boolean (22)
      *status_sarana: string (23)
    }
    *alamat: string (24)
    *provinsi: { (25)
      *kode: number (26)
      *nama: string (27)
      *kode_bps: string (28)
      *kode_lama: string (29)
    }
    *kabkota: { (30)
      *kode: number (31)
      *nama: string (32)
      *kode_bps: string (33)
      *kode_lama: string (34)
    }
    *jenis_sarana: { (35)
      *kode: string (36)
      *nama: string (37)
      *nama_alt: string (38)
    }
    *subjenis: { (39)
      *kode: string (40)
      *nama: string (41)
      *nama_alt: string (42)
    }
    *kelas_sarana: { (43)
      *kode: string (44)
      *nama: string (45)
    }
    *status_sarana: string (46)
    *status_aktif: boolean (47)
  }]
}
```

|  |  |
| --- | --- |
| **1** | Respon yang diterima berupa `object`. |
| **2** | Properti `status_code` bertipe `integer`, berisi informasi kode hasil respon yang diterima |
| **3** | Properti `message` bertipe `string`, berisi informasi hasil dari respon yang diterima |
| **4** | Properti `page` bertipe `integer`, berisi berapa baris halaman yang ingin ditampilkan |
| **5** | Properti `total_page` bertipe `integer`, total dari hasil pencarian |
| **6** | Properti `data` bertipe `array of objects`, bila kosong akan mengembalikan array kosong. Setiap object item berisi data FASYANKES (Rumah Sakit, Klinik, Puskesmas, Praktek Mandiri). |
| **7** | Properti `kode_satusehat` bertipe `string`, berisi informasi kode satu sehat (10 digit) |
| **8** | Properti `kode_sarana` bertipe `string`, berisi informasi kode FASYANKES |
| **9** | Properti `nama` bertipe `string`, berisi informasi nama FASYANKES |
| **10** | Properti `telp` bertipe `string`, berisi informasi nomer telepon FASYANKES |
| **11** | Properti `email` bertipe `string`, berisi informasi alamat *email* FASYANKES |
| **12** | Properti `website` bertipe `string`, berisi informasi *website* FASYANKES |
| **13** | Properti `longtitude` bertipe `string`, garis bujur contoh : 106.821810 |
| **14** | Properti `latitude` bertipe `string`, garis lintang contoh : -6.193125 |
| **15** | Properti `operasional` bertipe `boolean`, mengindikasikan apakah ada sarana FASYANKES beroperasi (*true*) atau tidak (*false*). |
| **16** | Properti `wilayah_perairan_darat` bertipe `string`, wilayah perairan darat |
| **17** | Properti `wilayah_karakteristik` bertipe `string`, wilayah karakteristik |
| **18** | Properti `sarana_administrasi` bertipe `object`, data sarana administrasi |
| **19** | Properti `kode` bertipe `string`, kode satusehat (10 digit) dari FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **20** | Properti `nama` bertipe `string`, nama FASYANKES yang dinyatakan sebagai induk untuk administratif |
| **21** | Properti `kode_sarana` bertipe `string`, kode FASYANKES dari sumber data utama yang dinyatakan sebagai induk untuk administratif |
| **22** | Properti `status_aktif` bertipe `string`, status keaktifan dari FASYANKES (*true*) atau tidak (*false*) |
| **23** | Properti `status_sarana` bertipe `string`, status administrasi dari FASYANKES yang dinyatakan sebagai induk untuk administratif yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **24** | Properti `alamat` bertipe `string`, berisi informasi alamat FASYANKES |
| **25** | Properti `provinsi` bertipe `object`, berisi data letak provinsi FASYANKES |
| **26** | Properti `kode` bertipe `string`, berisi informasi kode dagri provinsi FASYANKES |
| **27** | Properti `nama` bertipe `string`, berisi informasi nama provinsi FASYANKES |
| **28** | Properti `kode_bps` bertipe `string`, kode BPS provinsi FASYANKES |
| **29** | Properti `kode_lama` bertipe `string`, kode dagri provinsi yang lama (sebelum pemekaran) FASYANKES |
| **30** | Properti `kabkota` bertipe `object`, berisi data letak kabupaten/kota sarana |
| **31** | Properti `kode` bertipe `string`, berisi informasi kode dagri kabupaten/kota |
| **32** | Properti `nama` bertipe `string` berisi informasi nama kabupaten/kota |
| **33** | Properti `kode_bps` bertipe `string`, kode BPS kabupaten kota FASYANKES |
| **34** | Properti `kode_lama` bertipe `string`, kode dagri kabupaten kota yang lama (sebelum pemekaran) FASYANKES |
| **35** | Properti `jenis_sarana` bertipe `object`, berisi data jenis sarana |
| **36** | Properti `kode` bertipe `string`, berisi informasi id jenis sarana |
| **37** | Properti `nama` bertipe `string` berisi informasi deskripsi atau nama dari jenis sarana |
| **38** | Properti `nama_alt` bertipe `string` berisi informasi nama alternatif dari jenis sarana |
| **39** | Properti `subjenis` bertipe `object`, berisi data sub-jenis sarana |
| **40** | Properti `kode` bertipe `string`, berisi informasi id sub-jenis sarana |
| **41** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari jenis sarana |
| **42** | Properti `nama_alt` bertipe `string`, berisi informasi nama alternatif dari jenis sarana |
| **43** | Properti `kelas_sarana` bertipe `object`, berisi data dari kelas sarana |
| **44** | Properti `kode` bertipe `string`, berisi informasi id kelas sarana |
| **45** | Properti `nama` bertipe `string`, berisi informasi deskripsi atau nama dari kelas sarana |
| **46** | Properti `status_sarana` bertipe `string`, berisi informasi status administrasi dari FASYANKES yang diisi ***draft***, ***review***, ***verified***, atau ***valid*** |
| **47** | Properti `status_aktif` bertipe `boolean`, berisi informasi dari status keaktifan sarana FASYANKES (*true*) atau tidak (*false*). |

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status_code": 200,
  "message": "Success",
  "page": 1,
  "total_page": 1488,
  "data": [
      {
          "kode_satusehat": "1000556982",
          "kode_sarana": "64740100009",
          "nama": "Praktek Mandiri Dokter Gigi Maria Lidwina Hendrata",
          "telp": "054822394",
          "email": "[email protected]",
          "website": null,
          "longitude": null,
          "latitude": null,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": null,
          "sarana_administrasi": {
              "kode": "1000088325",
              "nama": "BONTANG BARAT",
              "kode_sarana": "1060837",
              "status_aktif": true,
              "status_sarana": "valid"
          },
          "alamat": "Jl. M. Efendi AAA no 5 BTN PKT, RT. 36, kelurahan Belimbing, kecamatan Bontang Barat, Bontang",
          "provinsi": {
              "kode": "64",
              "nama": "Kalimantan Timur",
              "kode_bps": "64",
              "kode_lama": "64"
          },
          "kabkota": {
              "kode": "6474",
              "nama": "Kota Bontang",
              "kode_bps": "6474",
              "kode_lama": "6474"
          },
          "jenis_sarana": {
              "kode": "101",
              "nama": "Tempat Praktik Mandiri Tenaga Kesehatan",
              "nama_alt": "Praktik Mandiri"
          },
          "subjenis": {
              "kode": null,
              "nama": null,
              "nama_alt": null
          },
          "kelas_sarana": {
              "kode": null,
              "nama": null
          },
          "status_sarana": "valid",
          "status_aktif": true
        },
        /* lompat beberapa data */
        {
          "kode_satusehat": "1000001107",
          "kode_sarana": "51010100013",
          "nama": "PRAKTIK MANDIRI DOKTER Ni Made Budi Kusuma Wati",
          "telp": "082145868081",
          "email": "[email protected]",
          "website": null,
          "longitude": null,
          "latitude": null,
          "operasional": true,
          "wilayah_perairan_darat": null,
          "wilayah_karakteristik": null,
          "sarana_administrasi": {
              "kode": "1000049642",
              "nama": "I MELAYA",
              "kode_sarana": "1050002",
              "status_aktif": true,
              "status_sarana": "valid"
          },
          "alamat": "Dsn. Sumber Sari, Ds Melaya, Kec. Melaya, Kab.  Jembrana",
          "provinsi": {
              "kode": "51",
              "nama": "Bali",
              "kode_bps": "51",
              "kode_lama": "51"
          },
          "kabkota": {
              "kode": "5101",
              "nama": "Kab. Jembrana",
              "kode_bps": "5101",
              "kode_lama": "5101"
          },
          "jenis_sarana": {
              "kode": "101",
              "nama": "Tempat Praktik Mandiri Tenaga Kesehatan",
              "nama_alt": "Praktik Mandiri"
          },
          "subjenis": {
              "kode": null,
              "nama": null,
              "nama_alt": null
          },
          "kelas_sarana": {
              "kode": null,
              "nama": null
          },
          "status_sarana": "valid",
          "status_aktif": true
      }
  ]
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "status_code": 400,
  "message": "limit cannot be more than 2000",
  "data": null
}
```

#### 5xx *Server Error* (`Content-Type: text/plain`)

Sistem akan mengembalikan pesan *error* bila terjadi kesalahan pada sisi server saat memproses data yang telah dikirimkan.

**Contoh Data**

```
Gateway Timeout
```

### Contoh Penggunaan/Kode

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

#### cURL (Windows)

```
curl --location ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana"
```

#### cURL (Linux)

```
curl --location \
  --header 'Authorization: Bearer {bearer_token}' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/mastersaranaindex/mastersarana
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 5. Unduh Dokumen

Di samping adanya dokumentasi secara umum terkait Master Sarana Index (MSI), maka diperlukan satu dokumentasi khusus yang membahas semua ReST API yang disediakan oleh Master Sarana Index (MSI) yang dikembangkan oleh tim *developer* **Kementerian Kesehatan Republik Indonesia**. Dokumentasi ReST API Master Sarana Index (MSI) ini berisi spesifikasi teknis ReST API tersebut mencakup parameter yang tersedia, contoh *request*, contoh hasil *response*, penjelasan dari kode status HTTP yang mungkin diterima, serta cara penggunaannya menggunakan cURL dan Postman.

### Dokumentasi Teknis SATUSEHAT Master Sarana Index (MSI) ReST API

Unduh
