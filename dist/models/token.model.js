"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tokens_1 = __importDefault(require("../config/tokens"));
const tokenSchema = new mongoose_1.default.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: [
            tokens_1.default.REFRESH,
        ],
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Token = mongoose_1.default.model("Token", tokenSchema);
exports.default = Token;
