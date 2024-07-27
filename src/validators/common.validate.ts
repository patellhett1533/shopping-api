import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const generateAlias: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

const getSearchResult: ValidationSchema = {
  body: Joi.object({
    keyword: Joi.string().required(),
  }),
};

export default { generateAlias, getSearchResult };
