"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_plugins_1 = __importDefault(require("./plugins/toJSON.plugins"));
const paginate_plugins_1 = __importDefault(require("./plugins/paginate.plugins"));
const custome_1 = __importDefault(require("../utils/custome"));
const orderSchema = new mongoose_1.default.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true,
        default: custome_1.default,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    products_id: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    payment_id: {
        type: String,
        required: true,
    },
    payment_status: {
        type: Boolean,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
//create a function for when a new entry is add then 12 character and number mixed order id generated and set as order id
orderSchema.plugin(toJSON_plugins_1.default);
orderSchema.plugin(paginate_plugins_1.default);
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
