const { nanoid } = require("nanoid");
const { TentangAplikasi } = require('../models');
const { verifyAdmin } = require('../middleware/auth');

/**
 * Create a new tentang aplikasi
 */
const createTentangAplikasiHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { title, content } = request.payload;

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        await TentangAplikasi.create({
            id,
            title,
            content,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Tentang Aplikasi berhasil ditambahkan',
            data: { tentangAplikasiId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing tentang aplikasi
 */
const updateTentangAplikasiHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, content } = request.payload;

        const tentangAplikasi = await TentangAplikasi.findOne({ id });
        if (!tentangAplikasi) {
            return h.response({
                error: true,
                message: 'Tentang Aplikasi tidak ditemukan'
            }).code(404);
        }

        const updatedAt = new Date().toISOString();

        await TentangAplikasi.updateOne(
            { id },
            {
                title,
                content,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Tentang Aplikasi berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a tentang aplikasi
 */
const deleteTentangAplikasiHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const tentangAplikasi = await TentangAplikasi.findOne({ id });

        if (!tentangAplikasi) {
            return h.response({
                error: true,
                message: 'Tentang Aplikasi tidak ditemukan'
            }).code(404);
        }

        await TentangAplikasi.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Tentang Aplikasi berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Get all tentang aplikasi
 */
const getTentangAplikasiHandler = async (request, h) => {
    try {
        // Fetch data and convert to plain objects
        const tentangAplikasiData = await TentangAplikasi.find({}).lean();
        const tentangAplikasi = JSON.parse(JSON.stringify(tentangAplikasiData));

        return h.response({
            error: false,
            message: 'success',
            data: tentangAplikasi
        }).code(200);
    } catch (error) {
        console.error('Error getting tentang aplikasi:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server',
            details: error.message
        }).code(500);
    }
};

/**
 * Get a tentang aplikasi by ID
 */
const getTentangAplikasiByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const tentangAplikasiData = await TentangAplikasi.findOne({ id }).lean();

        if (!tentangAplikasiData) {
            return h.response({
                error: true,
                message: 'Tentang Aplikasi tidak ditemukan'
            }).code(404);
        }

        // Convert to plain object
        const tentangAplikasi = JSON.parse(JSON.stringify(tentangAplikasiData));

        return h.response({
            error: false,
            message: 'success',
            data: tentangAplikasi
        }).code(200);
    } catch (error) {
        console.error('Error getting tentang aplikasi by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server',
            details: error.message
        }).code(500);
    }
};

module.exports = {
    createTentangAplikasiHandler,
    updateTentangAplikasiHandler,
    deleteTentangAplikasiHandler,
    getTentangAplikasiHandler,
    getTentangAplikasiByIdHandler
};
