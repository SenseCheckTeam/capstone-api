const { nanoid } = require("nanoid");
const path = require('path');
const { Pendengaran } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new pendengaran
 */
const createPendengaranHandler = async (request, h) => {
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

        await Pendengaran.create({
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
            message: 'Pendengaran berhasil ditambahkan',
            data: { pendengaranId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing pendengaran
 */
const updatePendengaranHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, subtitle, description, buttonUrl } = request.payload;
        const photo = request.payload.photo;
        const logo = request.payload.logo;

        const pendengaran = await Pendengaran.findOne({ id });
        if (!pendengaran) {
            return h.response({
                error: true,
                message: 'Pendengaran tidak ditemukan'
            }).code(404);
        }

        let imageUrl = pendengaran.imageUrl;
        let logoUrl = pendengaran.logoUrl;

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
            await deleteFile(pendengaran.imageUrl);
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
            await deleteFile(pendengaran.logoUrl);
            logoUrl = await saveFile(logo, logoFilename);
        }

        const updatedAt = new Date().toISOString();

        await Pendengaran.updateOne(
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
            message: 'Pendengaran berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a pendengaran
 */
const deletePendengaranHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const pendengaran = await Pendengaran.findOne({ id });

        if (!pendengaran) {
            return h.response({
                error: true,
                message: 'Pendengaran tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar dan logo
        await deleteFile(pendengaran.imageUrl);
        await deleteFile(pendengaran.logoUrl);

        await Pendengaran.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Pendengaran berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all pendengarans
 */
const getPendengaranHandler = async (request, h) => {
    try {
        const pendengarans = await Pendengaran.find({});
        return h.response({
            error: false,
            message: 'success',
            data: pendengarans
        }).code(200);
    } catch (error) {
        console.error('Error getting pendengarans:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get a pendengaran by ID
 */
const getPendengaranByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const pendengaran = await Pendengaran.findOne({ id });

        if (!pendengaran) {
            return h.response({
                error: true,
                message: 'Pendengaran tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: pendengaran
        }).code(200);
    } catch (error) {
        console.error('Error getting pendengaran by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createPendengaranHandler,
    updatePendengaranHandler,
    deletePendengaranHandler,
    getPendengaranHandler,
    getPendengaranByIdHandler
};
