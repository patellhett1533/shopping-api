import tokenTypes from "../config/tokens";
import Admin from "../models/admin.model";
import Token from "../models/token.model";
import { createApiError } from "../utils/createApiError";
import adminService from "./admin.service";
import tokenService from "./token.service";

const httpStatus = require("http-status");

const loginWithPassword = async (email: string, password: string) => {
  const user = await adminService.getAdminByEmail(email);
  if (!user) {
    throw createApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const isMatch = await Admin.matchPassword(password);
  if (!isMatch) {
    throw createApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }
  return user;
};

const logout = async (refreshToken: string) => {
  const token = await Token.findOneAndDelete({
    token: refreshToken,
    blacklisted: false,
  });
  if (!token) {
    throw createApiError(httpStatus.NOT_FOUND, "Not found");
  }
  return token;
};

const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await Admin.findByIdAndDelete(refreshTokenDoc.user);
    if (!user) {
      throw createApiError(httpStatus.NOT_FOUND, "No user found");
    }
    return tokenService.generateAuthTokens(user.id);
  } catch (error) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await adminService.getAdminById(
      resetPasswordTokenDoc.user.toString()
    );
    if (!user) {
      throw createApiError(httpStatus.NOT_FOUND, "No user found");
    }
    await adminService.updateAdmin(user.id, { password: newPassword });
    return adminService.getAdminById(user.id);
  } catch (error) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await adminService.getAdminById(
      verifyEmailTokenDoc.user.toString()
    );
    if (!user) {
      throw createApiError(httpStatus.NOT_FOUND, "No user found");
    }
    await adminService.updateAdmin(user.id, { isVerified: true });
    return adminService.getAdminById(user.id);
  } catch (error) {
    throw createApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default {
  loginWithPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
