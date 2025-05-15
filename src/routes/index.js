const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const homeRoutes = require('./homeRoutes');
const sliderRoutes = require('./sliderRoutes');
const pancaIndraRoutes = require('./pancaIndraRoutes');
const aboutRoutes = require('./aboutRoutes');
const staticRoutes = require('./staticRoutes');

// Combine all routes
const routes = [
    ...userRoutes,
    ...adminRoutes,
    ...homeRoutes,
    ...sliderRoutes,
    ...pancaIndraRoutes,
    ...aboutRoutes,
    ...staticRoutes
];

module.exports = routes;
