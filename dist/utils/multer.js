"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const shortid_1 = __importDefault(require("shortid"));
const storage = multer_1.default.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, shortid_1.default.generate() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
