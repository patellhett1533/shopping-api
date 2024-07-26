import express from "express";
import validate from "../middlewares/validate";
import faqValidate from "../validators/faq.validate";
import faqController from "../controllers/faq.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/", validate(faqValidate.addFaqSchema), faqController.addFaq);

router.get(
  "/all/:id",
  validate(faqValidate.getFaqByParentSchema),
  faqController.getFaqByParent
);

router.get(
  "/:id",
  validate(faqValidate.getFaqByIdSchema),
  faqController.getFaqById
);

router.put(
  "/:id",
  validate(faqValidate.updateFaqByIdSchema),
  faqController.updateFaqById
);

router.delete(
  "/:id",
  validate(faqValidate.deleteFaqByIdSchema),
  faqController.deleteFaqById
);

export default router;
