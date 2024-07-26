import Review from "../models/review.model";
import { Reviews } from "../interface/common.interface";

const addReview = async (review: Reviews) => {
  return await Review.create(review);
};

const getReviewByParent = async (parent: string) => {
  return await Review.find({ parent });
};

const getReviewById = async (id: string) => {
  return await Review.findById(id);
};

const updateReviewById = async (id: string, review: Reviews) => {
  return await Review.findByIdAndUpdate({ _id: id }, review, { new: true });
};

const deleteReviewById = async (id: string) => {
  return await Review.findByIdAndDelete(id);
};

export default {
  addReview,
  getReviewByParent,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
