"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
const addProduct = async (product) => {
    const newProduct = new product_model_1.default(product);
    return await newProduct.save();
};
const queryProducts = async (filter, options) => {
    const admins = await product_model_1.default.paginate(filter, options);
    return admins;
};
const getAllProducts = async (filter, options) => {
    filter.is_active = "true";
    const products = await product_model_1.default.paginate(filter, options);
    products.results = products.results.map((product) => product.id);
    return products;
};
const getProductById = async (id) => {
    return await product_model_1.default.findById(id);
};
const getProductByAlias = async (alias) => {
    return await product_model_1.default.findOne({ alias });
};
const updateProduct = async (id, product) => {
    return await product_model_1.default.findByIdAndUpdate(id, product, { new: true });
};
const deleteProduct = async (id) => {
    return await product_model_1.default.findByIdAndDelete(id);
};
exports.default = {
    addProduct,
    queryProducts,
    getAllProducts,
    getProductById,
    getProductByAlias,
    updateProduct,
    deleteProduct,
};
