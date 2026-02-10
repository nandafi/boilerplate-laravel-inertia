# 🚀 Laravel ERP & Administration Boilerplate

Website Company Profile / ERP / Office Administration boilerplate built with **Laravel 9**, **Inertia.js**, **React**, and **Shadcn UI**.

## ✨ Features

- **Backend**: Laravel 9.x
- **Frontend**: React + Inertia.js
- **Styling**: Tailwind CSS + Shadcn UI + Lucide Icons
- **Themes**: Flexible design tokens with OKLCH support (TweakCN ready)
- **Containerization**: Full Docker support via Laravel Sail
- **Database**: External MySQL (e.g., separate container), Redis (via Sail)
- **Tooling**: Vite, Prettier, Blade components

## 🛠️ Getting Started

### Prerequisites

- Docker Desktop / Docker Engine
- PHP 8.1+ (for local development without Docker)
- Node.js & NPM

### Installation

1. **Clone the repository**:

    ```bash
    git clone [your-repo-url]
    cd coba_po
    ```

2. **Setup Environment**:

    ```bash
    cp .env.example .env
    ```

3. **Install Dependencies**:

    ```bash
    composer install
    npm install
    ```

4. **Generate Application Key**:

    ```bash
    php artisan key:generate
    ```

5. **Fix Permissions** (Linux/Mac):
    ```bash
    chmod -R 777 storage bootstrap/cache
    ```

## 🐳 Docker Deployment (Standard)

Proyek ini menggunakan standar Docker Compose untuk kemudahan manajemen.

### Menjalankan Container

1. **Build & Up**:
    ```bash
    docker compose up -d --build
    ```
2. **Setup Aplikasi** (Hanya saat pertama kali):
    ```bash
    docker compose exec laravel_one php artisan key:generate
    docker compose exec laravel_one php artisan migrate --seed
    chmod -R 777 storage bootstrap/cache
    ```

### Alamat Akses

- **Aplikasi**: [http://localhost:8000](http://localhost:8000)
- **MySQL & Redis**: Menggunakan container eksternal yang sudah ada (pastikan konfigurasi di `.env` sudah benar).

### Perintah Artisan & NPM

Gunakan perintah berikut untuk menjalankan perintah di dalam container:

```bash
docker compose exec laravel_one php artisan [command]
docker compose exec laravel_one npm [command]
```

## 📂 Project Structure Highlights

- `resources/js/Pages`: React components and pages.
- `resources/js/components/ui`: UI components (Shadcn).
- `app/Http/Controllers`: Backend logic.
- `database/seeders`: Sample data for testing.

## 🎨 UI & Themes

Customize your theme using **TweakCN**. To update the theme:

```bash
npx shadcn@latest add https://tweakcn.com/r/themes/[id-tema]
```

Review `notes.md` for more details on the project structure and common commands.

## 📄 License

This boilerplate is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
