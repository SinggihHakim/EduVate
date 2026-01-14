<div align="center">

# 🚀 EduVate: Portal Edukasi AI & Teknologi

**Empowering Youth in the Era of Disruption**

![Next JS](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<img src="https://github.com/user-attachments/assets/8f315ce8-5590-4d8b-91dd-d3d86e56a1ff" alt="EduVate Dashboard" width="100%" style="border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">

[Demo Live (Coming Soon)] • [Laporkan Bug] • [Dokumentasi]

</div>

---

## ⚡ Tentang Proyek

**EduVate** adalah platform edukasi modern yang dikurasi khusus untuk generasi muda yang ingin mendalami **Artificial Intelligence**, **Teknologi**, dan **Kreativitas Digital**.

Dibangun di atas fondasi **Next.js 16 (App Router)** terbaru, website ini menawarkan performa tinggi dengan *Server-Side Rendering* (SSR) dan manajemen konten yang dinamis melalui **Supabase**. Proyek ini mencakup portal publik yang estetik dan Dashboard Admin yang aman (Protected Routes).

---

## 🔥 Fitur Utama

### 🌍 Portal Publik (Frontend)
Dirancang dengan nuansa *Dark Mode* (`bg-neutral-950`) dan aksen *Neon* untuk pengalaman visual yang imersif.

| Fitur | Deskripsi |
| :--- | :--- |
| ⚡ **Performa Tinggi** | Halaman di-render di server (SSR) untuk SEO dan kecepatan maksimal. |
| 🔍 **Pencarian Real-time** | Temukan artikel secara instan dengan fitur *debounced search*. |
| 🎨 **UI Dinamis** | Animasi halus menggunakan **Framer Motion** untuk transisi yang elegan. |
| 🧩 **Smart Components** | Kartu konten cerdas yang mendeteksi link eksternal dan *fallback* gambar otomatis. |
| 📱 **Responsif** | Tampilan sempurna di Desktop, Tablet, dan Mobile. |

### 🔒 Panel Admin (CMS)
Pusat kendali konten yang dilindungi sistem keamanan berlapis.

* **Secure Authentication:** Login admin divalidasi via *Server Actions* & *HTTP-only Cookies*.
* **Protected Routes:** Middleware cerdas yang memblokir akses tanpa izin.
* **Unified Form:** Satu formulir pintar untuk *Create* dan *Update* (auto-fill data saat edit).
* **Full CRUD:** Kelola Artikel, Kursus, dan Webinar (termasuk upload poster).
* **Instant Filtering:** Cari dan filter data konten di dashboard tanpa *reload*.

---

## 🛠️ Tech Stack

Proyek ini menggunakan teknologi terkini di ekosistem React:

* **Framework:** Next.js 16 (App Router)
* **Bahasa:** JavaScript (JSX)
* **Database:** Supabase (PostgreSQL + RLS)
* **Styling:** Tailwind CSS + Lucide React (Icons)
* **Backend Logic:** Next.js Server Actions
* **Motion:** Framer Motion
* **Utils:** `clsx`, `tailwind-merge`, `use-debounce`

---

## ⚙️ Panduan Instalasi (Local Setup)

Ikuti langkah berikut untuk menjalankan EduVate di komputer Anda.

### 1. Clone & Install
```bash
# Clone repositori
git clone [https://github.com/SinggihHakim/EduVate.git](https://github.com/SinggihHakim/EduVate.git)
cd EduVate

# Instal dependensi
npm install

```

### 2. Setup Database (Supabase)

Buat proyek baru di [Supabase Dashboard](https://supabase.com/), lalu jalankan query berikut di **SQL Editor**:

<details>
<summary>📂 <strong>Klik untuk melihat Script SQL</strong></summary>

```sql
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

-- 5. Kebijakan Akses Publik (PENTING!)
CREATE POLICY "Public articles view" ON articles FOR SELECT USING (true);
CREATE POLICY "Public courses view" ON courses FOR SELECT USING (true);
CREATE POLICY "Public webinars view" ON webinars FOR SELECT USING (true);

```

</details>

### 3. Konfigurasi Environment

Buat file `.env.local` di root folder dan isi dengan kredensial Supabase Anda:

```env
# Supabase Configuration (Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=[https://id-proyek-anda.supabase.co](https://id-proyek-anda.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=kunci-anon-publik-anda
SUPABASE_SERVICE_ROLE_KEY=kunci-service-role-rahasia-anda

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=rahasia123

```

> ⚠️ **Penting:** Jangan pernah push `SUPABASE_SERVICE_ROLE_KEY` ke repository publik!

### 4. Konfigurasi Next.js

Pastikan `next.config.js` mengizinkan domain gambar eksternal:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Mengizinkan gambar dari semua sumber
      },
    ],
  },
};
module.exports = nextConfig;

```

---

## 🚀 Cara Menjalankan

Jalankan server pengembangan:

```bash
npm run dev

```

* 🌐 **Website:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
* 🔑 **Admin Login:** [http://localhost:3000/login](https://www.google.com/search?q=http://localhost:3000/login)

---

## 📂 Struktur Folder

```text
EduVate/
├── app/
│   ├── actions.js          # Backend Logic (Server Actions)
│   ├── admin/              # Protected Admin Routes
│   ├── login/              # Admin Login Page
│   ├── artikel/            # Public Article Pages
│   └── ...
├── components/
│   ├── Card.jsx            # Smart Content Card
│   ├── Navbar.jsx          # Navigation
│   └── ...
├── lib/
│   ├── supabase.js         # Public Client (Anon)
│   └── supabase-admin.js   # Admin Client (Service Role)
└── ...

```

---

<div align="center">

Dibuat dengan 💻 dan ☕ oleh **Singgih Hakim**.

</div>

