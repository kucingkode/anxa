> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/kyc/kyc-doc/rest-api-kyc/

---

# ReST API

## 1. Autentikasi

Untuk melakukan transaksi data dari Know Your Customer (KYC), perlu dilakukan proses autentikasi terlebih dahulu agar mendapatkan akses yang tersedia. Autentikasi yang digunakan oleh Know Your Customer (KYC) mengikuti standar protokol OAuth 2 dengan tipe pemberian akses (*grant type*) adalah `client_credentials`.

Autentikasi menggunakan *grant type* `client_credentials` adalah proses autentikasi yang dilakukan antara *server to server*, sehingga tidak ada proses registrasi atau *log in* di sini. Autentikasi dengan tipe tersebut hanya memerlukan data berupa `client_id` dan `client_server`, di mana nilai tersebut didapatkan ketika pihak yang ingin menggunakan atau mengakses Know Your Customer (KYC) ini telah melakukan pengajuan, terdaftar, serta mendapatkan persetujuan dari **Kementerian Kesehatan Republik Indonesia**.

Cara Mendapatkan Nilai dari `client_id` dan `client_secret`

Pastikan sistem RME fasyankes telah terverifikasi di SATUSEHAT Platform (SSP) dan fasyankes sudah melakukan proses pemutakhiran data di aplikasi DFO/REGFASYANKES/RS ONLINE. Untuk informasi lebih lanjut dapat dilihat pada Panduan Registrasi.

|  |  |
| --- | --- |
|  | **Berikut ini ketentuan Kode Akses API:**  1. **Client ID** (**Client Secret**) hanya dapat digunakan oleh 1 **Organization ID**. 2. Terdapat validasi apabila **Client ID** (**Client Secret**) mengirimkan data **Organization ID** yang berbeda. *Response error* sebagai berikut:  ```    "text": "resource cannot be accessed due to business rule"    ``` 3. Kode Akses API bersifat **RAHASIA** di mana unik, personal, dan khusus disediakan hanya untuk Partner Interoperabilitas SATUSEHAT yang telah terverifikasi di SATUSEHAT Platform (SSP). 4. Partner Interoperabilitas SATUSEHAT, **DILARANG** menduplikasi, mempublikasi, dan/atau mendistribusikan dalam bentuk apapun, sebagian/keseluruhan informasi kode akses API kepada pihak yang tidak sah dan tidak berkepentingan. |

|  |  |
| --- | --- |
|  | Setiap teks yang berwarna **biru muda**, dapat diklik untuk melompat ke bagian yang direferensikan. |

Pada bagian ini akan dijelaskan spesifikasi untuk **ReST API Know Your Customer (KYC) Terkait Autentikasi**, yang mempunyai dua URL berdasarkan jenis lingkungan pengembangannya (*development environment*) yaitu:

* **Sandbox**: https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1
* **Production**: https://api-satusehat.kemkes.go.id/oauth2/v1

|  |  |
| --- | --- |
|  | Semua penerapan, penjelasan, dan contoh yang akan dibahas akan menggunakan *environment sandbox*. |

## 2. *Postman Collection*

Silakan mengunduh *Postman Collection* untuk melihat contoh/melakukan workshop secara mandiri pada website *Postman Collection* KYC melalui web *browser* Anda.

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
| `*client_id` | `string` | Nilai *client ID* yang telah didapatkan dari **Kementerian Kesehatan Republik Indonesia** setelah melakukan **Pengajuan dan Verifikasi Kode Akses API** pada website https://satusehat.kemkes.go.id/platform, **WAJIB** diisi. Nilai ini bisa disamakan seperti *username* yang akan digunakan untuk akses aplikasi. |
| `*client_secret` | `string` | Nilai *client secret* yang telah didapatkan dari **Kementerian Kesehatan Republik Indonesia** setelah melakukan **Pengajuan dan Verifikasi Kode Akses API** pada website https://satusehat.kemkes.go.id/platform, **WAJIB** diisi. Nilai ini bisa disamakan seperti kata sandi (*password*) yang akan digunakan untuk akses aplikasi. |

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

## 4. API Know Your Customer

## 4.1. *Generate* - URL Validasi (*Encrypted*)

Fungsi dari ReST API ini adalah untuk melakukan proses *generate* - URL Validasi dengan format terenkripsi baik secara *request* maupun responnya.

Untuk informasi lebih jelas terkait proses proses *key-generation*, *encryption*, & *decryption* pada *Library* KYC dapat dilihat pada *Sequence Diagram* di bawah ini:

Gambar 1. *Sequence Diagram Library* KYC

Berdasarkan alur proses di atas dapat dijelaskan sebagai berikut :

