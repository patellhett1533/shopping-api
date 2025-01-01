import mongoose, { Model, Schema } from "mongoose";
import paginate from "./plugins/paginate.plugins";
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
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
}
);
productSchema.plugin(paginate);
const Product = mongoose.model<ProductTypes, ProductModel>(
  "Product",
  productSchema
);

export default Product;
