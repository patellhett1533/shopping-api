"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const common_controller_1 = __importDefault(require("../controllers/common.controller"));
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
router.post("/upload-single", multer_1.default.single("image"), common_controller_1.default.addSingleFile);
exports.default = router;
