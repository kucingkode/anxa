> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/onboardings/apis/patient/

---

# Patient

## Pencarian Data

Fungsi dari ReST API ini adalah untuk mencari data terkait resource Patient yang tersedia di ekosistem SATUSEHAT dengan parameter-parameter tertentu.

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
| `?name` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin pasien**. Berisi nama, baik sebagian atau lengkap, dari pasien yang akan dicari.  Contoh: `smith`.  |  |  | | --- | --- | |  | Terdapat validasi pada penulisan nama, maka pastikan nama yang di *input* benar sesuai dengan data yang terdapat di SATUSEHAT. | |
| `?birthdate` | `date` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin pasien**. Berisi tanggal dengan format salah satu dari `YYYY`, `YYYY-MM`, atau `YYYY-MM-DD`.  Contoh: `1980-01`. |
| `?nik` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan NIK pasien**. Berisi NIK (Nomor Induk Kependudukan) yang terdapat di KTP (Kartu Tanda Penduduk) dari pasien yang bersangkutan.  Contoh: ################ |

##### 3. Bayi Baru Lahir - Pencarian Berdasarkan NIK Ibu

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?identifier` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data bayi baru lahir dengan NIK ibu**. Nilai yang dimasukkan harus mempunyai format:  ``` https://fhir.kemkes.go.id/id/nik-ibu|<nik-ibu> ```  di mana `<nik-ibu>` berisi NIK dari ibu yang akan dicari. Sebagai contoh, diketahui NIK ibu dari pasien `################`, sehingga nilai yang dimasukkan untuk parameter ini adalah:  ``` https://fhir.kemkes.go.id/id/nik-ibu|################ ``` |

###### 4. Pencarian Berdasarkan Nama, Tanggal Lahir, dan Gender Pasien

| Nama Parameter | Tipe Data | Keterangan |
| --- | --- | --- |
| `?name` | `string` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin pasien**. Berisi nama, baik sebagian atau lengkap, dari pasien yang akan dicari.  Contoh: `smith`.  |  |  | | --- | --- | |  | Terdapat validasi pada penulisan nama, maka pastikan nama yang di *input* benar sesuai dengan data yang terdapat di SATUSEHAT. | |
| `?birthdate` | `date` | Parameter ini **WAJIB** **ada bila melakukan pencarian data dengan nama, tanggal lahir, dan jenis kelamin pasien**. Berisi tanggal dengan format salah satu dari `YYYY`, `YYYY-MM`, atau `YYYY-MM-DD`. Terkait penjelasan format tersebut bisa dilihat pada bagian **Pengantar Teknis, Format Tanggal dan Waktu**.  Contoh: `1980-01`. |
| `?gender` | `string` | Diisi dengan jenis kelamin pasien: `male` (laki-laki) / `female` (perempuan)  Contoh: `male` |

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

### Response

Hasil *response*, dengan HTTP *Status Code* berpola `2xx` atau `4xx`, yang dikembalikan dari server mempunyai parameter `Content-Type` dengan nilai `application/json` di salah satu parameter *header*-nya.

#### 2xx *Success*

Bila resource Patient dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource Patient yang tersimpan di ekosistem SATUSEHAT.

**Contoh Data Pencarian Berdasarkan NIK Pasien**

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

**Contoh Data Pencarian Berdasarkan Nama, Tanggal Lahir, dan NIK Pasien**

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

**Contoh Data Bayi Baru Lahir - Pencarian Berdasarkan NIK Ibu**

