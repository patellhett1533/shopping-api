"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = __importDefault(require("./../services/user.service"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../utils/pick");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createApiError_1 = require("../utils/createApiError");
const token_service_1 = __importDefault(require("../services/token.service"));
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.default.createUser(req.body);
    const token = await token_service_1.default.generateAuthTokens(user.id);
    res.status(http_status_1.default.CREATED).send({ user, token });
});
const getUser = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const result = await user_service_1.default.queryUsers(filter, options);
    res.status(http_status_1.default.OK).send(result);
});
const getUserById = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.default.getUserById(req.params.userId);
    if (!user) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "User not found");
    }
    res.status(http_status_1.default.OK).send(user);
});
const updateUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.default.updateUser(req.params.userId, req.body);
    res.status(http_status_1.default.OK).send(user);
});
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.default.deleteUser(req.params.userId);
    res.status(http_status_1.default.OK).send(user);
});
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.default.loginUser(req.body);
    const token = await token_service_1.default.generateAuthTokens(user.id);
    res.status(http_status_1.default.OK).send({ user, token });
});
const logoutUser = (0, catchAsync_1.default)(async (req, res) => {
    await user_service_1.default.logoutUser(req.body.refreshToken);
    res.status(http_status_1.default.NO_CONTENT).send();
});
const refreshUserToken = (0, catchAsync_1.default)(async (req, res) => {
    const tokens = await user_service_1.default.refreshAuthUser(req.body.refreshToken);
    res.status(http_status_1.default.OK).send({ ...tokens });
});
const resetUserPassword = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.default.resetUserPassword(req.query.token, req.body.password);
    res.status(http_status_1.default.OK).send(user);
});
const verifyUserEmail = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.default.verifyUserEmail(req.body.verificationToken);
    res.status(http_status_1.default.OK).send(user);
});
exports.userController = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    refreshUserToken,
    resetUserPassword,
    verifyUserEmail,
};
