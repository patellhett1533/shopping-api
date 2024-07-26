"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./config/logger"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./config/passport"));
require("dotenv").config();
// mongodb connection
(0, db_1.default)();
const app = (0, express_1.default)();
// set security HTTP headers
app.use((0, helmet_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// sanitize request data
app.use((0, express_mongo_sanitize_1.default)());
// gzip compression
app.use((0, compression_1.default)());
// jwt authentication
app.use(passport_1.default.initialize());
passport_1.default.use("jwt", passport_2.default);
// enable cors
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
//cross origin resource sharing
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
});
//to access local files of images
app.use("/images", express_1.default.static("/app/uploads"));
const PORT = process.env.NODE_DOCKER_PORT || 5000;
app.use("/v1", routes_1.default);
app.listen(PORT, () => {
    logger_1.default.info(`[server]: Server is running at http://localhost:${PORT}`);
});
