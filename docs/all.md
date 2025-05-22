# Capstone API

> **API untuk mengelola konten website, termasuk slider, panca indra, hero, dan partners, dengan autentikasi pengguna dan admin.**

## Endpoint

<div class="api-endpoint">https://capstone-api-peach.vercel.app</div>

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
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

> **Catatan**: Field `imageUrl` akan berisi URL Cloudinary untuk gambar yang diupload.

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
    "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
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

### Get All Hero

* URL
  * `/hero`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "id": "hero-id",
      "title": "Hero Title",
      "description": "Hero Description",
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "textButton": "Learn More",
      "buttonUrl": "https://example.com",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

> **Catatan**: Field `imageUrl` akan berisi URL Cloudinary untuk gambar yang diupload.

### Get Hero by ID

* URL
  * `/hero/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "hero-id",
    "title": "Hero Title",
    "description": "Hero Description",
    "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
    "textButton": "Learn More",
    "buttonUrl": "https://example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create Hero (Admin Only)

* URL
  * `/admin/hero`
* Method
  * POST
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `description` as `string`
  * `photo` as `file`, must be a valid image file (JPG, JPEG, or PNG)
  * `textButton` as `string`
  * `buttonUrl` as `string`
* Response

```json
{
  "error": false,
  "message": "Hero berhasil ditambahkan",
  "data": {
    "heroId": "hero-id"
  }
}
```

### Update Hero (Admin Only)

* URL
  * `/admin/hero/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `description` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
  * `textButton` as `string`
  * `buttonUrl` as `string`
* Response

```json
{
  "error": false,
  "message": "Hero berhasil diperbarui"
}
```

### Delete Hero (Admin Only)

* URL
  * `/admin/hero/:id`
* Method
  * DELETE
* Headers
  * Authorization: Bearer `<token>`
* Response

```json
{
  "error": false,
  "message": "Hero berhasil dihapus"
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
  "data": {
    "id": "panca-indra-id",
    "title": "Panca Indra",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "peraba": {
      "id": "peraba-id",
      "title": "Peraba Title",
      "subtitle": "Peraba Subtitle",
      "logoUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/logo",
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "description": "Peraba Description",
      "buttonUrl": "https://example.com",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "penciuman": {...},
    "pendengaran": {...},
    "penglihatan": {...},
    "pengecapan": {...}
  }
}
```

> **Catatan**: Field `logoUrl` dan `imageUrl` akan berisi URL Cloudinary untuk gambar yang diupload.

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
    "title": "Panca Indra",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "peraba": {
      "id": "peraba-id",
      "title": "Peraba Title",
      "subtitle": "Peraba Subtitle",
      "logoUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/logo",
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "description": "Peraba Description",
      "buttonUrl": "https://example.com",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "penciuman": {...},
    "pendengaran": {...},
    "penglihatan": {...},
    "pengecapan": {...}
  }
}
```

### Create Panca Indra (Admin Only)

* URL
  * `/admin/panca-indra`
* Method
  * POST
* Headers
  * Content-Type: application/json
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
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
  * Content-Type: application/json
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
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

### Get All Peraba

* URL
  * `/peraba`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "id": "peraba-id",
      "title": "Peraba Title",
      "subtitle": "Peraba Subtitle",
      "logoUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/logo",
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "description": "Peraba Description",
      "buttonUrl": "https://example.com",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

> **Catatan**: Field `logoUrl` dan `imageUrl` akan berisi URL Cloudinary untuk gambar yang diupload.

### Get Peraba by ID

* URL
  * `/peraba/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "peraba-id",
    "title": "Peraba Title",
    "subtitle": "Peraba Subtitle",
    "logoUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/logo",
    "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
    "description": "Peraba Description",
    "buttonUrl": "https://example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Update Peraba (Admin Only)

* URL
  * `/admin/peraba/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `subtitle` as `string`
  * `description` as `string`
  * `buttonUrl` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
  * `logo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Peraba berhasil diperbarui"
}
```

### Update Penciuman (Admin Only)

* URL
  * `/admin/penciuman/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `subtitle` as `string`
  * `description` as `string`
  * `buttonUrl` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
  * `logo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Penciuman berhasil diperbarui"
}
```

### Update Pendengaran (Admin Only)

