> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/fhir/data-type/primitive/

---

# Primitif

Tipe primitif atau sederhana, adalah tipe data yang paling dasar/primitif untuk definisikan sebuah nilai tertentu.

Tabel 1. Tipe Data Primitif

| Tipe Data | Penjelasan |
| --- | --- |
| `boolean` | Nilai untuk tipe data ini hanya salah satu dari dua nilai ini: `true` atau `false`. |
| `integer` | Bagian dari bilangan rasional yang merepresentasikan bilangan bulat, dengan rentang nilai dari `−2.147.483.648` hingga `2.147.483.647` dalam sistem operasi 32-bit. Untuk nilai yang lebih besar disarankan menggunakan tipe data `decimal`. |
| `string` | Data yang berisi sekumpulan karakter unicode, dengan aturan:  * jumlah karakter tidak boleh lebih dari 1.048.576 karakter * harus karakter unicode dengan poin ≥ 32 (`u0032`), kecuali untuk `u0009` (horizontal tab `/t`), `u0010` (carriage return `/r`), dan `u0013` (line feed `/n`) * tidak boleh ada spasi di awal atau akhir data * tidak boleh kosong atau tidak ada karakter (jumlah karakter nol). |
| `decimal` | Bagian dari bilangan rasional yang merepresentasikan bilangan desimal. TIpe ini juga bisa menerima tipe `integer`, bila nilai tersebut melebihi kapasitas dari tipe terkait. |
| `uri` | Referensi berbentuk string terkait *Uniform Resource Identifier* (RFC 3986), dengan catatan:  * bersifat *case sensitive* * dapat berupa alamat absolut atau relatif, dan bisa ada penanda *fragment* (`#`) * untuk nilai berupa kode UUID harus menggunakan huruf kecil semuanya, contoh: `urn:uuid:53fefa32-fcbb-4ff8-8a92-55ee120877b7`. |
| `url` | Referensi berbentuk `string` terkait *Uniform Resource Locator* (RFC 1738), dengan catatan:  * URL diakses langsung menggunakan protokol yang sudah ditentukan. Protokol URL umum biasanya adalah **http{s}:**, **ftp:**, **mailto:** and **mllp:** |
| `canonical` | URI yang mereferensi ke resource *by its canonical URL* (canonical URL).  * memiliki perbedaan dengan URI karena pada canonical URL ini biasanya dipisahkan dengan tanda separator. |
| `base64binary` | Merupakan *stream of bytes* yang disandikan menggunakan *Base64* (RFC 4648) |
| `instant` | Merupakan tipe data yang menampilkan waktu dengan format `YYYY-MM-DDThh:mm:ss.sss+zz:zz`, contoh: `2015-02-07T13:28:17.239+02:00`, dengan catatan:  * tipe ini hanya berlaku untuk sistem, bukan untuk waktu yang digunakan oleh manusia * Waktu yang ditampilkan harus ditentukan setidaknya sampai detik dan harus menyertakan zona waktu. |
| `date` | Nilai tanggal atau potongan tanggal yang digunakan untuk kebutuhan komunikasi (manusia), dengan format:  * `YYYY` contohnya: `2022` * `YYYY-MM` contohnya: `1993-02` * `YYYY-MM-DD` contohnya: `2023-02-01` |
| `dateTime` | Nilai untuk tanggal, sebagian dari tanggal (tahun, bulan dan tahun), atau waktu, yang biasa digunakan dalam komunikasi bukan mesin (tidak ada campur tangan manusia). Formatnya bisa berupa:  * `YYYY` contohnya: `2018`, * `YYYY-MM` contohnya: `1973-06`, * `YYYY-MM-DD` contohnya: `1905-08-23`, atau * `YYYY-MM-DDThh:mm:ss+zz:zz` contohnya: `2015-02-07T13:28:17-05:00` atau bisa juga `2017-01-01T00:00:00.000Z`.  Untuk waktu dengan nilai `24:00` tidak diperbolehkan. |
| `time` | Nilai untuk waktu, dengan format:  * `hh:mm:ss` contohnya: `11:07:20` |
| `code` | Mengindikasikan nilai referensi yang berbentuk `string`, di mana nilai tersebut adalah bagian dari data yang didefinisikan di tempat/sistem lainnya. |
| `oid` | Merupakan OID yang direpresentasikan sebagai URI (RFC 3001), contoh: `urn:oid:1.2.3.4.5` |
| `id` | Berisi kombinasi huruf besar (`A..Z`) huruf kecil (`a..z`) angka (`0..9`) tanda (`.`) atau (`-`) dengan panjang maksimal 64 karakter. |
| `markdown` | Berisi nilai `string` FHIR yang mengandung sintaks `markdown` untuk proses yang menggunakan `markdown` *presentation engine*. |
| `unsignedInt` | Berisi bilangan negatif `integer` dengan *range* angka (`0..2`,`147`,`483`,`647`) |
| `positiveInt` | Berisi bilangan positif `integer` dengan *range* angka (`1..2`,`147`,`483`,`647`) |
| `uuid` | Merupakan UUID (GUID) yang direpresentasikan sebagai URI (RFC 4122). |
