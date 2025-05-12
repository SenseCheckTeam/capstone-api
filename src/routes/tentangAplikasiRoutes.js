const {
    createTentangAplikasiHandler,
    updateTentangAplikasiHandler,
    deleteTentangAplikasiHandler,
    getTentangAplikasiHandler,
    getTentangAplikasiByIdHandler
} = require('../controllers/tentangAplikasiController');

const tentangAplikasiRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/tentang-aplikasi",
        handler: getTentangAplikasiHandler,
    },
    {
        method: "GET",
        path: "/tentang-aplikasi/{id}",
        handler: getTentangAplikasiByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/tentang-aplikasi",
        options: {
            payload: {
                allow: ["application/json"],
                parse: true,
            },
        },
        handler: createTentangAplikasiHandler,
    },
    {
        method: "PUT",
        path: "/admin/tentang-aplikasi/{id}",
        options: {
            payload: {
                allow: ["application/json"],
                parse: true,
            },
        },
        handler: updateTentangAplikasiHandler,
    },
    {
        method: "DELETE",
        path: "/admin/tentang-aplikasi/{id}",
        handler: deleteTentangAplikasiHandler,
    }
];

module.exports = tentangAplikasiRoutes;
