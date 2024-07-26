import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const addFaqSchema: ValidationSchema = {
  body: Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    parent: Joi.string().required(),
    is_active: Joi.boolean(),
  }),
};

const getFaqByParentSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const getFaqByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const updateFaqByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    question: Joi.string(),
    answer: Joi.string(),
    parent: Joi.string(),
    is_active: Joi.boolean(),
  }),
};

const deleteFaqByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export default {
  addFaqSchema,
  getFaqByParentSchema,
  getFaqByIdSchema,
  updateFaqByIdSchema,
  deleteFaqByIdSchema,
};
