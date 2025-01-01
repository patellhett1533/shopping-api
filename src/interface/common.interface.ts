import Joi from "joi";

export interface ProductTypes {
  name: string;
  description: string;
  price: number;
  image: string;
}



export interface ProductWithId extends ProductTypes {
  id: number | string;
}

export interface UserTypes {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserUpdateTypes {
  name?: string;
  email?: string;
  password?: string;
}

export interface ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
}

export interface ValidationSchema {
  params?: Joi.Schema;
  query?: Joi.Schema;
  body?: Joi.Schema;
  file?: Joi.Schema;
}