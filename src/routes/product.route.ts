import express from "express";
import validate from "../middlewares/validate";
import productValidation from "../validators/product.validate";
import productController from "../controllers/product.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  validate(productValidation.addProductSchema),
  productController.addProduct
);

router.get(
  "/",
  validate(productValidation.getAllProductsSchema),
  productController.getAllProducts
);

router.get(
  "/active",
  validate(productValidation.getAllProductsSchema),
  productController.getAllActiveProducts
);

router.get(
  "/:id",
  validate(productValidation.getProductSchema),
  productController.getProductById
);

router.get(
  "/alias/:alias",
  validate(productValidation.getProductByAliasSchema),
  productController.getProductByAlias
);

router.post(
  "/array",
  validate(productValidation.getProductsByIdsSchema),
  productController.getProductsByIds
);

router.put(
  "/:id",
  validate(productValidation.updateProductSchema),
  productController.updateProduct
);

router.delete(
  "/:id",
  validate(productValidation.deleteProductSchema),
  productController.deleteProduct
);

export default router;
