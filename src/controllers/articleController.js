const { nanoid } = require("nanoid");
const path = require('path');
const { Article } = require('../models');
const { verifyAdmin } = require('../middleware/auth');
const { saveFile, deleteFile } = require('../utils/fileHandler');

/**
 * Create a new article
 */
const createArticleHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { title, content } = request.payload;
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

        await Article.create({
            id,
            title,
            content,
            imageUrl,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Artikel berhasil ditambahkan',
            data: { articleId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing article
 */
const updateArticleHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, content } = request.payload;
        const photo = request.payload.photo;

        const article = await Article.findOne({ id });
        if (!article) {
            return h.response({
                error: true,
                message: 'Artikel tidak ditemukan'
            }).code(404);
        }

        let imageUrl = article.imageUrl;

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
            await deleteFile(article.imageUrl);

            imageUrl = await saveFile(photo, filename);
        }

        const updatedAt = new Date().toISOString();

        await Article.updateOne(
            { id },
            {
                title,
                content,
                imageUrl,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Artikel berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete an article
 */
const deleteArticleHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const article = await Article.findOne({ id });

        if (!article) {
            return h.response({
                error: true,
                message: 'Artikel tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(article.imageUrl);

        await Article.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Artikel berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all articles
 */
const getArticlesHandler = async (request, h) => {
    try {
        const articles = await Article.find({});
        return h.response({
            error: false,
            message: 'success',
            data: articles
        }).code(200);
    } catch (error) {
        console.error('Error getting articles:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

/**
 * Get an article by ID
 */
const getArticleByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const article = await Article.findOne({ id });

        if (!article) {
            return h.response({
                error: true,
                message: 'Artikel tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: article
        }).code(200);
    } catch (error) {
        console.error('Error getting article by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    createArticleHandler,
    updateArticleHandler,
    deleteArticleHandler,
    getArticlesHandler,
    getArticleByIdHandler
};
