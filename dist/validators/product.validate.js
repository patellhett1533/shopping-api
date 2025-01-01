"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addProductSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        image: joi_1.default.string(),
    }),
};
const getAllProductsSchema = {
    query: joi_1.default.object({
        search: joi_1.default.string(),
        limit: joi_1.default.number(),
        page: joi_1.default.number(),
    }),
};
const getProductSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const getProductsByIdsSchema = {
    body: joi_1.default.object({
        ids: joi_1.default.array().items(joi_1.default.string()),
    }),
};
exports.default = {
    addProductSchema,
    getAllProductsSchema,
    getProductSchema,
    getProductsByIdsSchema,
};
