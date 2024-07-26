import { Request, Response } from "express";
import adminService from "../services/admin.service";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await adminService.createAdmin(req.body);
  const token = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.CREATED).send({ user, token });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginWithPassword(email, password);
  const token = await tokenService.generateAuthTokens(user.id);
  res.send({ user, token });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const token = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...token });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.query.token as string, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.query.token as string);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
