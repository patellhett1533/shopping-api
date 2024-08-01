import express from "express";
import validate from "../middlewares/validate";
import orderValidate from "../validators/order.validate";
import orderController from "../controllers/order.controller";

const router = express.Router();

router.post(
  "/",
  validate(orderValidate.addOrderSchema),
  orderController.addOrder
);

router.get(
  "/",
  validate(orderValidate.getAllOrdersSchema),
  orderController.getAllOrders
);

router.get(
  "/:id",
  validate(orderValidate.getOrderByIdSchema),
  orderController.getOrderById
);

router.delete(
  "/:id",
  validate(orderValidate.deleteOrderByIdSchema),
  orderController.deleteOrderById
);

export default router;
