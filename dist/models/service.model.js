"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paginate_plugins_1 = __importDefault(require("./plugins/paginate.plugins"));
const toJSON_plugins_1 = __importDefault(require("./plugins/toJSON.plugins"));
const serviceSchema = new mongoose_1.default.Schema({
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
    thumbnail: {
        type: {
            url: String,
            width: Number,
            height: Number,
        },
        required: true,
    },
    video: {
        type: {
            url: String,
            width: Number,
            height: Number,
            duration: Number,
        },
        required: true,
    },
    whatText: {
        type: String,
    },
    benefits: {
        type: [{ title: String, text: String }],
    },
    features: {
        type: [String],
    },
    whyText: {
        type: [{ title: String, text: String }],
    },
    process: {
        type: [
            {
                title: String,
                image: { url: String, width: Number, height: Number },
            },
        ],
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
serviceSchema.plugin(toJSON_plugins_1.default);
serviceSchema.plugin(paginate_plugins_1.default);
const Service = mongoose_1.default.model("Service", serviceSchema);
exports.default = Service;
