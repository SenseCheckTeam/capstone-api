const Path = require("path");

const staticRoutes = [
    {
        method: "GET",
        path: "/docs/{param*}",
        handler: {
            directory: {
                path: Path.join(__dirname, "..", "..", "docs"),
                listing: false,
                index: true,
                defaultExtension: "html",
            },
        },
    }
];

module.exports = staticRoutes;
