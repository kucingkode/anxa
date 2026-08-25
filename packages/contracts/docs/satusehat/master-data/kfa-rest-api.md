> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/master-data/kfa/rest-api-kfa/

---

# ReST API

## 1. Autentikasi

Untuk melakukan transaksi data dari Kamus Farmasi dan Alat Kesehatan (KFA), perlu dilakukan proses autentikasi terlebih dahulu agar mendapatkan akses yang tersedia. Autentikasi yang digunakan oleh KFA mengikuti standar protokol OAuth 2 dengan tipe pemberian akses (*grant type*) adalah `client_credentials`.

Autentikasi menggunakan *grant type* `client_credentials` adalah proses autentikasi yang dilakukan antara *server to server*, sehingga tidak ada proses registrasi atau *log in* di sini. Autentikasi dengan tipe tersebut hanya memerlukan data berupa `client_id` dan `client_server`, di mana nilai tersebut didapatkan ketika pihak yang ingin menggunakan atau mengakses KFA ini telah melakukan pengajuan, terdaftar, serta mendapatkan persetujuan dari **Kementerian Kesehatan Republik Indonesia**.

Cara Mendapatkan Nilai dari `client_id` dan `client_secret`

Pastikan sistem RME fasyankes telah terverifikasi di SATUSEHAT Platform (SSP) dan fasyankes sudah melakukan proses pemutakhiran data di aplikasi DFO/REGFASYANKES/RS ONLINE. Untuk informasi lebih lanjut dapat dilihat pada Panduan Registrasi.

|  |  |
| --- | --- |
|  | **Berikut ini ketentuan Kode Akses API:**  1. **Client ID** (**Client Secret**) hanya dapat digunakan oleh 1 **Organization ID**. 2. Terdapat validasi apabila **Client ID** (**Client Secret**) mengirimkan data **Organization ID** yang berbeda. *Response error* sebagai berikut:  ```    "text": "resource cannot be accessed due to business rule"    ``` 3. Kode Akses API bersifat **RAHASIA** di mana unik, personal, dan khusus disediakan hanya untuk Partner Interoperabilitas SATUSEHAT yang telah terverifikasi di SATUSEHAT Platform (SSP). 4. Partner Interoperabilitas SATUSEHAT, **DILARANG** menduplikasi, mempublikasi, dan/atau mendistribusikan dalam bentuk apapun, sebagian/keseluruhan informasi kode akses API kepada pihak yang tidak sah dan tidak berkepentingan. |

|  |  |
| --- | --- |
|  | Setiap teks yang berwarna **biru muda**, dapat diklik untuk melompat ke bagian yang direferensikan. |

Pada bagian ini akan dijelaskan spesifikasi untuk **ReST API Kamus Farmasi dan Alat Kesehatan (KFA)**, yang mempunyai *endpoint* berdasarkan jenis lingkungan pengembangannya (*development environment*) yaitu:

**Autentikasi**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1
* **Production**: https://api-satusehat.kemkes.go.id/oauth2/v1

**API KFA Versi 1**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/kfa
* **Production**: https://api-satusehat.kemkes.go.id/kfa

**API KFA Versi 2**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2
* **Production**: https://api-satusehat.kemkes.go.id/kfa-v2

**API KFA Versi ALKES**

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3
* **Production**: https://api-satusehat.kemkes.go.id/kfa-v3

|  |  |
| --- | --- |
|  | Semua penerapan, penjelasan, dan contoh yang akan dibahas akan menggunakan *environment sandbox*. |

|  |  |
| --- | --- |
|  | Untuk melakukan beberapa *request* ke ReST API SATUSEHAT yang akan dijelaskan atau dicontohkan di bagian ini, **WAJIB** melakukan proses autentikasi terlebih dahulu.  Setiap *request* diperlukan sebuah nilai token bertipe `Bearer` yang akan dimasukkan pada *header* `Authorization: Bearer <access_token>`.  Nilai `<access_token>` didapatkan dari properti `access_token` dari hasil *response* yang secara detail dijelaskan di artikel terkait **Akses Token**. |

## 2. *Postman Collection*

Kami menyediakan **Postman SATUSEHAT** yang berisi **Environment** dan **Postman Collection SATUSEHAT**. Anda dapat menggunakan Postman SATUSEHAT tersebut untuk mempermudah proses pemaham alur/skema dari pengiriman data SATUSEHAT pada modul ini ketika melakukan *workshop* secara mandiri.

|  |  |
| --- | --- |
|  | Silakan terlebih dahulu **men-*download*/mengunduh/*froking* *environment* dan Postman Collection SATUSEHAT** sebelum mempelajari modul ini lebih dalam:  1. **Postman SATUSEHAT Public** klik **di sini**. 2. **Environment dan Postman Collection SATUSEHAT s.link By ©Kemenkes** klik **di sini**.  * Sesuaikan *environment* yang digunakan, apabila masih dalam proses *workshop* secara mandiri (uji coba) maka *download*/unduh dan gunakan *environment* Sandbox.    * Pastikan men-*download*/mengunduh Postman Collection SATUSEHAT sesuai dengan modul yang saat ini Anda pelajari. |

|  |  |
| --- | --- |
|  | 1. **Postman SATUSEHAT Public** klik **di sini**. 2. **Environment SATUSEHAT s.link By ©Kemenkes** klik **di sini**. 3. **Postman Collection SATUSEHAT s.link By ©Kemenkes** terkait **Master Data - KFA** klik **di sini**. |

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

