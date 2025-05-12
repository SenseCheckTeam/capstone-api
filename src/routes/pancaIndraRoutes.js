const {
    createPancaIndraHandler,
    updatePancaIndraHandler,
    deletePancaIndraHandler,
    getPancaIndraHandler,
    getPancaIndraByIdHandler
} = require('../controllers/pancaIndraController');

const pancaIndraRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/panca-indra",
        handler: getPancaIndraHandler,
    },
    {
        method: "GET",
        path: "/panca-indra/{id}",
        handler: getPancaIndraByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/panca-indra",
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
        handler: createPancaIndraHandler,
    },
    {
        method: "PUT",
        path: "/admin/panca-indra/{id}",
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
        handler: updatePancaIndraHandler,
    },
    {
        method: "DELETE",
        path: "/admin/panca-indra/{id}",
        handler: deletePancaIndraHandler,
    }
];

module.exports = pancaIndraRoutes;