1. *key-generation* RSA untuk menghasilkan 1 pasang *key* yaitu: *public key* & *private key*;
2. *key-generation* AES untuk menghasilkan 1 buah AES *symmetric-key*;
3. menyematkan RSA *public-key* (hasil no. 1) ke dalam pesan, serta melakukan enkripsi keseluruhan pesan menggunakan AES *symmetric-key* (hasil no. 2) dengan;
4. enkripsi hasil no.2 dengan RSA *public key* dari SATUSEHAT;
5. Pemanggilan API *Generate* URL ke SATUSEHAT, menggunakan *payload* yg merupakan gabungan hasil no. 4 & no. 3;
6. *decrypt* AES *symmetric-key* dari *response* API *Generate* URL, menggunakan RSA *private-key* dari no. 1;
7. *decrypt* pesan dari *response* API *Generate* URL menggunakan AES *symmetric-key* dari hasil no. 6.

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/generate-url
```

#### HTTP Verb/Method

```
POST
```

#### Header

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `*Authorization` | `string` | *Header* ini **WAJIB** diisi dengan nilai sesuai format: `Bearer <access_token>`. Nilai dari variabel `<access_token>` didapatkan dari properti `access_token` pada `object` dari hasil *response* JSON setelah proses autentikasi. |
| `*Content-Type` | `string` | *Mime type* dari *payload* data yang akan dikirimkan di dalam *body* dalam format **Text**, **WAJIB** diisi dengan `text/plain`. |

#### Body

* Bentuk *Request* pada **Body (`text/plain`)** terenkripsi.

  **Struktur Data**

  ```
  -----BEGIN ENCRYPTED MESSAGE-----(1)
  ... (2)
  -----END ENCRYPTED MESSAGE-----(3)
  ```

  |  |  |
  | --- | --- |
  | **1** | *Request* teks **WAJIB** diawali dengan `-----BEGIN ENCRYPTED MESSAGE-----` pada baris paling awal yang diakhiri dengan *Escape character* yaitu `\r\n`. |
  | **2** | *Payload* yang akan dikirim berada pada bagian ini, dan harus dalam bentuk terenkripsi dengan format Base64 sesuai ketentuan semantik RFC 2045. |
  | **3** | *Request* teks **WAJIB** diakhiri dengan `-----END ENCRYPTED MESSAGE-----` pada baris paling akhir. |

  **Contoh Data**

  ```
  -----BEGIN ENCRYPTED MESSAGE-----
  imR0er0J0xjdlqFi+0D148UN54vyid+h5NGz8/vB5sChiPUVtS+72Ancyqcj22l5/UihwNCXG35N
  rSj21rNVFPWzSXT1tJE7a76MBhcSBs/mDS2dWJDaWVLTbqwFibO31b5kzNPNeunP7SlruwDfsoz8
  FzJtRAomRNf5XhnS4UnjI/532JnbbLlFhuOtzQbgbvCcuHWJjTzR+oDyL1O5q6FgABkbLjWYdcyq
  eAxU7MWBa60uwroIDqDhL+TkxFlqUN0R+Ag7Pza5kJ9oOlPRACAVYm88bzoJOYjMG3K25KVWKSB8
  LdQu78NiQrYKTSsHxe6v4XOsZrKc++XR5ob5iw821vcqI6KkxBzK1sLB5q7Pv2cprW6wioHRpbH6
  q8PcSXs+7FLQUdduxKV7hchc7XhCzPJwn021YrAaRJ/FgAqk3bNa1JFGdg7N552JRZJsarBqjP8z
  RcOhaMdHOwR+pZF4snfMB8t7Uj2hXp14c/bZJTVaME5XaLSdivRm5KqCFdhP4H59n2dj6mQdkgY0
  QKuV81XsKbEEZ+kj5FSQDIB+QBm1DXxpi4IEpSodeOmp07twbH5ahRFvzulf+UsHo94BJRzpEDLr
  uU6/Wzr540mgJpml38oWAj2j4qyf3ukclvL/yrfebT5uBDqmmqtskhAOI7NJAuNLisiyo8Ulfs2m
  IOqutu51IpLphzjuzkzRR5Bscm/vmVVZE1uv3tDQY1EVCZcXKgIOrMdxoCZLppqzX/Nx9sOFrCwF
  ydBxEe9DYrL4vUStxDMVPvaIDN8p/3w2f+KYnHZMN5Fh9xp0MLVk9FvO+C3QoaEDSK0rh941owbR
  ccuF+zMm+a9VIr+ss5Y2DM8zxQqpOf6YEWCqA7A0XFXW9VfVBst/SPYo96v4pYHimo67G+f1qhdV
  7y0yw6cXHjYF/EU7gptBryAWR6uNulepXIbtYuhoWrGbNEhTDsORlCrOmmBkzcavkWfOXZJcgLtT
  HGZHCNXh3+nCOncRsLL9NNdyG7/I7q6wc8EzLPpzsUWqn2Uv/tfOxj3TooGUvG5VPNBTnXSqjXpK
  iCdFKSyAx2K52yIZ0Ek/ItswNS1r97Y1HWUZoAT9hq4=
  -----END ENCRYPTED MESSAGE-----
  ```

* Bentuk *Request* pada **Body (`application/json`)** tidak terenkripsi.

  **Struktur Data**

  ```
  { (1)
    *agent_name: string (2)
    *agent_nik: string (3)
    *public_key: string (4)
  }
  ```

  |  |  |
  | --- | --- |
  | **1** | *Request* bertipe `object`. |
  | **2** | Properti `agent_name` bertipe `string`, berisi informasi nama petugas/operator Fasilitas Pelayanan Kesehatan (fasyankes) yang akan melakukan validasi. |
  | **3** | Properti `agent_nik` bertipe `string`, berisi informasi nomor identitas petugas/operator Fasilitas Pelayanan Kesehatan (fasyankes) yang akan melakukan validasi. |
  | **4** | Properti `public_key` bertipe `string`, berisi nilai *public\_key* yang didapat dari proses *key-generation* melalui *source code* (*library*) KYC yang disematkan pada SIMRS/SIMPUS masing-masing. |

  **Contoh Data**

  ```
  {
    "agent_name": "Bambang Wisanggeni",
    "agent_nik": "################",
    "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwqoicEXIYWYV3PvLIdvB\nqFkHn2IMhPGKTiB2XA56enpPb0UbI9oHoetRF41vfwMqfFsy5Yd5LABxMGyHJBbP\n+3fk2/PIfv+7+9/dKK7h1CaRTeT4lzJBiUM81hkCFlZjVFyHUFtaNfvQeO2OYb7U\nkK5JrdrB4sgf50gHikeDsyFUZD1o5JspdlfqDjANYAhfz3aam7kCjfYvjgneqkV8\npZDVqJpQA3MHAWBjGEJ+R8y03hs0aafWRfFG9AcyaA5Ct5waUOKHWWV9sv5DQXmb\nEAoqcx0ZPzmHJDQYlihPW4FIvb93fMik+eW8eZF3A920DzuuFucpblWU9J9o5w+2\noQIDAQAB\n-----END PUBLIC KEY-----"
  }
  ```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

* **2xx *Success* Terenkripsi**

  Dari hasil *response* ini, **PERLU** di *decryption* menggunakan *source code* (*library*) KYC agar properti `url` dapat terlihat, di mana nilai URL yang didapat berupa iFrame yang akan disematkan pada SIMRS/SIMPUS masing-masing.

  **Struktur Data**

  ```
  -----BEGIN ENCRYPTED MESSAGE-----(1)
  ... (2)
  -----END ENCRYPTED MESSAGE-----(3)
  ```

  |  |  |
  | --- | --- |
  | **1** | Respon teks diawali dengan `-----BEGIN ENCRYPTED MESSAGE-----` pada baris paling awal yang diakhiri dengan *Escape character* yaitu `\r\n`. |
  | **2** | Isi dari respon yang akan diterima berada pada bagian ini, dalam bentuk terenkripsi dengan format Base64 sesuai ketentuan semantik RFC 2045. |
  | **3** | Respon teks diakhiri dengan `-----END ENCRYPTED MESSAGE-----` pada baris paling akhir. |

  **Contoh Data**

  ```
  -----BEGIN ENCRYPTED MESSAGE-----
  SO17rr1jKx0UPpSB+XZ6Bq1GNryoSlqns6BCqjqauuI/lYXJLPJolG9HMehGQTbR/2D8Kw+loskS
  +NJhN8bGx1i66s71ehl1i5Ed9tOlmFWi8EbwLszLtEv5usqdDFHqi/J4M2DBuHsE+r3DGY+UQMa2
  oPqzulB2e5Qt0eCqUrJgFREj/+HCTv+x9p7WLiBazzGKoxqPttW6gOrqm8Yl+/M2tHQq8ft2pwwT
  Kqx1mJR5YwJYqrJ+75cFqGv13QHLJknT2gijgYiU/VV/dzctivNRHcLtN5bMYvSMPa1u0UpKj9fj
  05rbvB1WAzqUyH41XIbY424mRbSOUDWT2z9k5DlN1/AdAUZJoBE1SDbp7+qGb4Lv7TGrde1nP7xg
  sRd00ZHpXqOezNsBOZBjiM6Z4zBwMD5ATH9em+Di8VkPRjlflukbQfhpd2U6cYq40XwT3E8C4E7+
  Crg47Utb753/Gw2RH9k/pcNyqIaUePU8yhi44vEh7alYYLX+pu9sEl2nWmgOHRpD0vvjG3NlbehW
  3K+S7GK12Ast4ESnbh2YpuTUC0GoFbpqMQlaIYzFCdoMWcx8Yw8EW9mssFKVeGXqGmhYhUewj7qQ
  pA+NiK4RxpxgEF9gG8P91YvaPPDdoDghIa8fpEULb6IIwY5IXEU/Rqt5DWGFEmctl2bFwSt/RTfV
  qxIZ4dBQV/bh0nDMf3e87JVt6Wi3dLHWl63ZKU+m2i2MOYbEZBk=
  -----END ENCRYPTED MESSAGE-----
  ```

* **2xx *Success* Tidak Terenkripsi**

  Dari hasil *response* ini, **PERLU** disimpan URL yang didapat dari properti `url`, di mana nilai URL yang didapat berupa iFrame yang akan disematkan pada SIMRS/SIMPUS masing-masing.

  **Struktur Data**

  ```
  { (1)
    *metadata: { (2)
      *code: number (3)
      *message: string (4)
    }
    *data: { (5)
      *agent_name: string (6)
      *agent_nik: string (7)
      *token: uuid (8)
      *url: string (9)
    }
  }
  ```

  |  |  |
  | --- | --- |
  | **1** | Respon yang didapat bertipe `object`. |
  | **2** | Properti `metadata` bertipe `object`, detail dari respon HTTP yang didapatkan. |
  | **3** | Properti `code` bertipe `number`, berisi *HTTP Code*. |
  | **4** | Properti `message` bertipe `string`, berisi pesan terkait *HTTP Code* tersebut. |
  | **5** | Properti `data` bertipe `object`. |
  | **6** | Properti `agent_name` bertipe `string`, berisi informasi nama petugas/operator Fasilitas Pelayanan Kesehatan (fasyankes) yang akan melakukan validasi. |
  | **7** | Properti `agent_nik` bertipe `string`, berisi informasi nomor identitas petugas/operator Fasilitas Pelayanan Kesehatan (fasyankes) yang akan melakukan validasi. |
  | **8** | Properti `token` bertipe `uuid`, berisi nilai token yang terdapat pada URL sesuai nilai properti `data.url` yang terdapat pada respon ini. |
  | **9** | Properti `url` bertipe `string`, berisi URL lengkap beserta tokennya yang digunakan untuk melakukan validasi. |

  **Contoh Data**

  ```
  {
    "metadata": {
      "code": "200",
      "message": "OK"
    },
    "data": {
      "agent_name": "Bambang Wisanggeni",
      "agent_nik": "################",
      "token": "<token>",
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/kyc/v1/validation-web/<token>"
    }
  }
  ```

##### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* dengan format sebagai berikut:

* Apabila *client* belum melakukan autentikasi atau tidak memiliki akses.

  **Struktur Data**

  ```
  { (1)
    *fault: { (2)
      *faultstring: string (3)
      *detail: { (4)
        *errorcode: string (5)
      }
    }
  }
  ```

  |  |  |
  | --- | --- |
  | **1** | Respon yang didapat bertipe `object`. |
  | **2** | Properti `fault` bertipe `object`, berisi informasi *error*. |
  | **3** | Properti `faultstring` bertipe `string`, berisi pesan *error*. |
  | **4** | Properti `detail` bertipe `object`, berisi detail *error*. |
  | **5** | Properti `errorcode` bertipe `string`, berisi kode *error*. |

  **Contoh Data**

  ```
  {
    "fault": {
      "faultstring": "Invalid Access Token",
      "detail": {
        "errorcode": "keymanagement.service.invalid_access_token"
      }
    }
  }
  ```

* Apabila menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan lainnya yang tidak sesuai atau tidak dimengerti oleh sistem.

  **Struktur Data**

  ```
  { (1)
    *metadata: { (2)
      *code: number (3)
      *message: string (4)
    }
    *data: { (5)
      ...
    }
  }
  ```

  |  |  |
  | --- | --- |
  | **1** | Respon yang didapat bertipe `object`. |
  | **2** | Properti `metadata` bertipe `object`, detail dari respon HTTP yang didapatkan. |
  | **3** | Properti `code` bertipe `number`, berisi *HTTP Code*. |
  | **4** | Properti `message` bertipe `string`, berisi pesan terkait *HTTP Code* tersebut. |
  | **5** | Properti `data` bertipe `object`, berisi data dari respon *error*. |

  **Contoh Data**

  ```
  {
    "metadata": {
      "code": "400",
      "message": "Bad Request"
    },
    "data": {
      //data.terkait.error.response
    }
  }
  ```

##### 5xx *Server Error* (`Content-Type: text/plain`)

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
  --header "Content-Type: text/plain" ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request POST ^
  --data "-----BEGIN ENCRYPTED MESSAGE-----
    imR0er0J0xjdlqFi+0D148UN54vyid+h5NGz8/vB5sChiPUVtS+72Ancyqcj22l5/UihwNCXG35N
    rSj21rNVFPWzSXT1tJE7a76MBhcSBs/mDS2dWJDaWVLTbqwFibO31b5kzNPNeunP7SlruwDfsoz8
    FzJtRAomRNf5XhnS4UnjI/532JnbbLlFhuOtzQbgbvCcuHWJjTzR+oDyL1O5q6FgABkbLjWYdcyq
    eAxU7MWBa60uwroIDqDhL+TkxFlqUN0R+Ag7Pza5kJ9oOlPRACAVYm88bzoJOYjMG3K25KVWKSB8
    LdQu78NiQrYKTSsHxe6v4XOsZrKc++XR5ob5iw821vcqI6KkxBzK1sLB5q7Pv2cprW6wioHRpbH6
    q8PcSXs+7FLQUdduxKV7hchc7XhCzPJwn021YrAaRJ/FgAqk3bNa1JFGdg7N552JRZJsarBqjP8z
    RcOhaMdHOwR+pZF4snfMB8t7Uj2hXp14c/bZJTVaME5XaLSdivRm5KqCFdhP4H59n2dj6mQdkgY0
    QKuV81XsKbEEZ+kj5FSQDIB+QBm1DXxpi4IEpSodeOmp07twbH5ahRFvzulf+UsHo94BJRzpEDLr
    uU6/Wzr540mgJpml38oWAj2j4qyf3ukclvL/yrfebT5uBDqmmqtskhAOI7NJAuNLisiyo8Ulfs2m
    IOqutu51IpLphzjuzkzRR5Bscm/vmVVZE1uv3tDQY1EVCZcXKgIOrMdxoCZLppqzX/Nx9sOFrCwF
    ydBxEe9DYrL4vUStxDMVPvaIDN8p/3w2f+KYnHZMN5Fh9xp0MLVk9FvO+C3QoaEDSK0rh941owbR
    ccuF+zMm+a9VIr+ss5Y2DM8zxQqpOf6YEWCqA7A0XFXW9VfVBst/SPYo96v4pYHimo67G+f1qhdV
    7y0yw6cXHjYF/EU7gptBryAWR6uNulepXIbtYuhoWrGbNEhTDsORlCrOmmBkzcavkWfOXZJcgLtT
    HGZHCNXh3+nCOncRsLL9NNdyG7/I7q6wc8EzLPpzsUWqn2Uv/tfOxj3TooGUvG5VPNBTnXSqjXpK
    iCdFKSyAx2K52yIZ0Ek/ItswNS1r97Y1HWUZoAT9hq4=
    -----END ENCRYPTED MESSAGE-----" ^
  "https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/generate-url"
```

