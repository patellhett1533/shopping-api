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
        alias: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        mrp: joi_1.default.number(),
        edition: joi_1.default.array().items(joi_1.default.string()),
        support_period: joi_1.default.array().items(joi_1.default.string()),
        option: joi_1.default.array().items(joi_1.default.string()),
        review_count: joi_1.default.number(),
        rating_stars: joi_1.default.number(),
        images: joi_1.default.array().items(joi_1.default.object({
            url: joi_1.default.string(),
            width: joi_1.default.number(),
            height: joi_1.default.number(),
        })),
        thumbnail_image: joi_1.default.object({
            url: joi_1.default.string(),
            width: joi_1.default.number(),
            height: joi_1.default.number(),
        }),
        problem: joi_1.default.string(),
        solution: joi_1.default.string(),
        features: joi_1.default.array().items(joi_1.default.string()),
        is_active: joi_1.default.boolean(),
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
const getProductByAliasSchema = {
    params: joi_1.default.object({
        alias: joi_1.default.string().required(),
    }),
};
const getProductsByIdsSchema = {
    body: joi_1.default.object({
        ids: joi_1.default.array().items(joi_1.default.string()),
    }),
};
const updateProductSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        name: joi_1.default.string(),
        description: joi_1.default.string(),
        alias: joi_1.default.string(),
        price: joi_1.default.number(),
        mrp: joi_1.default.number(),
        edition: joi_1.default.array().items(joi_1.default.string()),
        support_period: joi_1.default.array().items(joi_1.default.string()),
        option: joi_1.default.array().items(joi_1.default.string()),
        review_count: joi_1.default.number(),
        rating_stars: joi_1.default.number(),
        images: joi_1.default.array().items(joi_1.default.object({
            url: joi_1.default.string(),
            width: joi_1.default.number(),
            height: joi_1.default.number(),
        })),
        thumbnail_image: joi_1.default.object({
            url: joi_1.default.string(),
            width: joi_1.default.number(),
            height: joi_1.default.number(),
        }),
        problem: joi_1.default.string(),
        solution: joi_1.default.string(),
        features: joi_1.default.array().items(joi_1.default.string()),
        is_active: joi_1.default.boolean(),
    }),
};
const deleteProductSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
exports.default = {
    addProductSchema,
    getAllProductsSchema,
    getProductSchema,
    getProductByAliasSchema,
    getProductsByIdsSchema,
    updateProductSchema,
    deleteProductSchema,
};
