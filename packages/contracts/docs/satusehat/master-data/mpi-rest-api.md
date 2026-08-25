> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-patient-index/rest-api-mpi/

---

# ReST API

## 1. Autentikasi

Untuk melakukan transaksi data dari Master Patient Index (MPI), perlu dilakukan proses autentikasi terlebih dahulu agar mendapatkan akses yang tersedia. Autentikasi yang digunakan oleh MPI mengikuti standar protokol OAuth 2 dengan tipe pemberian akses (*grant type*) adalah `client_credentials`.

Autentikasi menggunakan *grant type* `client_credentials` adalah proses autentikasi yang dilakukan antara *server to server*, sehingga tidak ada proses registrasi atau *log in* di sini. Autentikasi dengan tipe tersebut hanya memerlukan data berupa `client_id` dan `client_server`, di mana nilai tersebut didapatkan ketika pihak yang ingin menggunakan atau mengakses MSI ini telah melakukan pengajuan, terdaftar, serta mendapatkan persetujuan dari **Kementerian Kesehatan Republik Indonesia**.

Cara Mendapatkan Nilai dari `client_id` dan `client_secret`

Pastikan sistem RME fasyankes telah terverifikasi di SATUSEHAT Platform (SSP) dan fasyankes sudah melakukan proses pemutakhiran data di aplikasi DFO/REGFASYANKES/RS ONLINE. Untuk informasi lebih lanjut dapat dilihat pada Panduan Registrasi.

|  |  |
| --- | --- |
|  | **Berikut ini ketentuan Kode Akses API:**  1. **Client ID** (**Client Secret**) hanya dapat digunakan oleh 1 **Organization ID**. 2. Terdapat validasi apabila **Client ID** (**Client Secret**) mengirimkan data **Organization ID** yang berbeda. *Response error* sebagai berikut:  ```    "text": "resource cannot be accessed due to business rule"    ``` 3. Kode Akses API bersifat **RAHASIA** di mana unik, personal, dan khusus disediakan hanya untuk Partner Interoperabilitas SATUSEHAT yang telah terverifikasi di SATUSEHAT Platform (SSP). 4. Partner Interoperabilitas SATUSEHAT, **DILARANG** menduplikasi, mempublikasi, dan/atau mendistribusikan dalam bentuk apapun, sebagian/keseluruhan informasi kode akses API kepada pihak yang tidak sah dan tidak berkepentingan. |

|  |  |
| --- | --- |
|  | Setiap teks yang berwarna **biru muda**, dapat diklik untuk melompat ke bagian yang direferensikan. |

Pada bagian ini akan dijelaskan spesifikasi untuk **ReST API SATUSEHAT**, yang mempunyai tiga *endpoint* berdasarkan jenis lingkungan pengembangannya (*development environment*) yaitu:

**Autentikasi**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1
* **Production**: https://api-satusehat.kemkes.go.id/oauth2/v1

**API Resources**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1
* **Production**: https://api-satusehat.kemkes.go.id/fhir-r4/v1

|  |  |
| --- | --- |
|  | Semua penerapan, penjelasan, dan contoh yang akan dibahas akan menggunakan *environment sandbox*. |

|  |  |
| --- | --- |
|  | Untuk melakukan beberapa *request* ke ReST API SATUSEHAT yang akan dijelaskan atau dicontohkan di bagian ini, **WAJIB** melakukan proses autentikasi terlebih dahulu.  Setiap *request* diperlukan sebuah nilai token bertipe `Bearer` yang akan dimasukkan pada *header* `Authorization: Bearer <access_token>`.  Nilai `<access_token>` didapatkan dari properti `access_token` dari hasil *response* yang secara detail dijelaskan di artikel terkait **Akses Token**. |

## 2. Akses Token

## Mendapatkan Token

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

## 3. Resource `Patient`

## Pencarian Data

Fungsi dari ReST API ini adalah untuk mencari data terkait resource Patient yang tersedia di Ekosistem SATUSEHAT dengan parameter-parameter tertentu.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

|  |  |
| --- | --- |
|  | Setiap terdapat simbol tanya `?` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut **WAJIB** **ada bila memenuhi kondisi tertentu**, contoh: `?variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient
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

##### 1. Pencarian Berdasarkan NIK Pasien

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?identifier` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan NIK pasien**. Nilai yang dimasukkan harus mempunyai format:  ``` https://fhir.kemkes.go.id/id/nik|<nilai-nik> ```  di mana `<nilai-nik>` berisi NIK dari pasien yang akan dicari. Sebagai contoh, diketahui NIK pasien `################`, sehingga nilai yang dimasukkan untuk parameter ini adalah:  ``` https://fhir.kemkes.go.id/id/nik|################ ``` |

