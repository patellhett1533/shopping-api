"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addContentSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        alias: joi_1.default.string().required(),
        content: joi_1.default.array().items(joi_1.default.object({
            section_name: joi_1.default.string().required(),
            section_type: joi_1.default.string().required(),
            section: joi_1.default.any().required(),
            order: joi_1.default.number().required(),
            is_active: joi_1.default.boolean().required(),
        })),
        meta_title: joi_1.default.string().required(),
        meta_description: joi_1.default.string().required(),
        meta_keywords: joi_1.default.string().required(),
        meta_image: joi_1.default.object({
            url: joi_1.default.string().required(),
            width: joi_1.default.number().required(),
            height: joi_1.default.number().required(),
        }).required(),
        is_active: joi_1.default.boolean().required(),
    }),
};
const addSectionOfContentSchema = {
    body: joi_1.default.object({
        section_name: joi_1.default.string().required(),
        section_type: joi_1.default.string().required(),
        section: joi_1.default.any().required(),
        order: joi_1.default.number().required(),
        is_active: joi_1.default.boolean().required(),
    }),
};
const getPageByIdSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const getPageByAliasSchema = {
    params: joi_1.default.object({
        alias: joi_1.default.string().required(),
    }),
};
const updateSectionOfContentByIdSchema = {
    params: joi_1.default.object({
        pageId: joi_1.default.string().required(),
        sectionId: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        section_name: joi_1.default.string().required(),
        section_type: joi_1.default.string(),
        section: joi_1.default.any(),
        order: joi_1.default.number(),
        is_active: joi_1.default.boolean(),
    }),
};
const updatePageSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object({
        name: joi_1.default.string(),
        alias: joi_1.default.string(),
        content: joi_1.default.array().items(joi_1.default.object({
            section_name: joi_1.default.string().required(),
            section_type: joi_1.default.string(),
            section: joi_1.default.any(),
            order: joi_1.default.number(),
            is_active: joi_1.default.boolean(),
        })),
        meta_title: joi_1.default.string(),
        meta_description: joi_1.default.string(),
        meta_keywords: joi_1.default.string(),
        meta_image: joi_1.default.object({
            url: joi_1.default.string(),
            width: joi_1.default.number(),
            height: joi_1.default.number(),
        }),
        is_active: joi_1.default.boolean(),
    }),
};
const deletePageSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
};
const deleteSectionOfContentSchema = {
    params: joi_1.default.object({
        pageId: joi_1.default.string().required(),
        sectionId: joi_1.default.string().required(),
    }),
};
exports.default = {
    addContentSchema,
    addSectionOfContentSchema,
    getPageByIdSchema,
    getPageByAliasSchema,
    updateSectionOfContentByIdSchema,
    updatePageSchema,
    deletePageSchema,
    deleteSectionOfContentSchema,
};
