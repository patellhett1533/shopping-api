"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const tokens_1 = __importDefault(require("./tokens"));
const user_model_1 = __importDefault(require("../models/user.model"));
const env_1 = __importDefault(require("./env"));
const jwtOptions = {
    secretOrKey: env_1.default.jwt.secret,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== tokens_1.default.ACCESS) {
            throw new Error("Invalid token type");
        }
        const user = await user_model_1.default.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
};
const jwtStrategy = new passport_jwt_1.Strategy(jwtOptions, jwtVerify);
exports.default = jwtStrategy;
