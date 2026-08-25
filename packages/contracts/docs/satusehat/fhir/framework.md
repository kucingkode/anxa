> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/framework/

---

# Framework FHIR

Pada bagian ini akan dijelaskan secara singkat beberapa landasan yang mendefinisikan framework FHIR beserta struktur JSON-nya, yaitu `Element`, `Resource`, `DomainResource`, dan `Bundle`.

## Element

`Element` di FHIR adalah sebuah `object` yang memuat bagian terkait nilai, id, atau ekstensi terkait dari satu jenis data. Sebuah `Element` memiliki salah satu dari ketiga bagian yang telah disebutkan sebelumnya, dan juga tipe data dari setiap bagian tersebut akan berubah menjadi `array` dalam kondisi tertentu. Dengan kata lain `Element` bisa juga diartikan sebagai nama variabel yang memiliki nilai, id, atau informasi ekstensi tertentu dari suatu konteks data. Secara umum, struktur deklarasi `Element` dapat direpresentasikan sebagai berikut:

| Struktur Element | Struktur JSON |
| --- | --- |
| ``` Element (1)   .id (2)   .extension[i] (3)     <Extension> (4) ``` | ``` {   {nama_element}: <*> (1)   _{nama_element}: {     id: string (2)     extension: [{ (3)       url: uri (4)       value<?>: <*> (5)     }]   } } ``` |

1. Nama `Element` itu sendiri dalam struktur JSON akan menjadi nama properti `{nama_element}` sesuai konteks yang dimaksud. Contoh `Element` untuk menunjukan indikator dari suatu data dengan nama `status` bertipe `boolean` dengan nilai `true` dan memiliki id `01`, struktur JSON-nya:

   ```
   {
     status: true
     _status: {
       id: "01"
     }
   }
   ```
2. Untuk `Element` yang memiliki id, dalam penerapan JSON-nya akan disatukan dalam sebuah `object` tersendiri dengan prefiks  lalu disambung dengan nama `` Element-`nya (`{nama_element} ``). Dan id beserta nilainya tadi dimasukkan dalam `object` tersebut di dalam properti bernama `id`.
3. Begitu juga dengan ekstensi terkait bila ada, akan dimasukkan dalam properti `_{nama_element}` berupa `object` pada properti `extension`, dengan tipe data `array of <Extension> objects`.
4. Properti `url` adalah bagian dari tipe data `<Extension>`, di mana tipe data tersebut direpresentasikan sebagai `object` dalam format JSON. Sama seperti yang dijelaskan pada poin sebelumnya, `value<?>` ini adalah salah satu properti dari `object <Extension>`. Bedanya properti ini penamaan dan nilainya mengikuti tipe data yang dimaksud `(<?>)`. Contoh ekstensi yang digunakan harus mendefinisikan properti `value<?>` dengan tipe data `string` dan memiliki nilai `string value`, sehingga penerapannya menjadi: `valueString: “string value”`.

Struktur JSON dari element dapat berubah-ubah sesuai kondisi atau keberadaan dari nilai, id, atau ekstensi terkait yang ada. Selain dari struktur JSON lengkap yang sudah dijelaskan sebelumnya ada, beberapa struktur JSON yang dapat digunakan dalam kondisi tertentu, seperti yang akan dijelaskan pada bagian berikutnya.

### Element untuk Tipe Data Primitif

Berikut struktur JSON dengan berbagai kondisi dari keberadaan nilai, id, dan ekstensi terkait:

```
// hanya ada nilai tanpa ada id atau ekstensi
{
  {nama_element}: <*>
}

// ada nilai dengan id tertentu
{
  {nama_element}: <*>
  _{nama_element}: {
    id: string
  }
}

// ada nilai dengan ekstensi terkait
{
  {nama_element}: <*>
  _{nama_element}: {
    extension: [{
      url: uri
      value<?>: <*>
    }]
  }
}

// tanpa ada nilai, tapi ada id
{
  _{nama_element}: {
    id: string
  }
}

// tanpa ada nilai, tapi ada ekstensi
{
  _{nama_element}: {
    extension: [{
      url: uri
      value<?>: <*>
    }]
  }
}

// tanpa ada nilai, tapi ada id dan ekstensi
{
  _{nama_element}: {
    id: string
    extension: [{
      url: uri
      value<?>: <*>
    }]
  }
}
```

### Element untuk Tipe Data Non Primitif

Untuk struktur JSON dengan tipe non primitif, seperti untuk tipe umum atau khusus (contohnya Period):

```
{
  id: string
  extension: [{
    url: uri
    value<?>: <*>
  }]
}
```

### Element yang Berulang

