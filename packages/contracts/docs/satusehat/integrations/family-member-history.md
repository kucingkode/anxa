> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/family-member-history/

---

# FamilyMemberHistory

## Pencarian Data

Fungsi dari ReST API ini adalah untuk mencari data terkait resource FamilyMemberHistory yang tersedia di ekosistem SATUSEHAT dengan parameter-parameter tertentu.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

|  |  |
| --- | --- |
|  | Setiap terdapat simbol tanya `?` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut **WAJIB** **ada bila memenuhi kondisi tertentu**, contoh: `?variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory
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

##### 1. Pencarian Berdasarkan ID Pasien dan ID *Relationship* (Relasi)

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?patient` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan ID Pasien dan ID *Relationship* (relasi)**. Berisi ID dari pasien yang akan dicari.  Contoh: `100000000001`. |
| `?relationship` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan ID Pasien dan ID *Relationship* (relasi)**. Berisi ID dari *Relationship* (relasi) yang akan dicari.  Contoh: `72705000`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila resource FamilyMemberHistory dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource FamilyMemberHistory yang tersimpan di ekosistem SATUSEHAT.

**Contoh Data**

```
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "fullUrl": "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/f2a4ba3f-4f4c-4fa3-a314-debc54636fa0",
      "resource": {
        "resourceType": "FamilyMemberHistory",
        "id": "f2a4ba3f-4f4c-4fa3-a314-debc54636fa0",
        //data.terkait.resource.FamilyMemberHistory
      },
      "search": {
        "mode": "match"
      }
    }
  ]
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
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory?patient=100000000001&relationship=72705000"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory?patient=100000000001&relationship=72705000'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory
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

Fungsi dari ReST API ini adalah untuk mendapatkan data terkait resource FamilyMemberHistory yang tersedia di ekosistem SATUSEHAT. Untuk mendapatkan data yang dimaksud, nilai ID dari resource FamilyMemberHistory tersebut **PERLU** diketahui dan disediakan sebagai parameternya.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/:id
```

#### HTTP Verb/Method

```
GET
```

##### Parameter Path URI

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*:id` | `uuid` | ID referensi dari resource FamilyMemberHistory yang akan dilihat detailnya. |

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila resource FamilyMemberHistory dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource FamilyMemberHistory yang tersimpan di ekosistem SATUSEHAT.

**Contoh Data**

```
{
  "resourceType": "FamilyMemberHistory",
  "id": "f2a4ba3f-4f4c-4fa3-a314-debc54636fa0",
  //data.terkait.resource.FamilyMemberHistory
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
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/f2a4ba3f-4f4c-4fa3-a314-debc54636fa0"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/f2a4ba3f-4f4c-4fa3-a314-debc54636fa0'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/:id
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Path Variables**:

   1. Isi nilai parameter `id` dengan ID dari resource FamilyMemberHistory yang ingin didapatkan datanya.
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## Penambahan Data

Fungsi dari ReST API ini adalah untuk melakukan penambahan data terkait resource FamilyMemberHistory ke dalam ekosistem SATUSEHAT.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory
```

#### HTTP Verb/Method

```
POST
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

#### Body (`application/json`)

Terkait cara pengisian Body (`application/json`) dari format FHIR tersebut, silakan lihat contoh di Postman SATUSEHAT dan dokumentasi pada menu Panduan Interoperabilitas sesuai dengan modul pelayanan dan/atau penerapan *(use case)* masing-masing.

Bentuk umum dari *payload* untuk penambahan data sebagai berikut:

```
{
  "resourceType": "FamilyMemberHistory",
  //data.terkait.resource.FamilyMemberHistory
}
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Dari hasil *response* ini, **PERLU** disimpan nilai UUID yang didapat dari properti `id`, di mana nilai tersebut kemungkinan akan digunakan dalam proses lainnya yang terkait resource FamilyMemberHistory ini.

**Contoh Data**

```
{
  "resourceType": "FamilyMemberHistory",
  "id": "f2a4ba3f-4f4c-4fa3-a314-debc54636fa0",
  //data.terkait.resource.FamilyMemberHistory
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
    \"resourceType\": \"FamilyMemberHistory\",
    ...
  }" ^
  --request POST ^
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "resourceType": "FamilyMemberHistory",
    ...
  }' \
  --request POST \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory
   ```
3. Lalu pilih *request method* `POST`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Body**:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **JSON**,
   3. terakhir masukkan *resource* JSON dari *FamilyMemberHistory* yang akan diproses ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      {
        "resourceType": "FamilyMemberHistory",
        //data.terkait.resource.FamilyMemberHistory
      }
      ```
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## Pembaruan Data

