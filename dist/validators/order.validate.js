"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addOrderSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        phone: joi_1.default.string().required(),
        amount: joi_1.default.number().required(),
        products_id: joi_1.default.array().items(joi_1.default.string()).required(),
        payment_id: joi_1.default.string().required(),
        payment_status: joi_1.default.boolean().required(),
        status: joi_1.default.boolean().required(),
    }),
};
const getAllOrdersSchema = {
    query: joi_1.default.object({
        search: joi_1.default.string(),
        limit: joi_1.default.number(),
        page: joi_1.default.number(),
    }),
};
const getOrderByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const deleteOrderByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
exports.default = {
    addOrderSchema,
    getAllOrdersSchema,
    getOrderByIdSchema,
    deleteOrderByIdSchema,
};
