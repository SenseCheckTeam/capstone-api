const {
    createPartnerGroupHandler,
    updatePartnerGroupHandler,
    deletePartnerGroupHandler,
    getPartnersHandler,
    getPartnerGroupByIdHandler
} = require('../controllers/partnerGroupController');

const partnerGroupRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/partners",
        handler: getPartnersHandler,
    },
    {
        method: "GET",
        path: "/partners/{id}",
        handler: getPartnerGroupByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/partners",
        options: {
            payload: {
                allow: ["application/json"],
                parse: true,
            },
        },
        handler: createPartnerGroupHandler,
    },
    {
        method: "PUT",
        path: "/admin/partners/{id}",
        options: {
            payload: {
                allow: ["application/json"],
                parse: true,
            },
        },
        handler: updatePartnerGroupHandler,
    },
    {
        method: "DELETE",
        path: "/admin/partners/{id}",
        handler: deletePartnerGroupHandler,
    }
];

module.exports = partnerGroupRoutes;
