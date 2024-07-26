import { Request, Response } from "express";
import httpStatus from "http-status";
import reviewService from "../services/review.service";
import catchAsync from "../utils/catchAsync";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewService.addReview(req.body);
  res.status(httpStatus.CREATED).send(review);
});

const getReviewByParent = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewService.getReviewByParent(req.params.id);
  res.status(httpStatus.OK).send(review);
});

const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewService.getReviewById(req.params.id);
  res.status(httpStatus.OK).send(review);
});

const updateReviewById = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewService.updateReviewById(req.params.id, req.body);
  res.status(httpStatus.OK).send(review);
});

const deleteReviewById = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewService.deleteReviewById(req.params.id);
  res.status(httpStatus.OK).send(review);
});

export default {
  addReview,
  getReviewByParent,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
