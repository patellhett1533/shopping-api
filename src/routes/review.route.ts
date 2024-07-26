import express from "express";
import validate from "../middlewares/validate";
import reviewController from "../controllers/review.controller";
import reviewValidate from "../validators/review.validate";
import auth from "../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  validate(reviewValidate.addReviewSchema),
  reviewController.addReview
);

router.get(
  "/all/:id",
  validate(reviewValidate.getReviewByParentSchema),
  reviewController.getReviewByParent
);

router.get(
  "/:id",
  validate(reviewValidate.getReviewByIdSchema),
  reviewController.getReviewById
);

router.put(
  "/:id",
  validate(reviewValidate.updateReviewByIdSchema),
  reviewController.updateReviewById
);

router.delete(
  "/:id",
  validate(reviewValidate.deleteReviewByIdSchema),
  reviewController.deleteReviewById
);

export default router;
