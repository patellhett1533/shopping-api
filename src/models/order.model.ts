import mongoose, { Model, Schema } from "mongoose";
import toJSONPlugin from "./plugins/toJSON.plugins";
import { OrderTypes } from "../interface/common.interface";
import paginate from "./plugins/paginate.plugins";
import generateOrderId from "../utils/custome";

interface OrderModel extends Model<OrderTypes> {
  paginate(filter: any, options: any): Promise<any>;
  toJSONPlugin(schema: Schema): void;
}

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
      default: generateOrderId,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products_id: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
    payment_status: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

//create a function for when a new entry is add then 12 character and number mixed order id generated and set as order id

orderSchema.plugin(toJSONPlugin);
orderSchema.plugin(paginate);

const Order = mongoose.model<OrderTypes, OrderModel>("Order", orderSchema);

export default Order;
