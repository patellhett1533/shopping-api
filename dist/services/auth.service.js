"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __importDefault(require("../config/tokens"));
const user_model_1 = __importDefault(require("../models/user.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
const createApiError_1 = require("../utils/createApiError");
const user_service_1 = __importDefault(require("./user.service"));
const token_service_1 = __importDefault(require("./token.service"));
const http_status_1 = __importDefault(require("http-status"));
const loginWithPassword = async (email, password) => {
    const user = await user_service_1.default.getUserByEmail(email);
    if (!user) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.BAD_REQUEST, "Invalid credentials");
    }
    return user;
};
const logout = async (refreshToken) => {
    const token = await token_model_1.default.findOneAndDelete({
        token: refreshToken,
        blacklisted: false,
    });
    if (!token) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "Not found");
    }
    return token;
};
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await token_service_1.default.verifyToken(refreshToken, tokens_1.default.REFRESH);
        const user = await user_model_1.default.findByIdAndDelete(refreshTokenDoc.user);
        if (!user) {
            throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "No user found");
        }
        return token_service_1.default.generateAuthTokens(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await token_service_1.default.verifyToken(resetPasswordToken, tokens_1.default.RESET_PASSWORD);
        const user = await user_service_1.default.getUserById(resetPasswordTokenDoc.user.toString());
        if (!user) {
            throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "No user found");
        }
        await user_service_1.default.updateUser(user.id, { password: newPassword });
        return user_service_1.default.getUserById(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
exports.default = {
    loginWithPassword,
    logout,
    refreshAuth,
    resetPassword,
};
