const { adminLoginHandler } = require('../controllers/adminController');
const { getHomeHandler } = require('../controllers/homeController');

const adminRoutes = [
    {
        method: "POST",
        path: "/admin/login",
        handler: adminLoginHandler,
    },
    {
        method: "GET",
        path: "/admin/dashboard",
        handler: getHomeHandler,
    }
];

module.exports = adminRoutes;
