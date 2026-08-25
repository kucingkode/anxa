> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/onboardings/apis/practitioner/

---

# Practitioner

## Pencarian Data

Fungsi dari ReST API ini adalah untuk mencari data terkait resource Practitioner yang tersedia di ekosistem SATUSEHAT dengan parameter-parameter tertentu.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

|  |  |
| --- | --- |
|  | Setiap terdapat simbol tanya `?` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut **WAJIB** **ada bila memenuhi kondisi tertentu**, contoh: `?variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner
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

##### 1. Pencarian Berdasarkan NIK Praktisi kesehatan

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?identifier` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan NIK praktisi kesehatan**. Nilai yang dimasukkan harus mempunyai format:  ``` https://fhir.kemkes.go.id/id/nik|<nilai-nik> ```  di mana `<nilai-nik>` berisi NIK dari praktisi kesehatan yang akan dicari. Sebagai contoh, diketahui NIK praktisi kesehatan `################`, sehingga nilai yang dimasukkan untuk parameter ini adalah:  ``` https://fhir.kemkes.go.id/id/nik|################ ``` |

##### 2. Pencarian Berdasarkan Nama, Tanggal Lahir, dan Jenis Kelamin Praktisi kesehatan

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?name` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin praktisi kesehatan**. Berisi nama, baik sebagian atau lengkap, dari praktisi kesehatan yang akan dicari.  |  |  | | --- | --- | |  | Terdapat validasi pada penulisan nama, maka pastikan nama yang di *input* benar sesuai dengan data yang terdapat di SATUSEHAT. |  Contoh: `Voigt`. |
| `?birthdate` | `date` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin praktisi kesehatan**. Berisi tanggal dengan format salah satu dari `YYYY`, `YYYY-MM`, atau `YYYY-MM-DD`.  Contoh: `1945`. |
| `?gender` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin praktisi kesehatan**. Berisi nama jenis kelamin dari praktisi kesehatan, yaitu `male` atau `female`. |

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

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila resource Practitioner dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource Practitioner yang tersimpan di ekosistem SATUSEHAT.

**Contoh Data**

```
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "fullUrl": "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner/N10000001",
      "resource": {
        "resourceType": "Practitioner",
        "id": "N10000001",
        //data.terkait.resource.Practitioner
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
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner?identifier=https://fhir.kemkes.go.id/id/nik|################"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner?identifier=https://fhir.kemkes.go.id/id/nik|################'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner
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

Fungsi dari ReST API ini adalah untuk mendapatkan data terkait resource Practitioner yang tersedia di ekosistem SATUSEHAT. Untuk mendapatkan data yang dimaksud, nilai ID dari resource Practitioner tersebut **PERLU** diketahui dan disediakan sebagai parameternya.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner:id
```

#### HTTP Verb/Method

```
GET
```

##### Parameter Path URI

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*:id` | `uuid` | ID referensi dari resource Practitioner yang akan dilihat detailnya. |

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format JSON, **WAJIB** diisi dengan `application/json`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila resource Practitioner dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource Practitioner yang tersimpan di ekosistem SATUSEHAT.

**Contoh Data**

```
{
  "resourceType": "Practitioner",
  "id": "N10000001",
  //data.terkait.resource.Practitioner
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
  "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner/N10000001"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner/N10000001'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner:id
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Params**, di bagian **Path Variables**:

   1. Isi nilai parameter `id` dengan ID dari resource Practitioner yang ingin didapatkan datanya.
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.

## Daftar Data Tenaga Kesehatan untuk Proses Uji Coba/Sandbox(Staging)

Silakan gunakan data nakes (`Practitioner`) *dummy* yang disediakan oleh SATUSEHAT di bawah ini saat proses uji coba pengiriman data (Sandbox).

|  |  |
| --- | --- |
|  | Data *dummy* ini **hanya dapat digunakan** pada *environment* Sandbox. |

### PractitionerID dan NIK

Tabel 2. Daftar Data Practitioner

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
