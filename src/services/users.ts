import { CreateGuardParams, CreateUserParams, GetGuardSkillsParams, GuardResponse, UserResponse } from "../types/users";
import prisma from "../lib/prisma";
import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";
import { formatError } from "../utils/functions";

const createUser = async ({ name, email, phone }: CreateUserParams): Promise<UserResponse> => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber: phone,
      },
    });

    if (!user) {
      throw new CustomError({
        message: "User not created",
        statusCode: HTTPStatusCode.BAD_REQUEST,
        internalMessage: InternalErrorMessages.USER_NOT_CREATED,
      });
    }

    return user;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const createGuard = async ({
  name,
  email,
  phone,
  hasGun,
  isDriver,
  isGuard,
  hasVehicle,
}: CreateGuardParams): Promise<UserResponse> => {
  try {
    const guard = await prisma.guard.create({
      data: {
        name,
        email,
        phoneNumber: phone,
        hasGun,
        isDriver,
        isGuard,
        hasVehicle,
      },
    });

    if (!guard) {
      throw new CustomError({
        message: "User not created",
        statusCode: HTTPStatusCode.BAD_REQUEST,
        internalMessage: InternalErrorMessages.USER_NOT_CREATED,
      });
    }

    return guard;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getUser = async (id: number): Promise<UserResponse> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        requests: true,
      },
    });

    if (!user) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    return user;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getGuard = async (id: number): Promise<UserResponse> => {
  try {
    const guard = await prisma.guard.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        hasGun: true,
        isDriver: true,
        isGuard: true,
        hasVehicle: true,
      },
    });

    if (!guard) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    return guard;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getGuardBySkills = async (
  hasGun: boolean,
  hasVehicle: boolean,
  isDriver: boolean,
  isGuard: boolean
): Promise<GuardResponse[]> => {
  try {
    const guard = await prisma.guard.findMany({
      where: {
        hasGun,
        hasVehicle,
        isDriver,
        isGuard,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        hasGun: true,
        isDriver: true,
        isGuard: true,
        hasVehicle: true,
      },
    });

    if (!guard) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    return guard;
  } catch (e) {
    const error = formatError(e);

    console.log(error);

    throw error;
  }
};

const getAllUsers = async (): Promise<UserResponse[]> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        requests: true,
      },
    });

    if (!users) {
      throw new CustomError({
        message: "Users not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    return users;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getAllGuards = async (): Promise<UserResponse[]> => {
  try {
    const guards = await prisma.guard.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        requests: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!guards) {
      throw new CustomError({
        message: "Users not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    return guards;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

export const userService = {
  createUser,
  createGuard,
  getUser,
  getGuard,
  getGuardBySkills,
  getAllUsers,
  getAllGuards,
};
