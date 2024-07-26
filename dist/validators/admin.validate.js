"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const registerAdmin = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
};
const loginAdminByPassword = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
};
const logoutAdmin = {
    body: joi_1.default.object({
        refreshToken: joi_1.default.string().required(),
    }),
};
const refreshAdminToken = {
    body: joi_1.default.object({
        refreshToken: joi_1.default.string().required(),
    }),
};
const forgotAdminPassword = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
    }),
};
const resetAdminPassword = {
    params: joi_1.default.object({
        token: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        password: joi_1.default.string().required(),
    }),
};
const verifyAdminEmail = {
    body: joi_1.default.object({
        token: joi_1.default.string().required(),
    }),
};
const getAdminById = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(),
    }),
};
const updateAdmin = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        name: joi_1.default.string(),
        email: joi_1.default.string().email(),
        password: joi_1.default.string(),
    }),
};
const deleteAdmin = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(),
    }),
};
exports.default = {
    registerAdmin,
    loginAdminByPassword,
    logoutAdmin,
    refreshAdminToken,
    forgotAdminPassword,
    resetAdminPassword,
    verifyAdminEmail,
    getAdminById,
    updateAdmin,
    deleteAdmin,
};
