const {
    createSliderHandler,
    updateSliderHandler,
    deleteSliderHandler,
    getSlidersHandler,
    getSliderByIdHandler
} = require('../controllers/sliderController');

const sliderRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/sliders",
        handler: getSlidersHandler,
    },
    {
        method: "GET",
        path: "/sliders/{id}",
        handler: getSliderByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/sliders",
        options: {
            payload: {
                allow: ["multipart/form-data"],
                parse: true,
                multipart: {
                    output: 'file'
                },
                maxBytes: 2000000,
            }
        },
        handler: createSliderHandler,
    },
    {
        method: "PUT",
        path: "/admin/sliders/{id}",
        options: {
            payload: {
                allow: ["multipart/form-data"],
                parse: true,
                multipart: {
                    output: 'file'
                },
                maxBytes: 2000000,
            }
        },
        handler: updateSliderHandler,
    },
    {
        method: "DELETE",
        path: "/admin/sliders/{id}",
        handler: deleteSliderHandler,
    }
];

module.exports = sliderRoutes;
