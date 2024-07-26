import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const addServiceSchema: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    alias: Joi.string().required(),
    thumbnail: Joi.object({
      url: Joi.string().required(),
      width: Joi.number(),
      height: Joi.number(),
    }),
    video: Joi.object({
      url: Joi.string().required(),
      width: Joi.number().required(),
      height: Joi.number().required(),
      duration: Joi.number().required(),
    }),
    whatText: Joi.string(),
    benefits: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
      })
    ),
    features: Joi.array().items(Joi.string()),
    whyText: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
      })
    ),
    process: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        image: Joi.object({
          url: Joi.string().required(),
          width: Joi.number(),
          height: Joi.number(),
        }),
      })
    ),
    is_active: Joi.boolean(),
  }),
};

const getAllServicesSchema: ValidationSchema = {
  query: Joi.object({
    search: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getServiceByIdSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const getServiceByAliasSchema: ValidationSchema = {
  params: Joi.object({
    alias: Joi.string().required(),
  }),
};

const updateServiceSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    alias: Joi.string(),
    thumbnail: Joi.object({
      url: Joi.string(),
      width: Joi.number(),
      height: Joi.number(),
    }),
    video: Joi.object({
      url: Joi.string(),
      width: Joi.number(),
      height: Joi.number(),
      duration: Joi.number(),
    }),
    whatText: Joi.string(),
    benefits: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
      })
    ),
    features: Joi.array().items(Joi.string()),
    whyText: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
      })
    ),
    process: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        image: Joi.object({
          url: Joi.string().required(),
          width: Joi.number(),
          height: Joi.number(),
        }),
      })
    ),
    is_active: Joi.boolean(),
  }),
};

const deleteServiceSchema: ValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export default {
  addServiceSchema,
  getAllServicesSchema,
  getServiceByAliasSchema,
  updateServiceSchema,
  getServiceByIdSchema,
  deleteServiceSchema,
};
