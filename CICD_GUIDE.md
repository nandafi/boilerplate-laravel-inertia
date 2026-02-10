# Panduan Lengkap CI/CD Laravel: GitHub Actions ke VPS

Panduan ini berisi langkah-langkah untuk mengotomatisasi deployment aplikasi Laravel Anda menggunakan **GitHub Actions**, **GitHub Container Registry (GHCR)**, dan **Docker Compose** di VPS.

---

## 🏗️ Alur Kerja (Workflow)

1. **Developer**: Push kode ke branch `main`.
2. **GitHub Actions**:
    - Membangun image Docker (berdasarkan Dockerfile yang sudah kita buat).
    - Push image ke GitHub Container Registry (ghcr.io).
    - SSH ke VPS dan menjalankan perintah `docker compose pull` & `up`.
3. **VPS**: Menjalankan aplikasi versi terbaru secara otomatis.

---

## 1. Persiapan di Sisi Lokal & GitHub

### A. Buat SSH Key untuk GitHub Actions

Agar GitHub bisa masuk ke VPS tanpa password:

1. Buka terminal di laptop Anda:
    ```bash
    ssh-keygen -t ed25519 -f ~/.ssh/github_actions_key
    ```
    _(Jangan isi passphrase, tekan Enter saja)._
2. Ambil **Private Key** (untuk GitHub): `cat ~/.ssh/github_actions_key`
3. Ambil **Public Key** (untuk VPS): `cat ~/.ssh/github_actions_key.pub`

### B. Setup GitHub Secrets

Buka repo GitHub Anda > **Settings** > **Secrets and variables** > **Actions** > **New repository secret**:

| Nama Secret       | Nilai                                                        |
| :---------------- | :----------------------------------------------------------- |
| `SSH_PRIVATE_KEY` | Isi dengan hasil `cat ~/.ssh/github_actions_key`             |
| `VPS_IP`          | Alamat IP Server VPS Anda                                    |
| `VPS_USER`        | Username VPS (biasanya `root` atau user dengan akses docker) |
| `VPS_SSH_PORT`    | Port SSH (default `22`)                                      |

---

## 2. Persiapan di VPS (Server)

### A. Install Docker & Docker Compose

Pastikan VPS Anda sudah terpasang Docker. Jika belum (Ubuntu):

```bash
sudo apt update && sudo apt install docker.io docker-compose-v2 -y
sudo usermod -aG docker $USER
```

### B. Daftarkan Public Key

Tempelkan isi `github_actions_key.pub` ke file `authorized_keys` di VPS:

```bash
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Tempelkan kunci public di sini, lalu simpan.
```

### C. Buat Folder Project & File `.env`

Di VPS, siapkan folder untuk aplikasi:

```bash
mkdir -p ~/apps/coba-po
cd ~/apps/coba-po
nano .env
# Masukkan konfigurasi production Anda (APP_KEY, DB_PASSWORD, dll)
```

---

## 3. Konfigurasi CI/CD (GitHub Actions)

Buat file di project Anda: `.github/workflows/deploy.yml`

```yaml
name: Deploy Application

on:
    push:
        branches: ["main"]

env:
    REGISTRY: ghcr.io
    IMAGE_NAME: ${{ github.repository }}

jobs:
    build-and-push:
        runs-on: ubuntu-latest
        permissions:
            contents: read
            packages: write

        steps:
            - name: Checkout code
              uses: actions/checkout@v4

            - name: Log in to the Container registry
              uses: docker/login-action@v3
              with:
                  registry: ${{ env.REGISTRY }}
                  username: ${{ github.actor }}
                  password: ${{ secrets.GITHUB_TOKEN }}

            - name: Build and push Docker image
              uses: docker/build-push-action@v5
              with:
                  context: .
                  push: true
                  tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest

    deploy:
        needs: build-and-push
        runs-on: ubuntu-latest
        steps:
            - name: Deploy to VPS via SSH
              uses: appleboy/ssh-action@v1.0.3
              with:
                  host: ${{ secrets.VPS_IP }}
                  username: ${{ secrets.VPS_USER }}
                  key: ${{ secrets.SSH_PRIVATE_KEY }}
                  port: ${{ secrets.VPS_SSH_PORT }}
                  script: |
                      cd ~/apps/coba-po
                      # Login ke GHCR di VPS
                      echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
                      # Ambil file compose terbaru (opsional, jika ada perubahan di compose)
                      # Pull image terbaru & restart container
                      docker compose pull
                      docker compose up -d
                      # Pembersihan image lama
                      docker image prune -f
```

---

## 4. Penyesuaian `compose.yaml` untuk Produksi

Di VPS, file `compose.yaml` Anda harus menggunakan image dari registry, bukan build lokal.

**Contoh `~/apps/coba-po/compose.yaml` di VPS:**

```yaml
services:
    laravel_app:
        image: ghcr.io/username-anda/coba-po:latest # Ganti dengan nama repo Anda
        container_name: laravel_one
        restart: unless-stopped
        working_dir: /var/www/html
        env_file: .env # Menggunakan .env yang ada di VPS
        networks:
            - app-network

    webserver:
        image: nginx:alpine
        container_name: coba_po_webserver
        restart: unless-stopped
        ports:
            - "80:80"
        volumes:
            - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
        networks:
            - app-network
        depends_on:
            - laravel_app

networks:
    app-network:
        driver: bridge
```

---

## 🔒 Catatan Keamanan Penting

1. **Firewall**: Pastikan port DB (`3306`) tidak dibuka untuk publik di VPS. Hanya buka port `80` (HTTP) dan `443` (HTTPS).
2. **Secrets**: Jangan pernah commit file `.env` ke GitHub. Gunakan GitHub Secrets untuk data sensitif.
3. **User Docker**: Dengan menggunakan `USER user_docker` di Dockerfile (yang kita buat sebelumnya), aplikasi Anda berjalan jauh lebih aman di server karena tidak memiliki akses root ke kernel VPS.
