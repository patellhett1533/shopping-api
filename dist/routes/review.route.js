"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const review_controller_1 = __importDefault(require("../controllers/review.controller"));
const review_validate_1 = __importDefault(require("../validators/review.validate"));
const router = express_1.default.Router();
router.post("/", (0, validate_1.default)(review_validate_1.default.addReviewSchema), review_controller_1.default.addReview);
router.get("/all/:id", (0, validate_1.default)(review_validate_1.default.getReviewByParentSchema), review_controller_1.default.getReviewByParent);
router.get("/:id", (0, validate_1.default)(review_validate_1.default.getReviewByIdSchema), review_controller_1.default.getReviewById);
router.put("/:id", (0, validate_1.default)(review_validate_1.default.updateReviewByIdSchema), review_controller_1.default.updateReviewById);
router.delete("/:id", (0, validate_1.default)(review_validate_1.default.deleteReviewByIdSchema), review_controller_1.default.deleteReviewById);
exports.default = router;
