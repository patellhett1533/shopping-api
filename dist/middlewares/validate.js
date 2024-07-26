"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../utils/pick");
const createApiError_1 = require("../utils/createApiError");
const logger_1 = __importDefault(require("../config/logger"));
const validate = (schema) => (req, res, next) => {
    const validSchema = (0, pick_1.pick)(schema, ["params", "query", "body", "file"]);
    const object = (0, pick_1.pick)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ");
        logger_1.default.error(errorMessage);
        return next((0, createApiError_1.createApiError)(http_status_1.default.BAD_REQUEST, errorMessage));
    }
    const { value: validatedValue } = value;
    Object.assign(req, validatedValue);
    next();
};
exports.default = validate;
