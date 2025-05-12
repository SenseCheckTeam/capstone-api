const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload file ke Cloudinary
 * @param {Object} file - File yang akan diupload
 * @param {string} filename - Nama file
 * @returns {Promise<string>} URL gambar yang diupload
 */
const uploadToCloudinary = async (file, filename) => {
  return new Promise((resolve, reject) => {
    // Buat stream dari buffer file
    const stream = Readable.from(file);
    
    // Buat upload stream ke Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'capstone-api',
        public_id: filename.split('.')[0], // Gunakan nama file tanpa ekstensi
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.secure_url);
      }
    );

    // Pipe file stream ke upload stream
    stream.pipe(uploadStream);
  });
};

/**
 * Hapus file dari Cloudinary
 * @param {string} publicId - Public ID file di Cloudinary
 * @returns {Promise<void>}
 */
const deleteFromCloudinary = async (publicUrl) => {
  try {
    // Extract public ID from URL
    // Format URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.ext
    const urlParts = publicUrl.split('/');
    const publicIdWithExt = urlParts[urlParts.length - 1];
    const folderName = urlParts[urlParts.length - 2];
    const publicId = `${folderName}/${publicIdWithExt.split('.')[0]}`;
    
    await cloudinary.uploader.destroy(publicId);
    console.log('File deleted from Cloudinary:', publicId);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};
