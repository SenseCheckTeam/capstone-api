const { adminLoginHandler } = require('../controllers/adminController');

const adminRoutes = [
    {
        method: "POST",
        path: "/admin",
        handler: adminLoginHandler,
    }
];

module.exports = adminRoutes;
