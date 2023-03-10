import { Request, Response } from "express";

import { userService } from "../services/users";
import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";
import { UserResponse } from "../types/users";
import { USER_NOT_EXIST_ERROR } from "../utils/constants";
import { formatError } from "../utils/functions";

const createUser = async (
  req: Request<unknown, unknown, { name: string; email: string; phone: string }>,
  res: Response<UserResponse | CustomError>
) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone || !name.trim().length || !email.trim().length || !phone.trim().length) {
      throw new CustomError({
        message: "Missing required fields",
        statusCode: HTTPStatusCode.BAD_REQUEST,
        internalMessage: InternalErrorMessages.USER_NOT_CREATED,
      });
    }

    const user = await userService.createUser({ name, email, phone });

    return res.status(HTTPStatusCode.CREATED).json(user);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const createGuard = async (
  req: Request<
    unknown,
    unknown,
    { name: string; email: string; phone: string; hasGun: boolean; isGuard: boolean; isDriver: boolean }
  >,
  res: Response<UserResponse | CustomError>
) => {
  try {
    const { name, email, phone, hasGun, isDriver, isGuard } = req.body;

    if (!name || !email || !phone || !name.trim().length || !email.trim().length || !phone.trim().length) {
      throw new CustomError({
        message: "Missing required fields",
        statusCode: HTTPStatusCode.BAD_REQUEST,
        internalMessage: InternalErrorMessages.USER_NOT_CREATED,
      });
    }

    const user = await userService.createGuard({ name, email, phone, hasGun, isGuard, isDriver });

    return res.status(HTTPStatusCode.CREATED).json(user);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getUser = async (req: Request<{ id: string }>, res: Response<UserResponse | CustomError>) => {
  try {
    const { id } = req.params;

    const user = await userService.getUser(Number(id));

    if (!user) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    return res.status(HTTPStatusCode.OK).json(user);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getGuard = async (req: Request<{ id: string }>, res: Response<UserResponse | CustomError>) => {
  try {
    const { id } = req.params;

    const user = await userService.getGuard(Number(id));

    if (!user) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    return res.status(HTTPStatusCode.OK).json(user);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getGuardBySkills = async (
  req: Request<unknown, unknown, unknown, { isDriver: boolean; isGuard: boolean; hasGun: boolean }>,
  res: Response<UserResponse[] | CustomError>
) => {
  try {
    const isDriver = req.query.isDriver;
    const isGuard = req.query.isGuard;
    const hasGun = req.query.hasGun;

    const user = await userService.getGuardBySkills(isDriver);

    if (!user) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    return res.status(HTTPStatusCode.OK).json(user);
  } catch (e) {
    const error = formatError(e);

    throw error;
  }
};

export const userController = {
  createUser,
  createGuard,
  getUser,
  getGuard,
  getGuardBySkills,
};
