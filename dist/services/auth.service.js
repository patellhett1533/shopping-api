"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __importDefault(require("../config/tokens"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
const createApiError_1 = require("../utils/createApiError");
const admin_service_1 = __importDefault(require("./admin.service"));
const token_service_1 = __importDefault(require("./token.service"));
const httpStatus = require("http-status");
const loginWithPassword = async (email, password) => {
    const user = await admin_service_1.default.getAdminByEmail(email);
    if (!user) {
        throw (0, createApiError_1.createApiError)(httpStatus.NOT_FOUND, "User not found");
    }
    const isMatch = await admin_model_1.default.matchPassword(password);
    if (!isMatch) {
        throw (0, createApiError_1.createApiError)(httpStatus.BAD_REQUEST, "Invalid credentials");
    }
    return user;
};
const logout = async (refreshToken) => {
    const token = await token_model_1.default.findOneAndDelete({
        token: refreshToken,
        blacklisted: false,
    });
    if (!token) {
        throw (0, createApiError_1.createApiError)(httpStatus.NOT_FOUND, "Not found");
    }
    return token;
};
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await token_service_1.default.verifyToken(refreshToken, tokens_1.default.REFRESH);
        const user = await admin_model_1.default.findByIdAndDelete(refreshTokenDoc.user);
        if (!user) {
            throw (0, createApiError_1.createApiError)(httpStatus.NOT_FOUND, "No user found");
        }
        return token_service_1.default.generateAuthTokens(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(httpStatus.UNAUTHORIZED, "Please authenticate");
    }
};
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await token_service_1.default.verifyToken(resetPasswordToken, tokens_1.default.RESET_PASSWORD);
        const user = await admin_service_1.default.getAdminById(resetPasswordTokenDoc.user.toString());
        if (!user) {
            throw (0, createApiError_1.createApiError)(httpStatus.NOT_FOUND, "No user found");
        }
        await admin_service_1.default.updateAdmin(user.id, { password: newPassword });
        return admin_service_1.default.getAdminById(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(httpStatus.UNAUTHORIZED, "Please authenticate");
    }
};
const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await token_service_1.default.verifyToken(verifyEmailToken, tokens_1.default.VERIFY_EMAIL);
        const user = await admin_service_1.default.getAdminById(verifyEmailTokenDoc.user.toString());
        if (!user) {
            throw (0, createApiError_1.createApiError)(httpStatus.NOT_FOUND, "No user found");
        }
        await admin_service_1.default.updateAdmin(user.id, { isVerified: true });
        return admin_service_1.default.getAdminById(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(httpStatus.UNAUTHORIZED, "Please authenticate");
    }
};
exports.default = {
    loginWithPassword,
    logout,
    refreshAuth,
    resetPassword,
    verifyEmail,
};
