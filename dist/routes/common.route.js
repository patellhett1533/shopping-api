"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const common_controller_1 = __importDefault(require("../controllers/common.controller"));
const multer_1 = __importDefault(require("../utils/multer"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const common_validate_1 = __importDefault(require("../validators/common.validate"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post("/upload-single", multer_1.default.single("image"), common_controller_1.default.addSingleFile);
router.post("/generate-alias", (0, validate_1.default)(common_validate_1.default.generateAlias), common_controller_1.default.generateAlias);
router.get("/menu", (0, auth_1.default)(), common_controller_1.default.getMenu);
exports.default = router;
