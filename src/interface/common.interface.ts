import Joi from "joi";

export interface ImageDB {
  url: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
}

export interface VideoDB {
  url: string;
  width: number;
  height: number;
  duration: number;
}

export interface ContentTypes {
  name: string;
  alias: string;
  content: Section[];
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  is_active: boolean;
}

export interface Section {
  section_name: string;
  section_type: string;
  section: any;
  order: number;
  is_active: boolean;
}

export interface ProductTypes {
  name: string;
  description: string;
  alias: string;
  price: number;
  mrp: number;
  edition: string;
  support_period: string;
  option: string;
  review_count: number;
  rating_stars: number;
  image: string[];
  thumbnail_image: string;
  problem: string;
  solution: string;
  features: string[];
  is_active: boolean;
}

export interface ServiceTypes {
  name: string;
  description: string;
  alias: string;
  thumbnail: ImageDB;
  video: VideoDB;
  whatText: string;
  benefits: {
    title: string;
    text: string;
  }[];
  features: string[];
  whyText: {
    title: string;
    text: string;
  }[];
  process: {
    image: ImageDB;
    title: string;
  }[];
  is_active: boolean;
}

export interface ProductWithId extends ProductTypes {
  id: number | string;
}

export interface AdminTypes {
  id?: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface AdminUpdateTypes {
  name?: string;
  email?: string;
  password?: string;
  isVerified?: boolean;
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

export interface Faqs {
  question: string;
  answer: string;
  alias: string;
  is_active: boolean;
}

export interface Reviews {
  message: string;
  user_id: string;
  parent: string;
  is_active: boolean;
}
