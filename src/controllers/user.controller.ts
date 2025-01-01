import userService from "./../services/user.service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { createApiError } from "../utils/createApiError";
import tokenService from "../services/token.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.CREATED).send({ user, token });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw createApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.status(httpStatus.OK).send(user);
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.loginUser(req.body);
  const token = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.OK).send({ user, token });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  await userService.logoutUser(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshUserToken = catchAsync(async (req: Request, res: Response) => {
  const tokens = await userService.refreshAuthUser(req.body.refreshToken);
  res.status(httpStatus.OK).send({ ...tokens });
});

export const userController = {
  createUser,
  getUserById,
  loginUser,
  logoutUser,
  refreshUserToken,
};
