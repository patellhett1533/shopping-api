"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../models/user.model"));
const createApiError_1 = require("../utils/createApiError");
const token_model_1 = __importDefault(require("../models/token.model"));
const tokens_1 = __importDefault(require("../config/tokens"));
const token_service_1 = __importDefault(require("./token.service"));
const createUser = async (user) => {
    if (await user_model_1.default.isEmailTaken(user.email)) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.BAD_REQUEST, "Email already taken");
    }
    return await user_model_1.default.create(user);
};
const queryUsers = async (filter, options) => {
    const users = await user_model_1.default.paginate(filter, options);
    return users;
};
const getUserById = async (id) => {
    const user = await user_model_1.default.findById(id);
    if (!user) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
};
const getUserByEmail = async (email) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
};
const updateUser = async (id, user) => {
    const existingUser = await getUserById(id);
    return await existingUser.updateOne(user);
};
const deleteUser = async (id) => {
    const user = await user_model_1.default.findByIdAndDelete(id);
    return user;
};
const loginUser = async (userBody) => {
    const user = await getUserByEmail(userBody.email);
    if (!user) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    const isPasswordValid = await user_model_1.default.matchPassword(userBody.password);
    if (!isPasswordValid) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    if (!user.isVerified) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please verify your email");
    }
    return user;
};
const logoutUser = async (refreshToken) => {
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
const refreshAuthUser = async (refreshToken) => {
    try {
        const refreshTokenDoc = await token_service_1.default.verifyToken(refreshToken, tokens_1.default.REFRESH);
        const user = await user_model_1.default.findById(refreshTokenDoc.user);
        if (!user) {
            throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "No user found");
        }
        return token_service_1.default.generateAuthTokens(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
const resetUserPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await token_service_1.default.verifyToken(resetPasswordToken, tokens_1.default.RESET_PASSWORD);
        const user = await getUserById(resetPasswordTokenDoc.user.toString());
        if (!user) {
            throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "No user found");
        }
        await updateUser(user.id, { password: newPassword });
        return getUserById(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
const verifyUserEmail = async (verificationToken) => {
    try {
        const verificationTokenDoc = await token_service_1.default.verifyToken(verificationToken, tokens_1.default.VERIFY_EMAIL);
        const user = await getUserById(verificationTokenDoc.user.toString());
        if (!user) {
            throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "No user found");
        }
        await updateUser(user.id, { isVerified: true });
        return getUserById(user.id);
    }
    catch (error) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
exports.default = {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    refreshAuthUser,
    resetUserPassword,
    verifyUserEmail,
};
