"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const order_service_1 = __importDefault(require("../services/order.service"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../utils/pick");
const addOrder = (0, catchAsync_1.default)(async (req, res) => {
    const order = await order_service_1.default.addOrder(req.body);
    res.status(http_status_1.default.CREATED).send(order);
});
const getAllOrders = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name", "email", "order_id", "date"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const result = await order_service_1.default.queryOrder(filter, options);
    res.status(http_status_1.default.OK).send(result);
});
const getOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const order = await order_service_1.default.getOrderById(req.params.id);
    res.status(http_status_1.default.OK).send(order);
});
const deleteOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const order = await order_service_1.default.deleteOrderById(req.params.id);
    res.status(http_status_1.default.OK).send(order);
});
exports.default = {
    addOrder,
    getAllOrders,
    getOrderById,
    deleteOrderById,
};
