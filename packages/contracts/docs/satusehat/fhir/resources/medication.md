> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/medication/

---

# Medication

Pengiriman data peresepan obat akan menggunakan 2 *resources* yaitu `Medication` dan `MedicationRequest`. *Resource* `Medication` akan mencatatkan data umum terkait obat yang akan diresepkan. Sedangkan *resource* `MedicationRequest` akan digunakan untuk mengirimkan data terkait peresepan obat seperti jumlah yang diresepkan, instruksi minum obat dan lain-lain. Kedua data ini dikirimkan secara bersamaan sebagai 1 paket yaitu `Medication` dan `MedicationRequest`. Satu *payload* `Medication` dan `MedicationRequest` hanya dapat digunakan untuk peresepan 1 jenis obat saja. Apabila terdapat 2 jenis obat yang diresepkan, maka dikirimkan 2 paket `Medication` dan `MedicationRequest`.

Berikut pemetaan nilai untuk Medication yang direpresentasikan dalam peta referensi *(path)* ke properti *(element id)* terkait, untuk konteks data kode lokal obat di masing-masing institusi:

|  |  |
| --- | --- |
|  | 1. Setiap terdapat simbol asterik `*` sebelum nama variabel/parameter/element FHIR yang disebutkan, maka variabel/parameter/element FHIR tersebut bersifat **WAJIB** , **harus ada**, atau **pasti selalu ada**, contoh: **`*Location.identifier`**. 2. **Standar format Waktu** yang digunakan dalam pengiriman data adalah **UTC +00**. Misalnya waktu **WIB**, maka format yang digunakan adalah **waktu sekarang dikurangi 7**, jika **WITA**, maka **waktu sekarang dikurangi 8**, dan Jika **WIT**, maka **waktu sekarang dikurangi 9**.  **Contoh:** Pukul 17.35 WIB tanggal 23 Agustus 2023 maka yang dikirimkan adalah waktunya perlu diubah ke UTC +00 menjadi 10.35, berarti menjadi `2023-08-23T10:35:00+00:00`. 3. **Standar format pengiriman Tanggal** tidak bisa kurang dari 03 Juni 2014. |

|  |  |
| --- | --- |
|  | Variabel/parameter/element FHIR bersifat **WAJIB** *(Mandatory)* atau **TIDAK** disesuaikan dengan Panduan Interoperabilitas berdasarkan *use case* masing-masing (klik **di sini** ) |

## Medication.identifier[i]

Berisi data kode lokal obat di masing-masing institusi. Apabila data obat yang dikirimkan merupakan data obat racikan, `Medication.identifier` dapat dikosongkan.

### Medication.identifier[i].use

Berisi data dengan tipe data `code`, yang nilainya mengacu pada data terminologi IdentifierUse. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Medication.identifier[i].system

Berisi data yang nilainya memiliki format:

```
http://sys-ids.kemkes.go.id/medication/{{organization-ihs-number}}
```

Di mana isi dari parameter `{organization-ihs-number}` adalah ID organisasi induk yang didapatkan dari master sarana indeks.

### Medication.identifier[i].value

Berisi ID lokal obat yang disimpan di sistem internal masing-masing organisasi.

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/medication/10000004",
    "use": "official",
    "value": "123456789"
  }
]
```

## Medication.code

Berisi data kode obat yang digunakan akan menggunakan kode obat yang tersedia pada KFA (kamus farmasi dan alat kesehatan) dengan tipe data `CodeableConcept`. Medication.code wajib diisi apabila mengirimkan data obat non-racikan. Untuk pengiriman data racikan, Medication.code dapat dikosongkan.

### Medication.code.coding

Berisi data kode obat yang digunakan akan menggunakan kode obat yang tersedia pada KFA (kamus farmasi dan alat kesehatan) dengan tipe data `Coding`, daftar kode obat KFA dapat dilihat pada Kamus Farmasi dan Alat Kesehatan. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/kfa",
    "code": "93001019",
    "display": "Obat Anti Tuberculosis / Rifampicin 150 mg / Isoniazid 75 mg / Pyrazinamide 400 mg / Ethambutol 275 mg Kaplet Salut Selaput (KIMIA FARMA)"
  }
]
```

## Medication.status

