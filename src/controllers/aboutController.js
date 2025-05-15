const { nanoid } = require("nanoid");
const path = require('path');
const { About } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new about
 */
const createAboutHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { title, description, textButton, buttonUrl } = request.payload;
        const photo = request.payload.photo;

        if (!photo) {
            return h.response({
                error: true,
                message: 'Gambar harus diunggah'
            }).code(400);
        }

        const originalFileName = photo.hapi ? photo.hapi.filename : photo.filename;
        const filename = `${Date.now()}-${originalFileName}`;
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExt = path.extname(originalFileName).toLowerCase();

        if (!allowedExtensions.includes(fileExt)) {
            return h.response({
                error: true,
                message: 'Format file tidak valid. Gunakan JPG, JPEG, atau PNG'
            }).code(400);
        }

        const imageUrl = await saveFile(photo, filename);

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        await About.create({
            id,
            title,
            description,
            imageUrl,
            textButton,
            buttonUrl,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'About berhasil ditambahkan',
            data: { aboutId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing about
 */
const updateAboutHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, description, textButton, buttonUrl } = request.payload;
        const photo = request.payload.photo;

        const about = await About.findOne({ id });
        if (!about) {
            return h.response({
                error: true,
                message: 'About tidak ditemukan'
            }).code(404);
        }

        let imageUrl = about.imageUrl;

        if (photo) {
            const originalFileName = photo.hapi ? photo.hapi.filename : photo.filename;
            const filename = `${Date.now()}-${originalFileName}`;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const fileExt = path.extname(originalFileName).toLowerCase();

            if (!allowedExtensions.includes(fileExt)) {
                return h.response({
                    error: true,
                    message: 'Format file tidak valid. Gunakan JPG, JPEG, atau PNG'
                }).code(400);
            }

            // Hapus file lama
            await deleteFile(about.imageUrl);

            imageUrl = await saveFile(photo, filename);
        }

        const updatedAt = new Date().toISOString();

        await About.updateOne(
            { id },
            {
                title,
                description,
                imageUrl,
                textButton,
                buttonUrl,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'About berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete an about
 */
const deleteAboutHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const about = await About.findOne({ id });

        if (!about) {
            return h.response({
                error: true,
                message: 'About tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(about.imageUrl);

        await About.deleteOne({ id });

        return h.response({
            error: false,
            message: 'About berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all abouts
 */
const getAboutsHandler = async (request, h) => {
    try {
        const abouts = await About.find({});
        return h.response({
            error: false,
            message: 'success',
            data: abouts
        }).code(200);
    } catch (error) {
        console.error('Error getting abouts:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get an about by ID
 */
const getAboutByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const about = await About.findOne({ id });

        if (!about) {
            return h.response({
                error: true,
                message: 'About tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: about
        }).code(200);
    } catch (error) {
        console.error('Error getting about by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createAboutHandler,
    updateAboutHandler,
    deleteAboutHandler,
    getAboutsHandler,
    getAboutByIdHandler
};
