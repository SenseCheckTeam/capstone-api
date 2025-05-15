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
                allow: ["application/json"],
                parse: true,
            },
        },
        handler: createPancaIndraHandler,
    },
    {
        method: "PUT",
        path: "/admin/panca-indra/{id}",
        options: {
            payload: {
                allow: ["application/json"],
                parse: true,
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
