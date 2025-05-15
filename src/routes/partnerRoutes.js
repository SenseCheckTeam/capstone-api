const {
    createPartnerHandler,
    updatePartnerHandler,
    deletePartnerHandler,
    getPartnerHandler,
    getPartnerByIdHandler
} = require('../controllers/partnerController');

const partnerRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/partner",
        handler: getPartnerHandler,
    },
    {
        method: "GET",
        path: "/partner/{id}",
        handler: getPartnerByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/partner",
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
        handler: createPartnerHandler,
    },
    {
        method: "PUT",
        path: "/admin/partner/{id}",
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
        handler: updatePartnerHandler,
    },
    {
        method: "DELETE",
        path: "/admin/partner/{id}",
        handler: deletePartnerHandler,
    }
];

module.exports = partnerRoutes;
