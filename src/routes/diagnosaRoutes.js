const {
    createDiagnosaHandler,
    getDiagnosaHandler,
    getDiagnosaByIdHandler,
    updateDiagnosaHandler,
    deleteDiagnosaHandler
} = require('../controllers/diagnosaController');

const diagnosaRoutes = [
    // User routes (semua memerlukan autentikasi user)
    {
        method: "GET",
        path: "/diagnosa",
        handler: getDiagnosaHandler,
    },
    {
        method: "GET",
        path: "/diagnosa/{id}",
        handler: getDiagnosaByIdHandler,
    },
    {
        method: "POST",
        path: "/diagnosa",
        options: {
            payload: {
                allow: ["application/json"],
                parse: true,
            },
        },
        handler: createDiagnosaHandler,
    },
    {
        method: "PUT",
        path: "/diagnosa/{id}",
        options: {
            payload: {
                allow: ["application/json"],
                parse: true,
            },
        },
        handler: updateDiagnosaHandler,
    },
    {
        method: "DELETE",
        path: "/diagnosa/{id}",
        handler: deleteDiagnosaHandler,
    }
];

module.exports = diagnosaRoutes;