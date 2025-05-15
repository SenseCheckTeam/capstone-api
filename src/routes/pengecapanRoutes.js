const {
    createPengecapanHandler,
    updatePengecapanHandler,
    deletePengecapanHandler,
    getPengecapanHandler,
    getPengecapanByIdHandler
} = require('../controllers/pengecapanController');

const pengecapanRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/pengecapan",
        handler: getPengecapanHandler,
    },
    {
        method: "GET",
        path: "/pengecapan/{id}",
        handler: getPengecapanByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/pengecapan",
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
        handler: createPengecapanHandler,
    },
    {
        method: "PUT",
        path: "/admin/pengecapan/{id}",
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
        handler: updatePengecapanHandler,
    },
    {
        method: "DELETE",
        path: "/admin/pengecapan/{id}",
        handler: deletePengecapanHandler,
    }
];

module.exports = pengecapanRoutes;