##### 2. Pencarian Berdasarkan Nama, Tanggal Lahir, dan NIK Pasien

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?name` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin pasien**. Berisi nama, baik sebagian atau lengkap, dari pasien yang akan dicari.  Contoh: `smith`. |
| `?birthdate` | `date` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin pasien**. Berisi tanggal dengan format salah satu dari `YYYY`, `YYYY-MM`, atau `YYYY-MM-DD`.  Contoh: `1980-01`. |
| `?nik` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan NIK pasien**. Berisi NIK (Nomor Induk Kependudukan) yang terdapat di KTP (Kartu Tanda Penduduk) dari pasien yang bersangkutan.  Contoh: ################ |

##### 3. Bayi Baru Lahir - Pencarian Berdasarkan NIK Ibu

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?identifier` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data bayi baru lahir dengan NIK ibu**. Nilai yang dimasukkan harus mempunyai format:  ``` https://fhir.kemkes.go.id/id/nik-ibu|<nik-ibu> ```  di mana `<nik-ibu>` berisi NIK dari ibu yang akan dicari. Sebagai contoh, diketahui NIK ibu dari pasien `################`, sehingga nilai yang dimasukkan untuk parameter ini adalah:  ``` https://fhir.kemkes.go.id/id/nik-ibu|################ ``` |

