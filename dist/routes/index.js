"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = __importDefault(require("./product.route"));
const common_route_1 = __importDefault(require("./common.route"));
const user_route_1 = __importDefault(require("./user.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/product",
        route: product_route_1.default,
    },
    {
        path: "/user",
        route: user_route_1.default,
    },
    {
        path: "/common",
        route: common_route_1.default,
    }
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
