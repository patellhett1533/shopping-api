"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addFaqSchema = {
    body: joi_1.default.object({
        question: joi_1.default.string().required(),
        answer: joi_1.default.string().required(),
        parent: joi_1.default.string().required(),
        is_active: joi_1.default.boolean(),
    }),
};
const getFaqByParentSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const getFaqByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const updateFaqByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        question: joi_1.default.string(),
        answer: joi_1.default.string(),
        parent: joi_1.default.string(),
        is_active: joi_1.default.boolean(),
    }),
};
const deleteFaqByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
exports.default = {
    addFaqSchema,
    getFaqByParentSchema,
    getFaqByIdSchema,
    updateFaqByIdSchema,
    deleteFaqByIdSchema,
};
