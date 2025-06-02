const { nanoid } = require("nanoid");
const { Diagnosa } = require('../models');
const { verifyUser } = require('../middleware/auth');

/**
 * Create a new diagnosa
 */
const createDiagnosaHandler = async (request, h) => {
    try {
        verifyUser(request);

        const { userId, diagnosis, saran, confidence } = request.payload;

        // Validasi bahwa userId dari payload sesuai dengan user yang login
        if (userId !== request.auth.userId) {
            return h.response({
                error: true,
                message: 'Tidak diizinkan membuat diagnosa untuk user lain'
            }).code(403);
        }

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        await Diagnosa.create({
            id,
            userId,
            diagnosis,
            saran,
            confidence,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Diagnosa berhasil disimpan',
            data: { diagnosaId: id }
        }).code(201);
    } catch (error) {
        console.error('Error creating diagnosa:', error);
        return h.response({
            error: true,
            message: error.message || 'Terjadi kesalahan pada server'
        }).code(error.message ? 401 : 500);
    }
};

/**
 * Get all diagnosa for logged in user
 */
const getDiagnosaHandler = async (request, h) => {
    try {
        verifyUser(request);

        const userId = request.auth.userId;
        const diagnosas = await Diagnosa.find({ userId }).sort({ createdAt: -1 });

        return h.response({
            error: false,
            message: 'success',
            data: diagnosas
        }).code(200);
    } catch (error) {
        console.error('Error getting diagnosas:', error);
        return h.response({
            error: true,
            message: error.message || 'Terjadi kesalahan pada server'
        }).code(error.message ? 401 : 500);
    }
};

/**
 * Get a diagnosa by ID for logged in user
 */
const getDiagnosaByIdHandler = async (request, h) => {
    try {
        verifyUser(request);

        const { id } = request.params;
        const userId = request.auth.userId;
        
        const diagnosa = await Diagnosa.findOne({ id, userId });

        if (!diagnosa) {
            return h.response({
                error: true,
                message: 'Diagnosa tidak ditemukan'
            }).code(404);
        }

        return h.response({
            error: false,
            message: 'success',
            data: diagnosa
        }).code(200);
    } catch (error) {
        console.error('Error getting diagnosa by id:', error);
        return h.response({
            error: true,
            message: error.message || 'Terjadi kesalahan pada server'
        }).code(error.message ? 401 : 500);
    }
};

/**
 * Update a diagnosa
 */
const updateDiagnosaHandler = async (request, h) => {
    try {
        verifyUser(request);

        const { id } = request.params;
        const { diagnosis, saran, confidence } = request.payload;
        const userId = request.auth.userId;

        const diagnosa = await Diagnosa.findOne({ id, userId });
        if (!diagnosa) {
            return h.response({
                error: true,
                message: 'Diagnosa tidak ditemukan'
            }).code(404);
        }

        const updatedAt = new Date().toISOString();

        await Diagnosa.updateOne(
            { id, userId },
            {
                diagnosis,
                saran,
                confidence,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Diagnosa berhasil diperbarui'
        }).code(200);
    } catch (error) {
        console.error('Error updating diagnosa:', error);
        return h.response({
            error: true,
            message: error.message || 'Terjadi kesalahan pada server'
        }).code(error.message ? 401 : 500);
    }
};

/**
 * Delete a diagnosa
 */
const deleteDiagnosaHandler = async (request, h) => {
    try {
        verifyUser(request);

        const { id } = request.params;
        const userId = request.auth.userId;
        
        const diagnosa = await Diagnosa.findOne({ id, userId });

        if (!diagnosa) {
            return h.response({
                error: true,
                message: 'Diagnosa tidak ditemukan'
            }).code(404);
        }

        await Diagnosa.deleteOne({ id, userId });

        return h.response({
            error: false,
            message: 'Diagnosa berhasil dihapus'
        }).code(200);
    } catch (error) {
        console.error('Error deleting diagnosa:', error);
        return h.response({
            error: true,
            message: error.message || 'Terjadi kesalahan pada server'
        }).code(error.message ? 401 : 500);
    }
};

module.exports = {
    createDiagnosaHandler,
    getDiagnosaHandler,
    getDiagnosaByIdHandler,
    updateDiagnosaHandler,
    deleteDiagnosaHandler
};