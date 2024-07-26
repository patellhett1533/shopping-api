"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addReviewSchema = {
    body: joi_1.default.object({
        parent: joi_1.default.string().required(),
        message: joi_1.default.string().required(),
        user_name: joi_1.default.string().required(),
        user_role: joi_1.default.string().required(),
        is_active: joi_1.default.boolean(),
    }),
};
const getReviewByParentSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const getReviewByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const updateReviewByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        message: joi_1.default.string(),
        user_name: joi_1.default.string(),
        user_role: joi_1.default.string(),
        parent: joi_1.default.string(),
        is_active: joi_1.default.boolean(),
    }),
};
const deleteReviewByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
exports.default = {
    addReviewSchema,
    getReviewByParentSchema,
    getReviewByIdSchema,
    updateReviewByIdSchema,
    deleteReviewByIdSchema,
};
