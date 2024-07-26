import Faq from "../models/faq.model";
import { Faqs } from "../interface/common.interface";

const addFaq = async (faq: Faqs) => {
  const newFaq = new Faq(faq);
  return await newFaq.save();
};

const getFaqByParent = async (id: string) => {
  return await Faq.find({ parent: id });
};

const getFaqById = async (id: string) => {
  return await Faq.findById(id);
};

const updateFaqById = async (id: string, faq: Faqs) => {
  const updatedFaq = await Faq.findOneAndUpdate({ _id: id }, faq, {
    new: true,
  });
  return updatedFaq;
};

const deleteFaqById = async (id: string) => {
  return await Faq.findOneAndDelete({ _id: id });
};

export default {
  addFaq,
  getFaqByParent,
  getFaqById,
  updateFaqById,
  deleteFaqById,
};