Fungsi dari ReST API ini adalah untuk melakukan perubahan data terkait resource FamilyMemberHistory ke dalam ekosistem SATUSEHAT, yang sebelumnya sudah ditambahkan dan tersedia di dalam ekosistem SATUSEHAT. Untuk melakukan perubahan (*update*) data, **PERLU** ID dari resource FamilyMemberHistory yang akan diubah.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/:id
```

#### HTTP Verb/Method

```
PUT
```

##### Parameter Path URI

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*:id` | `uuid` | ID referensi dari resource FamilyMemberHistory yang akan dilakukan proses pembaruan data (*update*). |

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

#### Body (`application/json`)

Di bagian *body* ini *payload* JSON dari resource FamilyMemberHistory sesuai standar FHIR dimasukkan. Terkait cara pengisian dari format FHIR tersebut di luar cakupan dari dokumentasi ini, silakan lihat dokumentasi terkait **FHIR** atau **Panduan Interoperabilitas** yang telah disediakan oleh tim SATUSEHAT dari **Kementerian Kesehatan Republik Indonesia**.

Bentuk umum dari *payload* untuk penambahan data sebagai berikut:

```
{
  "resourceType": "FamilyMemberHistory",
  //data.terkait.resource.FamilyMemberHistory
}
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila proses pembaruan data berhasil maka akan mengembalikan *payload* dari resource FamilyMemberHistory yang sebelumnya telah dikirim.

**Contoh Data**

```
{
  "resourceType": "FamilyMemberHistory",
  "id": "f2a4ba3f-4f4c-4fa3-a314-debc54636fa0",
  //data.terkait.resource.FamilyMemberHistory
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
  --data-raw "{
    \"resourceType\": \"FamilyMemberHistory\",
    ...
  }" ^
  --request PUT ^
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/f2a4ba3f-4f4c-4fa3-a314-debc54636fa0"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "resourceType": "FamilyMemberHistory",
    ...
  }' \
  --request PUT \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/f2a4ba3f-4f4c-4fa3-a314-debc54636fa0'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/:id
   ```
3. Lalu pilih *request method* `PUT`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Path Variables**:

   1. Isi nilai parameter `id` dengan ID dari resource FamilyMemberHistory yang akan diperbarui (*update*).
6. Pada tab **Body**:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **JSON**,
   3. terakhir masukkan *resource* JSON dari *FamilyMemberHistory* yang akan diproses ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      {
        "resourceType": "FamilyMemberHistory",
        //data.terkait.resource.FamilyMemberHistory
      }
      ```
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## Pembaruan Sebagian Data

Fungsi dari ReST API ini adalah untuk melakukan perubahan sebagian dari data terkait resource FamilyMemberHistory ke dalam ekosistem SATUSEHAT, yang sebelumnya sudah ditambahkan dan tersedia di dalam ekosistem SATUSEHAT. Untuk melakukan perubahan sebagian (*patching*) data, **PERLU** ID dari resource FamilyMemberHistory yang akan diubah dan juga nama/ID elemen dari FamilyMemberHistory yang akan dilakukan perubahan.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/:id
```

#### HTTP Verb/Method

```
PATCH
```

##### Parameter Path URI

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*:id` | `uuid` | ID referensi dari resource FamilyMemberHistory yang akan dilakukan proses pembaruan data (*update*). |

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

#### Body (`application/json`)

Di bagian *body* ini *payload* JSON dari resource FamilyMemberHistory sesuai standar FHIR dimasukkan. Terkait cara pengisian dari format FHIR tersebut di luar cakupan dari dokumentasi ini, silakan lihat dokumentasi terkait **FHIR** atau **Panduan Interoperabilitas** yang telah disediakan oleh tim SATUSEHAT dari **Kementerian Kesehatan Republik Indonesia**.

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

* `<operasi>`, saat ini hanya tersedia operasi `replace` saja, yaitu untuk menganti nilai properti/elemen dari *resource* FamilyMemberHistory dengan ID terkait.
* `<element-path>`, nama properti/element dari *resource* FamilyMemberHistory dengan ID terkait yang akan diganti nilainya, dengan format `/<path>/<to>/<element>`. Simbol `/` sebagai pemisah dari nama properti/element yang dimaksud.

  Contoh, misalkan pada *resource* FamilyMemberHistory ini ada properti/element dengan nama `language`, yang dalam bentuk path FHIR `FamilyMemberHistory.language`, maka penulisan nilai `<element-path>` ini adalah `/language`.
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

Bila proses pembaruan data berhasil maka akan mengembalikan *payload* dari resource FamilyMemberHistory yang sebelumnya telah dikirim.

**Contoh Data**

```
{
  "resourceType": "FamilyMemberHistory",
  "id": "f2a4ba3f-4f4c-4fa3-a314-debc54636fa0",
  //data.terkait.resource.FamilyMemberHistory
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
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/f2a4ba3f-4f4c-4fa3-a314-debc54636fa0"
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
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/f2a4ba3f-4f4c-4fa3-a314-debc54636fa0'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/FamilyMemberHistory/:id
   ```
3. Lalu pilih *request method* `PATCH`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Path Variables**:

   1. Isi nilai parameter `id` dengan ID dari resource FamilyMemberHistory yang akan diperbarui (*update*).
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