```
{
  "entry": [
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102825",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102825",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102825"
          }
        ],
        "language": "id",
        "meta": {
          "lastUpdated": "2023-10-17T06:26:21.585017+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient|4.0.1",
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY5NzUyMzk4MTU4NTAxNzAwMA"
        },
        "name": [
          {
            "text": "Sambo",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/ee3bff43-6b72-4a72-a41a-af4164e0eacf",
      "resource": {
        "active": true,
        "birthDate": "2023-05-24",
        "id": "ee3bff43-6b72-4a72-a41a-af4164e0eacf",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/paspor",
            "use": "official",
            "value": "#########"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/kk",
            "use": "official",
            "value": "###############"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029103384"
          }
        ],
        "meta": {
          "lastUpdated": "2023-05-25T07:06:42.937195+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY4NDk5ODQwMjkzNzE5NTAwMA"
        },
        "name": [
          {
            "text": "John Smith",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102814",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102814",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102814"
          }
        ],
        "meta": {
          "lastUpdated": "2023-03-08T13:18:43.477704+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY3ODI4MTUyMzQ3NzcwNDAwMA"
        },
        "name": [
          {
            "text": "Roni",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102803",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102803",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102803"
          }
        ],
        "meta": {
          "lastUpdated": "2023-03-08T13:13:49.966892+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY3ODI4MTIyOTk2Njg5MjAwMA"
        },
        "name": [
          {
            "text": "Hulk",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102778",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102778",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102778"
          }
        ],
        "meta": {
          "lastUpdated": "2023-03-08T12:18:53.600353+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY3ODI3NzkzMzYwMDM1MzAwMA"
        },
        "name": [
          {
            "text": "Stark",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102767",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102767",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102767"
          }
        ],
        "meta": {
          "lastUpdated": "2023-03-08T11:11:12.338686+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY3ODI3Mzg3MjMzODY4NjAwMA"
        },
        "name": [
          {
            "text": "Toni",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102756",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102756",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102756"
          }
        ],
        "meta": {
          "lastUpdated": "2023-03-08T11:06:36.858381+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY3ODI3MzU5Njg1ODM4MTAwMA"
        },
        "name": [
          {
            "text": "Budi",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102745",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102745",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102745"
          }
        ],
        "meta": {
          "lastUpdated": "2023-03-08T11:05:37.879975+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY3ODI3MzUzNzg3OTk3NTAwMA"
        },
        "name": [
          {
            "text": "Mardigu",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102734",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102734",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102734"
          }
        ],
        "meta": {
          "lastUpdated": "2023-03-08T11:00:54.720631+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY3ODI3MzI1NDcyMDYzMTAwMA"
        },
        "name": [
          {
            "text": "Dodi",
            "use": "official"
          }
        ],
        "resourceType": "Patient"
      }
    },
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02029102723",
      "resource": {
        "active": true,
        "birthDate": "1920-02-28",
        "id": "P02029102723",
        "identifier": [
          {
            "system": "https://fhir.kemkes.go.id/id/nik-ibu",
            "use": "official",
            "value": "################"
          },
          {
            "system": "https://fhir.kemkes.go.id/id/ihs-number",
            "use": "official",
            "value": "P02029102723"
          }
        ],
        "meta": {
          "lastUpdated": "2023-03-08T10:59:48.626894+00:00",
          "profile": [
            "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY3ODI3MzE4ODYyNjg5NDAwMA"
        },
        "name": [
          {
            "text": "Anang",
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
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?identifier=https%3A%2F%2Ffhir.kemkes.go.id%2Fid%2Fnik-ibu%7C367400001111222"
    },
    {
      "relation": "first",
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?identifier=https%3A%2F%2Ffhir.kemkes.go.id%2Fid%2Fnik-ibu%7C367400001111222"
    },
    {
      "relation": "self",
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?identifier=https%3A%2F%2Ffhir.kemkes.go.id%2Fid%2Fnik-ibu%7C367400001111222"
    }
  ],
  "resourceType": "Bundle",
  "total": 10,
  "type": "searchset"
}
```

**Contoh Data Pencarian Berdasarkan Nama, Tanggal Lahir, dan Gender Pasien**

