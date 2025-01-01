import { Request, Response } from "express";
import logger from "../config/logger";
import httpStatus from "http-status";
import productService from "../services/product.service";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/pick";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.addProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "search"]);
  const result = await productService.queryProducts(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getAllActiveProducts = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "is_active"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "search"]);
  const result = await productService.getAllProducts(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id);
  res.status(httpStatus.OK).send(product);
});

const getProductsByIds = catchAsync(async (req: Request, res: Response) => {
  const products = await productService.getProductsByIds(req.body.ids);
  res.status(httpStatus.OK).send(products);
});

export default {
  addProduct,
  getAllProducts,
  getAllActiveProducts,
  getProductById,
  getProductsByIds,
};
