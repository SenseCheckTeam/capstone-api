const { Slider, PancaIndra, About } = require('../models');

/**
 * Get home page data
 */
const getHomeHandler = async (request, h) => {
    try {
        const sliders = await Slider.find({});
        const pancaIndras = await PancaIndra.find({});
        const abouts = await About.find({});

        return h.response({
            error: false,
            message: 'success',
            data: {
                sliders,
                pancaIndras,
                abouts
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
