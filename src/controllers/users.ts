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
    {
      name: string;
      email: string;
      phone: string;
      hasGun: boolean;
      isGuard: boolean;
      isDriver: boolean;
      hasVehicle: boolean;
    }
  >,
  res: Response<UserResponse | CustomError>
) => {
  try {
    const { name, email, phone, hasGun, isDriver, isGuard, hasVehicle } = req.body;

    if (!name || !email || !phone || !name.trim().length || !email.trim().length || !phone.trim().length) {
      throw new CustomError({
        message: "Missing required fields",
        statusCode: HTTPStatusCode.BAD_REQUEST,
        internalMessage: InternalErrorMessages.USER_NOT_CREATED,
      });
    }

    const user = await userService.createGuard({ name, email, phone, hasGun, isGuard, isDriver, hasVehicle });

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
  req: Request<unknown, unknown, unknown, { hasGun: string; hasVehicle: string; isDriver: string; isGuard: string }>,
  res: Response<UserResponse[] | CustomError>
) => {
  try {
    const { hasGun, hasVehicle, isDriver, isGuard } = req.query;
    const string = "true";
    const hasGunBool = hasGun === string;
    const hasVehicleBool = hasVehicle === string;
    const isDriverBool = isDriver === string;
    const isGuardBool = isGuard === string;

    const user = await userService.getGuardBySkills(hasGunBool, hasVehicleBool, isDriverBool, isGuardBool);

    if (!user) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USERS_NOT_FOUND,
      });
    }

    return res.status(HTTPStatusCode.OK).json(user);
  } catch (e) {
    const error = formatError(e);

    throw error;
  }
};

const getAllUsers = async (req: Request, res: Response<UserResponse[] | CustomError>) => {
  try {
    const users = await userService.getAllUsers();

    if (!users) {
      throw new CustomError({
        message: "Users not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USERS_NOT_FOUND,
      });
    }

    return res.status(HTTPStatusCode.OK).json(users);
  } catch (e) {
    const error = formatError(e);

    throw error;
  }
};

const getAllGuards = async (req: Request, res: Response<UserResponse[] | CustomError>) => {
  try {
    const users = await userService.getAllGuards();

    if (!users) {
      throw new CustomError({
        message: "Users not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USERS_NOT_FOUND,
      });
    }

    return res.status(HTTPStatusCode.OK).json(users);
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
  getAllUsers,
  getAllGuards,
};
