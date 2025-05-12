const { Slider, Article, PancaIndra, TentangAplikasi } = require('../models');

/**
 * Get home page data
 */
const getHomeHandler = async (request, h) => {
    try {
        const sliders = await Slider.find({});
        const articles = await Article.find({});
        const pancaIndras = await PancaIndra.find({});
        const tentangAplikasis = await TentangAplikasi.find({});

        return h.response({
            error: false,
            message: 'success',
            data: {
                sliders,
                articles,
                pancaIndras,
                tentangAplikasis
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
