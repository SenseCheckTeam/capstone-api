const { nanoid } = require("nanoid");
const path = require('path');
const { Peraba } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new peraba
 */
const createPerabaHandler = async (request, h) => {
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

        await Peraba.create({
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
            message: 'Peraba berhasil ditambahkan',
            data: { perabaId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing peraba
 */
const updatePerabaHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, subtitle, description, buttonUrl } = request.payload;
        const photo = request.payload.photo;
        const logo = request.payload.logo;

        const peraba = await Peraba.findOne({ id });
        if (!peraba) {
            return h.response({
                error: true,
                message: 'Peraba tidak ditemukan'
            }).code(404);
        }

        let imageUrl = peraba.imageUrl;
        let logoUrl = peraba.logoUrl;

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
            await deleteFile(peraba.imageUrl);
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
            await deleteFile(peraba.logoUrl);
            logoUrl = await saveFile(logo, logoFilename);
        }

        const updatedAt = new Date().toISOString();

        await Peraba.updateOne(
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
            message: 'Peraba berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a peraba
 */
const deletePerabaHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const peraba = await Peraba.findOne({ id });

        if (!peraba) {
            return h.response({
                error: true,
                message: 'Peraba tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar dan logo
        await deleteFile(peraba.imageUrl);
        await deleteFile(peraba.logoUrl);

        await Peraba.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Peraba berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all perabas
 */
const getPerabaHandler = async (request, h) => {
    try {
        const perabas = await Peraba.find({});
        return h.response({
            error: false,
            message: 'success',
            data: perabas
        }).code(200);
    } catch (error) {
        console.error('Error getting perabas:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get a peraba by ID
 */
const getPerabaByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const peraba = await Peraba.findOne({ id });

        if (!peraba) {
            return h.response({
                error: true,
                message: 'Peraba tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: peraba
        }).code(200);
    } catch (error) {
        console.error('Error getting peraba by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createPerabaHandler,
    updatePerabaHandler,
    deletePerabaHandler,
    getPerabaHandler,
    getPerabaByIdHandler
};
