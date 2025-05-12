const {
    createArticleHandler,
    updateArticleHandler,
    deleteArticleHandler,
    getArticlesHandler,
    getArticleByIdHandler
} = require('../controllers/articleController');

const articleRoutes = [
    // Public routes
    {
        method: "GET",
        path: "/articles",
        handler: getArticlesHandler,
    },
    {
        method: "GET",
        path: "/articles/{id}",
        handler: getArticleByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin/articles",
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
        handler: createArticleHandler,
    },
    {
        method: "PUT",
        path: "/admin/articles/{id}",
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
        handler: updateArticleHandler,
    },
    {
        method: "DELETE",
        path: "/admin/articles/{id}",
        handler: deleteArticleHandler,
    }
];

module.exports = articleRoutes;
