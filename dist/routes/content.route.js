"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const content_validation_1 = __importDefault(require("../validators/content.validation"));
const content_controller_1 = __importDefault(require("../controllers/content.controller"));
const router = express_1.default.Router();
router.post("/", (0, validate_1.default)(content_validation_1.default.addContentSchema), content_controller_1.default.addPage);
router.post("/:pageId", (0, validate_1.default)(content_validation_1.default.addSectionOfContentSchema), content_controller_1.default.addSectionOfContent);
router.get("/", content_controller_1.default.getAllPages);
router.get("/:id", (0, validate_1.default)(content_validation_1.default.getPageByIdSchema), content_controller_1.default.getPageById);
router.get("/alias/:alias", (0, validate_1.default)(content_validation_1.default.getPageByAliasSchema), content_controller_1.default.getPageByAlias);
router.put("/:pageId/:sectionId", (0, validate_1.default)(content_validation_1.default.updateSectionOfContentByIdSchema), content_controller_1.default.updateSectionOfContentById);
router.put("/:id", (0, validate_1.default)(content_validation_1.default.updatePageSchema), content_controller_1.default.updatePageById);
router.delete("/:id", (0, validate_1.default)(content_validation_1.default.deletePageSchema), content_controller_1.default.deletePageById);
router.delete("/:pageId/:sectionId", (0, validate_1.default)(content_validation_1.default.deleteSectionOfContentSchema), content_controller_1.default.deleteSectionOfContentById);
exports.default = router;
