const fs = require('fs');

// Selalu gunakan Cloudinary untuk penyimpanan file
console.log('Using Cloudinary for all file storage');

// Variabel untuk menyimpan fungsi cloudinary
let uploadToCloudinary = null;
let deleteFromCloudinary = null;

// Konfigurasi Cloudinary
try {
    // Import cloudinary
    const cloudinary = require('cloudinary').v2;

    // Log kredensial Cloudinary (tanpa menampilkan secret)
    console.log('Cloudinary credentials:', {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY ? 'set' : 'not set',
        api_secret: process.env.CLOUDINARY_API_SECRET ? 'set' : 'not set'
    });

    // Konfigurasi Cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    console.log('Cloudinary configured successfully');

    // Implementasi fungsi upload
    uploadToCloudinary = async (fileData, filename) => {
        console.log('Starting Cloudinary upload for:', filename);

        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: 'capstone-api',
                public_id: filename.split('.')[0],
                resource_type: 'auto'
            };

            // Untuk buffer data
            const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        return reject(error);
                    }
                    console.log('Cloudinary upload success:', result.secure_url);
                    return resolve(result.secure_url);
                }
            );

            // Pastikan fileData adalah buffer
            if (Buffer.isBuffer(fileData)) {
                uploadStream.end(fileData);
            } else if (typeof fileData === 'string') {
                // Jika fileData adalah string (path file), baca file dan upload
                const fileBuffer = fs.readFileSync(fileData);
                uploadStream.end(fileBuffer);
            } else {
                // Jika bukan buffer atau string, coba konversi ke buffer
                try {
                    const buffer = Buffer.from(fileData);
                    uploadStream.end(buffer);
                } catch (error) {
                    console.error('Error converting file data to buffer:', error);
                    reject(new Error('Invalid file data format'));
                }
            }
        });
    };

    // Implementasi fungsi delete
    deleteFromCloudinary = async (publicUrl) => {
        try {
            // Extract public ID from URL
            const urlParts = publicUrl.split('/');
            const publicIdWithExt = urlParts[urlParts.length - 1];
            const folderName = urlParts[urlParts.length - 2];
            const publicId = `${folderName}/${publicIdWithExt.split('.')[0]}`;

            console.log('Deleting from Cloudinary, public ID:', publicId);
            const result = await cloudinary.uploader.destroy(publicId);
            console.log('File deleted from Cloudinary, result:', result);
        } catch (error) {
            console.error('Error deleting file from Cloudinary:', error);
        }
    };

    console.log('Cloudinary functions initialized successfully');
} catch (error) {
    console.error('Failed to initialize Cloudinary:', error);
    console.error('CRITICAL ERROR: Cloudinary is required but not available.');
    console.error('Please install cloudinary package: npm install cloudinary');
    console.error('And set the environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
}

/**
 * Save a file to Cloudinary
 * @param {Object} file - The file to save
 * @param {string} filename - The name to save the file as
 * @returns {string} The URL path to the saved file
 */
const saveFile = async (file, filename) => {
    console.log(`Saving file: ${filename}, uploadToCloudinary available: ${!!uploadToCloudinary}`);

    if (!uploadToCloudinary) {
        throw new Error('Cloudinary is not configured properly. Please check your environment variables.');
    }

    try {
        console.log('Using Cloudinary for file upload');

        // Proses file berdasarkan tipenya
        let fileData;

        // Untuk file dari multipart/form-data dengan output: 'data'
        if (file._data) {
            console.log('File has _data property, using it directly');
            fileData = file._data;
        }
        // Untuk file dari multipart/form-data dengan output: 'stream'
        else if (file.pipe && typeof file.pipe === 'function') {
            console.log('File is a stream, reading it into buffer');
            // Baca seluruh stream ke buffer
            const chunks = [];
            for await (const chunk of file) {
                chunks.push(chunk);
            }
            fileData = Buffer.concat(chunks);
        }
        // Jika file adalah buffer langsung
        else if (Buffer.isBuffer(file)) {
            console.log('File is already a buffer');
            fileData = file;
        }
        // Jika file adalah string (path ke file)
        else if (typeof file === 'string') {
            console.log('File is a string path, reading file');
            fileData = fs.readFileSync(file);
        }
        // Jika file adalah objek dengan properti hapi (dari @hapi/inert)
        else if (file.hapi) {
            console.log('File is a Hapi payload file object');
            if (file.hapi.filename) {
                // Baca file dari path sementara
                fileData = fs.readFileSync(file.path);
            }
        }
        // Jika tidak bisa menentukan tipe file
        else {
            console.log('Unknown file type, attempting to inspect:', file);
            console.log('File properties:', Object.keys(file));

            // Coba deteksi tipe file dengan lebih detail
            if (file.path && fs.existsSync(file.path)) {
                console.log('File has path property, reading from path:', file.path);
                fileData = fs.readFileSync(file.path);
            } else {
                throw new Error(`Unknown file type: ${typeof file}`);
            }
        }

        // Pastikan fileData tidak undefined atau null
        if (!fileData) {
            throw new Error('Failed to extract file data');
        }

        // Upload ke Cloudinary
        console.log('Uploading to Cloudinary, file data size:', fileData.length);
        const cloudinaryUrl = await uploadToCloudinary(fileData, filename);
        console.log('Upload successful, URL:', cloudinaryUrl);
        return cloudinaryUrl;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error(`File upload to Cloudinary failed: ${error.message}`);
    }
};

/**
 * Delete a file from Cloudinary
 * @param {string} filepath - The URL of the file to delete
 */
const deleteFile = async (filepath) => {
    if (!filepath) return;

    console.log(`Deleting file: ${filepath}, deleteFromCloudinary available: ${!!deleteFromCloudinary}`);

    // Only handle Cloudinary URLs
    if (filepath.includes('cloudinary.com') && deleteFromCloudinary) {
        try {
            console.log('Deleting from Cloudinary:', filepath);
            await deleteFromCloudinary(filepath);
            console.log('Successfully deleted from Cloudinary');
            return;
        } catch (error) {
            console.error('Error deleting file from Cloudinary:', error);
        }
    } else {
        console.log('File path is not a Cloudinary URL or Cloudinary is not configured properly, skipping delete');
    }
};

module.exports = {
    saveFile,
    deleteFile
};
