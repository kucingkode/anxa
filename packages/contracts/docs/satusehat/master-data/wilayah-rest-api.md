> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-wilayah/rest-api-wilayah/

---

# ReST API

## 1. Autentikasi

Untuk melakukan transaksi data dari Master Wilayah, perlu dilakukan proses autentikasi terlebih dahulu agar mendapatkan akses yang tersedia. Autentikasi yang digunakan oleh Master Wilayah mengikuti standar protokol OAuth 2 dengan tipe pemberian akses (*grant type*) adalah `client_credentials`.

Autentikasi menggunakan *grant type* `client_credentials` adalah proses autentikasi yang dilakukan antara *server to server*, sehingga tidak ada proses registrasi atau *log in* di sini. Autentikasi dengan tipe tersebut hanya memerlukan data berupa `client_id` dan `client_server`, dimana nilai tersebut didapatkan ketika pihak yang ingin menggunakan atau mengakses Wilayah ini telah melakukan pengajuan, terdaftar, serta mendapatkan persetujuan dari **Kementerian Kesehatan Republik Indonesia**.

Cara Mendapatkan Nilai dari `client_id` dan `client_secret`

Pastikan sistem RME fasyankes telah terverifikasi di SATUSEHAT Platform (SSP) dan fasyankes sudah melakukan proses pemutakhiran data di aplikasi DFO/REGFASYANKES/RS ONLINE. Untuk informasi lebih lanjut dapat dilihat pada Panduan Registrasi.

|  |  |
| --- | --- |
|  | **Berikut ini ketentuan Kode Akses API:**  1. **Client ID** (**Client Secret**) hanya dapat digunakan oleh 1 **Organization ID**. 2. Terdapat validasi apabila **Client ID** (**Client Secret**) mengirimkan data **Organization ID** yang berbeda. *Response error* sebagai berikut:  ```    "text": "resource cannot be accessed due to business rule"    ``` 3. Kode Akses API bersifat **RAHASIA** di mana unik, personal, dan khusus disediakan hanya untuk Partner Interoperabilitas SATUSEHAT yang telah terverifikasi di SATUSEHAT Platform (SSP). 4. Partner Interoperabilitas SATUSEHAT, **DILARANG** menduplikasi, mempublikasi, dan/atau mendistribusikan dalam bentuk apapun, sebagian/keseluruhan informasi kode akses API kepada pihak yang tidak sah dan tidak berkepentingan. |

|  |  |
| --- | --- |
|  | Setiap teks yang berwarna **biru muda**, dapat diklik untuk melompat ke bagian yang direferensikan. |

Pada bagian ini akan dijelaskan spesifikasi untuk **ReST API Master Wilayah**, yang mempunyai *endpoint* berdasarkan jenis lingkungan pengembangannya (*development environment*) yaitu:

**Autentikasi**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1
* **Production**: https://api-satusehat.kemkes.go.id/oauth2/v1

**API Master Wilayah Versi 1**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1
* **Production**: https://api-satusehat.kemkes.go.id/masterdata/v1

**API Master Wilayah Versi 2**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2
* **Production**: https://api-satusehat.kemkes.go.id/masterdata/v2

|  |  |
| --- | --- |
|  | Semua penerapan, penjelasan, dan contoh yang akan dibahas akan menggunakan *environment sandbox*. |

|  |  |
| --- | --- |
|  | Untuk melakukan beberapa *request* ke ReST API SATUSEHAT yang akan dijelaskan atau dicontohkan di bagian ini, **WAJIB** melakukan proses autentikasi terlebih dahulu.  Setiap *request* diperlukan sebuah nilai token bertipe `Bearer` yang akan dimasukkan pada *header* `Authorization: Bearer <access_token>`.  Nilai `<access_token>` didapatkan dari properti `access_token` dari hasil *response* yang secara detail dijelaskan di artikel terkait **Akses Token**. |

## 2. *Postman Collection*

Silakan mengunduh *Postman Collection* untuk melihat contoh/melakukan workshop secara mandiri pada website *Postman Collection* Wilayah melalui web *browser* Anda.

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

## 4. API Master Wilayah Versi 1

