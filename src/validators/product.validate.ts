import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const addProductSchema: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    alias: Joi.string().required(),
    price: Joi.number().required(),
    mrp: Joi.number(),
    edition: Joi.array().items(Joi.string()),
    support_period: Joi.array().items(Joi.string()),
    option: Joi.array().items(Joi.string()),
    review_count: Joi.number(),
    rating_stars: Joi.number(),
    images: Joi.array().items(
      Joi.object({
        url: Joi.string(),
        width: Joi.number(),
        height: Joi.number(),
      })
    ),
    thumbnail_image: Joi.object({
      url: Joi.string(),
      width: Joi.number(),
      height: Joi.number(),
    }),
    problem: Joi.string(),
    solution: Joi.string(),
    features: Joi.array().items(Joi.string()),
    is_active: Joi.boolean(),
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

const getProductByAliasSchema: ValidationSchema = {
  params: Joi.object({
    alias: Joi.string().required(),
  }),
};

const getProductsByIdsSchema: ValidationSchema = {
  body: Joi.object({
    ids: Joi.array().items(Joi.string()),
  }),
};

const updateProductSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    alias: Joi.string(),
    price: Joi.number(),
    mrp: Joi.number(),
    edition: Joi.array().items(Joi.string()),
    support_period: Joi.array().items(Joi.string()),
    option: Joi.array().items(Joi.string()),
    review_count: Joi.number(),
    rating_stars: Joi.number(),
    images: Joi.array().items(
      Joi.object({
        url: Joi.string(),
        width: Joi.number(),
        height: Joi.number(),
      })
    ),
    thumbnail_image: Joi.object({
      url: Joi.string(),
      width: Joi.number(),
      height: Joi.number(),
    }),
    problem: Joi.string(),
    solution: Joi.string(),
    features: Joi.array().items(Joi.string()),
    is_active: Joi.boolean(),
  }),
};

const deleteProductSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export default {
  addProductSchema,
  getAllProductsSchema,
  getProductSchema,
  getProductByAliasSchema,
  getProductsByIdsSchema,
  updateProductSchema,
  deleteProductSchema,
};
