const {
    createPenyakitHandler,
    updatePenyakitHandler,
    deletePenyakitHandler,
    getPenyakitHandler,
    getPenyakitByNameHandler
} = require('../controllers/penyakitController');

const penyakitRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/penyakit",
        handler: getPenyakitHandler,
    },
    {
        method: "GET",
        path: "/penyakit/{name}",
        handler: getPenyakitByNameHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/penyakit",
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
        handler: createPenyakitHandler,
    },
    {
        method: "PUT",
        path: "/admin/penyakit/{id}",
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
        handler: updatePenyakitHandler,
    },
    {
        method: "DELETE",
        path: "/admin/penyakit/{id}",
        handler: deletePenyakitHandler,
    }
];

module.exports = penyakitRoutes;