```
{
  "entry": [
    {
      "fullUrl": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/P02478375538",
      "resource": {
        "active": true,
        "address": [
          {
            "city": "MUNA",
            "country": "ID",
            "extension": [
              {
                "extension": [
                  {
                    "url": "province",
                    "valueCode": "74"
                  },
                  {
                    "url": "city",
                    "valueCode": "3"
                  },
                  {
                    "url": "district",
                    "valueCode": "26"
                  },
                  {
                    "url": "village",
                    "valueCode": "1008"
                  },
                  {
                    "url": "rw",
                    "valueCode": "1"
                  },
                  {
                    "url": "rt",
                    "valueCode": "1"
                  }
                ],
                "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode"
              }
            ],
            "line": [
              "KEL.TOMBU***"
            ],
            "use": "home"
          }
        ],
        "birthDate": "1980-12-03",
        "communication": [
          {
            "language": {
              "coding": [
                {
                  "code": "id-ID",
                  "display": "Indonesian",
                  "system": "urn:ietf:bcp:47"
                }
              ],
              "text": "Indonesian"
            },
            "preferred": true
          }
        ],
        "deceasedBoolean": false,
        "extension": [
          {
            "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus",
            "valueCode": "WNI"
          }
        ],
        "gender": "male",
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
        "multipleBirthBoolean": false,
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
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?birthdate=1980-12-03&gender=male&name=patient+1"
    },
    {
      "relation": "first",
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?birthdate=1980-12-03&gender=male&name=patient+1"
    },
    {
      "relation": "self",
      "url": "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Patient/?birthdate=1980-12-03&gender=male&name=patient+1"
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

Fungsi dari ReST API ini adalah untuk mendapatkan data terkait resource Patient yang tersedia di ekosistem SATUSEHAT. Untuk mendapatkan data yang dimaksud, nilai ID dari resource Patient tersebut **PERLU** diketahui dan disediakan sebagai parameternya.

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

Bila resource Patient dengan ID terkait berhasil ditemukan atau tersedia, maka akan mengembalikan data dari resource Patient yang tersimpan di ekosistem SATUSEHAT.

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

Fungsi dari ReST API ini adalah untuk melakukan penambahan data terkait resource Patient ke dalam ekosistem SATUSEHAT.

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

Terkait cara pengisian Body (`application/json`) dari format FHIR resource `Patient` tersebut, silakan lihat dokumentasi terkait **FHIR**, **Panduan Interoperabilitas** yang telah disediakan oleh tim SATUSEHAT dari **Kementerian Kesehatan Republik Indonesia**, atau lihat contoh di Postman SATUSEHAT.

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

Di bagian *body* ini *payload* JSON dari *resource* `Patient` dengan `identifier` NIK Ibu sesuai standar FHIR dimasukkan. Terkait cara pengisian dari format FHIR tersebut silakan lihat contoh di Postman SATUSEHAT dan dokumentasi pada menu Panduan Interoperabilitas sesuai dengan modul pelayanan dan/atau penerapan *(use case)* masing-masing.

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

Fungsi dari ReST API ini adalah untuk melakukan perubahan sebagian dari data terkait resource Patient ke dalam ekosistem SATUSEHAT, yang sebelumnya sudah ditambahkan dan tersedia di dalam ekosistem SATUSEHAT. Untuk melakukan perubahan sebagian (*patching*) data, **PERLU** ID dari resource Patient yang akan diubah dan juga nama/ID elemen dari Patient yang akan dilakukan perubahan.

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

## Daftar Data Pasien untuk Proses Uji Coba/Sandbox(Staging)

Silakan gunakan data pasien (`Patient`) *dummy* yang disediakan oleh SATUSEHAT di bawah ini saat proses uji coba pengiriman data (Sandbox).

|  |  |
| --- | --- |
|  | Data *dummy* ini **hanya dapat digunakan** pada *environment* Sandbox. |

### PatientID dan NIK

Tabel 2. Daftar Data Pasien

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
