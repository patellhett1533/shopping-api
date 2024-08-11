import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const addCustomerSchema: ValidationSchema = {
  query: Joi.object({
    page: Joi.number().default(1),
  }),
};

const getCustomerByEmailSchema: ValidationSchema = {
  params: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export default { addCustomerSchema, getCustomerByEmailSchema };