#### cURL (Linux)

```
curl --location \
  --header 'Content-Type: text/plain' \
  --header 'Authorization: Bearer {bearer_token}' \
  --request POST \
  --data '-----BEGIN ENCRYPTED MESSAGE-----
    imR0er0J0xjdlqFi+0D148UN54vyid+h5NGz8/vB5sChiPUVtS+72Ancyqcj22l5/UihwNCXG35N
    rSj21rNVFPWzSXT1tJE7a76MBhcSBs/mDS2dWJDaWVLTbqwFibO31b5kzNPNeunP7SlruwDfsoz8
    FzJtRAomRNf5XhnS4UnjI/532JnbbLlFhuOtzQbgbvCcuHWJjTzR+oDyL1O5q6FgABkbLjWYdcyq
    eAxU7MWBa60uwroIDqDhL+TkxFlqUN0R+Ag7Pza5kJ9oOlPRACAVYm88bzoJOYjMG3K25KVWKSB8
    LdQu78NiQrYKTSsHxe6v4XOsZrKc++XR5ob5iw821vcqI6KkxBzK1sLB5q7Pv2cprW6wioHRpbH6
    q8PcSXs+7FLQUdduxKV7hchc7XhCzPJwn021YrAaRJ/FgAqk3bNa1JFGdg7N552JRZJsarBqjP8z
    RcOhaMdHOwR+pZF4snfMB8t7Uj2hXp14c/bZJTVaME5XaLSdivRm5KqCFdhP4H59n2dj6mQdkgY0
    QKuV81XsKbEEZ+kj5FSQDIB+QBm1DXxpi4IEpSodeOmp07twbH5ahRFvzulf+UsHo94BJRzpEDLr
    uU6/Wzr540mgJpml38oWAj2j4qyf3ukclvL/yrfebT5uBDqmmqtskhAOI7NJAuNLisiyo8Ulfs2m
    IOqutu51IpLphzjuzkzRR5Bscm/vmVVZE1uv3tDQY1EVCZcXKgIOrMdxoCZLppqzX/Nx9sOFrCwF
    ydBxEe9DYrL4vUStxDMVPvaIDN8p/3w2f+KYnHZMN5Fh9xp0MLVk9FvO+C3QoaEDSK0rh941owbR
    ccuF+zMm+a9VIr+ss5Y2DM8zxQqpOf6YEWCqA7A0XFXW9VfVBst/SPYo96v4pYHimo67G+f1qhdV
    7y0yw6cXHjYF/EU7gptBryAWR6uNulepXIbtYuhoWrGbNEhTDsORlCrOmmBkzcavkWfOXZJcgLtT
    HGZHCNXh3+nCOncRsLL9NNdyG7/I7q6wc8EzLPpzsUWqn2Uv/tfOxj3TooGUvG5VPNBTnXSqjXpK
    iCdFKSyAx2K52yIZ0Ek/ItswNS1r97Y1HWUZoAT9hq4=
    -----END ENCRYPTED MESSAGE-----' \
  'https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/generate-url'
```

