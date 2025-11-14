# 🔥 EduVate - Portal Edukasi AI & Teknologi

![EduVate Hero](https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200)
*(Disarankan: Ganti gambar ini dengan screenshot website Anda)*

**EduVate** adalah portal edukasi modern yang dibangun dengan **Next.js 16 (App Router)** dan **Supabase**. Sesuai dengan tema **"Empowering Youth in the Era of Disruption"**, website ini berfungsi sebagai platform terkurasi untuk artikel, kursus, dan webinar seputar AI, Teknologi, dan Kreativitas Digital.

Proyek ini mencakup website publik yang di-render di server untuk kecepatan maksimum, serta Dashboard Admin (CMS) kustom yang fungsional untuk mengelola seluruh konten.

---

## 🚀 Fitur Utama

### 🌎 Fitur Publik (Frontend)

* **Desain Modern:** Dibuat dengan Tailwind CSS, mengusung tema Dark Mode (`bg-neutral-950`) dengan aksen Neon (Cyan & Lime).
* **Halaman Dinamis:**
    * **Homepage:** Menampilkan Hero, keunggulan, serta 3 artikel, kursus, dan webinar terbaru yang diambil dari Supabase.
    * **Halaman Artikel:** Grid semua artikel dengan fitur **pencarian real-time** (didebounce).
    * **Halaman Detail Artikel:** Halaman baca yang bersih, SEO-friendly, dan di-render di server.
    * **Halaman Kursus & Webinar:** Daftar terkurasi dari konten eksternal.
* **Komponen "Pintar":**
    * **Smart Card (`Card.jsx`):** Otomatis mendeteksi link eksternal (misal: YouTube/Udemy) dan membukanya di tab baru (`target="_blank"`).
    * **Smart Image:** Menggunakan `next/image` dengan *fallback* ke placeholder jika gambar utama gagal dimuat.
* **Animasi Halus:** Menggunakan `Framer Motion` untuk transisi halaman dan efek hover yang elegan.

### 🔒 Fitur Admin (Backend)

* **Login Aman:** Halaman `/login` yang memvalidasi admin menggunakan **Server Action** dan kredensial dari file `.env`.
* **Dashboard Terproteksi:** Halaman `/admin` dilindungi oleh **HTTP-only Cookie**. Akses dicek di server; jika tidak ada cookie, pengguna otomatis dialihkan ke `/login`.
* **Layout Profesional:** Antarmuka Dashboard dengan Sidebar yang bersih dan responsif.
* **Full CRUD (Create, Read, Update, Delete):**
    * Kelola **Artikel**
    * Kelola **Kursus**
    * Kelola **Webinar** (termasuk upload poster)
* **Formulir Cerdas:** Menggunakan *satu* formulir yang sama untuk mode **Create** (Tambah Baru) dan **Update** (Edit). Form akan otomatis terisi data saat mode Edit.
* **Pencarian Cepat:** Fitur search di dashboard memfilter data secara instan di sisi klien.

---

## 🛠️ Teknologi & Tech Stack

* **Framework:** **Next.js 16+** (App Router)
* **Database:** **Supabase** (PostgreSQL)
* **Styling:** **Tailwind CSS**
* **Backend Logic:** **Next.js Server Actions**
* **Animasi:** **Framer Motion**
* **UI/Komponen:** **React.js** (Hooks, Client & Server Components)
* **Ikon:** **Lucide React**
* **Bahasa:** JavaScript (JSX)
* **Utilities:** `use-debounce` (untuk search)

---

## ⚙️ Panduan Instalasi & Konfigurasi

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal.

### 1. Klona & Instalasi

