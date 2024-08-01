"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../models/order.model"));
const addOrder = async (data) => {
    const order = await order_model_1.default.create(data);
    return order;
};
const queryOrder = async (filter, options) => {
    const order = await order_model_1.default.paginate(filter, options);
    return order;
};
const getOrderById = async (id) => {
    const order = await order_model_1.default.findById(id);
    return order;
};
const deleteOrderById = async (id) => {
    const order = await order_model_1.default.findByIdAndDelete(id);
    return order;
};
exports.default = {
    addOrder,
    queryOrder,
    getOrderById,
    deleteOrderById,
};
