"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paginate_plugins_1 = __importDefault(require("./plugins/paginate.plugins"));
const toJSON_plugins_1 = __importDefault(require("./plugins/toJSON.plugins"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
    },
    edition: {
        type: [String],
    },
    support_period: {
        type: [String],
    },
    option: {
        type: [String],
    },
    review_count: {
        type: Number,
        default: 0,
    },
    rating_stars: {
        type: Number,
        default: 0,
    },
    features: {
        type: [String],
    },
    problem: {
        type: String,
    },
    solution: {
        type: String,
    },
    thumbnail_image: {
        type: { url: String, width: Number, height: Number },
        required: true,
    },
    images: {
        type: [{ url: String, width: Number, height: Number }],
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
productSchema.plugin(toJSON_plugins_1.default);
productSchema.plugin(paginate_plugins_1.default);
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
