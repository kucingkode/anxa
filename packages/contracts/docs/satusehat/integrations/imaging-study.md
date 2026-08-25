> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/imaging-study/

---

# ImagingStudy

## Pencarian Data

Fungsi dari ReST API ini adalah untuk mencari data terkait resource ImagingStudy yang tersedia di ekosistem SATUSEHAT dengan parameter-parameter tertentu.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy
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

##### 1. Pencarian Berdasarkan *Identifier*

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*identifier` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan *Identifier***. Berisi *Identifier* yang akan dicari. Memiliki format:  ``` http://sys-ids.kemkes.go.id/acsn/<subject>|<accession_number> ```  * Nilai dari variabel `<subject>` digantikan dengan ID dari subjek (pasien). * Nilai dari variabel `<accession_number>` digantikan dengan *accession number* yang didapatkan saat pengajuan layanan (*service request*).  Contoh:  ``` https://sys-ids.kemkes.go.id/acsn/100000000001|CR.221005.002 ``` |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila resource ImagingStudy dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource ImagingStudy yang tersimpan di ekosistem SATUSEHAT.

**Contoh Data**

```
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "fullUrl": "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy/8031179c-cd31-475e-8f94-feeb4c618c6b",
      "resource": {
        "resourceType": "ImagingStudy",
        "id": "8031179c-cd31-475e-8f94-feeb4c618c6b",
        //data.terkait.resource.ImagingStudy
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
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy?identifier=https://sys-ids.kemkes.go.id/acsn/100000000001|CR.221005.002"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy?identifier=https://sys-ids.kemkes.go.id/acsn/100000000001|CR.221005.002'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Query Params**:

   1. masukkan nama parameter `identifier` pada kotak masukkan pada kolom **KEY**,
   2. sedangkan untuk nilainya, masukkan nilainya sesuai format yang telah dijelaskan, pada kotak masukkan pada kolom **VALUE**.
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## Penambahan Data

Fungsi dari ReST API ini adalah untuk melakukan penambahan data terkait resource ImagingStudy ke dalam ekosistem SATUSEHAT.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy
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
  "resourceType": "ImagingStudy",
  //data.terkait.resource.ImagingStudy
}
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Dari hasil *response* ini, **PERLU** disimpan nilai UUID yang didapat dari properti `id`, di mana nilai tersebut kemungkinan akan digunakan dalam proses lainnya yang terkait resource ImagingStudy ini.

**Contoh Data**

```
{
  "resourceType": "ImagingStudy",
  "id": "8031179c-cd31-475e-8f94-feeb4c618c6b",
  //data.terkait.resource.ImagingStudy
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
    \"resourceType\": \"ImagingStudy\",
    ...
  }" ^
  --request POST ^
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "resourceType": "ImagingStudy",
    ...
  }' \
  --request POST \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy
   ```
3. Lalu pilih *request method* `POST`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Body**:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **JSON**,
   3. terakhir masukkan *resource* JSON dari *ImagingStudy* yang akan diproses ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      {
        "resourceType": "ImagingStudy",
        //data.terkait.resource.ImagingStudy
      }
      ```
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## Pembaruan Data

Fungsi dari ReST API ini adalah untuk melakukan perubahan data terkait resource ImagingStudy ke dalam ekosistem SATUSEHAT, yang sebelumnya sudah ditambahkan dan tersedia di dalam ekosistem SATUSEHAT. Untuk melakukan perubahan (*update*) data, **PERLU** ID dari resource ImagingStudy yang akan diubah.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy/:id
```

#### HTTP Verb/Method

```
PUT
```

##### Parameter Path URI

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*:id` | `uuid` | ID referensi dari resource ImagingStudy yang akan dilakukan proses pembaruan data (*update*). |

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

#### Body (`application/json`)

Di bagian *body* ini *payload* JSON dari resource ImagingStudy sesuai standar FHIR dimasukkan. Terkait cara pengisian dari format FHIR tersebut di luar cakupan dari dokumentasi ini, silakan lihat dokumentasi terkait **FHIR** atau **Panduan Interoperabilitas** yang telah disediakan oleh tim SATUSEHAT dari **Kementerian Kesehatan Republik Indonesia**.

Bentuk umum dari *payload* untuk penambahan data sebagai berikut:

```
{
  "resourceType": "ImagingStudy",
  //data.terkait.resource.ImagingStudy
}
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila proses pembaruan data berhasil maka akan mengembalikan *payload* dari resource ImagingStudy yang sebelumnya telah dikirim.

**Contoh Data**

```
{
  "resourceType": "ImagingStudy",
  "id": "8031179c-cd31-475e-8f94-feeb4c618c6b",
  //data.terkait.resource.ImagingStudy
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
    \"resourceType\": \"ImagingStudy\",
    ...
  }" ^
  --request PUT ^
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy/8031179c-cd31-475e-8f94-feeb4c618c6b"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "resourceType": "ImagingStudy",
    ...
  }' \
  --request PUT \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy/8031179c-cd31-475e-8f94-feeb4c618c6b'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/ImagingStudy/:id
   ```
3. Lalu pilih *request method* `PUT`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Path Variables**:

   1. Isi nilai parameter `id` dengan ID dari resource ImagingStudy yang akan diperbarui (*update*).
6. Pada tab **Body**:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **JSON**,
   3. terakhir masukkan *resource* JSON dari *ImagingStudy* yang akan diproses ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      {
        "resourceType": "ImagingStudy",
        //data.terkait.resource.ImagingStudy
      }
      ```
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.
