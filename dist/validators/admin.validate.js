"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const registerUser = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
};
const loginUserByPassword = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
};
const logoutUser = {
    body: joi_1.default.object({
        refreshToken: joi_1.default.string().required(),
    }),
};
const refreshUserToken = {
    body: joi_1.default.object({
        refreshToken: joi_1.default.string().required(),
    }),
};
const forgotUserPassword = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
    }),
};
const resetUserPassword = {
    params: joi_1.default.object({
        token: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        password: joi_1.default.string().required(),
    }),
};
const verifyUserEmail = {
    body: joi_1.default.object({
        token: joi_1.default.string().required(),
    }),
};
const getUserById = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(),
    }),
};
const updateUser = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        name: joi_1.default.string(),
        email: joi_1.default.string().email(),
        password: joi_1.default.string(),
    }),
};
const deleteUser = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(),
    }),
};
exports.default = {
    registerUser,
    loginUserByPassword,
    logoutUser,
    refreshUserToken,
    forgotUserPassword,
    resetUserPassword,
    verifyUserEmail,
    getUserById,
    updateUser,
    deleteUser,
};
