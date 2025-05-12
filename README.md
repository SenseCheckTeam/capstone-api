# Capstone API

This is the API for the Capstone project. It provides endpoints for managing users, sliders, and articles.

## Documentation

The API documentation is available at [https://capstone-api-peach.vercel.app/docs](https://capstone-api-peach.vercel.app/).

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

## Deployment to Vercel

This API can be deployed to Vercel. However, since Vercel has a read-only filesystem, you need to configure Cloudinary for file uploads.

### Setting up Cloudinary

1. Create a Cloudinary account at [https://cloudinary.com/](https://cloudinary.com/)
2. Get your Cloudinary credentials (Cloud Name, API Key, and API Secret)
3. Install the Cloudinary package:

```bash
npm install cloudinary
```

4. Add your Cloudinary credentials to your environment variables:

In your `.env` file:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```


### Using Cloudinary in All Environments

The application is now configured to use Cloudinary for file storage in all environments (both local development and Vercel). This ensures consistent behavior and makes it easier to test the application locally before deploying to Vercel.

To use Cloudinary:

1. Make sure you have installed the Cloudinary package:

```bash
npm install cloudinary
```

2. Ensure your environment variables are set up correctly in `.env`:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. If you want to disable Cloudinary in local development and use local file storage instead, you can modify the `useCloudinaryAlways` variable in `src/utils/fileHandler.js` to `false`.
