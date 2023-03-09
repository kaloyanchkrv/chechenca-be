import { CreateGuardParams, CreateUserParams, GuardResponse, UserResponse } from "../types/users";
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

const createGuard = async ({ name, email, phone, skills }: CreateGuardParams): Promise<UserResponse> => {
  try {
    const guard = await prisma.guard.create({
      data: {
        name,
        email,
        phoneNumber: phone,
        skills: skills,
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
        skills: true,
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

// const getGuardBySkills = async (skills: string[]): Promise<GuardResponse[]> => {
//   try {
//     console.log("hui");
//     const guard = await prisma.guard.findMany({
//       where: {
//         skills: {
//           hasEvery: skills,
//         },
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         phoneNumber: true,
//         skills: true,
//       },
//     });
//     console.log("hui");

//     if (!guard) {
//       throw new CustomError({
//         message: "User not found",
//         statusCode: HTTPStatusCode.NOT_FOUND,
//         internalMessage: InternalErrorMessages.USER_NOT_FOUND,
//       });
//     }

//     return guard;
//   } catch (e) {
//     const error = formatError(e);

//     console.log(error);

//     throw error;
//   }
// };

export const userService = {
  createUser,
  createGuard,
  getUser,
  getGuard,
  //getGuardBySkills,
};
