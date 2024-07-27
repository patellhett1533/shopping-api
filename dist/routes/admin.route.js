"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const admin_controller_1 = require("../controllers/admin.controller");
const admin_validate_1 = __importDefault(require("../validators/admin.validate"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get("/dashboard", (0, auth_1.default)(), admin_controller_1.adminController.getAdmin);
router.post("/register", (0, validate_1.default)(admin_validate_1.default.registerAdmin), admin_controller_1.adminController.createAdmin);
router.post("/login", (0, validate_1.default)(admin_validate_1.default.loginAdminByPassword), admin_controller_1.adminController.loginAdmin);
router.post("/verify-email", (0, validate_1.default)(admin_validate_1.default.verifyAdminEmail), admin_controller_1.adminController.verifyAdminEmail);
router.post("/refresh-auth", (0, validate_1.default)(admin_validate_1.default.refreshAdminToken), admin_controller_1.adminController.refreshAdminToken);
router.get("/", admin_controller_1.adminController.getAdmin);
router.get("/:userId", (0, validate_1.default)(admin_validate_1.default.getAdminById), admin_controller_1.adminController.getAdminById);
router.put("/:userId", (0, validate_1.default)(admin_validate_1.default.updateAdmin), admin_controller_1.adminController.updateAdmin);
router.delete("/:id", (0, validate_1.default)(admin_validate_1.default.deleteAdmin), admin_controller_1.adminController.deleteAdmin);
exports.default = router;
