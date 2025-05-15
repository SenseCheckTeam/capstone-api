const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const homeRoutes = require('./homeRoutes');
const sliderRoutes = require('./sliderRoutes');
const pancaIndraRoutes = require('./pancaIndraRoutes');
const aboutRoutes = require('./aboutRoutes');
const staticRoutes = require('./staticRoutes');
const perabaRoutes = require('./perabaRoutes');
const penciumanRoutes = require('./penciumanRoutes');
const pendengaranRoutes = require('./pendengaranRoutes');
const penglihatanRoutes = require('./penglihatanRoutes');
const pengecapanRoutes = require('./pengecapanRoutes');
const partnerGroupRoutes = require('./partnerGroupRoutes');
const partnerRoutes = require('./partnerRoutes');

// Combine all routes
const routes = [
    ...userRoutes,
    ...adminRoutes,
    ...homeRoutes,
    ...sliderRoutes,
    ...pancaIndraRoutes,
    ...aboutRoutes,
    ...staticRoutes,
    ...perabaRoutes,
    ...penciumanRoutes,
    ...pendengaranRoutes,
    ...penglihatanRoutes,
    ...pengecapanRoutes,
    ...partnerGroupRoutes,
    ...partnerRoutes
];

module.exports = routes;
