const {
    createPenglihatanHandler,
    updatePenglihatanHandler,
    deletePenglihatanHandler,
    getPenglihatanHandler,
    getPenglihatanByIdHandler
} = require('../controllers/penglihatanController');

const penglihatanRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/penglihatan",
        handler: getPenglihatanHandler,
    },
    {
        method: "GET",
        path: "/penglihatan/{id}",
        handler: getPenglihatanByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/penglihatan",
        options: {
            payload: {
                allow: ["multipart/form-data"],
                parse: true,
                multipart: {
                    output: "file",
                },
                maxBytes: 2000000,
            },
        },
        handler: createPenglihatanHandler,
    },
    {
        method: "PUT",
        path: "/admin/penglihatan/{id}",
        options: {
            payload: {
                allow: ["multipart/form-data"],
                parse: true,
                multipart: {
                    output: "file",
                },
                maxBytes: 2000000,
            },
        },
        handler: updatePenglihatanHandler,
    },
    {
        method: "DELETE",
        path: "/admin/penglihatan/{id}",
        handler: deletePenglihatanHandler,
    }
];

module.exports = penglihatanRoutes;
