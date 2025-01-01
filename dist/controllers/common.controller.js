"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const addSingleFile = (0, catchAsync_1.default)(async (req, res) => {
    try {
        const file = req.file;
        res.status(http_status_1.default.OK).send({ image: file?.filename });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(error);
    }
});
exports.default = { addSingleFile };
