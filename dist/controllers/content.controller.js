"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const content_service_1 = __importDefault(require("../services/content.service"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = require("../utils/pick");
const addPage = (0, catchAsync_1.default)(async (req, res) => {
    const page = await content_service_1.default.addPage(req.body);
    res.status(http_status_1.default.CREATED).send(page);
});
const addSectionOfContent = (0, catchAsync_1.default)(async (req, res) => {
    const section = await content_service_1.default.addSectionOfContent(req.params.pageId, req.body);
    res.status(http_status_1.default.CREATED).send(section);
});
const getAllPages = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.pick)(req.query, ["name", "alias"]);
    const options = (0, pick_1.pick)(req.query, ["sortBy", "limit", "page", "search"]);
    const result = await content_service_1.default.getPages(filter, options);
    res.status(http_status_1.default.OK).send(result);
});
const getPageById = (0, catchAsync_1.default)(async (req, res) => {
    const page = await content_service_1.default.getPageById(req.params.id);
    res.status(http_status_1.default.OK).send(page);
});
const getPageByAlias = (0, catchAsync_1.default)(async (req, res) => {
    const page = await content_service_1.default.getPageByAlias(req.params.alias);
    res.status(http_status_1.default.OK).send(page);
});
const updateSectionOfContentById = (0, catchAsync_1.default)(async (req, res) => {
    const section = await content_service_1.default.updateSectionOfContentById(req.params.pageId, req.params.sectionId, req.body);
    res.status(http_status_1.default.OK).send(section);
});
const updatePageById = (0, catchAsync_1.default)(async (req, res) => {
    const page = await content_service_1.default.updatePageById(req.params.id, req.body);
    res.status(http_status_1.default.OK).send(page);
});
const deletePageById = (0, catchAsync_1.default)(async (req, res) => {
    const page = await content_service_1.default.deletePageById(req.params.id);
    res.status(http_status_1.default.OK).send(page);
});
const deleteSectionOfContentById = (0, catchAsync_1.default)(async (req, res) => {
    const section = await content_service_1.default.deleteSectionOfContentById(req.params.pageId, req.params.sectionId);
    res.status(http_status_1.default.OK).send(section);
});
exports.default = {
    addPage,
    addSectionOfContent,
    getAllPages,
    getPageById,
    getPageByAlias,
    updateSectionOfContentById,
    updatePageById,
    deletePageById,
    deleteSectionOfContentById,
};