##### cURL (Windows) Tidak Terenkripsi

```
curl --location ^
  --header "Content-Type: application/json" ^
  --header "Authorization: Bearer {bearer_token}" ^
  --request POST ^
  --data "{
    \"agent_name\": \"Bambang Wisanggeni\",
    \"agent_nik\": \"################\"
    \"public_key\": \"-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwqoicEXIYWYV3PvLIdvB\nqFkHn2IMhPGKTiB2XA56enpPb0UbI9oHoetRF41vfwMqfFsy5Yd5LABxMGyHJBbP\n+3fk2/PIfv+7+9/dKK7h1CaRTeT4lzJBiUM81hkCFlZjVFyHUFtaNfvQeO2OYb7U\nkK5JrdrB4sgf50gHikeDsyFUZD1o5JspdlfqDjANYAhfz3aam7kCjfYvjgneqkV8\npZDVqJpQA3MHAWBjGEJ+R8y03hs0aafWRfFG9AcyaA5Ct5waUOKHWWV9sv5DQXmb\nEAoqcx0ZPzmHJDQYlihPW4FIvb93fMik+eW8eZF3A920DzuuFucpblWU9J9o5w+2\noQIDAQAB\n-----END PUBLIC KEY-----\"
  }" ^
  "https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/generate-url"
```