```bash
# 1. Klona repositori (Ganti dengan URL repo Anda)
git clone [https://github.com/SinggihHakim/EduVate.git](https://github.com/SinggihHakim/EduVate.git)

# 2. Masuk ke folder proyek
cd EduVate

# 3. Instal semua dependensi
npm install
(Pastikan Anda sudah menginstal: @supabase/supabase-js framer-motion lucide-react clsx tailwind-merge use-debounce jika package.json Anda belum lengkap)

2. Setup Database (Supabase)
Buat Project baru di Supabase.

Setelah project siap, navigasi ke SQL Editor.

Salin dan jalankan (paste & run) seluruh script SQL di bawah ini:

SQL

-- 1. Tabel Artikel
CREATE TABLE articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    author TEXT DEFAULT 'Tim EduVate',
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Kursus
CREATE TABLE courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    platform TEXT,
    link TEXT,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Webinar
CREATE TABLE webinars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    speaker TEXT,
    date_time TIMESTAMPTZ,
    registration_link TEXT,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Aktifkan Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE webinars ENABLE ROW LEVEL SECURITY;

-- 5. Buat Policy agar data bisa dibaca publik
CREATE POLICY "Public articles view" ON articles FOR SELECT USING (true);
CREATE POLICY "Public courses view" ON courses FOR SELECT USING (true);
CREATE POLICY "Public webinars view" ON webinars FOR SELECT USING (true);
3. Konfigurasi Environment (.env.local)
Buat file baru bernama .env.local di folder root proyek Anda.

Buka Dashboard Supabase -> Settings -> API.

Salin URL Proyek dan Kunci anon public.

Salin juga Kunci service_role secret (RAHASIA).

Isi file .env.local seperti template di bawah ini:

Bash

# File: .env.local

# Ambil dari Supabase API Settings
NEXT_PUBLIC_SUPABASE_URL=https://<ID-PROYEK-ANDA>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<KUNCI_ANON_PUBLIK_ANDA>
SUPABASE_SERVICE_ROLE_KEY=<KUNCI_SERVICE_ROLE_SECRET_ANDA>

# Kredensial untuk login admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=rahasia123
4. Konfigurasi next.config.js
Pastikan file next.config.js Anda mengizinkan semua domain gambar agar tidak terjadi error saat mengambil gambar dari sumber acak (Unsplash, Bing, Wikipedia, dll).

JavaScript

// File: next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Mengizinkan semua domain
      },
    ],
  },
};
module.exports = nextConfig;
🚀 Cara Menjalankan Proyek
Setelah semua konfigurasi di atas selesai:

Jalankan Server Development:

Bash

npm run dev
Buka Aplikasi:

Website Publik: Buka http://localhost:3000

Halaman Login Admin: Buka http://localhost:3000/login

(Gunakan username & password dari file .env.local Anda untuk masuk)

📂 Struktur Folder Proyek
/
├── app/
│   ├── actions.js          # (Backend) Logika Server Actions (Auth, CRUD)
│   ├── layout.js           # Layout global
│   ├── page.js             # Halaman utama (Homepage)
│   │
│   ├── admin/              # Folder Halaman Admin (Protected)
│   │   ├── page.js         # Server component (cek cookie, fetch data)
│   │   └── AdminClientComponent.jsx # UI Dashboard (Client component)
│   │
│   ├── artikel/
│   │   ├── page.js         # Halaman list artikel (dengan search)
│   │   └── [slug]/
│   │       └── page.js     # Halaman detail artikel
│   │
│   ├── kursus/
│   │   └── page.js         # Halaman list kursus
│   │
│   ├── webinar/
│   │   └── page.js         # Halaman list webinar
│   │
│   └── login/
│       └── page.js         # Halaman form login
│
├── components/
│   ├── Card.jsx            # Komponen kartu (Artikel, Kursus, Webinar)
│   ├── ClientLayout.jsx    # Wrapper (Show/Hide Navbar/Footer)
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   └── SearchInput.jsx
│
├── lib/
│   ├── supabase.js         # Klien Supabase (untuk Publik/Frontend)
│   └── supabase-admin.js   # Klien Supabase (untuk Admin/Backend)
│
├── .env.local              # File Rahasia (API Keys, Login)
├── next.config.js          # Konfigurasi Next.js (termasuk domain gambar)
└── tailwind.config.js      # Konfigurasi Tailwind (font, warna neon)
