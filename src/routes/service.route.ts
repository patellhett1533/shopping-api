import express from "express";
import validate from "../middlewares/validate";
import serviceValidate from "../validators/service.validate";
import serviceController from "../controllers/service.controller";

const router = express.Router();

router.post(
  "/",
  validate(serviceValidate.addServiceSchema),
  serviceController.addService
);

router.get(
  "/",
  validate(serviceValidate.getAllServicesSchema),
  serviceController.getServices
);

router.get(
  "/active",
  validate(serviceValidate.getAllServicesSchema),
  serviceController.getActiveServices
);

router.get(
  "/:id",
  validate(serviceValidate.getServiceByIdSchema),
  serviceController.getServiceById
);

router.get(
  "/alias/:alias",
  validate(serviceValidate.getServiceByAliasSchema),
  serviceController.getServiceByAlias
);

router.put(
  "/:id",
  validate(serviceValidate.updateServiceSchema),
  serviceController.updateService
);

router.delete(
  "/:id",
  validate(serviceValidate.deleteServiceSchema),
  serviceController.deleteService
);

export default router;
