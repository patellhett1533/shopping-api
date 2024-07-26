"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_plugins_1 = __importDefault(require("./plugins/toJSON.plugins"));
const faqSchema = new mongoose_1.default.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
faqSchema.plugin(toJSON_plugins_1.default);
const Faq = mongoose_1.default.model("Faq", faqSchema);
exports.default = Faq;
