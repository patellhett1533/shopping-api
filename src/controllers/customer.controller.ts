import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import customerService from "../services/customer.service";
import { pick } from "../utils/pick";

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.getAllCustomer(
    Number(req.query.page as string) || 1
  );
  res.status(httpStatus.OK).send(result);
});

const getCustomerByEmail = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "email", "order_id", "date"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "search"]);
  const customer = await customerService.getCustomerByEmail(
    req.params.email,
    filter,
    options
  );
  res.status(httpStatus.OK).send(customer);
});

export default { getAllCustomers, getCustomerByEmail };
