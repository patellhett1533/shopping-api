import menuList from "../config/menu";

const generateAlias = async (name: string) => {
  const alias: string = name.split(" ").join("-").toLowerCase();
  return alias;
};

const getMenuList = async () => {
  return menuList;
};

export default { generateAlias, getMenuList };
