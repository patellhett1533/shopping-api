import mongoose, { Model, Schema } from "mongoose";
import toJSONPlugin from "./plugins/toJSON.plugins";
import { Faqs } from "../interface/common.interface";

interface FaqModel extends Model<Faqs> {
  toJSONPlugin(schema: Schema): void;
}

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
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

faqSchema.plugin(toJSONPlugin);

const Faq = mongoose.model<Faqs, FaqModel>("Faq", faqSchema);

export default Faq;
