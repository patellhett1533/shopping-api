import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import orderService from "../services/order.service";
import httpStatus from "http-status";
import { pick } from "../utils/pick";

const addOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.addOrder(req.body);
  res.status(httpStatus.CREATED).send(order);
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "email", "order_id", "date"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "search"]);
  const result = await orderService.queryOrder(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(req.params.id);
  res.status(httpStatus.OK).send(order);
});

const deleteOrderById = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.deleteOrderById(req.params.id);
  res.status(httpStatus.OK).send(order);
});

export default {
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
};
