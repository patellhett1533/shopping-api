import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/pick";
import serviceService from "../services/service.service";

const addService = catchAsync(async (req: Request, res: Response) => {
  const service = await serviceService.addService(req.body);
  res.status(httpStatus.CREATED).send(service);
});

const getServices = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "is_active"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "search"]);
  const result = await serviceService.queryServices(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getActiveServices = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "is_active"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "search"]);
  const result = await serviceService.getServices(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const service = await serviceService.getServiceById(req.params.id);
  res.status(httpStatus.OK).send(service);
});

const getServiceByAlias = catchAsync(async (req: Request, res: Response) => {
  const service = await serviceService.getServiceByAlias(req.params.alias);
  res.status(httpStatus.OK).send(service);
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const service = await serviceService.updateServiceById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).send(service);
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const service = await serviceService.deleteServiceById(req.params.id);
  res.status(httpStatus.OK).send(service);
});

export default {
  addService,
  getServices,
  getActiveServices,
  getServiceById,
  getServiceByAlias,
  updateService,
  deleteService,
};
