"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateOrderId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const orderId = [
        chars.charAt(Math.floor(Math.random() * chars.length)),
        chars.charAt(Math.floor(Math.random() * chars.length)),
        nums.charAt(Math.floor(Math.random() * nums.length)),
        nums.charAt(Math.floor(Math.random() * nums.length)),
        nums.charAt(Math.floor(Math.random() * nums.length)),
        chars.charAt(Math.floor(Math.random() * chars.length)),
        chars.charAt(Math.floor(Math.random() * chars.length)),
        chars.charAt(Math.floor(Math.random() * chars.length)),
        nums.charAt(Math.floor(Math.random() * nums.length)),
        nums.charAt(Math.floor(Math.random() * nums.length)),
        nums.charAt(Math.floor(Math.random() * nums.length)),
        nums.charAt(Math.floor(Math.random() * nums.length)),
    ]
        .join("")
        .toUpperCase();
    return orderId;
}
exports.default = generateOrderId;