* URL
  * `/admin/pendengaran/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `subtitle` as `string`
  * `description` as `string`
  * `buttonUrl` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
  * `logo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Pendengaran berhasil diperbarui"
}
```

### Update Penglihatan (Admin Only)

* URL
  * `/admin/penglihatan/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `subtitle` as `string`
  * `description` as `string`
  * `buttonUrl` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
  * `logo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Penglihatan berhasil diperbarui"
}
```

### Update Pengecapan (Admin Only)

* URL
  * `/admin/pengecapan/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
  * `subtitle` as `string`
  * `description` as `string`
  * `buttonUrl` as `string`
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
  * `logo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Pengecapan berhasil diperbarui"
}
```

### Get All Partners

* URL
  * `/partners`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "partners-id",
    "title": "Partners",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "partner": [
      {
        "id": "partner-id",
        "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

> **Catatan**: Field `imageUrl` akan berisi URL Cloudinary untuk gambar yang diupload.

### Get Partners by ID

* URL
  * `/partners/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "partners-id",
    "title": "Partners",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "partner": [
      {
        "id": "partner-id",
        "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Create Partners (Admin Only)

* URL
  * `/admin/partners`
* Method
  * POST
* Headers
  * Content-Type: application/json
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
* Response

```json
{
  "error": false,
  "message": "Partners berhasil ditambahkan",
  "data": {
    "partnersId": "partners-id"
  }
}
```

### Update Partners (Admin Only)

* URL
  * `/admin/partners/:id`
* Method
  * PUT
* Headers
  * Content-Type: application/json
  * Authorization: Bearer `<token>`
* Request Body
  * `title` as `string`
* Response

```json
{
  "error": false,
  "message": "Partners berhasil diperbarui"
}
```

### Delete Partners (Admin Only)

* URL
  * `/admin/partners/:id`
* Method
  * DELETE
* Headers
  * Authorization: Bearer `<token>`
* Response

```json
{
  "error": false,
  "message": "Partners berhasil dihapus"
}
```

### Get All Partner Entries

* URL
  * `/partner`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "id": "partner-id",
      "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

> **Catatan**: Field `imageUrl` akan berisi URL Cloudinary untuk gambar yang diupload.

### Get Partner by ID

* URL
  * `/partner/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "partner-id",
    "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create Partner (Admin Only)

* URL
  * `/admin/partner`
* Method
  * POST
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `photo` as `file`, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Partner berhasil ditambahkan",
  "data": {
    "partnerId": "partner-id"
  }
}
```

### Update Partner (Admin Only)

* URL
  * `/admin/partner/:id`
* Method
  * PUT
* Headers
  * Content-Type: multipart/form-data
  * Authorization: Bearer `<token>`
* Request Body
  * `photo` as `file`, optional, must be a valid image file (JPG, JPEG, or PNG)
* Response

```json
{
  "error": false,
  "message": "Partner berhasil diperbarui"
}
```

### Delete Partner (Admin Only)

* URL
  * `/admin/partner/:id`
* Method
  * DELETE
* Headers
  * Authorization: Bearer `<token>`
* Response

```json
{
  "error": false,
  "message": "Partner berhasil dihapus"
}
```

### Access Uploaded Files

* URL
  * URL Cloudinary
* Method
  * GET
* Response
  * The image file if it exists, or a 404 error if the file does not exist.
* Example
  * <div class="api-endpoint">https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/1744863672764-logo</div>

## Home Endpoint

* URL
  * `/`
* Method
  * GET
* Response
  * Mengembalikan semua data dari slider, panca indra, hero, dan partners dalam satu respons.

```json
{
  "error": false,
  "message": "success",
  "data": {
    "sliders": [...],
    "pancaIndra": {
      "id": "panca-indra-id",
      "title": "Panca Indra",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "peraba": {
        "id": "peraba-id",
        "title": "Peraba",
        "subtitle": "Peraba Subtitle",
        "logoUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/logo",
        "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
        "description": "Peraba Description",
        "buttonUrl": "https://example.com",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      },
      "penciuman": {...},
      "pendengaran": {...},
      "penglihatan": {...},
      "pengecapan": {...}
    },
    "heros": [...],
    "partners": {
      "id": "partners-id",
      "title": "Partners",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "partner": [
        {
          "id": "partner-id",
          "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  }
}
```
