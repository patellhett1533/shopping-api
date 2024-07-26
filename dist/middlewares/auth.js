"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const http_status_1 = __importDefault(require("http-status"));
const createApiError_1 = require("../utils/createApiError");
const verifyCallback = (req, resolve, reject) => (err, user, info) => {
    if (err || info || !user) {
        console.log(err, info, user);
        return reject((0, createApiError_1.createApiError)(http_status_1.default.UNAUTHORIZED, "Please authenticate"));
    }
    req.user = user;
    resolve();
};
const auth = () => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport_1.default.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};
exports.default = auth;