Berisi data kode yang mengindikasikan pengobatan dalam penggunaan aktif dengan tipe data `code`, yang nilainya mengacu pada data terminologi Medication Status Codes. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
"active"
```

## Medication.manufacturer

Berisi data kode obat dengan tipe data `Reference`, yang direferensikan ke data yang tersimpan di *resource* `Organization`, yang menyimpan data pabrik obat.

**Contoh JSON**

```
{
  "reference": "Organization/900001"
}
```

## Medication.form

Berisi data yang menjelaskan bentuk dari sediaan obat yang merujuk pada Peraturan Kepala Badan Pengawas Obat dan Makanan Republik Indonesia Nomor 24 Tahun 2017, dengan tipe data `CodeableConcept`.

### Medication.form.coding

Berisi data yang menjelaskan bentuk dari sediaan obat yang merujuk pada Peraturan Kepala Badan Pengawas Obat dan Makanan Republik Indonesia Nomor 24 Tahun 2017 dengan tipe data `Coding`. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON**

```
[
  {
    "system": "http://terminology.kemkes.go.id/CodeSystem/medication-form",
    "code": "BS023",
    "display": "Kaplet Salut Selaput"
  }
]
```

## Medication.amount

Berisi data mengenai jumlah spesifik obat dalam produk kemasan dengan tipe data `Ratio`.

## Medication.ingredient[i]

Terdapat 2 cara pengisian `Medication.ingredient` yaitu: \* Peresepan/pengeluaran obat non-racikan dan obat racikan dengan instruksi berikan dalam dosis demikian/ d.t.d \* Peresepan/pengeluaran obat racikan non-d.t.d (bagi dalam bagian-bagian yang sama) dengan tipe data `BackboneElement`. Elemen ini **WAJIB** diisi apabila data yang dikirimkan adalah obat racikan.

## \*Medication.ingredient.item<?>

Berisi data mengenai bahan sebenarnya-baik zat (bahan sederhana) atau obat lain dari obat.

### \*Medication.ingredient.itemCodeableConcept

Berisi data kode zat aktif atau kode obat template dengan tipe data `Coding`, yang nilainya mengacu pada data terminologi [Kamus Farmasi dan Alat Kesehatan. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

**Contoh JSON Kode Zat Aktif (d.t.d)**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/kfa",
    "code": "91000314",
    "display": "Acarbose"
  }
]
```

**Contoh JSON Kode Obat Template (Non-d.t.d)**

```
[
  {
    "system": "http://sys-ids.kemkes.go.id/kfa",
    "code": "92000693",
    "display": "Gabapentin 300 mg Kapsul"
  }
]
```

## Medication.ingredient.isActive

Berisi data informasi apakah komposisi obat tersebut merupakan zat aktif dengan tipe data `boolean`.

**Contoh JSON**

```
true
```

## Medication.ingredient.strength

Berisi data informasi jumlah komposisi zat dalam obat (untuk zat aktif, maka diisi dengan kekuatan zat aktif obat) atau jumlah tablet yang dibutuhkan per jumlah pulveres/kapsul yang akan diresepkan dengan tipe data `Ratio`, yang umumnya nilai satuan kekuatan zat aktif mengacu pada tiga data terminologi, yaitu: UCUM, orderableDrugForm, dan SNOMED CT. Informasi data terminologi apa yang digunakan dapat mengacu pada Lampiran Terminologi sesuai dengan *use case* masing-masing (klik **di sini**) dan Standar Terminologi (klik **di sini**).

### Medication.ingredient.strength.numerator

**Contoh JSON d.t.d**

```
{
  "value": "325",
  "system": "http://unitsofmeasure.org",
  "code": "mg"
}
```

**Contoh JSON Non-d.t.d**

```
{
  "value": "15",
  "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
  "code": "TAB"
}
```

### Medication.ingredient.strength.denominator

**Contoh JSON d.t.d**

```
{
  "value": "1",
  "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
  "code": "TAB"
}
```

**Contoh JSON Non-d.t.d**

```
{
  "value": "30",
  "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
  "code": "CAP"
}
```

## Medication.batch

Berisi data detail untuk kemasan obat dengan tipe data `BackboneElement`, yang direferensikan ke data yang tersimpan di *resource* `MedicationDispense`.

## Medication.batch.lotNumber

Berisi data nomor batch obat dengan tipe data `string`.

## Medication.batch.expirationDate

Berisi data tanggal kadaluarsa obat dengan tipe data `dateTime`, dengan format yang diperbolehkan `YYYY, YYYY-MM, YYYY-MM-DD atau YYYY-MM-DDThh:mm:ss+zz:zz`.

## \*Medication.extension:medicationType

Berisi satu atau lebih data bertipe `Extension` yang digunakan menyimpan informasi apakah obat yang diresepkan atau dikeluarkan merupakan obat non-racikan, obat racikan dengan instruksi berikan dalam dosis demikian/ d.t.d, atau obat racikan non-d.t.d, yang nilai dan strukturnya mengacu pada extension tambahan dengan nama MedicationType.

**Contoh JSON**

```
"extension":[
      {
          "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType",
          "valueCodeableConcept": {
              "coding": [
                  {
                      "system": "https://terminology.kemkes.go.id/CodeSystem/medication-type",
                      "code": "NC",
                      "display": "Non-compound"
                  }
              ]
          }
      }
]
```
