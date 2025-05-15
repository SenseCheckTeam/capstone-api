const {
    createAboutHandler,
    updateAboutHandler,
    deleteAboutHandler,
    getAboutsHandler,
    getAboutByIdHandler
} = require('../controllers/aboutController');

const aboutRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/about",
        handler: getAboutsHandler,
    },
    {
        method: "GET",
        path: "/about/{id}",
        handler: getAboutByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/about",
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
        handler: createAboutHandler,
    },
    {
        method: "PUT",
        path: "/admin/about/{id}",
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
        handler: updateAboutHandler,
    },
    {
        method: "DELETE",
        path: "/admin/about/{id}",
        handler: deleteAboutHandler,
    }
];

module.exports = aboutRoutes;
