import Joi from "joi";
import { ValidationSchema } from "../interface/common.interface";

const registerAdmin: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const loginAdminByPassword: ValidationSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const logoutAdmin: ValidationSchema = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const refreshAdminToken: ValidationSchema = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const forgotAdminPassword: ValidationSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

const resetAdminPassword: ValidationSchema = {
  params: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object({
    password: Joi.string().required(),
  }),
};

const verifyAdminEmail: ValidationSchema = {
  body: Joi.object({
    token: Joi.string().required(),
  }),
};

const getAdminById: ValidationSchema = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
};

const updateAdmin: ValidationSchema = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};

const deleteAdmin: ValidationSchema = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
};

export default {
  registerAdmin,
  loginAdminByPassword,
  logoutAdmin,
  refreshAdminToken,
  forgotAdminPassword,
  resetAdminPassword,
  verifyAdminEmail,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
