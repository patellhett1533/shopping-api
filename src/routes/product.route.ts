import express from "express";
import validate from "../middlewares/validate";
import productValidation from "../validators/product.validate";
import productController from "../controllers/product.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth(),
  validate(productValidation.addProductSchema),
  productController.addProduct
);

router.get(
  "/",
  validate(productValidation.getAllProductsSchema),
  productController.getAllProducts
);

router.get(
  "/:id",
  validate(productValidation.getProductSchema),
  productController.getProductById
);

router.post(
  "/array",
  validate(productValidation.getProductsByIdsSchema),
  productController.getProductsByIds
);

export default router;
