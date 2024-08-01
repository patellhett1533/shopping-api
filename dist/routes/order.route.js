"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const order_validate_1 = __importDefault(require("../validators/order.validate"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const router = express_1.default.Router();
router.post("/", (0, validate_1.default)(order_validate_1.default.addOrderSchema), order_controller_1.default.addOrder);
router.get("/", (0, validate_1.default)(order_validate_1.default.getAllOrdersSchema), order_controller_1.default.getAllOrders);
router.get("/:id", (0, validate_1.default)(order_validate_1.default.getOrderByIdSchema), order_controller_1.default.getOrderById);
router.delete("/:id", (0, validate_1.default)(order_validate_1.default.deleteOrderByIdSchema), order_controller_1.default.deleteOrderById);
exports.default = router;
