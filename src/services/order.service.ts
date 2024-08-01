import logger from "../config/logger";
import { OrderTypes } from "../interface/common.interface";
import Order from "../models/order.model";
import QueryString from "qs";

const addOrder = async (data: OrderTypes) => {
  const order = await Order.create(data);
  return order;
};

const queryOrder = async (
  filter: Pick<QueryString.ParsedQs, "name" | "email" | "order_id" | "date">,
  options: Pick<QueryString.ParsedQs, "sortBy" | "limit" | "page" | "search">
) => {
  const order = await Order.paginate(filter, options);
  return order;
};

const getOrderById = async (id: string) => {
  const order = await Order.findById(id);
  return order;
};

const deleteOrderById = async (id: string) => {
  const order = await Order.findByIdAndDelete(id);
  return order;
};

export default {
  addOrder,
  queryOrder,
  getOrderById,
  deleteOrderById,
};
