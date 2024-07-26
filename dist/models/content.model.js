"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paginate_plugins_1 = __importDefault(require("./plugins/paginate.plugins"));
const toJSON_plugins_1 = __importDefault(require("./plugins/toJSON.plugins"));
const contentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    content: [
        {
            section_name: String,
            section_type: String,
            section: mongoose_1.default.Schema.Types.Mixed,
            order: Number,
            is_active: Boolean,
        },
    ],
    meta_title: {
        type: String,
        required: true,
    },
    meta_description: {
        type: String,
        required: true,
    },
    meta_keywords: {
        type: String,
        required: true,
    },
    meta_image: {
        type: { url: String, width: Number, height: Number },
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
contentSchema.plugin(toJSON_plugins_1.default);
contentSchema.plugin(paginate_plugins_1.default);
const Content = mongoose_1.default.model("Content", contentSchema);
exports.default = Content;