##### cURL (Linux) Tidak Terenkripsi

```
curl --location \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {bearer_token}' \
  --request POST \
  --data '{
    "agent_name": "Bambang Wisanggeni",
    "agent_nik": "################",
    "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwqoicEXIYWYV3PvLIdvB\nqFkHn2IMhPGKTiB2XA56enpPb0UbI9oHoetRF41vfwMqfFsy5Yd5LABxMGyHJBbP\n+3fk2/PIfv+7+9/dKK7h1CaRTeT4lzJBiUM81hkCFlZjVFyHUFtaNfvQeO2OYb7U\nkK5JrdrB4sgf50gHikeDsyFUZD1o5JspdlfqDjANYAhfz3aam7kCjfYvjgneqkV8\npZDVqJpQA3MHAWBjGEJ+R8y03hs0aafWRfFG9AcyaA5Ct5waUOKHWWV9sv5DQXmb\nEAoqcx0ZPzmHJDQYlihPW4FIvb93fMik+eW8eZF3A920DzuuFucpblWU9J9o5w+2\noQIDAQAB\n-----END PUBLIC KEY-----"
  }' \
  'https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/generate-url'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/generate-url
   ```
3. Lalu pilih *request method* `POST`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Body** bentuk *Request* pada **Body (`text/plain`)** terenkripsi:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **Text**,
   3. terakhir masukkan **Text** yang akan diproses ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      -----BEGIN ENCRYPTED MESSAGE-----
      imR0er0J0xjdlqFi+0D148UN54vyid+h5NGz8/vB5sChiPUVtS+72Ancyqcj22l5/UihwNCXG35N
      rSj21rNVFPWzSXT1tJE7a76MBhcSBs/mDS2dWJDaWVLTbqwFibO31b5kzNPNeunP7SlruwDfsoz8
      FzJtRAomRNf5XhnS4UnjI/532JnbbLlFhuOtzQbgbvCcuHWJjTzR+oDyL1O5q6FgABkbLjWYdcyq
      eAxU7MWBa60uwroIDqDhL+TkxFlqUN0R+Ag7Pza5kJ9oOlPRACAVYm88bzoJOYjMG3K25KVWKSB8
      LdQu78NiQrYKTSsHxe6v4XOsZrKc++XR5ob5iw821vcqI6KkxBzK1sLB5q7Pv2cprW6wioHRpbH6
      q8PcSXs+7FLQUdduxKV7hchc7XhCzPJwn021YrAaRJ/FgAqk3bNa1JFGdg7N552JRZJsarBqjP8z
      RcOhaMdHOwR+pZF4snfMB8t7Uj2hXp14c/bZJTVaME5XaLSdivRm5KqCFdhP4H59n2dj6mQdkgY0
      QKuV81XsKbEEZ+kj5FSQDIB+QBm1DXxpi4IEpSodeOmp07twbH5ahRFvzulf+UsHo94BJRzpEDLr
      uU6/Wzr540mgJpml38oWAj2j4qyf3ukclvL/yrfebT5uBDqmmqtskhAOI7NJAuNLisiyo8Ulfs2m
      IOqutu51IpLphzjuzkzRR5Bscm/vmVVZE1uv3tDQY1EVCZcXKgIOrMdxoCZLppqzX/Nx9sOFrCwF
      ydBxEe9DYrL4vUStxDMVPvaIDN8p/3w2f+KYnHZMN5Fh9xp0MLVk9FvO+C3QoaEDSK0rh941owbR
      ccuF+zMm+a9VIr+ss5Y2DM8zxQqpOf6YEWCqA7A0XFXW9VfVBst/SPYo96v4pYHimo67G+f1qhdV
      7y0yw6cXHjYF/EU7gptBryAWR6uNulepXIbtYuhoWrGbNEhTDsORlCrOmmBkzcavkWfOXZJcgLtT
      HGZHCNXh3+nCOncRsLL9NNdyG7/I7q6wc8EzLPpzsUWqn2Uv/tfOxj3TooGUvG5VPNBTnXSqjXpK
      iCdFKSyAx2K52yIZ0Ek/ItswNS1r97Y1HWUZoAT9hq4=
      -----END ENCRYPTED MESSAGE-----
      ```

6. Pada tab **Body** bentuk *Request* pada **Body (`application/json`)** tidak terenkripsi:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **JSON**,
   3. Atau masukkan **JSON** yang akan diproses ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      {
        "agent_name": "Bambang Wisanggeni",
        "agent_nik": "################",
        "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwqoicEXIYWYV3PvLIdvB\nqFkHn2IMhPGKTiB2XA56enpPb0UbI9oHoetRF41vfwMqfFsy5Yd5LABxMGyHJBbP\n+3fk2/PIfv+7+9/dKK7h1CaRTeT4lzJBiUM81hkCFlZjVFyHUFtaNfvQeO2OYb7U\nkK5JrdrB4sgf50gHikeDsyFUZD1o5JspdlfqDjANYAhfz3aam7kCjfYvjgneqkV8\npZDVqJpQA3MHAWBjGEJ+R8y03hs0aafWRfFG9AcyaA5Ct5waUOKHWWV9sv5DQXmb\nEAoqcx0ZPzmHJDQYlihPW4FIvb93fMik+eW8eZF3A920DzuuFucpblWU9J9o5w+2\noQIDAQAB\n-----END PUBLIC KEY-----"
      }
      ```
