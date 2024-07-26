"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const review_model_1 = __importDefault(require("../models/review.model"));
const addReview = async (review) => {
    return await review_model_1.default.create(review);
};
const getReviewByParent = async (parent) => {
    return await review_model_1.default.find({ parent });
};
const getReviewById = async (id) => {
    return await review_model_1.default.findById(id);
};
const updateReviewById = async (id, review) => {
    return await review_model_1.default.findByIdAndUpdate({ _id: id }, review, { new: true });
};
const deleteReviewById = async (id) => {
    return await review_model_1.default.findByIdAndDelete(id);
};
exports.default = {
    addReview,
    getReviewByParent,
    getReviewById,
    updateReviewById,
    deleteReviewById,
};
