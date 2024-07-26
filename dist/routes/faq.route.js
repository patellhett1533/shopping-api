"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const faq_validate_1 = __importDefault(require("../validators/faq.validate"));
const faq_controller_1 = __importDefault(require("../controllers/faq.controller"));
const router = express_1.default.Router();
router.post("/", (0, validate_1.default)(faq_validate_1.default.addFaqSchema), faq_controller_1.default.addFaq);
router.get("/all/:id", (0, validate_1.default)(faq_validate_1.default.getFaqByParentSchema), faq_controller_1.default.getFaqByParent);
router.get("/:id", (0, validate_1.default)(faq_validate_1.default.getFaqByIdSchema), faq_controller_1.default.getFaqById);
router.put("/:id", (0, validate_1.default)(faq_validate_1.default.updateFaqByIdSchema), faq_controller_1.default.updateFaqById);
router.delete("/:id", (0, validate_1.default)(faq_validate_1.default.deleteFaqByIdSchema), faq_controller_1.default.deleteFaqById);
exports.default = router;
