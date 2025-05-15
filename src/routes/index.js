const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const homeRoutes = require('./homeRoutes');
const sliderRoutes = require('./sliderRoutes');
const pancaIndraRoutes = require('./pancaIndraRoutes');
const tentangAplikasiRoutes = require('./tentangAplikasiRoutes');
const staticRoutes = require('./staticRoutes');

// Combine all routes
const routes = [
    ...userRoutes,
    ...adminRoutes,
    ...homeRoutes,
    ...sliderRoutes,
    ...pancaIndraRoutes,
    ...tentangAplikasiRoutes,
    ...staticRoutes
];

module.exports = routes;
