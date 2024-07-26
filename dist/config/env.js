"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string()
        .valid("production", "development", "test")
        .required(),
    PROJECT_ID: joi_1.default.string().required(),
    MONGODB_USER: joi_1.default.string().required(),
    MONGODB_HOST: joi_1.default.string().allow(""),
    MONGODB_PASSWORD: joi_1.default.string().allow(""),
    MONGODB_DATABASE: joi_1.default.string().required(),
    MONGODB_LOCAL_PORT: joi_1.default.number().required(),
    MONGODB_DOCKER_PORT: joi_1.default.number().required(),
    NODE_LOCAL_PORT: joi_1.default.number().required(),
    NODE_DOCKER_PORT: joi_1.default.number().required(),
    JWT_SECRET: joi_1.default.string().required(),
    JWT_ACCESS_EXPIRATION_DAYS: joi_1.default.number().required(),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number().required(),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: joi_1.default.number().required(),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: joi_1.default.number().required(),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.default = {
    env: envVars.NODE_ENV,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    mongodb: {
        url: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`,
    },
};
