"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = __importDefault(require("../config/menu"));
const generateAlias = async (name) => {
    const alias = name.split(" ").join("-").toLowerCase();
    return alias;
};
const getMenuList = async () => {
    return menu_1.default;
};
exports.default = { generateAlias, getMenuList };
