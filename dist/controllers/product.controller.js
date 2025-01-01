"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const product_service_1 = __importDefault(require("../services/product.service"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = require("../utils/pick");
const addProduct = (0, catchAsync_1.default)(async (req, res) => {
    const product = await product_service_1.default.addProduct(req.body);
    res.status(http_status_1.default.CREATED).send(product);
});
const getAllProducts = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const result = await product_service_1.default.queryProducts(filter, options);
    res.status(http_status_1.default.OK).send(result);
});
const getAllActiveProducts = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name", "is_active"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const result = await product_service_1.default.getAllProducts(filter, options);
    res.status(http_status_1.default.OK).send(result);
});
const getProductById = (0, catchAsync_1.default)(async (req, res) => {
    const product = await product_service_1.default.getProductById(req.params.id);
    res.status(http_status_1.default.OK).send(product);
});
const getProductsByIds = (0, catchAsync_1.default)(async (req, res) => {
    const products = await product_service_1.default.getProductsByIds(req.body.ids);
    res.status(http_status_1.default.OK).send(products);
});
exports.default = {
    addProduct,
    getAllProducts,
    getAllActiveProducts,
    getProductById,
    getProductsByIds,
};
