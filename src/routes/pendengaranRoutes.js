const {
    createPendengaranHandler,
    updatePendengaranHandler,
    deletePendengaranHandler,
    getPendengaranHandler,
    getPendengaranByIdHandler
} = require('../controllers/pendengaranController');

const pendengaranRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/pendengaran",
        handler: getPendengaranHandler,
    },
    {
        method: "GET",
        path: "/pendengaran/{id}",
        handler: getPendengaranByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/pendengaran",
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
        handler: createPendengaranHandler,
    },
    {
        method: "PUT",
        path: "/admin/pendengaran/{id}",
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
        handler: updatePendengaranHandler,
    },
    {
        method: "DELETE",
        path: "/admin/pendengaran/{id}",
        handler: deletePendengaranHandler,
    }
];

module.exports = pendengaranRoutes;
