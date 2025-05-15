const { nanoid } = require("nanoid");
const {
    PartnerGroup,
    Partner
} = require('../models');
const { verifyAdmin } = require('../middleware/auth');

/**
 * Create a new partner group
 */
const createPartnerGroupHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { title } = request.payload;

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        await PartnerGroup.create({
            id,
            title,
            createdAt,
            updatedAt,
        });

        return h.response({
            error: false,
            message: 'Partner Group berhasil ditambahkan',
            data: { partnerGroupId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Update an existing partner group
 */
const updatePartnerGroupHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title } = request.payload;

        const partnerGroup = await PartnerGroup.findOne({ id });
        if (!partnerGroup) {
            return h.response({
                error: true,
                message: 'Partner Group tidak ditemukan'
            }).code(404);
        }

        const updatedAt = new Date().toISOString();

        await PartnerGroup.updateOne(
            { id },
            {
                title,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: 'Partner Group berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

/**
 * Delete a partner group
 */
const deletePartnerGroupHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const partnerGroup = await PartnerGroup.findOne({ id });

        if (!partnerGroup) {
            return h.response({
                error: true,
                message: 'Partner Group tidak ditemukan'
            }).code(404);
        }

        await PartnerGroup.deleteOne({ id });

        return h.response({
            error: false,
            message: 'Partner Group berhasil dihapus'
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
const getPartnersHandler = async (request, h) => {
    try {
        // Fetch main partner group data
        const partnerGroupData = await PartnerGroup.findOne({}).lean() || {
            id: nanoid(16),
            title: "Partners",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Fetch all partner entries
        const partnerEntries = await Partner.find({}).lean() || [];

        // Combine all data
        const result = {
            ...partnerGroupData,
            partner: partnerEntries
        };

        return h.response({
            error: false,
            message: 'success',
            data: result
        }).code(200);
    } catch (error) {
        console.error('Error getting partners:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server',
            details: error.message
        }).code(500);
    }
};

/**
 * Get a partner group by ID with all partner entries
 */
const getPartnerGroupByIdHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const partnerGroupData = await PartnerGroup.findOne({ id }).lean();

        if (!partnerGroupData) {
            return h.response({
                error: true,
                message: 'Partner Group tidak ditemukan'
            }).code(404);
        }

        // Fetch all partner entries
        const partnerEntries = await Partner.find({}).lean() || [];

        // Combine all data
        const result = {
            ...partnerGroupData,
            partner: partnerEntries
        };

        return h.response({
            error: false,
            message: 'success',
            data: result
        }).code(200);
    } catch (error) {
        console.error('Error getting partner group by id:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server',
            details: error.message
        }).code(500);
    }
};

module.exports = {
    createPartnerGroupHandler,
    updatePartnerGroupHandler,
    deletePartnerGroupHandler,
    getPartnersHandler,
    getPartnerGroupByIdHandler
};
