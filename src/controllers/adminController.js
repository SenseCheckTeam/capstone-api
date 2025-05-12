const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const { JWT_SECRET } = require('../config');

/**
 * Handle admin login
 */
const adminLoginHandler = async (request, h) => {
    const { email, password } = request.payload;

    // Cari admin berdasarkan email
    const admin = await Admin.findOne({ email });

    if (!admin) {
        const response = h.response({
            error: true,
            message: "Email atau password salah",
        });
        response.code(401);
        return response;
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        const response = h.response({
            error: true,
            message: "Email atau password salah",
        });
        response.code(401);
        return response;
    }

    // Generate JWT token
    const token = jwt.sign({
        adminId: admin.id
    }, JWT_SECRET);

    const response = h.response({
        error: false,
        message: "success",
        loginResult: {
            adminId: admin.id,
            name: admin.name,
            token: token
        }
    });
    response.code(200);
    return response;
};

module.exports = {
    adminLoginHandler
};
