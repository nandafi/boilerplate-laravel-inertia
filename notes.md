# Panduan Laravel: Struktur Folder & Command Umum

Dokumen ini berisi penjelasan singkat mengenai struktur folder Laravel dan perintah-perintah yang sering digunakan dalam pengembangan.

---

## 📂 Struktur Folder Umum

Berikut adalah penjelasan mengenai folder-folder utama yang ada di proyek Laravel ini:

1.  **`app/`**
    - Berisi kode inti aplikasi. Di sini tempat Anda menaruh **Models**, **Controllers**, **Providers**, **Middleware**, dan logika bisnis lainnya.
2.  **`bootstrap/`**
    - Berisi file yang digunakan oleh framework untuk memulai proses loading (bootstrapping) aplikasi. Terdapat folder `cache` untuk optimasi performa.
3.  **`config/`**
    - Berisi semua file konfigurasi aplikasi (database, mail, session, app, dll). Anda bisa mengubah pengaturan global di sini.
4.  **`database/`**
    - **`migrations/`**: Tempat menyimpan file skema database.
    - **`seeders/`**: Tempat menyimpan data dummy/awal untuk database.
    - **`factories/`**: Tempat mendefinisikan struktur data dummy otomatis.
5.  **`public/`**
    - Hanya folder ini yang bisa diakses langsung dari browser. Berisi file `index.php` (entry point), gambar, file CSS, dan JS yang sudah dikompilasi.
6.  **`resources/`**
    - Berisi aset mentah (raw assets).
    - **`views/`**: Tempat menyimpan file template HTML/Blade atau komponen React/Vue (Inertia).
    - **`css/`** & **`js/`**: File style dan script sebelum diproses oleh Vite.
7.  **`routes/`**
    - Tempat mendefinisikan URL/rute aplikasi.
    - `web.php`: Rute untuk browser.
    - `api.php`: Rute untuk API (biasanya menggunakan prefix `/api`).
8.  **`storage/`**
    - Tempat menyimpan file log, file cache, dan file unggahan (uploads) dari user.
9.  **`tests/`**
    - Berisi file untuk pengujian otomatis (Unit Test dan Feature Test).
10. **`vendor/`**
    - Folder yang berisi library pihak ketiga yang diinstal melalui Composer. **Jangan mengubah isi folder ini.**

---

## 💻 Workflow Pengembangan (Development)

Untuk menjalankan proyek ini secara lokal, Anda perlu menjalankan dua perintah di terminal yang berbeda:

### 1. Terminal 1: Backend (Laravel)

Menjalankan server PHP untuk logika aplikasi dan koneksi database.

- **Command**: `php artisan serve`
- **URL**: [http://127.0.0.1:8000](http://127.0.0.1:8000)

### 2. Terminal 2: Frontend (Vite)

Menjalankan asset bundler untuk React, Tailwind, dan Hot Module Replacement (HMR).

- **Command**: `npm run dev`
- **Port**: `5173` (Tidak perlu dibuka manual, Vite akan mengirim asset ke Laravel secara otomatis).

> **Penting**: Pastikan kedua perintah di atas berjalan secara bersamaan agar perubahan kode React langsung muncul di browser tanpa reload manual.

---

## ⌨️ Command Laravel (Artisan) yang Umum Digunakan

### 🛠️ Membuat Komponen Baru (Generator)

- **`php artisan make:model NamaModel`**
  Membuat model baru. Tambahkan `-m` untuk sekaligus membuat file migrasinya (`php artisan make:model Product -m`).
- **`php artisan make:controller NamaController`**
  Membuat controller baru.
- **`php artisan make:migration create_table_name`**
  Membuat file migrasi baru untuk mengubah struktur database.
- **`php artisan make:seeder NamaSeeder`**
  Membuat file seeder untuk mengisi data ke database.

### 🗄️ Database & Migrasi

- **`php artisan migrate`**
  Menjalankan migrasi yang belum dilakukan ke database.
- **`php artisan migrate:rollback`**
  Membatalkan migrasi terakhir.
- **`php artisan migrate:fresh`**
  Menghapus semua tabel dan menjalankan ulang seluruh migrasi dari awal.
- **`php artisan db:seed`**
  Menjalankan seeder untuk mengisi data ke database.

### 🔍 Utility & Debugging

- **`php artisan route:list`**
  Menampilkan daftar semua rute yang terdaftar di aplikasi.
- **`php artisan tinker`**
  Membuka terminal interaktif untuk mencoba kode PHP langsung dengan environment Laravel.
- **`php artisan optimize:clear`**
  Membersihkan semua cache (route, config, view, dll) jika ada perubahan yang tidak muncul.
- **`php artisan key:generate`**
  Menghasilkan `APP_KEY` baru di file `.env` (biasanya dilakukan saat pertama kali setup).

---

## 🎨 UI & Themes (Shadcn + TweakCN)

Proyek ini menggunakan **Shadcn UI** dengan kustomisasi tema dari **TweakCN**.

### Cara Update/Ganti Tema

Jika ada pembaruan pada tema atau ingin mengganti dengan tema lain dari TweakCN, jalankan perintah berikut:

```bash
npx shadcn@latest add https://tweakcn.com/r/themes/[id-tema]
```

**Langkah-langkah:**

1. Copy URL tema dari TweakCN.
2. Jalankan perintah di atas di terminal.
3. Saat muncul pertanyaan `Overwrite?`, ketik **`y`** lalu Enter.
4. Tema (variabel warna di `app.css`) akan diperbarui secara otomatis.

> **Catatan**: Konfigurasi `tailwind.config.js` sudah diset fleksibel untuk mendukung format Hex, HSL, maupun OKLCH, sehingga tidak perlu diubah lagi saat ganti tema.
