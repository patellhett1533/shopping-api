"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const customer_service_1 = __importDefault(require("../services/customer.service"));
const pick_1 = require("../utils/pick");
const getAllCustomers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await customer_service_1.default.getAllCustomer(Number(req.query.page) || 1);
    res.status(http_status_1.default.OK).send(result);
});
const getCustomerByEmail = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name", "email", "order_id", "date"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const customer = await customer_service_1.default.getCustomerByEmail(req.params.email, filter, options);
    res.status(http_status_1.default.OK).send(customer);
});
exports.default = { getAllCustomers, getCustomerByEmail };
