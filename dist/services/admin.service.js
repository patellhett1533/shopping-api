"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const createApiError_1 = require("../utils/createApiError");
const token_model_1 = __importDefault(require("../models/token.model"));
const tokens_1 = __importDefault(require("../config/tokens"));
const token_service_1 = __importDefault(require("./token.service"));
const createAdmin = async (admin) => {
    if (await admin_model_1.default.isEmailTaken(admin.email)) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.BAD_REQUEST, "Email already taken");
    }
    return await admin_model_1.default.create(admin);
};
const queryAdmins = async (filter, options) => {
    const admins = await admin_model_1.default.paginate(filter, options);
    return admins;
};
const getAdminById = async (id) => {
    const admin = await admin_model_1.default.findById(id);
    if (!admin) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "Admin not found");
    }
    return admin;
};
const getAdminByEmail = async (email) => {
    const admin = await admin_model_1.default.findOne({ email });
    if (!admin) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "Admin not found");
    }
    return admin;
};
const updateAdmin = async (id, admin) => {
    const existingAdmin = await getAdminById(id);
    return await existingAdmin.updateOne(admin);
};
const deleteAdmin = async (id) => {
    const admin = await admin_model_1.default.findByIdAndDelete(id);
    return admin;
};
const loginAdmin = async (adminBody) => {
    const admin = await getAdminByEmail(adminBody.email);
    if (!admin) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    const isPasswordValid = await admin.matchPassword(adminBody.password);
    if (!isPasswordValid) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    if (!admin.isVerified) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please verify your email");
    }
    return admin;
};
const logoutAdmin = async (refreshToken) => {
    const token = await token_model_1.default.findOneAndDelete({
        token: refreshToken,
        type: tokens_1.default.REFRESH,
        blacklisted: false,
    });
    if (!token) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Invalid refresh token");
    }
    return token;
};
const refreshAuthAdmin = async (refreshToken) => {
    try {
        const refreshTokenDoc = await token_service_1.default.verifyToken(refreshToken, tokens_1.default.REFRESH);
        const user = await admin_model_1.default.findById(refreshTokenDoc.user);
        if (!user) {
            throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "No user found");
        }
        return token_service_1.default.generateAuthTokens(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
const resetAdminPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await token_service_1.default.verifyToken(resetPasswordToken, tokens_1.default.RESET_PASSWORD);
        const user = await getAdminById(resetPasswordTokenDoc.user.toString());
        if (!user) {
            throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "No user found");
        }
        await updateAdmin(user.id, { password: newPassword });
        return getAdminById(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
const verifyAdminEmail = async (verificationToken) => {
    try {
        const verificationTokenDoc = await token_service_1.default.verifyToken(verificationToken, tokens_1.default.VERIFY_EMAIL);
        const user = await getAdminById(verificationTokenDoc.user.toString());
        if (!user) {
            throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "No user found");
        }
        await updateAdmin(user.id, { isVerified: true });
        return getAdminById(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
exports.default = {
    createAdmin,
    queryAdmins,
    getAdminById,
    getAdminByEmail,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAuthAdmin,
    resetAdminPassword,
    verifyAdminEmail,
};
