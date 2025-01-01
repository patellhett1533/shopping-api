"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const token_service_1 = __importDefault(require("../services/token.service"));
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const register = catchAsync(async (req, res) => {
    const user = await user_service_1.default.createUser(req.body);
    const token = await token_service_1.default.generateAuthTokens(user.id);
    res.status(httpStatus.CREATED).send({ user, token });
});
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await auth_service_1.default.loginWithPassword(email, password);
    const token = await token_service_1.default.generateAuthTokens(user.id);
    res.send({ user, token });
});
const logout = catchAsync(async (req, res) => {
    await auth_service_1.default.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});
const refreshTokens = catchAsync(async (req, res) => {
    const token = await auth_service_1.default.refreshAuth(req.body.refreshToken);
    res.send({ ...token });
});
const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await token_service_1.default.generateResetPasswordToken(req.body.email);
    res.status(httpStatus.NO_CONTENT).send();
});
const resetPassword = catchAsync(async (req, res) => {
    await auth_service_1.default.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
});
exports.default = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
};
