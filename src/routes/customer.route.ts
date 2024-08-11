import express from "express";
import customerController from "../controllers/customer.controller";
import validate from "../middlewares/validate";
import customerValidate from "../validators/customer.validate";

const router = express.Router();

router.get(
  "/",
  validate(customerValidate.addCustomerSchema),
  customerController.getAllCustomers
);

router.get(
  "/:email",
  validate(customerValidate.getCustomerByEmailSchema),
  customerController.getCustomerByEmail
);

export default router;
