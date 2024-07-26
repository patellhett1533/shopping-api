"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const service_validate_1 = __importDefault(require("../validators/service.validate"));
const service_controller_1 = __importDefault(require("../controllers/service.controller"));
const router = express_1.default.Router();
router.post("/", (0, validate_1.default)(service_validate_1.default.addServiceSchema), service_controller_1.default.addService);
router.get("/", (0, validate_1.default)(service_validate_1.default.getAllServicesSchema), service_controller_1.default.getServices);
router.get("/active", (0, validate_1.default)(service_validate_1.default.getAllServicesSchema), service_controller_1.default.getActiveServices);
router.get("/:id", (0, validate_1.default)(service_validate_1.default.getServiceByIdSchema), service_controller_1.default.getServiceById);
router.get("/alias/:alias", (0, validate_1.default)(service_validate_1.default.getServiceByAliasSchema), service_controller_1.default.getServiceByAlias);
router.put("/:id", (0, validate_1.default)(service_validate_1.default.updateServiceSchema), service_controller_1.default.updateService);
router.delete("/:id", (0, validate_1.default)(service_validate_1.default.deleteServiceSchema), service_controller_1.default.deleteService);
exports.default = router;
