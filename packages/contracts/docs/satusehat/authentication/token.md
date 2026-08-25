> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/authentication/apis/token/

---

# Akses Token

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

##### Struktur Data

```
DATA STRUCTURE:
{ (1)
  *refresh_token_expires_in: number
  *api_product_list: string
  *api_product_list_json: [string]
  *organization_name: string
  *developer.email: string (2)
  *token_type: string
  *issued_at: string (3)
  *client_id: string (4)
  *access_token: string (5)
  *application_name: uuid
  *scope: number
  *expires_in: string (6)
  *refresh_count: number
  *status: string
}
```

|  |  |
| --- | --- |
| **1** | Respon yang diterima berupa `object`. |
| **2** | Properti `developer.email` bertipe `string`, berisi informasi akun kredensial (*email*) pengguna pada API SatuSehat. |
| **3** | Properti `issued_at` bertipe `string`, berisi informasi waktu pembuatan `access_token`. |
| **4** | Properti `client_id` bertipe `string`, berisi nilai akses API SATUSEHAT yang dapat dilihat pada website satusehat.kemkes.go.id/platform. |
| **5** | Properti `access_token` bertipe `string`, berisi nilai `bearer token` untuk digunakan di header authorization pada pemanggilan API SATUSEHAT. |
| **6** | Properti `expires_in` bertipe `number`, berisi informasi durasi waktu `access_token` dapat digunakan (dalam satuan detik). |

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

Sistem akan mengembalikan pesan *error* bila *client* belum melakukan autentikasi (*Unauthorized*), tidak memiliki akses, menggunakan HTTP *method* yang tidak tepat, atau mengirimkan data dengan format atau ketentuan yang tidak sesuai.

##### Struktur Data

```
DATA STRUCTURE:
{ (1)
  *resourceType: string (2)
  *issue: [{ (3)
    *severity: string
    *code: string
    *details: {
      *text: string
      }
    }
  ]
}
```

|  |  |
| --- | --- |
| **1** | Respon yang diterima berupa `object`. |
| **2** | Properti `resourceType` bertipe `string`, berisi nilai `OperationOutcome` (Resource FHIR untuk informasi hasil pemrosesan sistem). |
| **3** | Properti `issue` bertipe `array of objects`, berisi informasi "*The user or system was not able to be authenticated (either client\_id or client\_secret combination is unacceptable)*" (Ada kesalahan pengisian client\_id atau client\_secret pada body request) atau "*Authentication temporarily cannot be performed due to the rate limit policy. Rate limit: 1 request per minute after a failed attempt.*" (Setiap client\_id, hanya boleh salah pengisian client\_secret 1x dalam 1 menit, atau terlalu sering melakukan generate token baru dalam 1 menit). |

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
