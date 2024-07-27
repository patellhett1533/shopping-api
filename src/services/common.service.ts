import menuList from "../config/menu";
import Product from "../models/product.model";
import Service from "../models/service.model";

const generateAlias = async (name: string) => {
  const alias: string = name.split(" ").join("-").toLowerCase();
  return alias;
};

const getMenuList = async () => {
  return menuList;
};

//create a function for search functionlity which is search product, service by keyword which is given
const getSearchResult = async (keyword: string) => {
  const products = await Product.find({
    name: { $regex: keyword, $options: "i" },
  }).select("name alias thumbnail_image");

  const services = await Service.find({
    name: { $regex: keyword, $options: "i" },
  }).select("name alias thumbnail");

  // const blogs = await Blog.find({
  //   name: { $regex: keyword, $options: "i" },
  // }).select("name alias thumbnail");

  return { products, services };
};

export default { generateAlias, getMenuList, getSearchResult };
