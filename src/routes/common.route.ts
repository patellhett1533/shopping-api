import express from "express";
import commonController from "../controllers/common.controller";
import upload from "../utils/multer";
import validate from "../middlewares/validate";
import commonValidate from "../validators/common.validate";
import auth from "../middlewares/auth";

const router = express.Router();

router.post(
  "/upload-single",
  upload.single("image"),
  commonController.addSingleFile
);

router.post(
  "/generate-alias",
  validate(commonValidate.generateAlias),
  commonController.generateAlias
);

router.get("/menu", auth(), commonController.getMenu);

export default router;
