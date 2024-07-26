"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_service_1 = __importDefault(require("./../services/admin.service"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../utils/pick");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createApiError_1 = require("../utils/createApiError");
const token_service_1 = __importDefault(require("../services/token.service"));
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const user = await admin_service_1.default.createAdmin(req.body);
    const token = await token_service_1.default.generateAuthTokens(user.id);
    res.status(http_status_1.default.CREATED).send({ user, token });
});
const getAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const result = await admin_service_1.default.queryAdmins(filter, options);
    res.status(http_status_1.default.OK).send(result);
});
const getAdminById = (0, catchAsync_1.default)(async (req, res) => {
    const user = await admin_service_1.default.getAdminById(req.params.userId);
    if (!user) {
        throw (0, createApiError_1.createApiError)(http_status_1.default.NOT_FOUND, "Admin not found");
    }
    res.status(http_status_1.default.OK).send(user);
});
const updateAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const user = await admin_service_1.default.updateAdmin(req.params.userId, req.body);
    res.status(http_status_1.default.OK).send(user);
});
const deleteAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const user = await admin_service_1.default.deleteAdmin(req.params.userId);
    res.status(http_status_1.default.OK).send(user);
});
const loginAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const user = await admin_service_1.default.loginAdmin(req.body);
    const token = await token_service_1.default.generateAuthTokens(user.id);
    res.status(http_status_1.default.OK).send({ user, token });
});
const logoutAdmin = (0, catchAsync_1.default)(async (req, res) => {
    await admin_service_1.default.logoutAdmin(req.body.refreshToken);
    res.status(http_status_1.default.NO_CONTENT).send();
});
const refreshAdminToken = (0, catchAsync_1.default)(async (req, res) => {
    const tokens = await admin_service_1.default.refreshAuthAdmin(req.body.refreshToken);
    res.status(http_status_1.default.OK).send({ ...tokens });
});
const resetAdminPassword = (0, catchAsync_1.default)(async (req, res) => {
    const admin = await admin_service_1.default.resetAdminPassword(req.query.token, req.body.password);
    res.status(http_status_1.default.OK).send(admin);
});
const verifyAdminEmail = (0, catchAsync_1.default)(async (req, res) => {
    const admin = await admin_service_1.default.verifyAdminEmail(req.body.verificationToken);
    res.status(http_status_1.default.OK).send(admin);
});
exports.adminController = {
    createAdmin,
    getAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAdminToken,
    resetAdminPassword,
    verifyAdminEmail,
};
