"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = require("../utils/pick");
const service_service_1 = __importDefault(require("../services/service.service"));
const addService = (0, catchAsync_1.default)(async (req, res) => {
    const service = await service_service_1.default.addService(req.body);
    res.status(http_status_1.default.CREATED).send(service);
});
const getServices = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name", "is_active"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const result = await service_service_1.default.queryServices(filter, options);
    res.status(http_status_1.default.OK).send(result);
});
const getActiveServices = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name", "is_active"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const result = await service_service_1.default.getServices(filter, options);
    res.status(http_status_1.default.OK).send(result);
});
const getServiceById = (0, catchAsync_1.default)(async (req, res) => {
    const service = await service_service_1.default.getServiceById(req.params.id);
    res.status(http_status_1.default.OK).send(service);
});
const getServiceByAlias = (0, catchAsync_1.default)(async (req, res) => {
    const service = await service_service_1.default.getServiceByAlias(req.params.alias);
    res.status(http_status_1.default.OK).send(service);
});
const updateService = (0, catchAsync_1.default)(async (req, res) => {
    const service = await service_service_1.default.updateServiceById(req.params.id, req.body);
    res.status(http_status_1.default.OK).send(service);
});
const deleteService = (0, catchAsync_1.default)(async (req, res) => {
    const service = await service_service_1.default.deleteServiceById(req.params.id);
    res.status(http_status_1.default.OK).send(service);
});
exports.default = {
    addService,
    getServices,
    getActiveServices,
    getServiceById,
    getServiceByAlias,
    updateService,
    deleteService,
};
