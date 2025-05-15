const { nanoid } = require("nanoid");
const {
    PancaIndra,
    Peraba,
    Penciuman,
    Pendengaran,
    Penglihatan,
    Pengecapan
} = require('../models');
const { verifyAdmin } = require('../middleware/auth');

/**
 * Create a new panca indra
 */
const createPancaIndraHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { title } = request.payload;

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        await PancaIndra.create({
            id,
            title,
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
        const { title } = request.payload;

        const pancaIndra = await PancaIndra.findOne({ id });
        if (!pancaIndra) {
            return h.response({
                error: true,
                message: 'Panca Indra tidak ditemukan'
            }).code(404);
        }

        const updatedAt = new Date().toISOString();

        await PancaIndra.updateOne(
            { id },
            {
                title,
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
 * Get all panca indras with all senses
 */
const getPancaIndraHandler = async (request, h) => {
    try {
        // Fetch main panca indra data
        const pancaIndraData = await PancaIndra.findOne({}).lean() || {
            id: nanoid(16),
            title: "Panca Indra",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Fetch data for each sense
        const peraba = await Peraba.findOne({}).lean() || null;
        const penciuman = await Penciuman.findOne({}).lean() || null;
        const pendengaran = await Pendengaran.findOne({}).lean() || null;
        const penglihatan = await Penglihatan.findOne({}).lean() || null;
        const pengecapan = await Pengecapan.findOne({}).lean() || null;

        // Combine all data
        const pancaIndra = {
            ...pancaIndraData,
            peraba,
            penciuman,
            pendengaran,
            penglihatan,
            pengecapan
        };

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
 * Get a panca indra by ID with all senses
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

        // Fetch data for each sense
        const peraba = await Peraba.findOne({}).lean() || null;
        const penciuman = await Penciuman.findOne({}).lean() || null;
        const pendengaran = await Pendengaran.findOne({}).lean() || null;
        const penglihatan = await Penglihatan.findOne({}).lean() || null;
        const pengecapan = await Pengecapan.findOne({}).lean() || null;

        // Combine all data
        const pancaIndra = {
            ...pancaIndraData,
            peraba,
            penciuman,
            pendengaran,
            penglihatan,
            pengecapan
        };

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
