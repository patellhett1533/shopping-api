"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addServiceSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        alias: joi_1.default.string().required(),
        thumbnail: joi_1.default.object({
            url: joi_1.default.string().required(),
            width: joi_1.default.number(),
            height: joi_1.default.number(),
        }),
        video: joi_1.default.object({
            url: joi_1.default.string().required(),
            width: joi_1.default.number().required(),
            height: joi_1.default.number().required(),
            duration: joi_1.default.number().required(),
        }),
        whatText: joi_1.default.string(),
        benefits: joi_1.default.array().items(joi_1.default.object({
            title: joi_1.default.string().required(),
            text: joi_1.default.string().required(),
        })),
        features: joi_1.default.array().items(joi_1.default.string()),
        whyText: joi_1.default.array().items(joi_1.default.object({
            title: joi_1.default.string().required(),
            text: joi_1.default.string().required(),
        })),
        process: joi_1.default.array().items(joi_1.default.object({
            title: joi_1.default.string().required(),
            image: joi_1.default.object({
                url: joi_1.default.string().required(),
                width: joi_1.default.number(),
                height: joi_1.default.number(),
            }),
        })),
        is_active: joi_1.default.boolean(),
    }),
};
const getAllServicesSchema = {
    query: joi_1.default.object({
        search: joi_1.default.string(),
        limit: joi_1.default.number(),
        page: joi_1.default.number(),
    }),
};
const getServiceByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const getServiceByAliasSchema = {
    params: joi_1.default.object({
        alias: joi_1.default.string().required(),
    }),
};
const updateServiceSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        name: joi_1.default.string(),
        description: joi_1.default.string(),
        alias: joi_1.default.string(),
        thumbnail: joi_1.default.object({
            url: joi_1.default.string(),
            width: joi_1.default.number(),
            height: joi_1.default.number(),
        }),
        video: joi_1.default.object({
            url: joi_1.default.string(),
            width: joi_1.default.number(),
            height: joi_1.default.number(),
            duration: joi_1.default.number(),
        }),
        whatText: joi_1.default.string(),
        benefits: joi_1.default.array().items(joi_1.default.object({
            title: joi_1.default.string().required(),
            text: joi_1.default.string().required(),
        })),
        features: joi_1.default.array().items(joi_1.default.string()),
        whyText: joi_1.default.array().items(joi_1.default.object({
            title: joi_1.default.string().required(),
            text: joi_1.default.string().required(),
        })),
        process: joi_1.default.array().items(joi_1.default.object({
            title: joi_1.default.string().required(),
            image: joi_1.default.object({
                url: joi_1.default.string().required(),
                width: joi_1.default.number(),
                height: joi_1.default.number(),
            }),
        })),
        is_active: joi_1.default.boolean(),
    }),
};
const deleteServiceSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
exports.default = {
    addServiceSchema,
    getAllServicesSchema,
    getServiceByAliasSchema,
    updateServiceSchema,
    getServiceByIdSchema,
    deleteServiceSchema,
};
