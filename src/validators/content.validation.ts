import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const addContentSchema: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    alias: Joi.string().required(),
    content: Joi.array().items(
      Joi.object({
        section_name: Joi.string().required(),
        section_type: Joi.string().required(),
        section: Joi.any().required(),
        order: Joi.number().required(),
        is_active: Joi.boolean().required(),
      })
    ),
    meta_title: Joi.string().required(),
    meta_description: Joi.string().required(),
    meta_keywords: Joi.string().required(),
    meta_image: Joi.object({
      url: Joi.string().required(),
      width: Joi.number().required(),
      height: Joi.number().required(),
    }).required(),
    is_active: Joi.boolean().required(),
  }),
};

const addSectionOfContentSchema: ValidationSchema = {
  body: Joi.object({
    section_name: Joi.string().required(),
    section_type: Joi.string().required(),
    section: Joi.any().required(),
    order: Joi.number().required(),
    is_active: Joi.boolean().required(),
  }),
};

const getPageByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const getPageByAliasSchema: ValidationSchema = {
  params: Joi.object({
    alias: Joi.string().required(),
  }),
};

const updateSectionOfContentByIdSchema: ValidationSchema = {
  params: Joi.object({
    pageId: Joi.string().required(),
    sectionId: Joi.string().required(),
  }),
  body: Joi.object({
    section_name: Joi.string().required(),
    section_type: Joi.string(),
    section: Joi.any(),
    order: Joi.number(),
    is_active: Joi.boolean(),
  }),
};

const updatePageSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    alias: Joi.string(),
    content: Joi.array().items(
      Joi.object({
        section_name: Joi.string().required(),
        section_type: Joi.string(),
        section: Joi.any(),
        order: Joi.number(),
        is_active: Joi.boolean(),
      })
    ),
    meta_title: Joi.string(),
    meta_description: Joi.string(),
    meta_keywords: Joi.string(),
    meta_image: Joi.object({
      url: Joi.string(),
      width: Joi.number(),
      height: Joi.number(),
    }),
    is_active: Joi.boolean(),
  }),
};

const deletePageSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const deleteSectionOfContentSchema: ValidationSchema = {
  params: Joi.object({
    pageId: Joi.string().required(),
    sectionId: Joi.string().required(),
  }),
};

export default {
  addContentSchema,
  addSectionOfContentSchema,
  getPageByIdSchema,
  getPageByAliasSchema,
  updateSectionOfContentByIdSchema,
  updatePageSchema,
  deletePageSchema,
  deleteSectionOfContentSchema,
};
