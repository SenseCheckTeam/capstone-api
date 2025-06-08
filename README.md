
# Capstone API

API untuk mengelola konten website termasuk slider, panca indra, hero, partners, penyakit, dan diagnosa dengan autentikasi pengguna dan admin. API ini menggunakan MongoDB untuk database dan Cloudinary untuk penyimpanan gambar.

## Teknologi yang Digunakan

-**Backend Framework**: Hapi.js

-**Database**: MongoDB dengan Mongoose

-**Authentication**: JWT (JSON Web Tokens)

-**File Storage**: Cloudinary

-**Password Hashing**: bcrypt

-**Documentation**: Docsify

## Prerequisites

Pastikan Anda telah menginstall:

- Node.js (versi 14 atau lebih baru)
- npm atau yarn
- MongoDB (local atau cloud)
- Akun Cloudinary

## Installation & Setup

### 1. Clone Repository

```bash

git clone https://github.com/nfapriyanto/capstone-api.git

cd capstone-api

```

### 2. Install Dependencies

```bash

npm install

```

### 3. Setup Environment Variables

Buat file `.env` di root directory dan tambahkan konfigurasi berikut:

```env

# Port Configuration

PORT=5000


# MongoDB Configuration

MONGODB_URI=mongodb://localhost:27017/capstone-db

# Atau gunakan MongoDB Atlas:

# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/capstone-db


# JWT Configuration

JWT_SECRET=your-super-secret-jwt-key-here


# Cloudinary Configuration

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret


# Environment

NODE_ENV=development

```

### 4. Setup Cloudinary

1. Buat akun di [Cloudinary](https://cloudinary.com/)
2. Dapatkan credentials (Cloud Name, API Key, dan API Secret) dari dashboard
3. Masukkan credentials ke file `.env` Anda

### 5. Menjalankan Project

#### Development Mode

```bash

npm run start:dev

```

#### Production Mode

```bash

npm run start:prod

```

#### Menjalankan Dokumentasi

```bash

npm run docs

```

Kemudian buka [http://localhost:3000](http://localhost:3000) di browser.

## Default Admin Account

Ketika aplikasi pertama kali dijalankan, akan dibuat akun admin default:

-**Email**: admin@example.com

-**Password**: admin123

**⚠️ Penting**: Segera ubah password default setelah login pertama kali!

## API Endpoints

### Authentication

-`POST /register` - Registrasi user baru

-`POST /login` - Login user

-`POST /admin` - Login admin

### Public Endpoints

-`GET /` - Home endpoint (semua data)

-`GET /sliders` - Get semua sliders

-`GET /sliders/{id}` - Get slider berdasarkan ID

-`GET /hero` - Get semua hero

-`GET /hero/{id}` - Get hero berdasarkan ID

-`GET /panca-indra` - Get semua panca indra

-`GET /panca-indra/{id}` - Get panca indra berdasarkan ID

-`GET /peraba` - Get data peraba

-`GET /penciuman` - Get data penciuman

-`GET /pendengaran` - Get data pendengaran

-`GET /penglihatan` - Get data penglihatan

-`GET /pengecapan` - Get data pengecapan

-`GET /partners` - Get data partners

-`GET /partner` - Get semua partner

-`GET /penyakit` - Get semua penyakit

### Admin Endpoints (Memerlukan Token)

-`POST /admin/sliders` - Buat slider baru

-`PUT /admin/sliders/{id}` - Update slider

-`DELETE /admin/sliders/{id}` - Hapus slider

-`POST /admin/hero` - Buat hero baru

-`PUT /admin/hero/{id}` - Update hero

-`DELETE /admin/hero/{id}` - Hapus hero

-`POST /admin/panca-indra` - Buat panca indra baru

-`PUT /admin/panca-indra/{id}` - Update panca indra

-`DELETE /admin/panca-indra/{id}` - Hapus panca indra

-`PUT /admin/peraba/{id}` - Update peraba

-`PUT /admin/penciuman/{id}` - Update penciuman

-`PUT /admin/pendengaran/{id}` - Update pendengaran

-`PUT /admin/penglihatan/{id}` - Update penglihatan

-`PUT /admin/pengecapan/{id}` - Update pengecapan

-`POST /admin/partners` - Buat partners group

-`PUT /admin/partners/{id}` - Update partners group

-`POST /admin/partner` - Buat partner baru

-`PUT /admin/partner/{id}` - Update partner

-`DELETE /admin/partner/{id}` - Hapus partner

-`POST /admin/penyakit` - Buat penyakit baru

-`PUT /admin/penyakit/{id}` - Update penyakit

-`DELETE /admin/penyakit/{id}` - Hapus penyakit

### User Endpoints (Memerlukan Token User)

-`POST /diagnosa` - Buat diagnosa baru

-`GET /diagnosa` - Get diagnosa user

-`PUT /profile` - Update profil user

## File Upload

API mendukung upload file gambar dengan ketentuan:

- Format yang didukung: JPG, JPEG, PNG
- Ukuran maksimal: 2MB
- Semua file disimpan di Cloudinary

## Documentation

Dokumentasi lengkap API tersedia di:

-**Local**: [http://localhost:5000/docs](http://localhost:5000/docs)

-**Production**: [https://capstone-api-peach.vercel.app](https://capstone-api-peach.vercel.app)

## Project Structure

```

src/

├── controllers/     # Logic handler untuk setiap endpoint

├── middleware/      # Authentication middleware

├── models/         # MongoDB schema models

├── routes/         # Route definitions

├── utils/          # Utility functions (file handler, etc.)

├── config.js       # Configuration settings

├── database.js     # Database connection

└── server.js       # Main server file

```

## Environment Variables Explanation

| Variable | Description | Required |

|----------|-------------|----------|

| `MONGODB_URI` | URL koneksi MongoDB | Yes |

| `JWT_SECRET` | Secret key untuk JWT token | Yes |

| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |

| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |

| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

## Troubleshooting

### Common Issues

1.**Connection Error MongoDB**

- Pastikan MongoDB running (jika local)
- Periksa connection string di `.env`
- Pastikan network access untuk MongoDB Atlas

2.**Cloudinary Upload Error**

- Verifikasi credentials Cloudinary di `.env`
- Pastikan file size tidak melebihi 2MB
- Periksa format file (hanya JPG, JPEG, PNG)

3.**Authentication Error**

- Pastikan JWT_SECRET diset di `.env`
- Verifikasi token format: `Bearer <token>`

### Development Tips

- Gunakan tools seperti Postman atau Insomnia untuk testing API
- Periksa logs di console untuk debugging
- Gunakan MongoDB Compass untuk melihat data di database

## Contributing

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## License

Project ini menggunakan lisensi MIT.
