"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const env_1 = __importDefault(require("../config/env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const token_model_1 = __importDefault(require("../models/token.model"));
const createApiError_1 = require("../utils/createApiError");
const tokens_1 = __importDefault(require("../config/tokens"));
const generateToken = (user, expires, type, secret = env_1.default.jwt.secret) => {
    const payload = {
        sub: user,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix(),
        type,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
const saveToken = async (token, user, expires, type, blacklisted = false) => {
    const tokenDoc = await token_model_1.default.create({
        token,
        user,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
};
const verifyToken = async (token, type) => {
    const payload = jsonwebtoken_1.default.verify(token, env_1.default.jwt.secret);
    const tokenDoc = await token_model_1.default.findOneAndDelete({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
    });
    if (!tokenDoc) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "Token not found");
    }
    return tokenDoc;
};
const generateAuthTokens = async (user) => {
    const accessTokenExpires = (0, moment_1.default)().add(env_1.default.jwt.accessExpirationDays, "days");
    const refreshTokenExpires = (0, moment_1.default)().add(env_1.default.jwt.refreshExpirationDays, "days");
    const accessToken = generateToken(user, accessTokenExpires, tokens_1.default.ACCESS);
    const refreshToken = generateToken(user, refreshTokenExpires, tokens_1.default.REFRESH);
    await saveToken(refreshToken, user, refreshTokenExpires, tokens_1.default.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};
const generateResetPasswordToken = async (user) => {
    const expires = (0, moment_1.default)().add(env_1.default.jwt.resetPasswordExpirationMinutes, "minutes");
    const resetPasswordToken = generateToken(user, expires, tokens_1.default.RESET_PASSWORD);
    await saveToken(resetPasswordToken, user, expires, tokens_1.default.RESET_PASSWORD);
    return resetPasswordToken;
};
const generateVerifyEmailToken = async (user) => {
    const expires = (0, moment_1.default)().add(env_1.default.jwt.verifyEmailExpirationMinutes, "minutes");
    const verifyEmailToken = generateToken(user, expires, tokens_1.default.VERIFY_EMAIL);
    await saveToken(verifyEmailToken, user, expires, tokens_1.default.VERIFY_EMAIL);
    return verifyEmailToken;
};
exports.default = {
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken,
    verifyToken,
    generateToken,
    saveToken,
};
