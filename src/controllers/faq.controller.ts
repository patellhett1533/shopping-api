import { Request, Response } from "express";
import httpStatus from "http-status";
import faqService from "../services/faq.service";
import catchAsync from "../utils/catchAsync";

const addFaq = catchAsync(async (req: Request, res: Response) => {
  const faq = await faqService.addFaq(req.body);
  res.status(httpStatus.CREATED).send(faq);
});

const getFaqByParent = catchAsync(async (req: Request, res: Response) => {
  const faq = await faqService.getFaqByParent(req.params.id);
  res.status(httpStatus.OK).send(faq);
});

const getFaqById = catchAsync(async (req: Request, res: Response) => {
  const faq = await faqService.getFaqById(req.params.id);
  res.status(httpStatus.OK).send(faq);
});

const updateFaqById = catchAsync(async (req: Request, res: Response) => {
  const faq = await faqService.updateFaqById(req.params.id, req.body);
  res.status(httpStatus.OK).send(faq);
});

const deleteFaqById = catchAsync(async (req: Request, res: Response) => {
  const faq = await faqService.deleteFaqById(req.params.id);
  res.status(httpStatus.OK).send(faq);
});

export default {
  addFaq,
  getFaqByParent,
  getFaqById,
  updateFaqById,
  deleteFaqById,
};
