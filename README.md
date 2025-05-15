# Capstone API

This is the API for the Capstone project. It provides endpoints for managing users, sliders, and articles.

## Documentation

The API documentation is available at [http://localhost:5000/docs](http://localhost:5000/docs).

To run the documentation locally:

```bash
npm run docs
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `/register` - Register a new user
- `/login` - Log in as a user
- `/admin` - Log in as an admin
- `/sliders` - Get all sliders
- `/sliders/{id}` - Get a slider by ID
- `/articles` - Get all articles
- `/articles/{id}` - Get an article by ID
- `/panca-indra` - Get all panca indra items
- `/panca-indra/{id}` - Get a panca indra item by ID
- `/tentang-aplikasi` - Get all tentang aplikasi items
- `/tentang-aplikasi/{id}` - Get a tentang aplikasi item by ID
- `/admin/sliders` - Create, update, and delete sliders (admin only)
- `/admin/articles` - Create, update, and delete articles (admin only)
- `/admin/panca-indra` - Create, update, and delete panca indra items (admin only)
- `/admin/tentang-aplikasi` - Create, update, and delete tentang aplikasi items (admin only)

For more details, see the [API documentation](http://13.215.253.107:5000/v1).

## Running the API

To run the API in development mode:

```bash
npm run start:dev
```

To run the API in production mode:

```bash
npm run start:prod
```

## Setting up Cloudinary for Image Storage

This API uses Cloudinary for all image storage. Follow these steps to set it up:

1. Create a Cloudinary account at [https://cloudinary.com/](https://cloudinary.com/)
2. Get your Cloudinary credentials (Cloud Name, API Key, and API Secret)
3. Add your Cloudinary credentials to your environment variables:

In your `.env` file:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

The application is configured to use Cloudinary for all file storage. Make sure your Cloudinary credentials are set up correctly before running the application.