## 4.1. Master Wilayah - Provinsi

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/provinces?codes
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
| `*codes` | `number` | Isi dengan kode provinsi berdasarkan kode wilayah dari Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `11, 12`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "data": [
      {
          "code": "11",
          "parent_code": "",
          "bps_code": "11",
          "name": "Aceh"
      },
      /* lompat beberapa data */
      {
          "code": "96",
          "parent_code": "",
          "bps_code": "",
          "name": "Papua Barat Daya"
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
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/provinces?codes"
```

#### cURL (Linux)

```
curl --location \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/provinces?codes'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/provinces?codes
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4.2. Master Wilayah - Kota/Kabupaten

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/cities?province_codes
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
| `*province_codes` | `number` | Isi dengan Kode provinsi berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `11, 12`. |
| `codes` | `number` | Isi dengan Kode kabupaten/kota berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `1103,1104, 1210`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "data": [
      {
          "code": "1103",
          "parent_code": "11",
          "bps_code": "1105",
          "name": "Kab. Aceh Timur"
      },
      /* lompat beberapa data */
      {
          "code": "1210",
          "parent_code": "12",
          "bps_code": "1207",
          "name": "Kab. Labuhanbatu"
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
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/cities?province_codes"
```

#### cURL (Linux)

```
curl --location \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/cities?province_codes'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/cities?province_codes
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4.3. Master Wilayah - Kecamatan

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/districts?city_codes
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
| `*city_codes` | `number` | Isi dengan Kode kabupaten/kota berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `1103, 1104`. |
| `codes` | `number` | Isi dengan Kode kecamatan berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `110302, 110301`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "data": [
      {
          "code": "110301",
          "parent_code": "1103",
          "bps_code": "1105140",
          "name": "Darul Aman"
      },
      /* lompat beberapa data */
      {
          "code": "110421",
          "parent_code": "1104",
          "bps_code": "1106063",
          "name": "Rusip Antara"
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
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/districts?city_codes"
```

#### cURL (Linux)

```
curl --location \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/districts?city_codes'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/districts?city_codes
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4.4. Master Wilayah - Kelurahan/Desa

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/sub-districts?district_codes
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
| `*district_codes` | `number` | Isi dengan Kode kecamatan berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `110301, 110302`. |
| `*codes` | `number` | Isi dengan Kode kelurahan/desa berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `1103012002, 1103012004 ,1103022004`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "data": [
      {
          "code": "1103012002",
          "parent_code": "110301",
          "bps_code": "1105140007",
          "name": "Alue Luddin Dua"
      },
      /* lompat beberapa data */
      {
          "code": "1103022035",
          "parent_code": "110302",
          "bps_code": "1105160013",
          "name": "Buket Makmu"
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
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/sub-districts?district_codes"
```

#### cURL (Linux)

```
curl --location \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/sub-districts?district_codes'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v1/sub-districts?district_codes
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 5. API Master Wilayah Versi 2

## 5.5. Master Wilayah - Provinsi

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/provinces?current_page
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
| `*current_page` | `number` | Isi dengan halaman yang dituju.  Contoh: `1`. |
| `next` | `number` | Isi dengan halaman selanjutnya. Dapat dilihat pada response di dalam objek meta  Contoh: `MTI=`. |
| `prev` | `number` | Isi dengan halaman sebelumnya. Dapat dilihat pada response di dalam objek meta  Contoh: `MTE=`. |
| `codes` | `number` | Isi dengan Kode provinsi berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `11`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "data": [
      {
          "code": "11",
          "parent_code": "",
          "bps_code": "11",
          "name": "Aceh"
      },
      {
          "code": "12",
          "parent_code": "",
          "bps_code": "12",
          "name": "Sumatera Utara"
      }
  ],
  "meta": {
      "item_count": 2,
      "page": {
          "is_cursor": true,
          "current": 1,
          "previous": 0,
          "next": 2,
          "limit": 10,
          "total_page": 1,
          "total": 2
      },
      "cursors": {
          "next": "MTI=",
          "previous": "MTE="
      }
  }
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
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/provinces?current_page"
```

#### cURL (Linux)

```
curl --location \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/provinces?current_page'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/provinces?current_page
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 5.6. Master Wilayah - Kota/Kabupaten

|  |  |
| --- | --- |
|  | Master Sarana Index - Multi Sarana digunakan apabila ingin menampilkan data `jenis_sarana` lebih dari satu. |

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/cities?current_page
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
| `*current_page` | `number` | Isi dengan halaman yang dituju.  Contoh: `1`. |
| `next` | `number` | Isi dengan halaman selanjutnya. Dapat dilihat pada response di dalam objek meta  Contoh: `MTExMA==`. |
| `prev` | `number` | Isi dengan halaman sebelumnya. Dapat dilihat pada response di dalam objek meta  Contoh: `MTEwMQ==`. |
| `province_codes` | `number` | Isi dengan Kode provinsi berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `11`. |
| `codes` | `number` | Isi dengan Kode kabupaten/kota berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `1103,1104, 1210`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "data": [
      {
          "code": "1105",
          "parent_code": "11",
          "bps_code": "1107",
          "name": "Kab. Aceh Barat"
      },
      /* lompat beberapa data */
      {
          "code": "1109",
          "parent_code": "11",
          "bps_code": "1101",
          "name": "Kab. Simeulue"
      }
  ],
  "meta": {
      "item_count": 10,
      "page": {
          "is_cursor": true,
          "current": 1,
          "previous": 0,
          "next": 2,
          "limit": 10,
          "total_page": 51,
          "total": 514
      },
      "cursors": {
          "next": "MTExMA==",
          "previous": "MTEwMQ=="
      }
  }
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
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/cities?current_page"
```

#### cURL (Linux)

```
curl --location \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/cities?current_page'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/cities?current_page
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 5.7. Master Wilayah - Kecamatan

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/districts?current_page
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
| `*current_page` | `number` | Isi dengan halaman yang dituju.  Contoh: `110302, 110301`. |
| `next` | `number` | Isi dengan halaman selanjutnya. Dapat dilihat pada response di dalam objek meta  Contoh: `MTEwMTEw`. |
| `prev` | `number` | Isi dengan halaman sebelumnya. Dapat dilihat pada response di dalam objek meta  Contoh: `MTEwMTAx`. |
| `city_codes` | `number` | Isi dengan Kode kabupaten/kota berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `1103, 1104`. |
| `codes` | `number` | Isi dengan Kode kecamatan berdasarkan Kode Kemendagri. (dapat di-*input* multi dengan menyertakan koma)  Contoh: `110302, 110301`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "data": [
      {
          "code": "110101",
          "parent_code": "1101",
          "bps_code": "1103020",
          "name": "Bakongan"
      },
      /* lompat beberapa data */
      {
          "code": "110109",
          "parent_code": "1101",
          "bps_code": "1103010",
          "name": "Trumon"
      }
  ],
  "meta": {
      "item_count": 10,
      "page": {
          "is_cursor": true,
          "current": 1,
          "previous": 0,
          "next": 2,
          "limit": 10,
          "total_page": 727,
          "total": 7277
      },
      "cursors": {
          "next": "MTEwMTEw",
          "previous": "MTEwMTAx"
      }
  }
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
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/districts?current_page"
```

#### cURL (Linux)

```
curl --location \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/districts?current_page'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/districts?current_page
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 5.8. Master Wilayah - Kelurahan/Desa

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/sub-districts?current_page
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
| `*current_page` | `number` | Isi dengan halaman yang dituju.  Contoh: `1`. |
| `next` | `number` | Isi dengan halaman selanjutnya. Dapat dilihat pada response di dalam objek meta  Contoh: `MTEwMTAyMjAwMw==`. |
| `prev` | `number` | Isi dengan halaman sebelumnya. Dapat dilihat pada response di dalam objek meta  Contoh: `MTEwMTAxMjAwMQ==`. |
| `district_codes` | `number` | Isi dengan Kode kecamatan berdasarkan Kode Kemendagri (dapat di-*input* multi dengan menyertakan koma)  Contoh: `{qs-coddistrictses}`. |
| `codes` | `number` | Isi dengan Kode kelurahan/desa berdasarkan Kode Kemendagri (dapat di-*input* multi dengan menyertakan koma)  Contoh: `1103012002, 1103012004 ,1103022004`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

##### Struktur Data

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "data": [
      {
          "code": "1101012015",
          "parent_code": "110101",
          "bps_code": "1103020023",
          "name": "Darul Ikhsan"
      },
      /* lompat beberapa data */
      {
          "code": "1101012003",
          "parent_code": "110101",
          "bps_code": "1103020014",
          "name": "Ujong Padang"
      }
  ],
  "meta": {
      "item_count": 10,
      "page": {
          "is_cursor": true,
          "current": 1,
          "previous": 0,
          "next": 2,
          "limit": 10,
          "total_page": 8377,
          "total": 83772
      },
      "cursors": {
          "next": "MTEwMTAyMjAwMw==",
          "previous": "MTEwMTAxMjAwMQ=="
      }
  }
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
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/sub-districts?current_page"
```

#### cURL (Linux)

```
curl --location \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/sub-districts?current_page'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v2/sub-districts?current_page
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 6. Unduh Dokumen

Di samping adanya dokumentasi secara umum terkait Master Wilayah, maka diperlukan satu dokumentasi khusus yang membahas semua ReST API yang disediakan oleh Master Wilayah yang dikembangkan oleh tim *developer* **Kementerian Kesehatan Republik Indonesia**. Dokumentasi ReST API Master Wilayah ini berisi spesifikasi teknis ReST API tersebut mencakup parameter yang tersedia, contoh *request*, contoh hasil *response*, penjelasan dari kode status HTTP yang mungkin diterima, serta cara penggunaannya menggunakan cURL dan Postman.

### Dokumentasi Teknis SATUSEHAT Master Wilayah ReST API

Unduh
