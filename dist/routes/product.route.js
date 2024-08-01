"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const product_validate_1 = __importDefault(require("../validators/product.validate"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = express_1.default.Router();
router.post("/", (0, validate_1.default)(product_validate_1.default.addProductSchema), product_controller_1.default.addProduct);
router.get("/", (0, validate_1.default)(product_validate_1.default.getAllProductsSchema), product_controller_1.default.getAllProducts);
router.get("/active", (0, validate_1.default)(product_validate_1.default.getAllProductsSchema), product_controller_1.default.getAllActiveProducts);
router.get("/:id", (0, validate_1.default)(product_validate_1.default.getProductSchema), product_controller_1.default.getProductById);
router.get("/alias/:alias", (0, validate_1.default)(product_validate_1.default.getProductByAliasSchema), product_controller_1.default.getProductByAlias);
router.post("/array", (0, validate_1.default)(product_validate_1.default.getProductsByIdsSchema), product_controller_1.default.getProductsByIds);
router.put("/:id", (0, validate_1.default)(product_validate_1.default.updateProductSchema), product_controller_1.default.updateProduct);
router.delete("/:id", (0, validate_1.default)(product_validate_1.default.deleteProductSchema), product_controller_1.default.deleteProduct);
exports.default = router;