7. Klik tombol **Send**.
8. Hasil *response* akan ditampilkan di bagian **Response**.

## 4.2. *Generate* - Kode Verifikasi

Fungsi dari ReST API ini adalah untuk melakukan proses *Generate* - Kode Verifikasi di mana nilai tersebut akan muncul di SATUSEHAT Mobile (SSM) dan digunakan oleh pasien untuk proses validasi

|  |  |
| --- | --- |
|  | Setiap terdapat simbol asterik `*` sebelum nama variabel atau parameter yang disebutkan, maka variabel atau parameter tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: `*variabel`. |

### Request

#### URL

```
https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/challenge-code
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

##### Struktur Data

```
{ (1)
  *metadata: { (2)
    *method: string (3)
  }
  *data: { (4)
    *nik: string (5)
    *name: string (6)
  }
}
```

|  |  |
| --- | --- |
| **1** | *Request* bertipe `object`. |
| **2** | Properti `metadata` bertipe `object`, berisi informasi data tambahan yang akan diproses oleh server. |
| **3** | Properti `method` bertipe `string`, berisi metode untuk melakukan permintaan *challenge code*, saat ini hanya berisi nilai statis yaitu `request_per_nik`. |
| **4** | Properti `data` bertipe `object`, berisi informasi pasien yang akan diverifikasi oleh petugas/operator Fasilitas Pelayanan Kesehatan (fasyankes). |
| **5** | Properti `nik` bertipe `string`, berisi informasi nomor identitas pasien. |
| **6** | Properti `name` bertipe `string`, berisi informasi nama pasien. |

##### Contoh Data

```
{
  "metadata": {
    "method": "request_per_nik"
  },
  "data": {
    "nik": "################",
    "name": "Budi Santoso"
  }
}
```

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Dari hasil *response* ini, **PERLU** disimpan nilai kode verifikasi pasien yang didapat dari properti `challenge_code`, di mana nilai tersebut akan muncul di SSM dan digunakan oleh pasien untuk proses validasi.

##### Struktur Data

```
{ (1)
  *metadata: { (2)
    *code: number (3)
    *message: string (4)
  }
  *data: { (5)
    *nik: string (6)
    *name: string (7)
    *ihs_number: string (8)
    *challenge_code: number (9)
    *created_timestamp: string (10)
    *expired_timestamp: string (11)
  }
}
```

|  |  |
| --- | --- |
| **1** | Respon yang didapat bertipe `object`. |
| **2** | Properti `metadata` bertipe `object`, detail dari respon HTTP yang didapatkan. |
| **3** | Properti `code` bertipe `number`, berisi *HTTP Code*. |
| **4** | Properti `message` bertipe `string`, berisi pesan terkait *HTTP Code* tersebut. |
| **5** | Properti `data` bertipe `object`. |
| **6** | Properti `nik` bertipe `string`, berisi informasi nomor identitas pasien yang akan diverifikasi oleh petugas/operator Fasilitas Pelayanan Kesehatan (fasyankes). |
| **7** | Properti `name` bertipe `string`, berisi informasi nama pasien yang akan diverifikasi oleh petugas/operator Fasilitas Pelayanan Kesehatan (fasyankes). |
| **8** | Properti `ihs_number` bertipe `string`, berisi nomor id SATUSEHAT pasien. |
| **9** | Properti `challenge_code` bertipe `number`, berisi nilai kode verikasi pasien untuk proses validasi. |
| **10** | Properti `created_timestamp` bertipe `string`, berisi informasi waktu kode verikasi dibuat. |
| **11** | Properti `expired_timestamp` bertipe `string`, berisi informasi kadaluarsa kode verikasi tersebut. |

##### Contoh Data

```
{
  "metadata": {
    "code": "200",
    "message": "OK"
  },
  "data": {
    "nik": "################",
    "name": "Budi Santoso",
    "ihs_number": "############",
    "challenge_code": "804821",
    "created_timestamp": "2023-05-25T03:26:13+07:00",
    "expired_timestamp": "2023-05-25T03:31:13+07:00"
  }
}
```

##### 4xx *Client Error*

Sistem akan mengembalikan pesan *error* dengan format sebagai berikut:

* Apabila *client* belum melakukan autentikasi atau tidak memiliki akses.

  **Struktur Data**

  ```
  { (1)
    *fault: { (2)
      *faultstring: string (3)
      *detail: { (4)
        *errorcode: string (5)
      }
    }
  }
  ```

  |  |  |
  | --- | --- |
  | **1** | Respon yang didapat bertipe `object`. |
  | **2** | Properti `fault` bertipe `object`, berisi informasi *error*. |
  | **3** | Properti `faultstring` bertipe `string`, berisi pesan *error*. |
  | **4** | Properti `detail` bertipe `object`, berisi detail *error*. |
  | **5** | Properti `errorcode` bertipe `string`, berisi kode *error*. |

  **Contoh Data**

  ```
  {
    "fault": {
      "faultstring": "Invalid Access Token",
      "detail": {
        "errorcode": "keymanagement.service.invalid_access_token"
      }
    }
  }
  ```

* Apabila menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan lainnya yang tidak sesuai atau tidak dimengerti oleh sistem.

  **Struktur Data**

  ```
  { (1)
    *metadata: { (2)
      *code: number (3)
      *message: string (4)
    }
    *data: { (5)
      ...
    }
  }
  ```

  |  |  |
  | --- | --- |
  | **1** | Respon yang didapat bertipe `object`. |
  | **2** | Properti `metadata` bertipe `object`, detail dari respon HTTP yang didapatkan. |
  | **3** | Properti `code` bertipe `number`, berisi *HTTP Code*. |
  | **4** | Properti `message` bertipe `string`, berisi pesan terkait *HTTP Code* tersebut. |
  | **5** | Properti `data` bertipe `object`, berisi data dari respon *error*. |

  **Contoh Data**

  ```
  {
    "metadata": {
      "code": "400",
      "message": "Bad Request"
    },
    "data": {
      //data.terkait.error.response
    }
  }
  ```

##### 5xx *Server Error* (`Content-Type: text/plain`)

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
  --request POST ^
  --data "{
    \"metadata\": {
      \"method\": \"request_per_nik\"
    },
    \"data\": {
      \"nik\": \"################\",
      \"name\": \"Budi Santoso\"
    }
  }" ^
  "https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/challenge-code"
```

