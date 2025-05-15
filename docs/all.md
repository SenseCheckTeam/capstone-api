# Capstone API

> **API untuk mengelola konten website, termasuk slider, panca indra, dan about, dengan autentikasi pengguna dan admin.**

## Endpoint

<div class="api-endpoint">http://localhost:5000</div>

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

> **Catatan**: Field `imageUrl` akan berisi URL Cloudinary untuk gambar yang diupload.

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
    "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
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

### Get All About

* URL
  * `/about`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "id": "about-id",
      "title": "About Title",
      "description": "About Description",
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

### Get About by ID

* URL
  * `/about/:id`
* Method
  * GET
* Response

```json
{
  "error": false,
  "message": "success",
  "data": {
    "id": "about-id",
    "title": "About Title",
    "description": "About Description",
    "imageUrl": "https://res.cloudinary.com/djgglqc1h/image/upload/v1234567890/capstone-api/image",
    "textButton": "Learn More",
    "buttonUrl": "https://example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create About (Admin Only)

* URL
  * `/admin/about`
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
  "message": "About berhasil ditambahkan",
  "data": {
    "aboutId": "about-id"
  }
}
```

### Update About (Admin Only)

* URL
  * `/admin/about/:id`
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
  "message": "About berhasil diperbarui"
}
```

### Delete About (Admin Only)

* URL
  * `/admin/about/:id`
* Method
  * DELETE
* Headers
  * Authorization: Bearer `<token>`
* Response

```json
{
  "error": false,
  "message": "About berhasil dihapus"
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
  * Mengembalikan semua data dari slider, panca indra, dan about dalam satu respons.

```json
{
  "error": false,
  "message": "success",
  "data": {
    "sliders": [...],
    "pancaIndras": [...],
    "abouts": [...]
  }
}
```
