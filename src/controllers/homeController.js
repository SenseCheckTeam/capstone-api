const {
    Slider,
    PancaIndra,
    About,
    Peraba,
    Penciuman,
    Pendengaran,
    Penglihatan,
    Pengecapan
} = require('../models');

/**
 * Get home page data
 */
const getHomeHandler = async (request, h) => {
    try {
        const sliders = await Slider.find({});

        // Fetch main panca indra data
        const pancaIndraData = await PancaIndra.findOne({}).lean() || {
            id: "panca-indra-001",
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

        const abouts = await About.find({});

        return h.response({
            error: false,
            message: 'success',
            data: {
                sliders,
                abouts,
                pancaIndra
            }
        }).code(200);
    } catch (error) {
        console.error('Error getting home data:', error);
        return h.response({
            error: true,
            message: 'Terjadi kesalahan pada server'
        }).code(500);
    }
};

module.exports = {
    getHomeHandler
};
