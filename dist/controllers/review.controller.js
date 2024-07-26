"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const review_service_1 = __importDefault(require("../services/review.service"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const addReview = (0, catchAsync_1.default)(async (req, res) => {
    const review = await review_service_1.default.addReview(req.body);
    res.status(http_status_1.default.CREATED).send(review);
});
const getReviewByParent = (0, catchAsync_1.default)(async (req, res) => {
    const review = await review_service_1.default.getReviewByParent(req.params.id);
    res.status(http_status_1.default.OK).send(review);
});
const getReviewById = (0, catchAsync_1.default)(async (req, res) => {
    const review = await review_service_1.default.getReviewById(req.params.id);
    res.status(http_status_1.default.OK).send(review);
});
const updateReviewById = (0, catchAsync_1.default)(async (req, res) => {
    const review = await review_service_1.default.updateReviewById(req.params.id, req.body);
    res.status(http_status_1.default.OK).send(review);
});
const deleteReviewById = (0, catchAsync_1.default)(async (req, res) => {
    const review = await review_service_1.default.deleteReviewById(req.params.id);
    res.status(http_status_1.default.OK).send(review);
});
exports.default = {
    addReview,
    getReviewByParent,
    getReviewById,
    updateReviewById,
    deleteReviewById,
};
