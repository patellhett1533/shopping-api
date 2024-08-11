"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const customer_validate_1 = __importDefault(require("../validators/customer.validate"));
const router = express_1.default.Router();
router.get("/", (0, validate_1.default)(customer_validate_1.default.addCustomerSchema), customer_controller_1.default.getAllCustomers);
router.get("/:email", (0, validate_1.default)(customer_validate_1.default.getCustomerByEmailSchema), customer_controller_1.default.getCustomerByEmail);
exports.default = router;