Kadang ada penggunaan Element lebih dari satu untuk mendefinisikan data tertentu. Terdapat perbedaan struktur antara tipe data primitif dan non primitif. Untuk tipe data primitif, nilai dari `{nama_element}` dan `_{nama_element}` akan berubah menjadi array dengan tipe data untuk setiap item di array mengikuti tipe data sesuai aturan Element. Bila salah satu item dari array tersebut tidak didefinisikan nilainya, harus diisi dengan nilai null. Berikut bentuk struktur JSON-nya:

```
// tipe data primitif
{
  {nama_element}: [ null ATAU <*> ]
  _{nama_element}: [ null ATAU {
    id: string
    extension: [{
      url: uri
      value<?>: <*>
    }]
  }]
}

// tipe data non primitif
[ null ATAU {
  id: string
  extension: [{
    url: uri
    value<?>: <*>
  }]
}]
```

## Resources

Resource di FHIR adalah sebuah object abstrak yang memuat informasi dari suatu entitas yang:

* mempunyai identitas yang diketahui (via URL) dan dapat dijadikan referensi,
* mengidentifikasikan entitas itu sendiri sebagai salah satu jenis Resource yang ditentukan oleh suatu spesifikasi tertentu,
* terdiri dari sekumpulan struktur data seperti yang didefinisikan sesuai jenis Resource-nya, \*dan memiliki versi yang dapat diketahui terkait perubahan yang terjadi pada Resource.

Secara umum, struktur deklarasi Resource dapat direpresentasikan sebagai berikut:

| Struktur Resource | Struktur JSON |
| --- | --- |
| ``` Resource (1)   .id (2)   .meta (3)   .implicitRules (4)   .language (5) ``` | ``` {   resourceType: string // nama Resource   id: string           // id logikal dari definisi ini   meta: Meta           // metadata terkait Resource ini   implicitRules: uri   // kumpulan aturan Resource ini   language: code       // bahasa untuk Resource ini } ``` |

1. Nama `Resource` itu sendiri dalam struktur JSON akan didefinisikan sebagai nilai pada properti `resourceType`, misal `Resource` dengan nama `Patient`, maka menjadi `resourceType: “Patient”`.
2. Seperti `Element` yang memiliki id, Resource juga memiliki id unik.
3. *Metadata* di sini terkait dengan versi dan riwayat dari definisi `Resource` yang didefinisikan. Pembahasan terkait tipe data tersebut diluar cakupan dari dokumen ini, lebih lanjut bisa dilihat di https://hl7.org/FHIR/resource.html#Meta.
4. Terkait aturan atau *constraint* yang berlaku dari `Resource` yang didefinisikan.
5. Kode untuk bahasa dari `Resource` yang didefinisikan, mengacu pada *ValueSet* di http://hl7.org/fhir/ValueSet/languages.

## DomainResource

`DomainResource` di FHIR adalah sebuah `object` abstrak turunan dari `Resource` yang memuat informasi dari suatu entitas pada domain atau bidang tertentu, yang harus:

* memuat informasi dalam format XHTML terkait penjelasan dari resource yang didefinisikan,
* bisa memuat data atau resource tambahan di dalam resource yang lainnya,
* dan dapat memiliki ekstensi tambahan dan ekstensi kustom.

Secara umum, struktur deklarasi DomainResource dapat direpresentasikan sebagai berikut:

| Struktur DomainResource | Struktur JSON |
| --- | --- |
| ``` DomainResource (1)   .text (2)   .contained (3)   .extension[i] (4)     <Extension>   .modifierExtension[i] (5)     <Extension> ``` | ``` {   resourceType: string    // nama DomainResource   text: Narrative         // deskripsi DomainResource   contained: [ Resource ] // inline Resource terkait   extension: [{     url: uri     value<?>: <*>   }]   modifiedExtension: [{     url: uri     value<?>: <*>   }] } ``` |

1. Nama `DomainResource` itu sendiri dalam struktur JSON akan didefinisikan sebagai nilai pada properti `resourceType`, misal `DomainResource` dengan nama `Patient`, maka menjadi `resourceType: “Patient”`.
2. Deskripsi dari `DomainResource` terkait, teks dalam format XHTML berada di tipe data `Narative` ini. Pembahasan terkait tipe data Narrative di luar cakupan dokumen ini, lebih lanjut di https://hl7.org/FHIR/narrative.html.
3. Data terkait Resource lainnya.
4. Satu atau beberapa ekstensi tambahan yang diperlukan.
5. Satu atau beberapa ekstensi kustom tambahan yang diperlukan, lebih lanjut di https://hl7.org/FHIR/domainresource-definitions.html#DomainResource.modifierExtension .

## Bundle

`Bundle` di FHIR adalah sebuah tipe resource khusus yang diturunkan dari definisi `Resource`, di mana resource ini berisi koleksi atau kumpulan dari resource. Kegunaan dari resource bertipe `Bundle` ini adalah:

