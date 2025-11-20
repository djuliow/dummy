# **CartaAI - Generator Undangan Pernikahan Cerdas**

Selamat datang di repositori proyek CartaAI! Ini adalah aplikasi web yang memungkinkan pengguna membuat undangan pernikahan digital yang indah dan personal dengan bantuan AI (disimulasikan), lengkap dengan unggahan foto dan musik. Proyek ini dibangun menggunakan React untuk antarmuka pengguna, dan perpaduan antara `json-server` (untuk data) dan server Express.js (untuk file) sebagai backend "dummy" untuk tujuan demonstrasi.

## **Daftar Isi**

-   [Fitur Utama](#fitur-utama)
-   [Teknologi yang Digunakan](#teknologi-yang-digunakan)
-   [Memulai Proyek](#memulai-proyek)
    -   [Prasyarat](#prasyarat)
    -   [Instalasi](#instalasi)
    -   [Menjalankan Aplikasi](#menjalankan-aplikasi)
-   [Struktur Folder](#struktur-folder)

---

## **Fitur Utama**

-   **Otentikasi Pengguna**: Sistem pendaftaran dan login "dummy".
-   **Generator Undangan Premium**: Form interaktif untuk membuat undangan dengan detail lengkap (nama, tanggal, lokasi, dll.).
-   **Unggahan Aset**: Kemampuan untuk mengunggah foto mempelai, galeri foto, dan musik latar.
-   **Penyimpanan Data & File**: Data undangan disimpan dalam file `db.json`, sementara file yang diunggah disimpan di folder `api/uploads`.
-   **Tampilan Undangan**: Halaman khusus untuk menampilkan undangan yang telah dibuat.
-   **Manajemen Undangan**: Pengguna dapat melihat riwayat undangan yang pernah mereka buat di halaman profil dan menghapusnya.
-   **Sistem Pembayaran Dummy**: Simulasi proses pembayaran untuk meng-upgrade akun ke status "premium".

---

## **Teknologi yang Digunakan**

-   **Frontend**:
    -   [React](https://reactjs.org/)
    -   [React Router](https://reactrouter.com/) untuk navigasi.
    -   [axios](https://axios-http.com/) untuk komunikasi dengan backend.
    -   [Tailwind CSS](https://tailwindcss.com/) untuk styling.
-   **Backend & Data**:
    -   [Express.js](https://expressjs.com/) untuk server API unggahan file.
    -   [multer](https://github.com/expressjs/multer) untuk memproses file yang diunggah.
    -   [json-server](https://github.com/typicode/json-server) sebagai database "dummy" sederhana.
-   **Development**:
    -   [Vite](https://vitejs.dev/) sebagai build tool dan server pengembangan frontend.

---

## **Memulai Proyek**

### **Prasyarat**

Pastikan Anda telah menginstal perangkat lunak berikut di komputer Anda:
-   **Node.js dan npm**: [Unduh di sini](https://nodejs.org/en/download/)
-   **Git** (opsional): [Unduh di sini](https://git-scm.com/downloads)

### **Instalasi**

1.  **Clone repositori ini (jika Anda belum melakukannya):**
    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd <NAMA_FOLDER_PROYEK>
    ```

2.  **Instal dependensi untuk frontend (React):**
    ```bash
    # Pastikan Anda berada di direktori utama proyek
    npm install
    ```

3.  **Instal dependensi untuk backend (Express.js):**
    ```bash
    # Masuk ke direktori API
    cd api

    # Instal dependensi backend
    npm install
    ```

### **Menjalankan Aplikasi**

Untuk menjalankan proyek ini secara penuh, Anda perlu membuka **3 terminal terpisah** dan menjalankan perintah berikut:

1.  **Terminal 1: Jalankan Frontend Server (Vite)**
    ```bash
    # Dari direktori utama proyek
    npm run dev
    ```
    (Aplikasi web akan berjalan di `http://localhost:5173` atau port lain yang tersedia)

2.  **Terminal 2: Jalankan JSON Server (Database)**
    ```bash
    # Dari direktori utama proyek
    npx json-server db.json 
    ```
    (Database akan berjalan di `http://localhost:3000`)

3.  **Terminal 3: Jalankan Backend API (File Upload)**
    ```bash
    # Dari direktori utama proyek
    node server.js
    ```
    (Server file akan berjalan di `http://localhost:4000`)

Setelah ketiga server berjalan, Anda bisa membuka aplikasi di browser melalui alamat yang ditampilkan oleh server Vite.

---

## **Struktur Folder**

```
<NAMA_FOLDER_PROYEK>/
├─── api/             # Backend server (Express.js) untuk unggahan file
│    ├─── node_modules/
│    ├─── uploads/     # File gambar & musik yang diunggah akan disimpan di sini
│    ├─── package.json
│    └─── server.js
├─── node_modules/
├─── public/
├─── src/             # Kode sumber frontend (React)
│    ├─── components/  # Komponen React yang dapat digunakan kembali
│    ├─── context/     # React Context untuk state global (Auth, DarkMode)
│    └─── pages/       # Komponen React untuk setiap halaman
├─── db.json          # Database "dummy"
└─── README.md
```