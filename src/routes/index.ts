import express from "express";
import productRoute from "./product.route";
import commonRoute from "./common.route";
import adminRoute from "./admin.route";
import faqRoute from "./faq.route";
import reviewRoute from "./review.route";
import contentRoute from "./content.route";
import serviceRoute from "./service.route";
import orderRoute from "./order.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/common",
    route: commonRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/faq",
    route: faqRoute,
  },
  {
    path: "/review",
    route: reviewRoute,
  },
  {
    path: "/content",
    route: contentRoute,
  },
  {
    path: "/service",
    route: serviceRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
