"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_model_1 = __importDefault(require("../models/content.model"));
const mongodb_1 = require("mongodb");
const addPage = async (data) => {
    const content = await content_model_1.default.create(data);
    return content;
};
const addSectionOfContent = async (content_id, data) => {
    //calculate order form last content's order amd increase by 1
    const maxOrder = await content_model_1.default.findOne({ _id: new mongodb_1.ObjectId(content_id) });
    const order = maxOrder?.content.length
        ? maxOrder.content[maxOrder.content.length - 1].order + 1
        : 0;
    const content = await content_model_1.default.updateOne({ _id: new mongodb_1.ObjectId(content_id) }, {
        $push: {
            content: { ...data, order },
        },
    });
    if (content.modifiedCount === 1) {
        return await content_model_1.default.findOne({ _id: new mongodb_1.ObjectId(content_id) });
    }
    return content;
};
const getPageByAlias = async (alias) => {
    const content = await content_model_1.default.findOne({ alias });
    if (!content)
        throw new Error("Content not found");
    content.content.sort((a, b) => a.order - b.order);
    return content;
};
const getPageById = async (id) => {
    const content = await content_model_1.default.findById(id);
    if (!content)
        throw new Error("Content not found");
    content.content.sort((a, b) => a.order - b.order);
    return content;
};
const getPages = async (filter, options) => {
    const content = await content_model_1.default.paginate(filter, options);
    return content;
};
const updateSectionOfContentById = async (content_id, section_id, data) => {
    const content = await content_model_1.default.updateOne({ _id: new mongodb_1.ObjectId(content_id), "content._id": new mongodb_1.ObjectId(section_id) }, {
        $set: {
            "content.$[elem]": data,
        },
    }, {
        arrayFilters: [{ "elem._id": new mongodb_1.ObjectId(section_id) }],
    });
    if (content.modifiedCount === 1) {
        return await content_model_1.default.findOne({ _id: new mongodb_1.ObjectId(content_id) });
    }
    return content;
};
const updatePageById = async (id, data) => {
    const content = await content_model_1.default.findByIdAndUpdate(id, data, { new: true });
    return content;
};
const deletePageById = async (id) => {
    const content = await content_model_1.default.findByIdAndDelete(id);
    return content;
};
const deleteSectionOfContentById = async (content_id, section_id) => {
    const content = await content_model_1.default.updateOne({ _id: new mongodb_1.ObjectId(content_id) }, {
        $pull: {
            content: {
                _id: new mongodb_1.ObjectId(section_id),
            },
        },
    });
    if (content.modifiedCount === 1) {
        return await content_model_1.default.findOne({ _id: new mongodb_1.ObjectId(content_id) });
    }
    return content;
};
exports.default = {
    addPage,
    addSectionOfContent,
    getPageByAlias,
    getPageById,
    getPages,
    updateSectionOfContentById,
    updatePageById,
    deletePageById,
    deleteSectionOfContentById,
};
