const { nanoid } = require("nanoid");
const path = require('path');
const { Penglihatan } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new penglihatan
 */
const createPenglihatanHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { title, subtitle, description, buttonUrl } = request.payload;
        const photo = request.payload.photo;
        const logo = request.payload.logo;

        if (!photo || !logo) {
            return h.response({
                error: true,
                message: 'Gambar dan logo harus diunggah'
            }).code(400);
        }

        // Process photo
        const originalPhotoName = photo.hapi ? photo.hapi.filename : photo.filename;
        const photoFilename = `${Date.now()}-${originalPhotoName}`;
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const photoExt = path.extname(originalPhotoName).toLowerCase();

        if (!allowedExtensions.includes(photoExt)) {
            return h.response({
                error: true,
                message: 'Format file gambar tidak valid. Gunakan JPG, JPEG, atau PNG'
            }).code(400);
        }

        // Process logo
        const originalLogoName = logo.hapi ? logo.hapi.filename : logo.filename;
        const logoFilename = `${Date.now()}-logo-${originalLogoName}`;
        const logoExt = path.extname(originalLogoName).toLowerCase();

        if (!allowedExtensions.includes(logoExt)) {
            return h.response({
                error: true,
                message: 'Format file logo tidak valid. Gunakan JPG, JPEG, atau PNG'
            }).code(400);
        }

        const imageUrl = await saveFile(photo, photoFilename);
        const logoUrl = await saveFile(logo, logoFilename);

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        await Penglihatan.create({
            id,
            title,
            subtitle,
            logoUrl,
            imageUrl,
            description,
            buttonUrl,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Penglihatan berhasil ditambahkan',
            data: { penglihatanId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing penglihatan
 */
const updatePenglihatanHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, subtitle, description, buttonUrl } = request.payload;
        const photo = request.payload.photo;
        const logo = request.payload.logo;

        const penglihatan = await Penglihatan.findOne({ id });
        if (!penglihatan) {
            return h.response({
                error: true,
                message: 'Penglihatan tidak ditemukan'
            }).code(404);
        }

        let imageUrl = penglihatan.imageUrl;
        let logoUrl = penglihatan.logoUrl;

        if (photo) {
            const originalPhotoName = photo.hapi ? photo.hapi.filename : photo.filename;
            const photoFilename = `${Date.now()}-${originalPhotoName}`;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const photoExt = path.extname(originalPhotoName).toLowerCase();

            if (!allowedExtensions.includes(photoExt)) {
                return h.response({
                    error: true,
                    message: 'Format file gambar tidak valid. Gunakan JPG, JPEG, atau PNG'
                }).code(400);
            }

            // Hapus file lama
            await deleteFile(penglihatan.imageUrl);
            imageUrl = await saveFile(photo, photoFilename);
        }

        if (logo) {
            const originalLogoName = logo.hapi ? logo.hapi.filename : logo.filename;
            const logoFilename = `${Date.now()}-logo-${originalLogoName}`;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const logoExt = path.extname(originalLogoName).toLowerCase();

            if (!allowedExtensions.includes(logoExt)) {
                return h.response({
                    error: true,
                    message: 'Format file logo tidak valid. Gunakan JPG, JPEG, atau PNG'
                }).code(400);
            }

            // Hapus file lama
            await deleteFile(penglihatan.logoUrl);
            logoUrl = await saveFile(logo, logoFilename);
        }

        const updatedAt = new Date().toISOString();

        await Penglihatan.updateOne(
            { id },
            {
                title,
                subtitle,
                logoUrl,
                imageUrl,
                description,
                buttonUrl,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Penglihatan berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a penglihatan
 */
const deletePenglihatanHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const penglihatan = await Penglihatan.findOne({ id });

        if (!penglihatan) {
            return h.response({
                error: true,
                message: 'Penglihatan tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar dan logo
        await deleteFile(penglihatan.imageUrl);
        await deleteFile(penglihatan.logoUrl);

        await Penglihatan.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Penglihatan berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all penglihatan
 */
const getPenglihatanHandler = async (request, h) => {
    try {
        const penglihatan = await Penglihatan.find({});
        return h.response({
            error: false,
            message: 'success',
            data: penglihatan
        }).code(200);
    } catch (error) {
        console.error('Error getting penglihatan:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get a penglihatan by ID
 */
const getPenglihatanByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const penglihatan = await Penglihatan.findOne({ id });

        if (!penglihatan) {
            return h.response({
                error: true,
                message: 'Penglihatan tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: penglihatan
        }).code(200);
    } catch (error) {
        console.error('Error getting penglihatan by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createPenglihatanHandler,
    updatePenglihatanHandler,
    deletePenglihatanHandler,
    getPenglihatanHandler,
    getPenglihatanByIdHandler
};
