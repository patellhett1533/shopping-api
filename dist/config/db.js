"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logger_1 = __importDefault(require("./logger"));
const env_1 = __importDefault(require("./env"));
const MONGO_URI = env_1.default.mongodb.url;
const connectDB = async () => {
    (0, mongoose_1.set)("strictQuery", false);
    await (0, mongoose_1.connect)(MONGO_URI)
        .then(() => {
        logger_1.default.info("MongoDB Connected...");
    })
        .catch((error) => {
        logger_1.default.error(error.message);
        process.exit(1);
    });
};
exports.default = connectDB;
