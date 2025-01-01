"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const uuid = new short_unique_id_1.default({ length: 10 });
const storage = multer_1.default.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, uuid.rnd() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