###### 4. Pencarian Berdasarkan Nama, Tanggal Lahir, dan Gender Pasien

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?name` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin pasien**. Berisi nama, baik sebagian atau lengkap, dari pasien yang akan dicari.  Contoh: `Budi` |
| `?birthdate` | `date` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin pasien**. Berisi tanggal dengan format salah satu dari `YYYY`, `YYYY-MM`, atau `YYYY-MM-DD`. Terkait penjelasan format tersebut bisa dilihat pada bagian **Pengantar Teknis, Format Tanggal dan Waktu**.  Contoh: `1976-01-06` |
| `?gender` | `string` | Diisi dengan jenis kelamin pasien: `male` (laki-laki) / `female` (perempuan)  Contoh: `male` |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila resource Patient dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource Patient yang tersimpan di Ekosistem SATUSEHAT.

**Contoh Data**

```
{
  "entry": [
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02478375538",
      "resource": {
        "active": true,
        "id": "P02478375538",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02478375538"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/nik",
            "use": "official",
            "value": "################"
          }
        ],
        "link": [
          {
            "other": {
              "reference": "RelatedPerson/7af11905-8d49-47dc-a72b-bca4948c01e7"
            },
            "type": "refer"
          }
        ],
        "meta": {
          "lastUpdated": "2023-05-31T06:40:40.038378+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY4NTUxNTI0MDAzODM3ODAwMA"
        },
        "name": [
          {
            "text": "patient 1",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    }
  ],
  "link": [
    {
      "relation": "search",
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?identifier=https%3A%2F%2Ffhir.kemkes.go.id%2Fid%2Fnik%7C9271060312000001"
    },
    {
      "relation": "first",
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?identifier=https%3A%2F%2Ffhir.kemkes.go.id%2Fid%2Fnik%7C9271060312000001"
    },
    {
      "relation": "self",
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?identifier=https%3A%2F%2Ffhir.kemkes.go.id%2Fid%2Fnik%7C9271060312000001"
    }
  ],
  "resourceType": "Bundle",
  "total": 1,
  "type": "searchset"
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau meminta data dengan format, parameter, atau ketentuan lainnya yang tidak sesuai atau tidak dimengerti oleh sistem.

**Contoh Data**

```
{
  "resourceType": "OperationOutcome",
  //data.terkait.resource.OperationOutcome
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
curl --insecure --location ^
  --header "Authorization: Bearer <access-token>" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient?identifier=https://fhir.kemkes.go.id/id/nik|################"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient?identifier=https://fhir.kemkes.go.id/id/nik|################'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Query Params**:

   1. silakan masukkan parameter untuk melakukan pencarian sesuai dengan yang sudah dijelaskan pada bagian *query string* terkait ReST API ini,
   2. masukkan satu atau lebih nama dari parameter tersebut pada kotak masukkan pada kolom **KEY**,
   3. sedangkan untuk nilainya, masukkan pada kotak masukkan pada kolom **VALUE**.
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## Detail Data

Fungsi dari ReST API ini adalah untuk mendapatkan data terkait resource Patient yang tersedia di Ekosistem SATUSEHAT. Untuk mendapatkan data yang dimaksud, nilai ID dari resource Patient tersebut **PERLU** diketahui dan disediakan sebagai parameternya.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient:id
```

#### HTTP Verb/Method

```
GET
```

##### Parameter Path URI

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*:id` | `uuid` | ID referensi dari resource Patient yang akan dilihat detailnya. |

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila resource Patient dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource Patient yang tersimpan di Ekosistem SATUSEHAT.

**Contoh Data**

```
{
  "resourceType": "Patient",
  "id": "100000000001",
  //data.terkait.resource.Patient
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau meminta data dengan format, parameter, atau ketentuan lainnya yang tidak sesuai atau tidak dimengerti oleh sistem.

**Contoh Data**

```
{
  "resourceType": "OperationOutcome",
  //data.terkait.resource.OperationOutcome
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
curl --insecure --location ^
  --header "Authorization: Bearer <access-token>" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient/100000000001"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient/100000000001'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient:id
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Path Variables**:

   1. Isi nilai parameter `id` dengan ID dari resource Patient yang ingin didapatkan datanya.
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## Penambahan Data

Fungsi dari ReST API ini adalah untuk melakukan penambahan data terkait resource Patient ke dalam Ekosistem SATUSEHAT.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient:
```

#### HTTP Verb/Method

```
POST
```

##### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

##### Body (`application/json`), dengan `identifier` NIK Pasien

Di bagian *body* ini *payload* JSON dari *resource* `Patient` sesuai standar FHIR dimasukkan. Terkait cara pengisian dari format FHIR tersebut di luar cakupan dari dokumentasi ini, silakan lihat dokumentasi terkait **FHIR** atau **Panduan Interoperabilitas** yang telah disediakan oleh tim SATUSEHAT dari **Kementerian Kesehatan Republik Indonesia**.

Bentuk umum dari *payload* untuk penambahan data sebagai berikut:

```
{
  "resourceType": "Patient",
  "identifier": [
    {
      "use": "official",
      "system": "https://fhir.kemkes.go.id/id/nik",
      "value": "################"
    },
    //data.terkait.indentifier.lainnya
  ],
  //data.terkait.resource.Patient
}
```

##### Body (`application/json`), dengan `identifier` NIK Ibu

Di bagian *body* ini *payload* JSON dari *resource* `Patient` dengan `identifier` NIK Ibu sesuai standar FHIR dimasukkan. Terkait cara pengisian dari format FHIR tersebut di luar cakupan dari dokumentasi ini, silakan lihat dokumentasi terkait **FHIR** atau **Panduan Interoperabilitas** yang telah disediakan oleh tim SATUSEHAT dari **Kementerian Kesehatan Republik Indonesia**.

Bentuk umum dari *payload* untuk penambahan data sebagai berikut:

```
{
  "resourceType": "Patient",
  "identifier": [
    {
      "use": "official",
      "system": "https://fhir.kemkes.go.id/id/nik-ibu",
      "value": "################"
    },
    //data.terkait.indentifier.lainnya
  ],
  //data.terkait.resource.Patient
}
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Dari hasil *response* ini, **PERLU** disimpan nilai UUID yang didapat dari properti `id`, di mana nilai tersebut kemungkinan akan digunakan dalam proses lainnya yang terkait resource Patient ini.

**Contoh Data**

```
{
  "resourceType": "Patient",
  "id": "100000000001",
  //data.terkait.resource.Patient
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan lainnya yang tidak sesuai atau tidak dimengerti oleh sistem.

**Contoh Data**

```
{
  "resourceType": "OperationOutcome",
  //data.terkait.resource.OperationOutcome
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
curl --insecure --location ^
  --header "Authorization: Bearer <access-token>" ^
  --header "Content-Type: application/json" ^
  --data-raw "{
    \"resourceType\": \"Patient\",
    ...
  }" ^
  --request POST ^
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "resourceType": "Patient",
    ...
  }' \
  --request POST \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient:
   ```
3. Lalu pilih *request method* `POST`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Body**:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **JSON**,
   3. terakhir masukkan *resource* JSON dari *Patient* yang akan diproses ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      {
        "resourceType": "Patient",
        //data.terkait.resource.Patient
      }
      ```
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## Pembaruan Sebagian Data

Fungsi dari ReST API ini adalah untuk melakukan perubahan sebagian dari data terkait resource Patient ke dalam Ekosistem SATUSEHAT, yang sebelumnya sudah ditambahkan dan tersedia di dalam Ekosistem SATUSEHAT. Untuk melakukan perubahan sebagian (*patching*) data, **PERLU** ID dari resource Patient yang akan diubah dan juga nama/ID elemen dari Patient yang akan dilakukan perubahan.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient/:id
```

#### HTTP Verb/Method

```
PATCH
```

##### Parameter Path URI

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*:id` | `uuid` | ID referensi dari resource Patient yang akan dilakukan proses pembaruan data (*update*). |

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

#### Body (`application/json`)

Di bagian *body* ini *payload* JSON dari resource Patient sesuai standar FHIR dimasukkan. Terkait cara pengisian dari format FHIR tersebut di luar cakupan dari dokumentasi ini, silakan lihat dokumentasi terkait **FHIR** atau **Panduan Interoperabilitas** yang telah disediakan oleh tim SATUSEHAT dari **Kementerian Kesehatan Republik Indonesia**.

Bentuk umum dari *payload* untuk *patching* sebagai berikut:

```
[
  {
    "op": "<operasi>",
    "path": "<element-path>",
    "value": "<nilai-baru>"
  }
]
```

Dari bentuk umum tersebut, nilai:

* `<operasi>`, saat ini hanya tersedia operasi `replace` saja, yaitu untuk menganti nilai properti/elemen dari *resource* Patient dengan ID terkait.
* `<element-path>`, nama properti/element dari *resource* Patient dengan ID terkait yang akan diganti nilainya, dengan format `/<path>/<to>/<element>`. Simbol `/` sebagai pemisah dari nama properti/element yang dimaksud.

  Contoh, misalkan pada *resource* Patient ini ada properti/element dengan nama `language`, yang dalam bentuk path FHIR `Patient.language`, maka penulisan nilai `<element-path>` ini adalah `/language`.
* `<nilai-baru>`, diisi dengan nilai pengantinya.

Sehingga contoh *payload*-nya sebagai berikut:

```
[
  {
    "op": "replace",
    "path": "/language",
    "value": "id"
  }
]
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila proses pembaruan data berhasil maka akan mengembalikan *payload* dari resource Patient yang sebelumnya telah dikirim.

**Contoh Data**

```
{
  "resourceType": "Patient",
  "id": "100000000001",
  //data.terkait.resource.Patient
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format, parameter, atau ketentuan lainnya yang tidak sesuai atau tidak dimengerti oleh sistem.

**Contoh Data**

```
{
  "resourceType": "OperationOutcome",
  //data.terkait.resource.OperationOutcome
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
curl --insecure --location ^
  --header "Authorization: Bearer <access-token>" ^
  --header "Content-Type: application/json" ^
  --data-raw "[
      {
          \"op\" : \"<operasi>\",
          \"path\" : \"<element-path>\",
          \"value\" : \"<nilai-baru>\"
      }
  ]" ^
  --request PATCH ^
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient/100000000001"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Content-Type: application/json' \
  --data-raw '[
    {
      "op": "<operasi>",
      "path": "<element-path>",
      "value": "<nilai-baru>"
    }
  ]' \
  --request PATCH \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient/100000000001'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Patient/:id
   ```
3. Lalu pilih *request method* `PATCH`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Path Variables**:

   1. Isi nilai parameter `id` dengan ID dari resource Patient yang akan diperbarui (*update*).
6. Pada tab **Body**:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **JSON**,
   3. terakhir masukkan *payload* JSON untuk melakukan perubahan ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      [
        {
          "op": "replace",
          "path": "/language",
          "value": "id"
        }
      ]
      ```
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4. Data *Dummy*

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

## 5. Unduh Dokumen

Di samping adanya dokumentasi secara umum terkait Master Patient Index (MPI), maka diperlukan satu dokumentasi khusus yang membahas semua informasi teknis yang disediakan oleh Master Patient Index (MPI) yang dikembangkan oleh tim *developer* **Kementerian Kesehatan Republik Indonesia**. Dokumentasi Teknis Master Patient Index (MPI) ini berisi spesifikasi teknis dan ReST API mencakup parameter yang tersedia, contoh *request*, contoh hasil *response*, penjelasan dari kode status HTTP yang mungkin diterima, serta cara penggunaannya menggunakan cURL dan Postman.

### Dokumentasi Teknis SATUSEHAT Master Patient Index (MPI) ReST API

Unduh
