const { nanoid } = require("nanoid");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { JWT_SECRET } = require('../config');

/**
 * Handle user registration
 */
const registerHandler = async (request, h) => {
    const { name, email, password } = request.payload;

    // Validasi password minimal 8 karakter
    if (password.length < 8) {
        const response = h.response({
            error: true,
            message: "Password harus minimal 8 karakter",
        });
        response.code(400);
        return response;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const response = h.response({
            error: true,
            message: "Format email tidak valid",
        });
        response.code(400);
        return response;
    }

    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const response = h.response({
            error: true,
            message: "Email sudah digunakan",
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // Hash password dengan salt rounds 10
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            id,
            name,
            email,
            password: hashedPassword,
            role: "user", // Default role untuk user baru
            createdAt,
            updatedAt,
        });

        const response = h.response({
            error: false,
            message: "User berhasil ditambahkan",
        });
        response.code(201);
        return response;
    } catch (error) {
        console.error('Error creating user:', error);
        const response = h.response({
            error: true,
            message: "User gagal ditambahkan",
        });
        response.code(500);
        return response;
    }
};

/**
 * Handle user login
 */
const loginHandler = async (request, h) => {
    const { email, password } = request.payload;

    // Cari user berdasarkan email
    const user = await User.findOne({ email });

    if (!user) {
        const response = h.response({
            error: true,
            message: "Email atau password salah",
        });
        response.code(401);
        return response;
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

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
        userId: user.id,
        role: user.role
    }, JWT_SECRET);

    const response = h.response({
        error: false,
        message: "success",
        loginResult: {
            userId: user.id,
            name: user.name,
            token: token
        }
    });
    response.code(200);
    return response;
};

/**
 * Handle user profile update
 */
const updateUserHandler = async (request, h) => {
    try {
        const { name, email, password } = request.payload;
        const userId = request.auth.userId; // Dari middleware verifyUser

        // Cari user berdasarkan ID
        const user = await User.findOne({ id: userId });
        if (!user) {
            return h.response({
                error: true,
                message: "User tidak ditemukan"
            }).code(404);
        }

        // Validasi email jika diubah
        if (email && email !== user.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return h.response({
                    error: true,
                    message: "Format email tidak valid"
                }).code(400);
            }

            // Cek apakah email baru sudah digunakan user lain
            const existingUser = await User.findOne({ email, id: { $ne: userId } });
            if (existingUser) {
                return h.response({
                    error: true,
                    message: "Email sudah digunakan"
                }).code(400);
            }
        }

        // Validasi password jika diubah
        let hashedPassword = user.password;
        if (password) {
            if (password.length < 8) {
                return h.response({
                    error: true,
                    message: "Password harus minimal 8 karakter"
                }).code(400);
            }
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedAt = new Date().toISOString();

        // Update user
        await User.updateOne(
            { id: userId },
            {
                name: name || user.name,
                email: email || user.email,
                password: hashedPassword,
                updatedAt,
            }
        );

        return h.response({
            error: false,
            message: "Profil berhasil diperbarui"
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(500);
    }
};

module.exports = {
    registerHandler,
    loginHandler,
    updateUserHandler
};
