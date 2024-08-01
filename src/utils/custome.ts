function generateOrderId(): string {
  const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nums: string = "0123456789";

  const orderId: string = [
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

export default generateOrderId;