## 4. API KFA Versi 1

|  |  |
| --- | --- |
|  | API Produk Versi 1 digunakan untuk mendapatkan informasi terkait produk farmasi dan alat kesehatan fasyankes |

## 4.1. *Price* - Mendapatkan Harga Produk JKN

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/kfa/farmalkes-price-jkn
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
| `*page` | `number` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `*limit` | `number` | Isi dengan banyaknya data yang ingin ditampilkan dalam satu halaman (*page*).  Contoh: `50`. |
| `*kfa_code` | `string` | Isi dengan kode produk KFA yang diinginkan.  Contoh: `93004418`. |
| `region_code` | `string` | Isi dengan kode regional JKN yang diinginkan.  |  |  | | --- | --- | |  | * **`regional1`**: Bali, Banten, Jawa Barat, Jawa Timur, Jakarta, Jawa Tengah, Lampung, Yogyakarta * **`regional2`**: Bangka Belitung, Bengkulu, Jambi, Nusa Tenggara Barat, Riau, Sumatra Barat, Sumatra Selatan, Sumatra Utara * **`regional3`**: Aceh, Kalimantan Barat, Kalimantan Timur, Kepulauan Riau, Kalimantan Tengah, Sulawesi Utara, Sulawesi Selatan, Sulawesi Tengah * **`regional4`**: Gorontalo, Kalimantan Tengah, Kalimantan Utara, Sulawesi Tenggara, Sulawesi Barat * **`regional5`**: Maluku, Maluku Utara, Nusa Tenggara Timur, Papua Barat * **`regional6`**: Papua Pegunungan, Papua Selatan, Papua Tengah |  Contoh: `regional1` |
| `document_ref` | `string` | Isi dengan dokumen referensi atau dasar hukum yang berlaku. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "total": 6,
  "page": 1,
  "limit": 10,
  "items": {
      "data": [
          {
              "product_template_name": "Acarbose 100 mg Tablet",
              "kfa_code": "92000372",
              "document_ref": "HK.01.07/MENKES/1905/2023",
              "active": true,
              "region_name": "Regional 1",
              "region_code": "regional1",
              "start_date": "2023-08-23",
              "end_date": null,
              "price_unit": 848.0,
              "uom_name": "Tablet",
              "updated_at": "2023-08-29 04:11:02",
              "uom_pack": [
                  "Blister",
                  "Strip"
              ],
              "province": [
                  {
                      "province_code": "51",
                      "province_name": "Bali"
                  },
                  {
                      "province_code": "36",
                      "province_name": "Banten"
                  },
                  {
                      "province_code": "32",
                      "province_name": "Jawa Barat"
                  },
                  {
                      "province_code": "35",
                      "province_name": "Jawa Timur"
                  },
                  {
                      "province_code": "31",
                      "province_name": "DKI Jakarta"
                  },
                  {
                      "province_code": "33",
                      "province_name": "Jawa Tengah"
                  },
                  {
                      "province_code": "18",
                      "province_name": "Lampung"
                  },
                  {
                      "province_code": "34",
                      "province_name": "Yogyakarta"
                  }
              ]
          },
          /* lompat beberapa data */
          {
              "product_template_name": "Acarbose 100 mg Tablet",
              "kfa_code": "92000372",
              "document_ref": "HK.01.07/MENKES/1905/2023",
              "active": true,
              "region_name": "Regional 6",
              "region_code": "regional6",
              "start_date": "2023-08-23",
              "end_date": null,
              "price_unit": 1060.0,
              "uom_name": "Tablet",
              "updated_at": "2023-08-29 04:11:02",
              "uom_pack": [
                  "Blister",
                  "Strip"
              ],
              "province": [
                  {
                      "province_code": "95",
                      "province_name": "Papua Pegunungan"
                  },
                  {
                      "province_code": "93",
                      "province_name": "Papua Selatan"
                  },
                  {
                      "province_code": "94",
                      "province_name": "Papua Tengah"
                  }
              ]
          }
      ]
  }
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "detail": [{
      "loc": [
        "query",
        "code"
      ],
      "msg": "field required",
      "type": "value_error.missing"
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
curl --insecure --location ^
  --header "Authorization: Bearer <access-token>" ^
  --header "Accept: application/json" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/kfa/farmalkes-price-jkn?{path-code}"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Accept: application/json' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/kfa/farmalkes-price-jkn?{path-code}'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/kfa/farmalkes-price-jkn
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 5. API KFA Versi 2

|  |  |
| --- | --- |
|  | API Produk Versi 2 digunakan untuk mendapatkan informasi terkait produk farmasi dan alat kesehatan fasyankes |

## 5.1. *Products* - Mendapatkan Detail Produk

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products
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
| `*identifier` | `string` | Isi sumber data yang ingin digunakan, seperti: `kfa`, `nie`, atau `lkpp`.  |  |  | | --- | --- | |  | * **`nie`**: Data Nomor Izin Edar (NIE) yang bersumber dari BPOM. * **`lkpp`**: Data inventaris, distribusi, pengelolaan, dan harga obat yang beredar bersumber dari Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah (LKPP). * **`kfa`**: Data kode unik produk farmasi dan alat kesehatan yang bersumber pada Kamus Farmasi dan Alat Kesehatan (KFA). |  Contoh: `kfa`. |
| `*code` | `string` | Isi kode dari produk yang akan dicari.  Contoh: `93004418`. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "search_code": "93015993",
  "search_identifier": "kfa",
  "result": {
      "name": "Abacavir Sulfate 300 mg Tablet Salut Selaput (KIMIA FARMA)",
      "kfa_code": "93015993",
      "active": true,
      "state": "valid",
      "image": null,
      "updated_at": "2023-09-21 07:17:24",
      "farmalkes_type": {
          "code": "medicine",
          "name": "Obat",
          "group": "farmasi"
      },
      "ucum": {
          "cs_code": "mg",
          "name": "milligram"
      },
      "dosage_form": {
          "code": "BS077",
          "name": "Tablet Salut Selaput"
      },
      "controlled_drug": {
          "code": "3",
          "name": "Obat Keras"
      },
      "rute_pemberian": {
          "code": "O",
          "name": "Oral"
      },
      "uom": {
          "name": "Tablet"
      },
      "produksi_buatan": "lokal",
      "nie": "GKL2012431917A1",
      "nama_dagang": "ABACAVIR SULFATE",
      "manufacturer": "KIMIA FARMA TBK",
      "registrar": "KIMIA FARMA Tbk.",
      "generik": true,
      "rxterm": "abacavir",
      "dose_per_unit": 1,
      "fix_price": 7215.0,
      "het_price": 13297.0,
      "farmalkes_hscode": null,
      "tayang_lkpp": true,
      "kode_lkpp": "45463910",
      "score_tkdn": null,
      "score_bmp": null,
      "score_tkdn_bmp": null,
      "med_dev_jenis": null,
      "med_dev_subkategori": null,
      "med_dev_kategori": null,
      "med_dev_kelas_risiko": null,
      "klasifikasi_izin": null,
      "net_weight": null,
      "net_weight_uom_name": "g",
      "volume": null,
      "volume_uom_name": "mL",
      "atc_ddd": {
          "name": "0.6 g - O"
      },
      "atc_l1": {
          "name": "ANTIINFECTIVES FOR SYSTEMIC USE",
          "code": "J",
          "level": "1",
          "parent_code": false,
          "comment": null
      },
      "atc_l2": {
          "name": "ANTIVIRALS FOR SYSTEMIC USE",
          "code": "J05",
          "level": "2",
          "parent_code": "J",
          "comment": null
      },
      "atc_l3": {
          "name": "DIRECT ACTING ANTIVIRALS",
          "code": "J05A",
          "level": "3",
          "parent_code": "J05",
          "comment": null
      },
      "atc_l4": {
          "name": "Nucleoside and nucleotide reverse transcriptase inhibitors",
          "code": "J05AF",
          "level": "4",
          "parent_code": "J05A",
          "comment": null
      },
      "atc_l5": {
          "name": "Abacavir",
          "code": "J05AF06",
          "level": "5",
          "parent_code": "J05AF",
          "comment": null
      },
      "description": "<p>Abacavir secara kompetitif menghambat reverse transcriptase retrovirus, mengganggu DNA polimerase yang bergantung pada RNA virus HIV yang mengakibatkan penghambatan replikasi virus.<br></p>",
      "indication": "<p>Infeksi HIV</p><p>Dewasa: Dikombinasikan dengan antiretroviral lain: 300 mg dua kali sehari atau 600 mg sekali sehari.</p><p><br></p><p>Anak: 3 bln, berat badan 14 kg sampai &lt;20 kg: 150 mg dua kali sehari atau 300 mg sekali sehari; 20 kg sampai &lt;25 kg: 150 mg di pagi hari dan 300 mg di malam hari atau 450 mg sekali sehari; &gt;25 kg: Sama seperti dosis dewasa.</p>",
      "warning": "<p>Pasien dengan faktor risiko penyakit hati (misalnya obesitas) dan mereka yang memiliki faktor risiko penyakit jantung koroner (misalnya hipertensi, DM, merokok). Gangguan ginjal atau hati ringan. Kehamilan.<br></p>",
      "side_effect": "<p>Demam, ruam, batuk, sesak, lesu, malaise, sakit kepala, mialgia, gangguan GI, terutama mual, muntah, diare dan sakit perut; pankreatitis dan peningkatan nilai enzim hati, osteonekrosis, sindrom pemulihan kekebalan, MI, sindrom lipodistrofi. Jarang, eritema multiforme, sindrom Stevens-Johnson, nekrolisis epidermal toksik.</p><p>Berpotensi Fatal: Reaksi hipersensitivitas yang serius dan fatal dengan keterlibatan beberapa organ, asidosis laktat, dan hepatomegali berat dengan steatosis.</p>",
      "identifier_ids": [
          {
              "name": "ABACAVIR SULFATE",
              "code": "GKL2012431917A1",
              "source_name": "NIE BPOM",
              "url": null
          },
          {
              "name": "Abacavir Sulfate 300 mg Tablet Salut Selaput",
              "code": "93015993",
              "source_name": "Kamus Farmalkes (KFA – IHS)",
              "url": null
          }
      ],
      "packaging_ids": [
          {
              "name": "Dus isi 60",
              "kfa_code": "94021264",
              "pack_price": 0.0,
              "uom_id": "Tablet",
              "qty": 60.0
          }
      ],
      "product_template": {
          "kfa_code": "92000888",
          "name": "Abacavir Sulfate 300 mg Tablet Salut Selaput",
          "state": "valid",
          "active": true,
          "display_name": "Abacavir Sulfate 300 mg Tablet Salut Selaput",
          "updated_at": "2023-08-29 00:49:25"
      },
      "active_ingredients": [
          {
              "kfa_code": "91000651",
              "active": true,
              "state": "valid",
              "zat_aktif": "Abacavir",
              "kekuatan_zat_aktif": "300 mg",
              "updated_at": "2022-11-17 10:56:16"
          }
      ],
      "dosage_usage": [],
      "cvx_info": {},
      "replacement": {
          "product": null,
          "template": null
      },
      "tags": []
  }
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "detail": [{
      "loc": [
        "query",
        "identifier"
      ],
      "msg": "field required",
      "type": "value_error.missing"
    }, {
      "loc": [
        "query",
        "code"
      ],
      "msg": "field required",
      "type": "value_error.missing"
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
curl --insecure --location ^
  --header "Authorization: Bearer <access-token>" ^
  --header "Accept: application/json" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products?identifier=kfa&code=93004418"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Accept: application/json' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products?identifier=kfa&code=93004418'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 5.2. *Products* - Pencarian Produk dengan Paginasi

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products/all
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
| `*page` | `number` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `*size` | `number` | Isi dengan banyaknya data yang ingin ditampilkan dalam satu halaman (*page*).  Contoh: `100`. |
| `*product_type` | `string` | Isi dengan kategori/jenis produk yang diinginkan.  Contoh: `farmasi`. |
| `from_date` | `string` | Isi dengan waktu mulai dengan format `YYYY-MM-DD`  Contoh: `2023-06-26`. |
| `to_date` | `string` | Isi dengan waktu selesai dengan format `YYYY-MM-DD`  Contoh: `2023-06-26`. |
| `farmalkes_type` | `string` | Isi dengan kategori/jenis farmalkes yang diinginkan.  Contoh: `vaccine`. |
| `keyword` | `string` | Isi dengan kategori/jenis produk yang diinginkan.  Contoh: `glove`. |
| `template_code` | `string` | Isi dengan kode produk virtual/template (**PAV**) KFA yang diinginkan.  Contoh: `92xxxxxx` untuk farmasi atau `82xxxxxx` untuk alkes. |
| `packaging_code` | `string` | Isi dengan kode kemasan (**PAK**) KFA yang diinginkan.  Contoh: `94xxxxxx` untuk farmasi atau `84xxxxxx` untuk alkes. |

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "total": 66227,
  "page": 1,
  "size": 10,
  "items": {
      "data": [
          {
              "name": "IV Catheter With Vialon Material (VIECARE, Non Injection Port Non Wing / 18 G, 20 G, 22 G, 24 G, 18 G, 20 G, 22 G, 24 G)",
              "kfa_code": "/",
              "active": true,
              "state": "valid",
              "image": null,
              "updated_at": "2023-07-11 08:46:13",
              "farmalkes_type": {
                  "code": "device",
                  "name": "Alat Kesehatan",
                  "group": "alkes"
              },
              "produksi_buatan": "lokal",
              "nie": null,
              "nama_dagang": "VieCare IV Catheter",
              "manufacturer": null,
              "registrar": null,
              "generik": null,
              "rxterm": null,
              "dose_per_unit": 1,
              "fix_price": 8000.0,
              "het_price": null,
              "farmalkes_hscode": null,
              "tayang_lkpp": true,
              "kode_lkpp": null,
              "net_weight": null,
              "net_weight_uom_name": "g",
              "volume": null,
              "volume_uom_name": "mL",
              "uom": {
                  "name": "Units"
              },
              "dosage_form": {
                  "code": false,
                  "name": false
              },
              "product_template": {
                  "kfa_code": "82002082",
                  "name": "IV Catheter With Vialon Material",
                  "state": "valid",
                  "active": true,
                  "display_name": "IV Catheter With Vialon Material",
                  "updated_at": "2023-07-11 08:39:06"
              },
              "active_ingredients": [],
              "replacement": {
                  "product": null,
                  "template": null
              },
              "tags": []
          },
          /*lompat beberapa data*/
          {
              "name": "ECG Monitor (Umum)",
              "kfa_code": "/",
              "active": true,
              "state": "valid",
              "image": null,
              "updated_at": "2023-05-11 05:00:56",
              "farmalkes_type": {
                  "code": "device",
                  "name": "Alat Kesehatan",
                  "group": "alkes"
              },
              "produksi_buatan": "lokal",
              "nie": null,
              "nama_dagang": "MIKI Electrocardiograph CSN-1212A",
              "manufacturer": null,
              "registrar": null,
              "generik": true,
              "rxterm": null,
              "dose_per_unit": 1,
              "fix_price": 40499000.0,
              "het_price": null,
              "farmalkes_hscode": null,
              "tayang_lkpp": true,
              "kode_lkpp": null,
              "net_weight": null,
              "net_weight_uom_name": "g",
              "volume": null,
              "volume_uom_name": "mL",
              "uom": {
                  "name": "Units"
              },
              "dosage_form": {
                  "code": false,
                  "name": false
              },
              "product_template": {
                  "kfa_code": "82000161",
                  "name": "ECG Monitor",
                  "state": "valid",
                  "active": true,
                  "display_name": "ECG Monitor",
                  "updated_at": "2023-08-29 00:49:25"
              },
              "active_ingredients": [],
              "replacement": {
                  "product": null,
                  "template": null
              },
              "tags": []
          }
      ]
  }
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "detail": [
    {
      "loc": [
        "Ut nisi amet",
        "velit nulla quis minim"
      ],
      "msg": "cupidatat Excepteur enim in",
      "type": "voluptate laborum reprehenderit velit"
    },
    {
      "loc": [
        "id ad",
        "ad"
      ],
      "msg": "cillum",
      "type": "esse sit"
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
curl --insecure --location ^
  --header "Authorization: Bearer <access-token>" ^
  --header "Accept: application/json" ^
  --request GET ^
  "https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products/all?page=1&size=100&product_type=farmasi"
```

#### cURL (Linux)

```
curl --insecure --location \
  --header 'Authorization: Bearer <access-token>' \
  --header 'Accept: application/json' \
  --request GET \
  'https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products/all?page=1&size=100&product_type=farmasi'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products/all
   ```
3. Lalu pilih *request method* `GET`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 6. API KFA Alat Kesehatan (ALKES)

|  |  |
| --- | --- |
|  | API ALKES digunakan untuk mendapaktkan informasi spesifik terkait produk alat kesehatan fasyankes |

## 6.1. Alkes Produk Varian

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3/alkes/products
```

#### HTTP Verb/Method

```
POST
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |

#### Body (`application/json`)

```
DATA STRUCTURE:
{
  *page: integer (1)
  *size: integer (2)
  *state: string (3)
  *active: boolean (4)
  *kfa_code: string (5)
  *reference_code: string (6)
  *search: string (7)
  *updated_from_date: string (8)
  *updated_to_date: string (9)
  *farmalkes_type: string (10)
  *category_code: string (11)
  *sub_category_code: string (12)
  *type_code: string (13)
  *sub_type_code: string (14)
}
```

EXPLANATION:

| No | Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- | --- |
| `1` | `*page` | `integer` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `2` | `size` | `integer` | Isi dengan banyaknya data raw yang ingin ditampilkan dalam satu halaman (*page*).  Contoh: `10`. |
| `3` | `state` | `string` | Isi dengan state varian produk. Terdapat 2 option dalam varian produk `draft` dan `valid`  Contoh: `valid`. |
| `4` | `active` | `boolean` | Isi `true` menunjukan data sudah terhapus atau belum  Contoh: `true`. |
| `5` | `kfa_code` | `string` | Isi dengan kode kfa  Contoh: `33069659`. |
| `6` | `reference_code` | `string` | Isi dengan kode dari NIE BPOM/LKPP yang ada pada *field* `identifier_ids[].code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'..  Contoh: `AKD 21501912107,2649566`. |
| `7` | `search` | `string` | Isi dengan `display_name`, `synonym`, atau `nama_dagang` dalam pencarian fuzzy  Contoh: `Surgical Gown`. |
| `8` | `updated_from_date` | `string` | Isi dengan tanggal pencarian 'dari' format `YYYY-MM-DD`.  Contoh: `2024-05-01`. |
| `9` | `updated_to_date` | `string` | Isi dengan tanggal pencarian 'sampai' format `YYYY-MM-DD`.  Contoh: `2024-07-30`. |
| `10` | `farmalkes_type` | `string` | Isi dengan tipe kode yang sesuai dengan `farmalkes_type.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `device,pkrt`. |
| `11` | `category_code` | `string` | Isi dengan kode **level 1** yang sesuai dengan `kategori.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `02,03,04`. |
| `12` | `sub_category_code` | `string` | Isi dengan kode **level 2** yang sesuai dengan `sub_kategori.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `0204,0205`. |
| `13` | `type_code` | `string` | Isi dengan kode **level 3** yang sesuai dengan `jenis.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `0204001,0204002`. |
| `14` | `sub_type_code` | `string` | Isi dengan kode **level 4** yang sesuai dengan `jenis.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `0204001003,0204001005`. |

**Contoh Data**

```
{
  "page": 1,
  "size": 10,
  "state": "valid",
  "active": true,
  "kfa_code": "33069659",
  "reference_code": "AKD 21603020231",
  "search": "Surgical Gown",
  "updated_from_date": "2024-05-01",
  "updated_to_date": "2024-07-30",
  "farmalkes_type": "device",
  "category_code": "16",
  "sub_category_code": "1603",
  "type_code": "1603005",
  "sub_type_code": "1603005002"
}
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "meta": {
      "item_count": 12056,
      "page": {
          "is_cursor": false,
          "current": 1,
          "previous": 0,
          "next": 2,
          "limit": 10,
          "total": 10
      },
      "sort": null,
      "param": null,
      "data": [
          {
              "kfa_code": "33000002",
              "active": true,
              "barcode": "",
              "dapat_dibeli_lkpp": true,
              "discontinued": false,
              "display_name": "Hematology analyzer instrument/unit 3 diff (SYSMEX, XP-100)",
              "farmalkes_type": {
                  "code": "device",
                  "name": "device",
                  "group": "alkes"
              },
              "fix_price": 81082633,
              "fornas": false,
              "identifier_ids": [
                  {
                      "url": null,
                      "code": "33000002",
                      "name": "Hematology Analyzer Instrument/Unit 3 Diff",
                      "use": "official",
                      "end_date": null,
                      "start_date": null,
                      "source_code": "kemkes_ihs",
                      "source_name": "Kamus Farmalkes (KFA – IHS)"
                  },
                  {
                      "url": null,
                      "code": "AKL 20205310017",
                      "name": "SYSMEX XP-100 Automated Hematology Analyzer  and Accessories",
                      "use": "usual",
                      "end_date": "2026-01-28",
                      "start_date": "2020-07-17",
                      "source_code": "nie_regalkes",
                      "source_name": "NIE REGALKES"
                  },
                  {
                      "url": "https://e-katalog.lkpp.go.id/katalog/produk/detail/1370769?lang=id&type=province",
                      "code": "1370769",
                      "name": "Automated Hematology Analyzer XP 100 and Accessories include Peripherals",
                      "use": "usual",
                      "end_date": null,
                      "start_date": "2021-09-14",
                      "source_code": "produk_lkpp",
                      "source_name": "LKPP"
                  }
              ],
              "jenis": {
                  "code": "0205002",
                  "name": "Automated differential cell counter."
              },
              "kategori": {
                  "code": "02",
                  "name": "Peralatan Hematologi dan Patologi"
              },
              "klasifikasi_izin": {
                  "code": "ID",
                  "name": "Invitro Diagnostik",
                  "type": "device"
              },
              "kode_kbki": "4815010999",
              "kode_lkpp": "1370769",
              "manufacturer": "SYSMEX CORPORATION.",
              "manufacturer_country": {
                  "code": "JP",
                  "name": "Japan"
              },
              "med_dev_kelas_risiko": "B",
              "nama_dagang": "SYSMEX XP-100 Automated Hematology Analyzer  and Accessories",
              "nie": "AKL 20205310017",
              "product_template": {
                  "state": "valid",
                  "kfa_code": "32000009",
                  "name": "Hematology analyzer instrument/unit 3 diff",
                  "bmhp": false,
                  "synonyms": "Hematology analyzer 3 diff"
              },
              "produksi_buatan": "import",
              "registrar": "PT. SYSMEX INDONESIA",
              "registrar_country": {
                  "code": "ID",
                  "name": "Indonesia"
              },
              "score_bmp": 0,
              "score_tkdn": 30.29,
              "score_tkdn_bmp": 30.29,
              "stok_wajib_yankes": false,
              "sub_jenis": {
                  "code": "0205002003",
                  "name": "Hematology Analyzer"
              },
              "sub_kategori": {
                  "code": "0205",
                  "name": "Peralatan Hematologi Otomatis dan Semi Otomatis"
              },
              "tayang_lkpp": true,
              "ucum": {
                  "name": "internasional unit",
                  "ci_code": "[IU]",
                  "cs_code": "[IU]"
              },
              "uom_name": "Units",
              "uom_po_name": "Units",
              "updated_at": "2024-05-07T03:41:04.789Z",
              "variant_desc_farmalkes": "<p><br></p>",
              "variant_desc_usage": "<p><br></p>",
              "variant_desc_warning": "<p><br></p>",
              "variant_side_effect": "<p><br></p>",
              "volume": -1,
              "weight": -1,
              "product_state": "valid",
              "replacement": {
                  "product": {
                      "reason": "",
                      "kfa_code": ""
                  },
                  "template": {
                      "reason": "",
                      "kfa_code": ""
                  }
              }
          },
          /* lompat beberapa data */
          {
              "kfa_code": "33000013",
              "active": true,
              "barcode": "",
              "dapat_dibeli_lkpp": false,
              "discontinued": false,
              "display_name": "Hematology analyzer instrument/unit 5 diff (SYSMEX, XN-450)",
              "farmalkes_type": {
                  "code": "device",
                  "name": "device",
                  "group": "alkes"
              },
              "fix_price": 275729556,
              "fornas": false,
              "identifier_ids": [
                  {
                      "url": null,
                      "code": "33000013",
                      "name": "Hematology Analyzer Instrument/Unit 5 Diff",
                      "use": "official",
                      "end_date": null,
                      "start_date": null,
                      "source_code": "kemkes_ihs",
                      "source_name": "Kamus Farmalkes (KFA – IHS)"
                  },
                  {
                      "url": null,
                      "code": "AKL 20205515108",
                      "name": "SYSMEX Automated Hematology Analyzer XN-L Series, ",
                      "use": "usual",
                      "end_date": "2028-01-16",
                      "start_date": "2019-10-07",
                      "source_code": "nie_regalkes",
                      "source_name": "NIE REGALKES"
                  },
                  {
                      "url": "https://e-katalog.lkpp.go.id/katalog/produk/detail/1371585?lang=id&type=province",
                      "code": "1371585",
                      "name": "Automated Hematology Analyser XN-450 License and Accessories include Peripherals",
                      "use": "usual",
                      "end_date": null,
                      "start_date": "2021-09-14",
                      "source_code": "produk_lkpp",
                      "source_name": "LKPP"
                  }
              ],
              "jenis": {
                  "code": "0205002",
                  "name": "Automated differential cell counter."
              },
              "kategori": {
                  "code": "02",
                  "name": "Peralatan Hematologi dan Patologi"
              },
              "klasifikasi_izin": {
                  "code": "ID",
                  "name": "Invitro Diagnostik",
                  "type": "device"
              },
              "kode_kbki": "4815010999",
              "kode_lkpp": "1371585",
              "manufacturer": "SYSMEX CORPORATION.",
              "manufacturer_country": {
                  "code": "JP",
                  "name": "Japan"
              },
              "med_dev_kelas_risiko": "B",
              "nama_dagang": "SYSMEX Automated Hematology Analyzer XN-L Series, XN-450 and Accessories",
              "nie": "AKL 20205515108",
              "product_template": {
                  "state": "valid",
                  "kfa_code": "32000012",
                  "name": "Hematology analyzer instrument/unit 5 diff",
                  "bmhp": false,
                  "synonyms": ""
              },
              "produksi_buatan": "import",
              "registrar": "PT. SYSMEX INDONESIA",
              "registrar_country": {
                  "code": "ID",
                  "name": "Indonesia"
              },
              "score_bmp": 0,
              "score_tkdn": 30.29,
              "score_tkdn_bmp": 30.29,
              "stok_wajib_yankes": false,
              "sub_jenis": {
                  "code": "0205002003",
                  "name": "Hematology Analyzer"
              },
              "sub_kategori": {
                  "code": "0205",
                  "name": "Peralatan Hematologi Otomatis dan Semi Otomatis"
              },
              "tayang_lkpp": true,
              "ucum": {
                  "name": "internasional unit",
                  "ci_code": "[IU]",
                  "cs_code": "[IU]"
              },
              "uom_name": "Units",
              "uom_po_name": "Units",
              "updated_at": "2024-05-07T04:20:23.813Z",
              "variant_desc_farmalkes": "<p><br></p>",
              "variant_desc_usage": "<p><br></p>",
              "variant_desc_warning": "<p><br></p>",
              "variant_side_effect": "<p><br></p>",
              "volume": -1,
              "weight": -1,
              "product_state": "valid",
              "replacement": {
                  "product": {
                      "reason": "",
                      "kfa_code": ""
                  },
                  "template": {
                      "reason": "",
                      "kfa_code": ""
                  }
              }
          }
      ]
  }
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "detail": [{
      "loc": [
        "query",
        "code"
      ],
      "msg": "field required",
      "type": "value_error.missing"
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

### Contoh Pengunaan/Kode

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

#### cURL (Windows)

```
curl --location ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request POST ^
  "https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3/alkes/products"
```

#### cURL (Linux)

```
curl --location \
  --header 'Authorization: Bearer {bearer_token}' \
  --request POST \
  'https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3/alkes/products'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3/alkes/products
   ```
3. Lalu pilih *request method* `POST`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 6.2. Alkes Produk *Template*

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3/alkes/template
```

#### HTTP Verb/Method

```
POST
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |

#### Body (`application/json`)

```
DATA STRUCTURE:
{
  *page: integer (1)
  *size: integer (2)
  *state: string (3)
  *active: boolean (4)
  *kfa_code: string (5)
  *search: string (6)
  *updated_from_date: string (7)
  *updated_to_date: string (8)
  *farmalkes_type: string (9)
  *category_code: string (10)
  *sub_category_code: string (11)
  *type_code: string (12)
  *sub_type_code: string (13)
}
```

EXPLANATION:

| No | Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- | --- |
| `1` | `*page` | `integer` | Isi dengan nomor halaman (*page*) yang diinginkan.  Contoh: `1`. |
| `2` | `size` | `integer` | Isi dengan banyaknya data yang ingin ditampilkan dalam satu halaman (*page*).  Contoh: `100`. |
| `3` | `state` | `string` | Isi dengan state varian produk. Terdapat 2 option dalam varian produk `draft` dan `valid`  Contoh: `valid`. |
| `4` | `active` | `boolean` | Isi `true` menunjukan data sudah terhapus atau belum  Contoh: `true`. |
| `5` | `kfa_code` | `string` | Isi dengan kode kfa  Contoh: `33069659`. |
| `6` | `search` | `string` | Isi dengan `display_name`, `synonym`, atau `nama_dagang` dalam pencarian fuzzy  Contoh: `Surgical Gown`. |
| `7` | `updated_from_date` | `string` | Isi berdasarkan tanggal awal pencarian yang ingin ditampilkan, dengan format `YYYY-MM-DD`.  Contoh: `2024-05-01`. |
| `8` | `updated_to_date` | `string` | Isi berdasarkan tanggal akhir pencarian (sampai dengan) yang ingin ditampilkan, dengan format `YYYY-MM-DD`.  Contoh: `2024-07-30`. |
| `9` | `farmalkes_type` | `string` | Isi dengan tipe kode yang sesuai dengan `farmalkes_type.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `device,pkrt`. |
| `10` | `category_code` | `string` | Isi dengan kode **level 1** yang sesuai dengan `kategori.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `02,03,04`. |
| `11` | `sub_category_code` | `string` | Isi dengan kode **level 2** yang sesuai dengan `sub_kategori.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `0204,0205`. |
| `12` | `type_code` | `string` | Isi dengan kode **level 3** yang sesuai dengan `jenis.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `0204001,0204002`. |
| `13` | `sub_type_code` | `string` | Isi dengan kode **level 4** yang sesuai dengan `jenis.code`. Dapat diisi lebih dari satu yang dibatasi dengan 'koma'.  Contoh: `0204001003,0204001005`. |

**Contoh Data**

```
{
  "page": 1,
  "size": 10,
  "state": "valid",
  "active": true,
  "kfa_code": "32004358",
  "search": "acid",
  "updated_from_date": "2024-08-22",
  "updated_to_date": "2024-08-25",
  "farmalkes_type": "device",
  "category_code": "02",
  "sub_category_code": "0204",
  "type_code": "0204001",
  "sub_type_code": "0204001003"
}
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

**Contoh Data**

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

```
{
  "status": 200,
  "error": false,
  "message": "success",
  "meta": {
      "item_count": 11533,
      "page": {
          "is_cursor": false,
          "current": 1,
          "previous": 0,
          "next": 2,
          "limit": 10,
          "total": 10
      },
      "sort": null,
      "param": null,
      "data": [
          {
              "kfa_code": "32000002",
              "active": true,
              "bmhp": true,
              "desc_farmalkes": "<p><br></p>",
              "desc_usage": "<p><br></p>",
              "desc_warning": "<p><br></p>",
              "farmalkes_hscode": "",
              "farmalkes_type": {
                  "code": "device",
                  "name": "device",
                  "group": "alkes"
              },
              "fornas": false,
              "jenis": {
                  "code": "1603005",
                  "name": "Surgical apparel "
              },
              "kategori": {
                  "code": "16",
                  "name": "Peralatan Bedah Umum dan Bedah Plastik"
              },
              "klasifikasi_izin": {
                  "code": "NENS",
                  "name": "Non Elektromedik Non Steril",
                  "type": "device"
              },
              "med_dev_kelas_risiko": "B",
              "name": "Masker anak 3ply earloop",
              "replacement": {
                  "name": "",
                  "reason": "",
                  "kfa_code": ""
              },
              "side_effect": "<p><br></p>",
              "state": "valid",
              "stok_wajib_yankes": false,
              "sub_jenis": {
                  "code": "1603005001",
                  "name": "Surgical Mask"
              },
              "sub_kategori": {
                  "code": "1603",
                  "name": "Peralatan Bedah"
              },
              "synonyms": "",
              "ucum": {
                  "name": "internasional unit",
                  "ci_code": "[IU]",
                  "cs_code": "[IU]"
              },
              "uom_name": "Units",
              "uom_po_name": "Units",
              "updated_at": "2024-10-28T07:12:12.786Z"
          },
          /* lompat beberapa data */
          {
              "kfa_code": "32000012",
              "active": true,
              "bmhp": false,
              "desc_farmalkes": "<p><br></p>",
              "desc_usage": "<p><br></p>",
              "desc_warning": "<p><br></p>",
              "farmalkes_hscode": "",
              "farmalkes_type": {
                  "code": "device",
                  "name": "device",
                  "group": "alkes"
              },
              "fornas": false,
              "jenis": {
                  "code": "0205002",
                  "name": "Automated differential cell counter."
              },
              "kategori": {
                  "code": "02",
                  "name": "Peralatan Hematologi dan Patologi"
              },
              "klasifikasi_izin": {
                  "code": "ID",
                  "name": "Invitro Diagnostik",
                  "type": "device"
              },
              "med_dev_kelas_risiko": "B",
              "name": "Hematology analyzer instrument/unit 5 diff",
              "replacement": {
                  "name": "",
                  "reason": "",
                  "kfa_code": ""
              },
              "side_effect": "<p><br></p>",
              "state": "valid",
              "stok_wajib_yankes": false,
              "sub_jenis": {
                  "code": "0205002003",
                  "name": "Hematology Analyzer"
              },
              "sub_kategori": {
                  "code": "0205",
                  "name": "Peralatan Hematologi Otomatis dan Semi Otomatis"
              },
              "synonyms": "",
              "ucum": {
                  "name": "internasional unit",
                  "ci_code": "[IU]",
                  "cs_code": "[IU]"
              },
              "uom_name": "Units",
              "uom_po_name": "Units",
              "updated_at": "2024-11-05T04:39:45.714Z"
          }
      ]
  }
}
```

#### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi, tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

**Contoh Data**

```
{
  "status": 400,
  "error": true,
  "message": "invalid parameter(s)",
  "data": null
}
```

#### 5xx *Server Error* (`Content-Type: text/plain`)

Sistem akan mengembalikan pesan *error* bila terjadi kesalahan pada sisi server saat memproses data yang telah dikirimkan.

**Contoh Data**

```
Gateway Timeout
```

### Contoh Pengunaan/Kode

|  |  |
| --- | --- |
|  | Setiap nilai yang dicontohkan atau ditampilkan di dokumentasi ini adalah nilai yang tidak sebenarnya dan tidak dapat dipakai. Nilai-nilai tersebut hanya untuk keperluan contoh saja, tidak untuk dipakai. |

#### cURL (Windows)

```
curl --location ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request POST ^
  "https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3/alkes/template"
```

#### cURL (Linux)

```
curl --location \
  --header 'Authorization: Bearer {bearer_token}' \
  --request POST \
  'https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3/alkes/template'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/kfa-v3/alkes/template
   ```
3. Lalu pilih *request method* `POST`.
4. Pada tab **Auth**:
5. Pada tab **Headers**:
6. Pada tab **Params**, di bagian **Query Params**:
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.
