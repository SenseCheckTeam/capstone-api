const { nanoid } = require("nanoid");
const path = require('path');
const { Pengecapan } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new pengecapan
 */
const createPengecapanHandler = async (request, h) => {
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

        await Pengecapan.create({
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
            message: 'Pengecapan berhasil ditambahkan',
            data: { pengecapanId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing pengecapan
 */
const updatePengecapanHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, subtitle, description, buttonUrl } = request.payload;
        const photo = request.payload.photo;
        const logo = request.payload.logo;

        const pengecapan = await Pengecapan.findOne({ id });
        if (!pengecapan) {
            return h.response({
                error: true,
                message: 'Pengecapan tidak ditemukan'
            }).code(404);
        }

        let imageUrl = pengecapan.imageUrl;
        let logoUrl = pengecapan.logoUrl;

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
            await deleteFile(pengecapan.imageUrl);
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
            await deleteFile(pengecapan.logoUrl);
            logoUrl = await saveFile(logo, logoFilename);
        }

        const updatedAt = new Date().toISOString();

        await Pengecapan.updateOne(
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
            message: 'Pengecapan berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a pengecapan
 */
const deletePengecapanHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const pengecapan = await Pengecapan.findOne({ id });

        if (!pengecapan) {
            return h.response({
                error: true,
                message: 'Pengecapan tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar dan logo
        await deleteFile(pengecapan.imageUrl);
        await deleteFile(pengecapan.logoUrl);

        await Pengecapan.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Pengecapan berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all pengecapans
 */
const getPengecapanHandler = async (request, h) => {
    try {
        const pengecapans = await Pengecapan.find({});
        return h.response({
            error: false,
            message: 'success',
            data: pengecapans
        }).code(200);
    } catch (error) {
        console.error('Error getting pengecapans:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get a pengecapan by ID
 */
const getPengecapanByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const pengecapan = await Pengecapan.findOne({ id });

        if (!pengecapan) {
            return h.response({
                error: true,
                message: 'Pengecapan tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: pengecapan
        }).code(200);
    } catch (error) {
        console.error('Error getting pengecapan by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createPengecapanHandler,
    updatePengecapanHandler,
    deletePengecapanHandler,
    getPengecapanHandler,
    getPengecapanByIdHandler
};
