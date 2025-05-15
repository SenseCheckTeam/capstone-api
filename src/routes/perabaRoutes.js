const {
    createPerabaHandler,
    updatePerabaHandler,
    deletePerabaHandler,
    getPerabaHandler,
    getPerabaByIdHandler
} = require('../controllers/perabaController');

const perabaRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/peraba",
        handler: getPerabaHandler,
    },
    {
        method: "GET",
        path: "/peraba/{id}",
        handler: getPerabaByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/peraba",
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
        handler: createPerabaHandler,
    },
    {
        method: "PUT",
        path: "/admin/peraba/{id}",
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
        handler: updatePerabaHandler,
    },
    {
        method: "DELETE",
        path: "/admin/peraba/{id}",
        handler: deletePerabaHandler,
    }
];

module.exports = perabaRoutes;
