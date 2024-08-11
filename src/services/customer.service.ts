import Order from "../models/order.model";
import QueryString from "qs";

const getAllCustomer = async (page: number) => {
  const pipeline = [
    {
      $group: {
        _id: "$email",
        name: { $first: "$name" },
        phone: { $first: "$phone" },
        amount: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        email: "$_id",
        name: 1,
        phone: 1,
        amount: 1,
      },
    },
    {
      $skip: (page - 1) * 10,
    },
    {
      $limit: 10,
    },
  ];
  const results = await Order.aggregate(pipeline);
  const totalCount = await Order.countDocuments();

  const totalPages = Math.ceil(totalCount / 10);
  return {
    results,
    page,
    limit: 10,
    totalPages,
    totalResults: totalCount,
  };
};

const getCustomerByEmail = async (
  email: string,
  filter: Pick<QueryString.ParsedQs, "name" | "email" | "order_id" | "date">,
  options: Pick<QueryString.ParsedQs, "sortBy" | "limit" | "page" | "search">
) => {
  const customer = await Order.paginate({ email }, { limit: 10, page: 1 });
  return customer;
};

export default { getAllCustomer, getCustomerByEmail };
