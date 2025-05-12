# Capstone API

> **API untuk mengelola konten website, termasuk slider, artikel, panca indra, dan tentang aplikasi, dengan autentikasi pengguna dan admin.**

## Endpoint

<div class="api-endpoint">https://capstone-api-navy.vercel.app/</div>

### Register

* URL
  * `/register`
* Method
  * POST
* Request Body
  * `name` as `string`
  * `email` as `string`, must be unique
  * `password` as `string`, must be at least 8 characters
* Response

```json
{
  "error": false,
  "message": "User berhasil ditambahkan"
}
```

### Login

* URL
  * `/login`
* Method
  * POST
* Request Body
  * `email` as `string`
  * `password` as `string`
* Response

```json
{
  "error": false,
  "message": "success",
  "loginResult": {
    "userId": "user-id",
    "name": "User Name",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Admin Login

* URL
  * `/admin`
* Method
  * POST
* Request Body
  * `email` as `string`
  * `password` as `string`
* Response

```json
{
  "error": false,
  "message": "success",
  "loginResult": {
    "adminId": "admin-id",
    "name": "Admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get All Sliders

* URL
  * `/sliders`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "id": "slider-id",
      "title": "Slider Title",
      "description": "Slider Description",
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

> **Catatan**: Field `imageUrl` akan berisi URL Cloudinary jika gambar disimpan di Cloudinary, atau path lokal jika gambar disimpan secara lokal.

### Get Slider by ID

* URL
  * `/sliders/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "slider-id",
    "title": "Slider Title",
    "description": "Slider Description",
    "imageUrl": "/uploads/image.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create Slider (Admin Only)

* URL
  * `/admin/sliders`
* Method
  * POST
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `description` as `string`
  * `photo` as `file`, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Slider berhasil ditambahkan",
  "data": {
    "sliderId": "slider-id"
  }
}
```

### Update Slider (Admin Only)

* URL
  * `/admin/sliders/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `description` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Slider berhasil diperbarui"
}
```

### Delete Slider (Admin Only)

* URL
  * `/admin/sliders/:id`
* Method
  * DELETE
* Headers
  * Authorization: Bearer `<token>`
* Response

```json
{
  "error": false,
  "message": "Slider berhasil dihapus"
}
```

### Get All Articles

* URL
  * `/articles`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "id": "article-id",
      "title": "Article Title",
      "content": "Article Content",
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

> **Catatan**: Field `imageUrl` akan berisi URL Cloudinary jika gambar disimpan di Cloudinary, atau path lokal jika gambar disimpan secara lokal.

### Get Article by ID

* URL
  * `/articles/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "article-id",
    "title": "Article Title",
    "content": "Article Content",
    "imageUrl": "/uploads/image.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create Article (Admin Only)

* URL
  * `/admin/articles`
* Method
  * POST
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `content` as `string`
  * `photo` as `file`, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Artikel berhasil ditambahkan",
  "data": {
    "articleId": "article-id"
  }
}
```

### Update Article (Admin Only)

* URL
  * `/admin/articles/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `content` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Artikel berhasil diperbarui"
}
```

### Delete Article (Admin Only)

* URL
  * `/admin/articles/:id`
* Method
  * DELETE
* Headers
  * Authorization: Bearer `<token>`
* Response

```json
{
  "error": false,
  "message": "Artikel berhasil dihapus"
}
```

### Get All Panca Indra

* URL
  * `/panca-indra`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "id": "panca-indra-id",
      "title": "Panca Indra Title",
      "description": "Panca Indra Description",
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

> **Catatan**: Field `imageUrl` akan berisi URL Cloudinary jika gambar disimpan di Cloudinary, atau path lokal jika gambar disimpan secara lokal.

### Get Panca Indra by ID

* URL
  * `/panca-indra/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "panca-indra-id",
    "title": "Panca Indra Title",
    "description": "Panca Indra Description",
    "imageUrl": "/uploads/image.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create Panca Indra (Admin Only)

* URL
  * `/admin/panca-indra`
* Method
  * POST
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `description` as `string`
  * `photo` as `file`, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Panca Indra berhasil ditambahkan",
  "data": {
    "pancaIndraId": "panca-indra-id"
  }
}
```

### Update Panca Indra (Admin Only)

* URL
  * `/admin/panca-indra/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `description` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Panca Indra berhasil diperbarui"
}
```

### Delete Panca Indra (Admin Only)

* URL
  * `/admin/panca-indra/:id`
* Method
  * DELETE
* Headers
  * Authorization: Bearer `<token>`
* Response

```json
{
  "error": false,
  "message": "Panca Indra berhasil dihapus"
}
```

### Get All Tentang Aplikasi

* URL
  * `/tentang-aplikasi`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "id": "tentang-aplikasi-id",
      "title": "Tentang Aplikasi Title",
      "content": "Tentang Aplikasi Content",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Tentang Aplikasi by ID

* URL
  * `/tentang-aplikasi/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "tentang-aplikasi-id",
    "title": "Tentang Aplikasi Title",
    "content": "Tentang Aplikasi Content",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create Tentang Aplikasi (Admin Only)

* URL
  * `/admin/tentang-aplikasi`
* Method
  * POST
* Headers
  * Content-Type: application/json
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `content` as `string`
* Response

```json
{
  "error": false,
  "message": "Tentang Aplikasi berhasil ditambahkan",
  "data": {
    "tentangAplikasiId": "tentang-aplikasi-id"
  }
}
```

### Update Tentang Aplikasi (Admin Only)

* URL
  * `/admin/tentang-aplikasi/:id`
* Method
  * PUT
* Headers
  * Content-Type: application/json
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `content` as `string`
* Response

```json
{
  "error": false,
  "message": "Tentang Aplikasi berhasil diperbarui"
}
```

### Delete Tentang Aplikasi (Admin Only)

* URL
  * `/admin/tentang-aplikasi/:id`
* Method
  * DELETE
* Headers
  * Authorization: Bearer `<token>`
* Response

```json
{
  "error": false,
  "message": "Tentang Aplikasi berhasil dihapus"
}
```

### Access Uploaded Files

* URL

  * `/uploads/:filename` (untuk file yang disimpan secara lokal)
  * URL Cloudinary (untuk file yang disimpan di Cloudinary)
* Method

  * GET
* Response

  * The image file if it exists, or a 404 error if the file does not exist.
* Example (Cloudinary)

  * <div class="api-endpoint">https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/1744863672764-logo</div>

## Home Endpoint

* URL
  * `/`
* Method
  * GET
* Response
  * Mengembalikan semua data dari slider, artikel, panca indra, dan tentang aplikasi dalam satu respons.

```json
{
  "error": false,
  "message": "success",
  "data": {
    "sliders": [...],
    "articles": [...],
    "pancaIndras": [...],
    "tentangAplikasis": [...]
  }
}
```
