const { nanoid } = require("nanoid");
const path = require('path');
const { Penciuman } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new penciuman
 */
const createPenciumanHandler = async (request, h) => {
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

        await Penciuman.create({
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
            message: 'Penciuman berhasil ditambahkan',
            data: { penciumanId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing penciuman
 */
const updatePenciumanHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, subtitle, description, buttonUrl } = request.payload;
        const photo = request.payload.photo;
        const logo = request.payload.logo;

        const penciuman = await Penciuman.findOne({ id });
        if (!penciuman) {
            return h.response({
                error: true,
                message: 'Penciuman tidak ditemukan'
            }).code(404);
        }

        let imageUrl = penciuman.imageUrl;
        let logoUrl = penciuman.logoUrl;

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
            await deleteFile(penciuman.imageUrl);
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
            await deleteFile(penciuman.logoUrl);
            logoUrl = await saveFile(logo, logoFilename);
        }

        const updatedAt = new Date().toISOString();

        await Penciuman.updateOne(
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
            message: 'Penciuman berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a penciuman
 */
const deletePenciumanHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const penciuman = await Penciuman.findOne({ id });

        if (!penciuman) {
            return h.response({
                error: true,
                message: 'Penciuman tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar dan logo
        await deleteFile(penciuman.imageUrl);
        await deleteFile(penciuman.logoUrl);

        await Penciuman.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Penciuman berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all penciumans
 */
const getPenciumanHandler = async (request, h) => {
    try {
        const penciumans = await Penciuman.find({});
        return h.response({
            error: false,
            message: 'success',
            data: penciumans
        }).code(200);
    } catch (error) {
        console.error('Error getting penciumans:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get a penciuman by ID
 */
const getPenciumanByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const penciuman = await Penciuman.findOne({ id });

        if (!penciuman) {
            return h.response({
                error: true,
                message: 'Penciuman tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: penciuman
        }).code(200);
    } catch (error) {
        console.error('Error getting penciuman by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createPenciumanHandler,
    updatePenciumanHandler,
    deletePenciumanHandler,
    getPenciumanHandler,
    getPenciumanByIdHandler
};
