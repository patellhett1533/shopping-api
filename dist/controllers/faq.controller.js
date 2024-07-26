"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const faq_service_1 = __importDefault(require("../services/faq.service"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const addFaq = (0, catchAsync_1.default)(async (req, res) => {
    const faq = await faq_service_1.default.addFaq(req.body);
    res.status(http_status_1.default.CREATED).send(faq);
});
const getFaqByParent = (0, catchAsync_1.default)(async (req, res) => {
    const faq = await faq_service_1.default.getFaqByParent(req.params.id);
    res.status(http_status_1.default.OK).send(faq);
});
const getFaqById = (0, catchAsync_1.default)(async (req, res) => {
    const faq = await faq_service_1.default.getFaqById(req.params.id);
    res.status(http_status_1.default.OK).send(faq);
});
const updateFaqById = (0, catchAsync_1.default)(async (req, res) => {
    const faq = await faq_service_1.default.updateFaqById(req.params.id, req.body);
    res.status(http_status_1.default.OK).send(faq);
});
const deleteFaqById = (0, catchAsync_1.default)(async (req, res) => {
    const faq = await faq_service_1.default.deleteFaqById(req.params.id);
    res.status(http_status_1.default.OK).send(faq);
});
exports.default = {
    addFaq,
    getFaqByParent,
    getFaqById,
    updateFaqById,
    deleteFaqById,
};
