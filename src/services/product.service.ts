import { ProductTypes, ProductWithId } from "../interface/common.interface";
import Product from "../models/product.model";
import QueryString from "qs";

const addProduct = async (product: ProductTypes) => {
  const newProduct = new Product(product);
  return await newProduct.save();
};

const queryProducts = async (
  filter: Pick<QueryString.ParsedQs, "name">,
  options: Pick<QueryString.ParsedQs, "sortBy" | "limit" | "page" | "search">
) => {
  const users = await Product.paginate(filter, options);
  return users;
};

const getAllProducts = async (
  filter: Pick<QueryString.ParsedQs, "name" | "is_active">,
  options: Pick<QueryString.ParsedQs, "sortBy" | "limit" | "page" | "search">
) => {
  filter.is_active = "true";
  const products = await Product.paginate(filter, options);

  products.results = products.results.map(
    (product: ProductWithId) => product.id
  );
  return products;
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

const getProductsByIds = async (ids: [string]) => {
  const products = await Product.find({ _id: { $in: ids } }).select(
    "id name price image"
  );
  return products;
};

const updateProduct = async (id: string, product: ProductTypes) => {
  return await Product.findByIdAndUpdate(id, product, { new: true });
};

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export default {
  addProduct,
  queryProducts,
  getAllProducts,
  getProductById,
  getProductsByIds,
  updateProduct,
  deleteProduct,
};
