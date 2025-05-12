const { getHomeHandler } = require('../controllers/homeController');

const homeRoutes = [
    {
        method: "GET",
        path: "/",
        handler: getHomeHandler,
    }
];

module.exports = homeRoutes;
