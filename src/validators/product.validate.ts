import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const addProductSchema: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string(),
  }),
};

const getAllProductsSchema: ValidationSchema = {
  query: Joi.object({
    search: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getProductSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const getProductsByIdsSchema: ValidationSchema = {
  body: Joi.object({
    ids: Joi.array().items(Joi.string()),
  }),
};

export default {
  addProductSchema,
  getAllProductsSchema,
  getProductSchema,
  getProductsByIdsSchema,
};