* mengembalikan sekumpulan resource saat ingin melihat resource yang memenuhi beberapa kriteria tertentu (RESTful Search),
* mengembalikan sekumpulan versi resource saat ingin melihat riwayat dari resource (History),
* mengirim sekumpulan resource untuk kebutuhan pertukaran pesan (Messaging),
* mengelompokkan sekumpulan resource mandiri untuk bertindak sebagai koleksi yang dapat ditukar dan bertahan lama dengan integritas klinis, contohnya dokumen klinis (Documents),
* membuat/memperbarui/menghapus sekumpulan resource di server sebagai operasi tunggal (termasuk melakukannya sebagai transaksi atomic tunggal) (Transactions)
* dan untuk menyimpan koleksi dari resource.

Secara umum, struktur deklarasi `Bundle` dapat direpresentasikan sebagai berikut:

| Struktur Bundle | Struktur JSON |
| --- | --- |
| ``` Bundle (1)   .identifier     <Identifier> (2)   .type (3)   .timestamp (4)   .total (5)   .link[i] (6)     .relation (7)     .url (8)   .entry[i] (9)     .link[i] (10)       <Content>     .fullUrl (11)     .resource       <Resource> (12)     .search (13)       .mode (14)       .score (15)     .request (16)       .method (17)       .url (18)       .ifNoneMatch (19)       .ifModifiedSince (20)       .ifMatch (21)       .ifNoneExist (22)     .response (23)       .status (24)       .location (25)       .etag (26)       .lastModified (27)       .outcome         <Resource> (28)   .signature     <Signature> (29) ``` | ``` {   resourceType: "Bundle"   identifier: Identifier   type: code   timestamp: instant   total: unsignedInt   link: [{     relation: string     url: uri   }]   entry: [{     link: [ Content ]     fullUrl: uri     resource: Resource     search: {       mode: code       score: decimal     }     request: {       method: code       url: uri       ifNoneMatch: string       ifModifiedSince: instant       ifMatch: string       ifNoneExist: string     }     response: {       status: string       location: uri       etag: string       lastModified: instant       outcome: Resource     }   }]   signature: Signature } ``` |

1. Dikarenakan `Bundle` adalah implementasi dari `object` abstrak `Resource`, maka pada struktur JSON, nilai pada properti `resourceType` harus diisi dengan `Bundle`.
2. Identifier permanen dari `Bundle` terkait, menggunakan tipe data `Identifier`.
3. Mengindikasikan tujuan dari penggunaan `Bundle` terkait, nilai untuk `type` ini mengacu ke *ValueSet* `BundleType` di http://hl7.org/fhir/ValueSet/bundle-type.
4. Tanggal dan waktu lengkap dari sistem yang mengindikasikan kapan `Bundle` ini dibuat.
5. Jumlah hasil yang sesuai kriteria, wajib ada jika menggunakan fitur pencarian.
6. Tautan-tautan lainnya dari `Bundle` terkait.
7. Tipe relasi dari tautan terkait, nilainya mengacu ke data di website IANA di http://www.iana.org/assignments/link-relations/link-relations.xhtml#link-relations-1
8. URI yang mereferensikan detail dari tautan yang dimaksud.
9. Entri-entri yang tersedia di `Bundle` terkait, berupa `Resource` atau informasi tambahan.
10. Tautan-tautan dari entri terkait.
11. Alamat URI lengkap dari *resource* (URL absolut atau URI berupa UUID/OID).
12. Data `Resource` dari entri terkait di dalam `Bundle` yang bersangkutan.
13. Informasi terkait entri hasil pencarian.
14. Tipe dari pencarian yang didapat, nilainya ini mengacu ke *ValueSet* `SearchEntryMode` di http://hl7.org/fhir/ValueSet/search-entry-mode.
15. Peringkat dari pencarian (antara 0 dan 1).
16. Informasi tambahan untuk melakukan request data dari entri yang bersangkutan.
17. Tipe HTTP Method/Verb yang digunakan, nilainya ini mengacu ke *ValueSet* `HTTPVerb` di http://hl7.org/fhir/ValueSet/http-verb.
18. URL lengkap dengan protokol HTTP untuk entri terkait.
19. Informasi terkait HTTP header If-None-Match.
20. Informasi terkait HTTP header If-Modified-Since.
21. Informasi terkait HTTP header If-Match.
22. Informasi terkait pembuatan resource dengan kondisi tertentu.
23. Informasi terkait hasil response yang didapat.
24. Informasi terkait HTTP status code yang didapat. Nilainya dapat berupa kode statusnya atau bisa lengkap dengan teks dari kode statusnya.
25. Informasi terkait redirection via HTTP header location, jika ada.
26. Informasi Etag jika diperlukan. Tanggal dan waktu lengkap dari sistem yang mengindikasikan kapan perubahan terkait response ini terjadi.
27. Data `Resource` yang didapat.
28. Data terkait validitas dari `Bundle` (Digital Signature).
