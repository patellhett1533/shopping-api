import express from "express";
import validate from "../middlewares/validate";
import { adminController } from "../controllers/admin.controller";
import adminValidation from "../validators/admin.validate";
import { Request } from "express";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/dashboard", auth(), adminController.getAdmin);

router.post(
  "/register",
  validate(adminValidation.registerAdmin),
  adminController.createAdmin
);

router.post(
  "/login",
  validate(adminValidation.loginAdminByPassword),
  adminController.loginAdmin
);

router.post(
  "/verify-email",
  validate(adminValidation.verifyAdminEmail),
  adminController.verifyAdminEmail
);

router.post(
  "/refresh-auth",
  validate(adminValidation.refreshAdminToken),
  adminController.refreshAdminToken
);

router.get("/", auth(), adminController.getAdmin);

router.get(
  "/:userId",
  auth(),
  validate(adminValidation.getAdminById),
  adminController.getAdminById
);

router.put(
  "/:userId",
  auth(),
  validate(adminValidation.updateAdmin),
  adminController.updateAdmin
);

router.delete(
  "/:id",
  auth(),
  validate(adminValidation.deleteAdmin),
  adminController.deleteAdmin
);

export default router;
