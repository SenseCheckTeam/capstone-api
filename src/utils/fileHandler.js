const fs = require('fs');
const path = require('path');
const util = require('util');
const pipeline = util.promisify(require('stream').pipeline);

// Cek apakah aplikasi berjalan di Vercel
const isVercel = process.env.VERCEL === '1';
// Cek apakah kita ingin selalu menggunakan Cloudinary (bahkan di lingkungan lokal)
const useCloudinaryAlways = true; // Ubah ke true untuk selalu menggunakan Cloudinary
console.log('Environment check - isVercel:', isVercel, 'useCloudinaryAlways:', useCloudinaryAlways);

// Variabel untuk menyimpan fungsi cloudinary
let uploadToCloudinary = null;
let deleteFromCloudinary = null;
let cloudinaryAvailable = false;

// Coba load dan konfigurasi Cloudinary
try {
    // Coba import cloudinary langsung
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

    // Implementasi fungsi upload langsung di sini
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

    // Implementasi fungsi delete langsung di sini
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

    cloudinaryAvailable = true;
    console.log('Cloudinary functions initialized successfully');
} catch (error) {
    console.error('Failed to initialize Cloudinary:', error);

    // Di Vercel, kita harus memiliki Cloudinary
    if (isVercel) {
        console.error('CRITICAL ERROR: Cloudinary is required in Vercel environment but not available.');
        console.error('Please install cloudinary package: npm install cloudinary');
        console.error('And set the environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
    } else {
        console.log('Cloudinary not available, will use local file storage as fallback');
    }
}

/**
 * Save a file to the uploads directory or cloud storage
 * @param {Object} file - The file to save
 * @param {string} filename - The name to save the file as
 * @returns {string} The URL path to the saved file
 */
const saveFile = async (file, filename) => {
    console.log(`Saving file: ${filename}, isVercel: ${isVercel}, useCloudinaryAlways: ${useCloudinaryAlways}, uploadToCloudinary available: ${!!uploadToCloudinary}`);

    // Jika Cloudinary tersedia dan kita ingin menggunakannya (di Vercel atau useCloudinaryAlways=true)
    if (uploadToCloudinary && (isVercel || useCloudinaryAlways)) {
        try {
            console.log('Attempting to use Cloudinary for file upload');

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

            // Jika di Vercel, kita harus throw error karena tidak bisa fallback ke file system
            if (isVercel) {
                throw new Error(`File upload to Cloudinary failed: ${error.message}`);
            }

            // Jika tidak di Vercel, kita bisa fallback ke file system
            console.log('Falling back to local file system');
        }
    } else {
        console.log('Cloudinary not available or not enabled, using local file system');
    }

    // Jika tidak menggunakan Cloudinary atau terjadi error saat upload ke Cloudinary (di lingkungan lokal)
    if (!isVercel) {
        console.log('Saving to local file system');
        try {
            const filepath = path.join(__dirname, '..', 'uploads', filename);
            // Pastikan direktori uploads ada
            const uploadsDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            console.log('File type check for local storage:', {
                isStream: file.pipe && typeof file.pipe === 'function',
                isBuffer: Buffer.isBuffer(file),
                hasData: !!file._data,
                isString: typeof file === 'string',
                hasPath: !!file.path
            });

            // Jika file adalah stream
            if (file.pipe && typeof file.pipe === 'function') {
                console.log('Saving stream to file');
                await pipeline(file, fs.createWriteStream(filepath));
            }
            // Jika file adalah buffer
            else if (Buffer.isBuffer(file)) {
                console.log('Saving buffer to file');
                fs.writeFileSync(filepath, file);
            }
            // Jika file memiliki _data (biasanya dari multipart/form-data)
            else if (file._data) {
                console.log('Saving _data to file');
                fs.writeFileSync(filepath, file._data);
            }
            // Jika file adalah string (path ke file)
            else if (typeof file === 'string') {
                console.log('Copying file from path');
                fs.copyFileSync(file, filepath);
            }
            // Jika file memiliki path (biasanya dari @hapi/inert)
            else if (file.path && fs.existsSync(file.path)) {
                console.log('Copying file from hapi path');
                fs.copyFileSync(file.path, filepath);
            }
            // Jika tidak bisa menentukan tipe file
            else {
                console.error('Unknown file type for local storage:', file);
                throw new Error(`Unknown file type: ${typeof file}`);
            }

            console.log('File saved successfully to:', filepath);
            return `/uploads/${filename}`;
        } catch (error) {
            console.error('Error saving file to local file system:', error);
            throw error;
        }
    } else {
        // Jika di Vercel dan Cloudinary tidak tersedia
        throw new Error('File upload failed. Cloud storage is required in serverless environment but not configured properly.');
    }
};

/**
 * Delete a file from the uploads directory or cloud storage
 * @param {string} filepath - The path to the file to delete
 */
const deleteFile = async (filepath) => {
    if (!filepath) return;

    console.log(`Deleting file: ${filepath}, isVercel: ${isVercel}, useCloudinaryAlways: ${useCloudinaryAlways}, deleteFromCloudinary available: ${!!deleteFromCloudinary}`);

    // Jika filepath adalah URL Cloudinary dan Cloudinary tersedia
    if (filepath.includes('cloudinary.com') && deleteFromCloudinary) {
        try {
            console.log('Deleting from Cloudinary:', filepath);
            await deleteFromCloudinary(filepath);
            console.log('Successfully deleted from Cloudinary');
            return;
        } catch (error) {
            console.error('Error deleting file from Cloudinary:', error);
            // Jika di Vercel, kita tidak bisa melakukan fallback
            if (isVercel) return;
        }
    }

    // Jika tidak di Vercel dan filepath bukan URL Cloudinary (atau gagal menghapus dari Cloudinary)
    if (!isVercel) {
        try {
            // Jika filepath adalah path relatif (dimulai dengan /), tambahkan __dirname
            const fullPath = filepath.startsWith('/')
                ? path.join(__dirname, '..', filepath)
                : filepath;

            console.log('Attempting to delete from local file system:', fullPath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
                console.log('File deleted successfully from local file system');
            } else {
                console.log('File not found in local file system');
            }
        } catch (error) {
            console.error('Error deleting file from local file system:', error);
        }
    } else if (!filepath.includes('cloudinary.com')) {
        console.log('File path is not a Cloudinary URL, skipping delete in Vercel environment');
    }
};

module.exports = {
    saveFile,
    deleteFile
};
