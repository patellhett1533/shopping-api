"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = __importDefault(require("../config/menu"));
const product_model_1 = __importDefault(require("../models/product.model"));
const service_model_1 = __importDefault(require("../models/service.model"));
const generateAlias = async (name) => {
    const alias = name.split(" ").join("-").toLowerCase();
    return alias;
};
const getMenuList = async () => {
    return menu_1.default;
};
//create a function for search functionlity which is search product, service by keyword which is given
const getSearchResult = async (keyword) => {
    const products = await product_model_1.default.find({
        name: { $regex: keyword, $options: "i" },
    }).select("name alias thumbnail_image");
    const services = await service_model_1.default.find({
        name: { $regex: keyword, $options: "i" },
    }).select("name alias thumbnail");
    // const blogs = await Blog.find({
    //   name: { $regex: keyword, $options: "i" },
    // }).select("name alias thumbnail");
    return { products, services };
};
exports.default = { generateAlias, getMenuList, getSearchResult };
