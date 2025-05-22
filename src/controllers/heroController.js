const { nanoid } = require("nanoid");
const path = require('path');
const { Hero } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new hero
 */
const createHeroHandler = async (request, h) => {
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

        await Hero.create({
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
            message: 'Hero berhasil ditambahkan',
            data: { heroId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing hero
 */
const updateHeroHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, description, textButton, buttonUrl } = request.payload;
        const photo = request.payload.photo;

        const hero = await Hero.findOne({ id });
        if (!hero) {
            return h.response({
                error: true,
                message: 'Hero tidak ditemukan'
            }).code(404);
        }

        let imageUrl = hero.imageUrl;

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
            await deleteFile(hero.imageUrl);

            imageUrl = await saveFile(photo, filename);
        }

        const updatedAt = new Date().toISOString();

        await Hero.updateOne(
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
            message: 'Hero berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete an hero
 */
const deleteHeroHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const hero = await Hero.findOne({ id });

        if (!hero) {
            return h.response({
                error: true,
                message: 'Hero tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(hero.imageUrl);

        await Hero.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Hero berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all heros
 */
const getHerosHandler = async (request, h) => {
    try {
        const heros = await Hero.find({});
        return h.response({
            error: false,
            message: 'success',
            data: heros
        }).code(200);
    } catch (error) {
        console.error('Error getting heros:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get an hero by ID
 */
const getHeroByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const hero = await Hero.findOne({ id });

        if (!hero) {
            return h.response({
                error: true,
                message: 'Hero tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: hero
        }).code(200);
    } catch (error) {
        console.error('Error getting hero by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createHeroHandler,
    updateHeroHandler,
    deleteHeroHandler,
    getHerosHandler,
    getHeroByIdHandler
};
