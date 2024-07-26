import mongoose, { Model, Schema } from "mongoose";
import paginate from "./plugins/paginate.plugins";
import toJSONPlugin from "./plugins/toJSON.plugins";
import { ProductTypes } from "../interface/common.interface";

interface ProductModel extends Model<ProductTypes> {
  paginate(filter: any, options: any): Promise<any>;
  toJSONPlugin(schema: Schema): void;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
    },
    edition: {
      type: [String],
    },
    support_period: {
      type: [String],
    },
    option: {
      type: [String],
    },
    review_count: {
      type: Number,
      default: 0,
    },
    rating_stars: {
      type: Number,
      default: 0,
    },
    features: {
      type: [String],
    },
    problem: {
      type: String,
    },
    solution: {
      type: String,
    },
    thumbnail_image: {
      type: { url: String, width: Number, height: Number },
      required: true,
    },
    images: {
      type: [{ url: String, width: Number, height: Number }],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(toJSONPlugin);
productSchema.plugin(paginate);
const Product = mongoose.model<ProductTypes, ProductModel>(
  "Product",
  productSchema
);

export default Product;
