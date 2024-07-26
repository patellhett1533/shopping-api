import { ContentTypes, Section } from "../interface/common.interface";
import Content from "../models/content.model";
import QueryString from "qs";
import { ObjectId } from "mongodb";
import toJSONPlugin from "../models/plugins/toJSON.plugins";
import mongoose from "mongoose";

const addPage = async (data: ContentTypes) => {
  const content = await Content.create(data);
  return content;
};

const addSectionOfContent = async (content_id: string, data: Section) => {
  //calculate order form last content's order amd increase by 1
  const maxOrder = await Content.findOne({ _id: new ObjectId(content_id) });
  const order = maxOrder?.content.length
    ? maxOrder.content[maxOrder.content.length - 1].order + 1
    : 0;

  const content = await Content.updateOne(
    { _id: new ObjectId(content_id) },
    {
      $push: {
        content: { ...data, order },
      },
    }
  );
  if (content.modifiedCount === 1) {
    return await Content.findOne({ _id: new ObjectId(content_id) });
  }
  return content;
};

const getPageByAlias = async (alias: string) => {
  const content = await Content.findOne({ alias });
  if (!content) throw new Error("Content not found");

  content.content.sort((a, b) => a.order - b.order);
  return content;
};

const getPageById = async (id: string) => {
  const content = await Content.findById(id);
  if (!content) throw new Error("Content not found");

  content.content.sort((a, b) => a.order - b.order);
  return content;
};

const getPages = async (
  filter: Pick<QueryString.ParsedQs, "name">,
  options: Pick<QueryString.ParsedQs, "sortBy" | "limit" | "page" | "search">
) => {
  const content = await Content.paginate(filter, options);
  return content;
};

const updateSectionOfContentById = async (
  content_id: string,
  section_id: string,
  data: Section
) => {
  const content = await Content.updateOne(
    { _id: new ObjectId(content_id), "content._id": new ObjectId(section_id) },
    {
      $set: {
        "content.$[elem]": data,
      },
    },
    {
      arrayFilters: [{ "elem._id": new ObjectId(section_id) }],
    }
  );

  if (content.modifiedCount === 1) {
    return await Content.findOne({ _id: new ObjectId(content_id) });
  }
  return content;
};

const updatePageById = async (id: string, data: ContentTypes) => {
  const content = await Content.findByIdAndUpdate(id, data, { new: true });
  return content;
};

const deletePageById = async (id: string) => {
  const content = await Content.findByIdAndDelete(id);
  return content;
};

const deleteSectionOfContentById = async (
  content_id: string,
  section_id: string
) => {
  const content = await Content.updateOne(
    { _id: new ObjectId(content_id) },
    {
      $pull: {
        content: {
          _id: new ObjectId(section_id),
        },
      },
    }
  );
  if (content.modifiedCount === 1) {
    return await Content.findOne({ _id: new ObjectId(content_id) });
  }
  return content;
};

export default {
  addPage,
  addSectionOfContent,
  getPageByAlias,
  getPageById,
  getPages,
  updateSectionOfContentById,
  updatePageById,
  deletePageById,
  deleteSectionOfContentById,
};
