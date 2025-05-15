const {
    createPenciumanHandler,
    updatePenciumanHandler,
    deletePenciumanHandler,
    getPenciumanHandler,
    getPenciumanByIdHandler
} = require('../controllers/penciumanController');

const penciumanRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/penciuman",
        handler: getPenciumanHandler,
    },
    {
        method: "GET",
        path: "/penciuman/{id}",
        handler: getPenciumanByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/penciuman",
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
        handler: createPenciumanHandler,
    },
    {
        method: "PUT",
        path: "/admin/penciuman/{id}",
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
        handler: updatePenciumanHandler,
    },
    {
        method: "DELETE",
        path: "/admin/penciuman/{id}",
        handler: deletePenciumanHandler,
    }
];

module.exports = penciumanRoutes;
