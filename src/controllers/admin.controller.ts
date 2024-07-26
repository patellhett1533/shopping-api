import adminService from "./../services/admin.service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { pick } from "../utils/pick";
import catchAsync from "../utils/catchAsync";
import { createApiError } from "../utils/createApiError";
import tokenService from "../services/token.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const user = await adminService.createAdmin(req.body);
  const token = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.CREATED).send({ user, token });
});

const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "search"]);
  const result = await adminService.queryAdmins(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const user = await adminService.getAdminById(req.params.userId);
  if (!user) {
    throw createApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  res.status(httpStatus.OK).send(user);
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const user = await adminService.updateAdmin(req.params.userId, req.body);
  res.status(httpStatus.OK).send(user);
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const user = await adminService.deleteAdmin(req.params.userId);
  res.status(httpStatus.OK).send(user);
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const user = await adminService.loginAdmin(req.body);
  const token = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.OK).send({ user, token });
});

const logoutAdmin = catchAsync(async (req: Request, res: Response) => {
  await adminService.logoutAdmin(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshAdminToken = catchAsync(async (req: Request, res: Response) => {
  const tokens = await adminService.refreshAuthAdmin(req.body.refreshToken);
  res.status(httpStatus.OK).send({ ...tokens });
});

const resetAdminPassword = catchAsync(async (req: Request, res: Response) => {
  const admin = await adminService.resetAdminPassword(
    req.query.token as string,
    req.body.password
  );
  res.status(httpStatus.OK).send(admin);
});

const verifyAdminEmail = catchAsync(async (req: Request, res: Response) => {
  const admin = await adminService.verifyAdminEmail(req.body.verificationToken);
  res.status(httpStatus.OK).send(admin);
});

export const adminController = {
  createAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
  resetAdminPassword,
  verifyAdminEmail,
};
