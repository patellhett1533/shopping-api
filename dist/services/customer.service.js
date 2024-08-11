"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../models/order.model"));
const getAllCustomer = async (page) => {
    const pipeline = [
        {
            $group: {
                _id: "$email",
                name: { $first: "$name" },
                phone: { $first: "$phone" },
                amount: { $sum: "$amount" },
            },
        },
        {
            $project: {
                _id: 0,
                email: "$_id",
                name: 1,
                phone: 1,
                amount: 1,
            },
        },
        {
            $skip: (page - 1) * 10,
        },
        {
            $limit: 10,
        },
    ];
    const results = await order_model_1.default.aggregate(pipeline);
    const totalCount = await order_model_1.default.countDocuments();
    const totalPages = Math.ceil(totalCount / 10);
    return {
        results,
        page,
        limit: 10,
        totalPages,
        totalResults: totalCount,
    };
};
const getCustomerByEmail = async (email, filter, options) => {
    const customer = await order_model_1.default.paginate({ email }, { limit: 10, page: 1 });
    return customer;
};
exports.default = { getAllCustomer, getCustomerByEmail };
