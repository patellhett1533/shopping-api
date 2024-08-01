import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const addOrderSchema: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    amount: Joi.number().required(),
    products_id: Joi.array().items(Joi.string()).required(),
    payment_id: Joi.string().required(),
    payment_status: Joi.boolean().required(),
    status: Joi.boolean().required(),
  }),
};

const getAllOrdersSchema: ValidationSchema = {
  query: Joi.object({
    search: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getOrderByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const deleteOrderByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export default {
  addOrderSchema,
  getAllOrdersSchema,
  getOrderByIdSchema,
  deleteOrderByIdSchema,
};
