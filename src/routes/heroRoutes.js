const {
    createHeroHandler,
    updateHeroHandler,
    deleteHeroHandler,
    getHerosHandler,
    getHeroByIdHandler
} = require('../controllers/heroController');

const heroRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/hero",
        handler: getHerosHandler,
    },
    {
        method: "GET",
        path: "/hero/{id}",
        handler: getHeroByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/hero",
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
        handler: createHeroHandler,
    },
    {
        method: "PUT",
        path: "/admin/hero/{id}",
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
        handler: updateHeroHandler,
    },
    {
        method: "DELETE",
        path: "/admin/hero/{id}",
        handler: deleteHeroHandler,
    }
];

module.exports = heroRoutes;
