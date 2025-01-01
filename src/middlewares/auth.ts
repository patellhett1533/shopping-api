import { Request, Response, NextFunction } from "express";
import passport from "passport";
import httpStatus from "http-status";
import { createApiError } from "../utils/createApiError";
import { UserTypes } from "../interface/common.interface";

const verifyCallback =
  (
    req: Request,
    resolve: (value?: void | PromiseLike<void>) => void,
    reject: (reason?: any) => void
  ) =>
  (err: string, user: UserTypes, info: string) => {
    if (err || info || !user) {
      return reject(
        createApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;
    resolve();
  };

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  return new Promise<void>((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;
