import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const generateAlias: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

export default { generateAlias };
