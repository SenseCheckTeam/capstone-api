const { registerHandler, loginHandler, updateUserHandler } = require('../controllers/userController');
const { verifyUser } = require('../middleware/auth');

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
    },
    {
        method: "PUT",
        path: "/user/profile",
        options: {
            pre: [
                {
                    method: (request, h) => {
                        verifyUser(request);
                        return h.continue;
                    }
                }
            ]
        },
        handler: updateUserHandler,
    }
];

module.exports = userRoutes;
