import mongoose, { Model, Schema } from "mongoose";
import paginate from "./plugins/paginate.plugins";
import toJSONPlugin from "./plugins/toJSON.plugins";
import { ServiceTypes } from "../interface/common.interface";

interface ServiceModel extends Model<ServiceTypes> {
  paginate(filter: any, options: any): Promise<any>;
  toJSONPlugin(schema: Schema): void;
}

const serviceSchema = new mongoose.Schema(
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
    thumbnail: {
      type: {
        url: String,
        width: Number,
        height: Number,
      },
      required: true,
    },
    video: {
      type: {
        url: String,
        width: Number,
        height: Number,
        duration: Number,
      },
      required: true,
    },
    whatText: {
      type: String,
    },
    benefits: {
      type: [{ title: String, text: String }],
    },
    features: {
      type: [String],
    },
    whyText: {
      type: [{ title: String, text: String }],
    },
    process: {
      type: [
        {
          title: String,
          image: { url: String, width: Number, height: Number },
        },
      ],
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
serviceSchema.plugin(toJSONPlugin);
serviceSchema.plugin(paginate);

const Service = mongoose.model<ServiceTypes, ServiceModel>(
  "Service",
  serviceSchema
);

export default Service;
