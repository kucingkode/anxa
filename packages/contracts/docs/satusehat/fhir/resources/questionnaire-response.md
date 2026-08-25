> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/questionnaire-response/

---

# QuestionnaireResponse

Data terkait Pemeriksaan Ibu dapat dikirimkan melalui *resource* `Observation` dan `QuestionnaireResponse`.

Berikut pemetaan nilai untuk QuestionnaireResponse yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data pelayanan kehamilan pemeriksaan ibu:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## QuestionnaireResponse.identifier

Berisi data ID lokal resmi dari institusi terkait hasil kuesioner dengan tipe data `Identifier`.

## QuestionnaireResponse.basedOn[i]

Berisi data permintaan yang diselesaikan oleh hasil kuesioner dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `CarePlan | ServiceRequest`.

## QuestionnaireResponse.partOf[i]

Berisi data suatu prosedur atau observasi di mana kuesioner ini dilakukan dengan tipe data `Reference` yang direferensikan ke data yang tersimpan di *resource* `Observation | Procedure`.

## QuestionnaireResponse.questionnaire

Berisi data kuesioner yang dijawab. Diisi dengan url kuesioner yang dijawab dengan tipe data `canonical(Questionnaire)`.

**Contoh JSON**

```
"https://fhir.kemkes.go.id/Questionnaire/Q0002"
```

## \*QuestionnaireResponse.status

Berisi data status jawaban kuesioner dengan tipe data `code`, yang nilainya mengacu pada data terminologi `QuestionnaireResponseStatus` (http://hl7.org/fhir/questionnaire-answers-status). Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"completed"
```

## QuestionnaireResponse.subject

Berisi data referensi ke pasien yang menjawab kuesioner dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient`, yang nilainya memiliki format:

```
"Patient/{patient-ihs-number}"
```

Di mana isi dari parameter `{patient-ihs-number}` adalah nomor ID pasien yang didapatkan dari master pasien indeks. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "Patient/P02280547535",
  "display": "patient 6"
}
```

## QuestionnaireResponse.encounter

Berisi data informasi terkait kunjungan di mana jawaban kuesioner didapatkan dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Encounter`, yang nilainya memiliki format:

```
"Encounter/{ID-resource-Encounter}"
```

Di mana isi dari parameter `{ID-resource-Encounter}` adalah nomor ID `Encounter` yang didapatkan dari *server*. Untuk informasi lebih lanjut dapat dilihat pada Panduan Interoperabilitas sesuai dengan *use case* masing-masing (klik **di sini**)

**Contoh JSON**

```
{
  "reference": "Encounter/66533eb2-723d-4e7c-b7aa-500cd67dd4c8"
}
```

## QuestionnaireResponse.authored

Berisi data waktu di mana jawaban kuesioner didapatkan dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

**Contoh JSON**

```
"2022-07-26T10:00:00+07:00"
```

## QuestionnaireResponse.author

Berisi data individu yang mendapatkan dan mencatatkan jawaban kuesioner dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Device | Practitioner | PractitionerRole | Patient | RelatedPerson | Organization`.

**Contoh JSON**

```
{
  "reference": "Practitioner/N10000001"
}
```

## QuestionnaireResponse.source

Berisi data individu yang menjadi sumber dari jawaban kuesioner dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Patient | Practitioner | PractitionerRole | RelatedPerson`.

**Contoh JSON**

```
{
  "reference": "Patient/P02280547535"
}
```

## QuestionnaireResponse.item[i]

Berisi data jawaban dari kuesioner dengan tipe data `BackboneElement`.

### \*QuestionnaireResponse.item.linkId

Berisi data pointer untuk pertanyaan/item pada kuesioner dengan tipe data `string`.

### QuestionnaireResponse.item.definition

Berisi data definisi atau detail dari pertanyaan/item dengan tipe data `uri`.

### QuestionnaireResponse.item.text

Berisi data nama pertanyaan kuesioner dengan tipe data `string`.

### QuestionnaireResponse.item.answer[i]

Berisi satu atau lebih daftar data jawaban dari kuesioner dengan tipe data `BackboneElement`.

#### QuestionnaireResponse.item.answer.value<?>

Berisi data jawaban dari kuesioner. Format jawaban tergantung pertanyaan pada kuesioner, dengan pilihan format jawaban seperti berikut ini:

##### QuestionnaireResponse.item.answer.valueBoolean

##### QuestionnaireResponse.item.answer.valueDecimal

##### QuestionnaireResponse.item.answer.valueInteger

##### QuestionnaireResponse.item.answer.valueDate

##### QuestionnaireResponse.item.answer.valueDateTime

##### QuestionnaireResponse.item.answer.valueTime

##### QuestionnaireResponse.item.answer.valueString

##### QuestionnaireResponse.item.answer.valueUri

##### QuestionnaireResponse.item.answer.valueAttachment

##### QuestionnaireResponse.item.answer.valueCoding

##### QuestionnaireResponse.item.answer.valueQuantity

##### QuestionnaireResponse.item.answer.valueReference

#### QuestionnaireResponse.item.answer.item[i]

Berisi data pengelompokkan jawaban atau sub-grup di bawah jawaban atau grup.

**Contoh JSON** `QuestionnaireResponse.item`

```
[
  {
    "linkId": "1",
    "text": "Status Kesejahteraan",
    "answer": [
        {
            "valueCoding": {
                "system": "http://terminology.kemkes.go.id/CodeSystem/keluarga-sejahtera",
                "code": "KPS",
                "display": "Keluarga Pra Sejahtera (KPS)"
            }
        }
    ]
  }
]
```

### QuestionnaireResponse.item.item[i]

Berisi data pertanyaan atau sub-grup di bawah pertanyaan atau grup.
