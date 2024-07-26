import mongoose, { Schema, Document, Model } from "mongoose";
import paginate from "./plugins/paginate.plugins";
import toJSONPlugin from "./plugins/toJSON.plugins";
import { ContentTypes } from "../interface/common.interface";

interface ContentModel extends Model<ContentTypes> {
  paginate(filter: any, options: any): Promise<any>;
  toJSONPlugin(schema: Schema): void;
}

const contentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: [
      {
        section_name: String,
        section_type: String,
        section: mongoose.Schema.Types.Mixed,
        order: Number,
        is_active: Boolean,
      },
    ],
    meta_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_keywords: {
      type: String,
      required: true,
    },
    meta_image: {
      type: { url: String, width: Number, height: Number },
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

contentSchema.plugin(toJSONPlugin);
contentSchema.plugin(paginate);

const Content = mongoose.model<ContentTypes, ContentModel>(
  "Content",
  contentSchema
);
export default Content;
