const { registerHandler, loginHandler } = require('../controllers/userController');

const userRoutes = [
    {
        method: "POST",
        path: "/register",
        handler: registerHandler,
    },
    {
        method: "POST",
        path: "/login",
        handler: loginHandler,
    }
];

module.exports = userRoutes;
