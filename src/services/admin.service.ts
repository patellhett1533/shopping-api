import httpStatus from "http-status";
import { AdminTypes, AdminUpdateTypes } from "../interface/common.interface";
import Admin from "../models/admin.model";
import { createApiError } from "../utils/createApiError";
import QueryString from "qs";
import Token from "../models/token.model";
import tokenTypes from "../config/tokens";
import tokenService from "./token.service";

const createAdmin = async (admin: AdminTypes) => {
  if (await Admin.isEmailTaken(admin.email)) {
    throw createApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return await Admin.create(admin);
};

const queryAdmins = async (
  filter: Pick<QueryString.ParsedQs, "name">,
  options: Pick<QueryString.ParsedQs, "sortBy" | "limit" | "page" | "search">
) => {
  const admins = await Admin.paginate(filter, options);
  return admins;
};

const getAdminById = async (id: string) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw createApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  return admin;
};

const getAdminByEmail = async (email: string) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw createApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  return admin;
};

const updateAdmin = async (id: string, admin: AdminUpdateTypes) => {
  const existingAdmin = await getAdminById(id);
  return await existingAdmin.updateOne(admin);
};

const deleteAdmin = async (id: string) => {
  const admin = await Admin.findByIdAndDelete(id);
  return admin;
};

const loginAdmin = async (adminBody: { email: string; password: string }) => {
  const admin = await getAdminByEmail(adminBody.email);
  if (!admin) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }
  const isPasswordValid = await admin.matchPassword(adminBody.password);
  if (!isPasswordValid) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }
  if (!admin.isVerified) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Please verify your email");
  }
  return admin;
};

const logoutAdmin = async (refreshToken: string) => {
  const token = await Token.findOneAndDelete({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!token) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }
  return token;
};

const refreshAuthAdmin = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await Admin.findById(refreshTokenDoc.user);
    if (!user) {
      throw createApiError(httpStatus.NOT_FOUND, "No user found");
    }
    return tokenService.generateAuthTokens(user.id);
  } catch (error) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const resetAdminPassword = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await getAdminById(resetPasswordTokenDoc.user.toString());
    if (!user) {
      throw createApiError(httpStatus.NOT_FOUND, "No user found");
    }
    await updateAdmin(user.id, { password: newPassword });
    return getAdminById(user.id);
  } catch (error) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const verifyAdminEmail = async (verificationToken: string) => {
  try {
    const verificationTokenDoc = await tokenService.verifyToken(
      verificationToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await getAdminById(verificationTokenDoc.user.toString());
    if (!user) {
      throw createApiError(httpStatus.NOT_FOUND, "No user found");
    }
    await updateAdmin(user.id, { isVerified: true });
    return getAdminById(user.id);
  } catch (error) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default {
  createAdmin,
  queryAdmins,
  getAdminById,
  getAdminByEmail,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAuthAdmin,
  resetAdminPassword,
  verifyAdminEmail,
};
