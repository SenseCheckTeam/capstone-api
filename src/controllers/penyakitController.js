const { nanoid } = require("nanoid");
const path = require('path');
const { Penyakit } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new penyakit
 */
const createPenyakitHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { name, description } = request.payload;
        const image = request.payload.image;

        if (!image) {
            return h.response({
                error: true,
                message: 'Gambar harus diunggah'
            }).code(400);
        }

        // Process image
        const originalImageName = image.hapi ? image.hapi.filename : image.filename;
        const imageFilename = `${Date.now()}-${originalImageName}`;
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const imageExt = path.extname(originalImageName).toLowerCase();

        if (!allowedExtensions.includes(imageExt)) {
            return h.response({
                error: true,
                message: 'Format file gambar tidak valid. Gunakan JPG, JPEG, atau PNG'
            }).code(400);
        }

        const imageUrl = await saveFile(image, imageFilename);

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        await Penyakit.create({
            id,
            name,
            imageUrl,
            description,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Penyakit berhasil ditambahkan',
            data: { penyakitId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing penyakit
 */
const updatePenyakitHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { name, description } = request.payload;
        const image = request.payload.image;

        const penyakit = await Penyakit.findOne({ id });
        if (!penyakit) {
            return h.response({
                error: true,
                message: 'Penyakit tidak ditemukan'
            }).code(404);
        }

        let imageUrl = penyakit.imageUrl;

        if (image) {
            const originalImageName = image.hapi ? image.hapi.filename : image.filename;
            const imageFilename = `${Date.now()}-${originalImageName}`;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const imageExt = path.extname(originalImageName).toLowerCase();

            if (!allowedExtensions.includes(imageExt)) {
                return h.response({
                    error: true,
                    message: 'Format file gambar tidak valid. Gunakan JPG, JPEG, atau PNG'
                }).code(400);
            }

            // Hapus file lama
            await deleteFile(penyakit.imageUrl);
            imageUrl = await saveFile(image, imageFilename);
        }

        const updatedAt = new Date().toISOString();

        await Penyakit.updateOne(
            { id },
            {
                name,
                imageUrl,
                description,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Penyakit berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a penyakit
 */
const deletePenyakitHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const penyakit = await Penyakit.findOne({ id });

        if (!penyakit) {
            return h.response({
                error: true,
                message: 'Penyakit tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(penyakit.imageUrl);

        await Penyakit.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Penyakit berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all penyakit
 */
const getPenyakitHandler = async (request, h) => {
    try {
        const penyakit = await Penyakit.find({}).sort({ createdAt: -1 });

        return h.response({
            error: false,
            message: 'Data penyakit berhasil diambil',
            data: penyakit
        }).code(200);
    } catch (error) {
        console.error('Error getting penyakit:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get penyakit by name
 */
const getPenyakitByNameHandler = async (request, h) => {
    try {
        const { name } = request.params;
        
        // Menggunakan regex untuk pencarian yang case-insensitive dan partial match
        const penyakit = await Penyakit.findOne({ 
            name: { $regex: name, $options: 'i' } 
        });

        if (!penyakit) {
            return h.response({
                error: true,
                message: 'Penyakit tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'Data penyakit berhasil diambil',
            data: penyakit
        }).code(200);
    } catch (error) {
        console.error('Error getting penyakit by name:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createPenyakitHandler,
    updatePenyakitHandler,
    deletePenyakitHandler,
    getPenyakitHandler,
    getPenyakitByNameHandler
};