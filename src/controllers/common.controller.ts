import { Request, Response } from "express";
import logger from "../config/logger";
import httpStatus from "http-status";
import commonService from "../services/common.service";
import catchAsync from "../utils/catchAsync";

const addSingleFile = catchAsync(async (req: Request, res: Response) => {
  try {
    const file = req.file;
    res.status(httpStatus.OK).send({ image: file?.filename });
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

const generateAlias = catchAsync(async (req: Request, res: Response) => {
  try {
    const alias = await commonService.generateAlias(req.body.name);
    res.status(httpStatus.OK).send({ alias });
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

const getMenu = catchAsync(async (req: Request, res: Response) => {
  try {
    const menu = await commonService.getMenuList();
    res.status(httpStatus.OK).send(menu);
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

export default { addSingleFile, generateAlias, getMenu };
