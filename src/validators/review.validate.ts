import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const addReviewSchema: ValidationSchema = {
  body: Joi.object({
    parent: Joi.string().required(),
    message: Joi.string().required(),
    user_name: Joi.string().required(),
    user_role: Joi.string().required(),
    is_active: Joi.boolean(),
  }),
};

const getReviewByParentSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const getReviewByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const updateReviewByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    message: Joi.string(),
    user_name: Joi.string(),
    user_role: Joi.string(),
    parent: Joi.string(),
    is_active: Joi.boolean(),
  }),
};

const deleteReviewByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export default {
  addReviewSchema,
  getReviewByParentSchema,
  getReviewByIdSchema,
  updateReviewByIdSchema,
  deleteReviewByIdSchema,
};
