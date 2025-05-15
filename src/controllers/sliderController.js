const { nanoid } = require("nanoid");
const path = require('path');
const { Slider } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new slider
 */
const createSliderHandler = async (request, h) => {
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

        await Slider.create({
            id,
            imageUrl,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Slider berhasil ditambahkan',
            data: { sliderId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing slider
 */
const updateSliderHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const photo = request.payload.photo;

        const slider = await Slider.findOne({ id });
        if (!slider) {
            return h.response({
                error: true,
                message: 'Slider tidak ditemukan'
            }).code(404);
        }

        let imageUrl = slider.imageUrl;

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
            await deleteFile(slider.imageUrl);

            imageUrl = await saveFile(photo, filename);
        }

        const updatedAt = new Date().toISOString();

        await Slider.updateOne(
            { id },
            {
                imageUrl,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Slider berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a slider
 */
const deleteSliderHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const slider = await Slider.findOne({ id });

        if (!slider) {
            return h.response({
                error: true,
                message: 'Slider tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(slider.imageUrl);

        await Slider.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Slider berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all sliders
 */
const getSlidersHandler = async (request, h) => {
    try {
        const sliders = await Slider.find({});
        return h.response({
            error: false,
            message: 'success',
            data: sliders
        }).code(200);
    } catch (error) {
        console.error('Error getting sliders:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get a slider by ID
 */
const getSliderByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const slider = await Slider.findOne({ id });

        if (!slider) {
            return h.response({
                error: true,
                message: 'Slider tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: slider
        }).code(200);
    } catch (error) {
        console.error('Error getting slider by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createSliderHandler,
    updateSliderHandler,
    deleteSliderHandler,
    getSlidersHandler,
    getSliderByIdHandler
};