#### cURL (Linux)

```
curl --location \
  --header 'Authorization: Bearer {bearer_token}' \
  --request POST \
  --data '{
    "metadata": {
      "method": "request_per_nik"
    },
    "data": {
      "nik": "################",
      "name": "Budi Santoso"
    }
  }' \
  'https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/challenge-code'
```

#### Postman

1. Buat *request* baru menggunakan **New**  **HTTP Request**, atau klik tombol **+** untuk buat tab *request* baru.
2. Masukkan *request* URL

   ```
   https://api-satusehat-stg.dto.kemkes.go.id/kyc/v1/challenge-code
   ```
3. Lalu pilih *request method* `POST`.
4. Pada tab **Auth**:

   1. pada pilihan **Type**, pilih `Bearer Token`,
   2. lalu masukkan nilai akses token yang sudah didapatkan pada saat autentikasi pada kotak inputan **Token**.
5. Pada tab **Body**:

   1. pilih **raw**,
   2. kemudian di samping nilai tadi pilih **JSON**,
   3. terakhir masukkan **JSON** yang akan diproses ke kotak masukkan di bawah pilihan tadi. Contoh:

      ```
      {
        "metadata": {
          "method": "request_per_nik"
        },
        "data": {
          "nik": "################",
          "name": "Budi Santoso"
        }
      }
      ```
6. Klik tombol **Send**.
7. Hasil *response* akan ditampilkan di bagian **Response**.
