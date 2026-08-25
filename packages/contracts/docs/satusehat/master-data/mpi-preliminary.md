> Sumber asli: https://satusehat.kemkes.go.id/platform/docs/id/master-data/master-patient-index/preliminary/

---

# Pendahuluan

## 1. Latar Belakang

Saat ini untuk mendapatkan informasi detail personal seseorang harus melakukan cek ke API Dukcapil di mana input data berupa NIK lalu outputnya berupa detail informasi personal dari NIK tersebut. Permasalahannya API Dukcapil kini dibatasi hanya pengecekan validitas NIK dan tidak dapat lagi autofill data penduduk by NIK seperti sebelumnya dikarenakan kebijakan perlindungan data dari Dukcapil.

Hal ini membuat sistem yang selama ini tergantung pada *autofill* data NIK menjadi terganggu dan terpaksa melakukan penginputan data penduduk secara manual dan ini berpotensi mengganggu layanan karena proses yang dibutuhkan lebih lama.

Di sisi lain, permasalahan dalam sentralisasi pendataan pasien di Indonesia juga terletak pada belum tersedianya unique identifier untuk pasien yang tidak memiliki NIK. Pasien dalam kategori ini mencakup bayi yang baru lahir, anak dari WNI yang berdomisili di luar negeri, warga negara asing, serta penduduk lainnya yang belum tercatat di Dukcapil.

Sebagai upaya untuk menanggulangi permasalahan ini, sistem pencatatan menggunakan IHS Number, nomor urut yang akan dihasilkan oleh IHS (Indonesia Health Service) untuk setiap *record*, seperti pasien, tenaga kesehatan, fasilitas kesehatan, alat kesehatan, dan lain-lain, telah diinisiasi. Dan disaat yang bersamaan, tengah dirumuskan juga perubahan logika pemberian identifier untuk membedakan pencatatan pasien dengan *records-records* lainnya seperti tenaga kesehatan, fasilitas kesehatan, dan sebagainya, agar dapat saling dibedakan di dalam satu sistem yang sama. IHS Number ini akan menjadi unique identifier yang dapat digunakan system pihak ketiga untuk setiap Master Index di IHS.

Karena kita tidak dapat menggantungkan layanan dari API Dukcapil tersebut, pada saat ini dibutuhkan pengerjaan tambahan untuk membuat database yang berisi kumpulan informasi data personal seseorang yang berasal dari gabungan dari beberapa tabel yang sudah dimiliki tim DTO terkait pelayanan kesehatan. Sistem database ini nantinya juga harus dipastikan dapat menjangkau seluruh pasien yang memiliki ataupun tidak memiliki NIK, sehingga pelayanan kesehatan terhadap seluruh pasien ini dapat berjalan dengan baik.

Sentralisasi data yang berisikan informasi data personal layanan kesehatan ini kita namakan Master Patient Index (MPI) sehingga dapat dimanfaatkan oleh sistem yang terganggu akibat ketergantungan pada API Dukcapil tadi maupun pemangku kepentingan lainnya kedepan. Dalam MPI ini pencatatan data pasien akan menggunakan penomoran yang unik dan standardized di mana nantinya pemangku kepentingan lain dapat menggunakan MPI sebagai tools untuk mendapatkan IHS Number sebagai penomoran utama index pasien.

Apabila melakukan pengiriman data kesehatan melalui **SATUSEHAT** yang memiliki elemen data terkait resource `Patient`, maka diperlukan informasi `{patient-ihs-number}` dari pasien yang bersangkutan. `{patient-ihs-number}` seorang pasien didapatkan dari **Master Patient Index (MPI) Kementerian Kesehatan**. MPI menyimpan data-data demografi pasien berskala nasional, mulai dari nama, tanggal lahir, alamat, Identitas resmi yang diterbitkan pemerintah, dan lain lain. Setelah mendapatkan `{patient-ihs-number}`, ID dapat disimpan secara di masing-masing sistem internal fasyankes maupun partner non-fasyankes. `{patient-ihs-number}` akan mempermudah pelaporan pelayanan kesehatan yang berhubungan dengan pasien, karena partner tidak diwajibkan menyertakan data diri setiap ada pengiriman data `{patient-ihs-number}` juga dapat digunakan untuk melihat data diri pasien secara menyeluruh.

Master Patient Index (MPI) merupakan the single-source-of-truth (sumber utama) informasi pasien yang dapat diakses oleh fasyankes yang memiliki akses ke IHS. MPI dibagi menjadi beberapa *case* (kasus) yang nantinya akan dibahas lebih dalam pada **Dokumentasi SATUSEHAT Master Patient Index (MPI)** ini. Berikut ini *case* interoperabilitas MPI:

* Pasien dengan NIK.
* Pasien bayi baru lahir.
* Pasien tanpa NIK (contoh WNA).
* Pasien tanpa identitas atau dalam gangguan jiwa.

Di samping adanya dokumentasi secara umum terkait Master Patient Index (MPI), maka diperlukan satu dokumentasi khusus yang membahas semua informasi teknis yang disediakan oleh Master Patient Index (MPI) yang dikembangkan oleh tim *developer* **Kementerian Kesehatan Republik Indonesia**. Dokumentasi Teknis Master Patient Index (MPI) ini berisi spesifikasi teknis dan ReST API mencakup parameter yang tersedia, contoh *request*, contoh hasil *response*, penjelasan dari kode status HTTP yang mungkin diterima, serta cara penggunaannya menggunakan cURL dan Postman.

## 2. Tujuan

Dokumentasi **Teknis Master Patient Index (MPI)** dibuat untuk kebutuhan informasi teknis/ReST API yang tersedia dari Master Patient Index (MPI) yang telah dikembangkan oleh tim *developer* SATUSEHAT. Penjelasan teknis/ReST API Master Patient Index (MPI) di dokumentasi ini hanya terbatas dari spesifikasi dari ReST API itu sendiri. Penjelasan lengkap terkait Master Patient Index (MPI), akan dijelaskan pada dokumentasi tersendiri.

## 3. Dokumentasi SATUSEHAT Master Patient Index (MPI) ini terbagi menjadi beberapa bagian yang terdiri dari:

### 1. Pengenalan MPI, berisi penjelasan secara umum terkait;

### 2. Pasien dengan NIK;

### 3. Pasien Bayi Baru Lahir;

### 4. Pasien Tanpa NIK;

### 5. ReST API Master Patient Index (MPI).
