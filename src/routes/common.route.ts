import express from "express";
import commonController from "../controllers/common.controller";
import upload from "../utils/multer";

const router = express.Router();

router.post(
  "/upload-single",
  upload.single("image"),
  commonController.addSingleFile
);

export default router;
