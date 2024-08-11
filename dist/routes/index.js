"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = __importDefault(require("./product.route"));
const common_route_1 = __importDefault(require("./common.route"));
const admin_route_1 = __importDefault(require("./admin.route"));
const faq_route_1 = __importDefault(require("./faq.route"));
const review_route_1 = __importDefault(require("./review.route"));
const content_route_1 = __importDefault(require("./content.route"));
const service_route_1 = __importDefault(require("./service.route"));
const order_route_1 = __importDefault(require("./order.route"));
const customer_route_1 = __importDefault(require("./customer.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/product",
        route: product_route_1.default,
    },
    {
        path: "/order",
        route: order_route_1.default,
    },
    {
        path: "/common",
        route: common_route_1.default,
    },
    {
        path: "/admin",
        route: admin_route_1.default,
    },
    {
        path: "/faq",
        route: faq_route_1.default,
    },
    {
        path: "/review",
        route: review_route_1.default,
    },
    {
        path: "/content",
        route: content_route_1.default,
    },
    {
        path: "/service",
        route: service_route_1.default,
    },
    {
        path: "/customer",
        route: customer_route_1.default,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
