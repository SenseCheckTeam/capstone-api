const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

/**
 * Verify user token
 * @param {Object} request - Hapi request object
 * @returns {Object} Decoded token
 * @throws {Error} If token is invalid or missing
 */
const verifyToken = (request) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('Token tidak ditemukan');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Token tidak valid');
    }
};

/**
 * Verify admin token
 * @param {Object} request - Hapi request object
 * @returns {Object} Decoded token
 * @throws {Error} If token is invalid, missing, or not an admin token
 */
const verifyAdmin = (request) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('Token tidak ditemukan');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.adminId) {
            throw new Error('Akses ditolak');
        }
        return decoded;
    } catch (error) {
        throw new Error('Token tidak valid');
    }
};

module.exports = {
    verifyToken,
    verifyAdmin
};
