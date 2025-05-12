const { nanoid } = require("nanoid");
const path = require('path');
const { PancaIndra } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new panca indra
 */
const createPancaIndraHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { title, description } = request.payload;
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

        await PancaIndra.create({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Panca Indra berhasil ditambahkan',
            data: { pancaIndraId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing panca indra
 */
const updatePancaIndraHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, description } = request.payload;
        const photo = request.payload.photo;

        const pancaIndra = await PancaIndra.findOne({ id });
        if (!pancaIndra) {
            return h.response({
                error: true,
                message: 'Panca Indra tidak ditemukan'
            }).code(404);
        }

        let imageUrl = pancaIndra.imageUrl;

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
            await deleteFile(pancaIndra.imageUrl);

            imageUrl = await saveFile(photo, filename);
        }

        const updatedAt = new Date().toISOString();

        await PancaIndra.updateOne(
            { id },
            {
                title,
                description,
                imageUrl,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Panca Indra berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a panca indra
 */
const deletePancaIndraHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const pancaIndra = await PancaIndra.findOne({ id });

        if (!pancaIndra) {
            return h.response({
                error: true,
                message: 'Panca Indra tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(pancaIndra.imageUrl);

        await PancaIndra.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Panca Indra berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all panca indras
 */
const getPancaIndraHandler = async (request, h) => {
    try {
        // Fetch data and convert to plain objects
        const pancaIndraData = await PancaIndra.find({}).lean();
        const pancaIndra = JSON.parse(JSON.stringify(pancaIndraData));

        return h.response({
            error: false,
            message: 'success',
            data: pancaIndra
        }).code(200);
    } catch (error) {
        console.error('Error getting panca indra:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server',
            details: error.message
        }).code(500);
    }
};

/**
 * Get a panca indra by ID
 */
const getPancaIndraByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const pancaIndraData = await PancaIndra.findOne({ id }).lean();

        if (!pancaIndraData) {
            return h.response({
                error: true,
                message: 'Panca Indra tidak ditemukan'
            }).code(404);
        }

        // Convert to plain object
        const pancaIndra = JSON.parse(JSON.stringify(pancaIndraData));

        return h.response({
            error: false,
            message: 'success',
            data: pancaIndra
        }).code(200);
    } catch (error) {
        console.error('Error getting panca indra by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server',
            details: error.message
        }).code(500);
    }
};

module.exports = {
    createPancaIndraHandler,
    updatePancaIndraHandler,
    deletePancaIndraHandler,
    getPancaIndraHandler,
    getPancaIndraByIdHandler
};
