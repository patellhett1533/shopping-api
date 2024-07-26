"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faq_model_1 = __importDefault(require("../models/faq.model"));
const addFaq = async (faq) => {
    const newFaq = new faq_model_1.default(faq);
    return await newFaq.save();
};
const getFaqByParent = async (id) => {
    return await faq_model_1.default.find({ parent: id });
};
const getFaqById = async (id) => {
    return await faq_model_1.default.findById(id);
};
const updateFaqById = async (id, faq) => {
    const updatedFaq = await faq_model_1.default.findOneAndUpdate({ _id: id }, faq, {
        new: true,
    });
    return updatedFaq;
};
const deleteFaqById = async (id) => {
    return await faq_model_1.default.findOneAndDelete({ _id: id });
};
exports.default = {
    addFaq,
    getFaqByParent,
    getFaqById,
    updateFaqById,
    deleteFaqById,
};
