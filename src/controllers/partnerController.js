const { nanoid } = require("nanoid");
const path = require('path');
const { Partner } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new partner
 */
const createPartnerHandler = async (request, h) => {
    try {
        verifyAdmin(request);

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

        await Partner.create({
            id,
            imageUrl,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Partner berhasil ditambahkan',
            data: { partnerId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing partner
 */
const updatePartnerHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const photo = request.payload.photo;

        const partner = await Partner.findOne({ id });
        if (!partner) {
            return h.response({
                error: true,
                message: 'Partner tidak ditemukan'
            }).code(404);
        }

        let imageUrl = partner.imageUrl;

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
            await deleteFile(partner.imageUrl);

            imageUrl = await saveFile(photo, filename);
        }

        const updatedAt = new Date().toISOString();

        await Partner.updateOne(
            { id },
            {
                imageUrl,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Partner berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a partner
 */
const deletePartnerHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const partner = await Partner.findOne({ id });

        if (!partner) {
            return h.response({
                error: true,
                message: 'Partner tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(partner.imageUrl);

        await Partner.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Partner berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all partners
 */
const getPartnerHandler = async (request, h) => {
    try {
        const partners = await Partner.find({});
        return h.response({
            error: false,
            message: 'success',
            data: partners
        }).code(200);
    } catch (error) {
        console.error('Error getting partners:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get a partner by ID
 */
const getPartnerByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const partner = await Partner.findOne({ id });

        if (!partner) {
            return h.response({
                error: true,
                message: 'Partner tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: partner
        }).code(200);
    } catch (error) {
        console.error('Error getting partner by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createPartnerHandler,
    updatePartnerHandler,
    deletePartnerHandler,
    getPartnerHandler,
    getPartnerByIdHandler
};
