import { ref } from "joi";
import mongoose, { Model, Schema } from "mongoose";
import toJSONPlugin from "./plugins/toJSON.plugins";
import { Reviews } from "../interface/common.interface";

interface ReviewModel extends Model<Reviews> {
  toJSONPlugin(schema: Schema): void;
}

const reviewSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_role: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

reviewSchema.plugin(toJSONPlugin);

const Review = mongoose.model<Reviews, ReviewModel>("Review", reviewSchema);

export default Review;
