<div align="center">

# 🎮 Luxe News

**Portal berita gaming modern — seputar MOBA, FPS, RPG, dan Turnamen Esports**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![Filament](https://img.shields.io/badge/Filament-3.3-FDAE4B?style=flat-square)](https://filamentphp.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat-square&logo=php)](https://php.net)

</div>

---

## 📖 Tentang Proyek

**Luxe News** adalah portal berita gaming yang menyajikan informasi terkini seputar dunia game, termasuk berita dari berbagai genre (MOBA, FPS, RPG), serta liputan turnamen esports. Konten dikelola melalui panel admin berbasis **Filament** dan dikonsumsi oleh frontend **React** melalui REST API.

Repository ini merupakan **monorepo** yang menyatukan kedua sisi sistem:

| Direktori | Teknologi | Deskripsi |
|-----------|-----------|-----------|
| [`/frontend`](./frontend) | React 18, Vite, Tailwind CSS | Antarmuka pengguna publik |
| [`/backend`](./backend) | Laravel 12, Filament, SQLite | REST API & panel admin konten |

---

## 🏗️ Arsitektur Sistem

```
┌───────────────────────────────────────────────┐
│                  PENGGUNA                     │
└───────────────────┬───────────────────────────┘
                    │ Browser
                    ▼
┌───────────────────────────────────────────────┐
│           FRONTEND  (React + Vite)            │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │   Hero   │  │  Berita  │  │ Tournament │  │
│  └──────────┘  └──────────┘  └────────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Games   │  │   MOBA   │  │  FPS / RPG │  │
│  └──────────┘  └──────────┘  └────────────┘  │
└───────────────────┬───────────────────────────┘
                    │ REST API (Axios)
                    ▼
┌───────────────────────────────────────────────┐
│           BACKEND  (Laravel 12)               │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │          REST API  /api/*               │  │
│  │  /news  /games  /tournaments            │  │
│  │  /categories  /comments                 │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │       Filament Admin Panel              │  │
│  │  News · Games · Tournaments             │  │
│  │  Categories · Banners · Comments        │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  ┌──────────────┐                             │
│  │   Database   │  SQLite (dev) / MySQL (prod)│
│  └──────────────┘                             │
└───────────────────────────────────────────────┘
```

---

## ✨ Fitur Utama

### 🖥️ Frontend
- **Halaman Beranda** — Hero section, berita populer, sorotan game
- **Kategori Berita** — MOBA, FPS, RPG dengan halaman terpisah
- **Halaman Turnamen** — Daftar dan detail turnamen esports
- **Halaman Berita** — Detail berita dengan komentar pengguna
- **Halaman Games** — Daftar game yang tersedia
- **Navigasi Dinamis** — Routing berbasis slug menggunakan React Router v6
- **Lazy Loading** — Semua halaman dimuat secara *on-demand* untuk performa optimal
- **Desain Responsif** — Mobile-first dengan Tailwind CSS dan animasi

### ⚙️ Backend
- **REST API** — Endpoint lengkap untuk berita, game, turnamen, kategori, dan komentar
- **Admin Panel (Filament)** — Kelola seluruh konten tanpa sentuh kode
- **Manajemen Konten** — News, Games, Tournaments, Categories, Category Banners, Comments
- **Autentikasi** — Laravel Sanctum untuk proteksi endpoint

---

## 🗂️ Struktur Monorepo

```
Luxe Craft/
├── frontend/                 # Aplikasi React
│   ├── src/
│   │   ├── api/              # Konfigurasi Axios & service calls
│   │   ├── assets/           # Gambar, SVG, media statis
│   │   ├── components/       # Komponen UI yang dapat digunakan ulang
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Popular.jsx
│   │   │   ├── Games.jsx
│   │   │   ├── Tournament.jsx
│   │   │   ├── NewsDetail.jsx
│   │   │   └── TournamentDetail.jsx
│   │   ├── constants/        # Data statis (fallback)
│   │   ├── kategori/         # Halaman per kategori (Moba, Fps, Rpg)
│   │   └── pages/            # Halaman utama
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Aplikasi Laravel
│   ├── app/
│   │   ├── Filament/
│   │   │   └── Resources/    # Panel admin untuk setiap entitas
│   │   ├── Http/
│   │   │   └── Controllers/Api/  # Controller REST API
│   │   └── Models/           # Eloquent Models
│   │       ├── News.php
│   │       ├── Game.php
│   │       ├── Tournament.php
│   │       ├── Category.php
│   │       ├── CategoryBanner.php
│   │       ├── Comment.php
│   │       └── User.php
│   ├── database/             # Migrations & Seeders
│   ├── routes/
│   │   └── api.php           # Definisi seluruh endpoint API
│   └── composer.json
│
├── README.md                 # ← Anda sedang membacanya
└── .gitignore
```

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat

Pastikan sudah terinstal di komputer kamu:

- **Node.js** v18+ dan **npm**
- **PHP** 8.2+
- **Composer**

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/nabilmkr/Luxe-News.git
cd Luxe-News
```

---

### 2️⃣ Setup Backend (Laravel)

```bash
cd backend

# Install dependensi PHP
composer install

# Salin file konfigurasi environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Jalankan migrasi database
php artisan migrate

# (Opsional) Isi database dengan data awal
php artisan db:seed

# Jalankan server backend
php artisan serve
```

> Backend akan berjalan di: **http://localhost:8000**
> Admin panel tersedia di: **http://localhost:8000/admin**

---

### 3️⃣ Setup Frontend (React)

Buka terminal baru:

```bash
cd frontend

# Install dependensi Node
npm install

# Buat file environment (.env) dan atur URL backend lokal
echo "VITE_BACKEND_URL=http://localhost:8000" > .env

# Jalankan server pengembangan
npm run dev
```

> Frontend akan berjalan di: **http://localhost:5173**

---

## 🔌 API Endpoints

Semua endpoint berada di bawah prefix `/api`:

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/news` | Daftar semua berita |
| `GET` | `/api/news/featured` | Berita unggulan |
| `GET` | `/api/news/hot` | Berita terpopuler |
| `GET` | `/api/news/{slug}` | Detail berita |
| `GET` | `/api/category-news` | Berita per kategori |
| `GET` | `/api/category-news/{slug}` | Detail berita kategori |
| `GET` | `/api/category-banners` | Banner per kategori |
| `GET` | `/api/news/{id}/comments` | Komentar pada berita |
| `POST` | `/api/news/{id}/comments` | Tambah komentar |
| `GET` | `/api/categories` | Semua kategori |
| `GET` | `/api/categories/{slug}` | Detail kategori |
| `GET` | `/api/games` | Daftar game |
| `GET` | `/api/games/{slug}` | Detail game |
| `GET` | `/api/tournaments` | Daftar turnamen |
| `GET` | `/api/tournaments/{slug}` | Detail turnamen |

---

## 🛠️ Tech Stack

### Frontend
| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| React | 18.2 | UI Framework |
| Vite | 5.1 | Build tool & dev server |
| React Router DOM | 6 | Client-side routing |
| Axios | 1.9 | HTTP client untuk API |
| Tailwind CSS | 3.4 | Utility-first styling |
| Styled Components | 6 | Component-scoped CSS |
| Swiper | 11 | Carousel / slider |
| React Awesome Reveal | 4 | Animasi scroll |
| React Icons | 5 | Icon library |

### Backend
| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| Laravel | 12 | PHP Framework |
| Filament | 3.3 | Admin panel |
| PHP | 8.2+ | Server-side language |
| Laravel Sanctum | — | API Authentication |
| MySQL | — | Database (development) |

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan portofolio.

---

<div align="center">

Dibuat dengan ❤️ oleh **nabilmkr**

</div>
