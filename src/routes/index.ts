import express from "express";
import productRoute from "./product.route";
import commonRoute from "./common.route";
import userRoute from "./user.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/common",
    route: commonRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
