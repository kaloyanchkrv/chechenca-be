import prisma from "../lib/prisma";
import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";
import { CreateRequestArgs, RequestResponse } from "../types/requests";
import { formatError } from "../utils/functions";

const createRequest = async ({
  userId,
  description,
  isDriver,
  isGuard,
  hasGun,
  isTaken,
  startingAddress,
  isActive,
  endingAddress,
}: CreateRequestArgs): Promise<RequestResponse> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    const request = await prisma.request.create({
      data: {
        userId: user.id,
        description: description,
        isDriver: isDriver,
        hasGun: hasGun,
        isGuard: isGuard,
        isTaken: isTaken,
        startingAddress: startingAddress,
        endingAddress: endingAddress,
        isActive: isActive,
      },
    });

    if (!request) {
      throw new CustomError({
        message: "Request not created",
        statusCode: HTTPStatusCode.BAD_REQUEST,
        internalMessage: InternalErrorMessages.REQUEST_NOT_CREATED,
      });
    }

    return request;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getRequestById = async (id: number): Promise<RequestResponse> => {
  try {
    const request = await prisma.request.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        userId: true,
        description: true,
        isDriver: true,
        hasGun: true,
        isGuard: true,
        isTaken: true,
        startingAddress: true,
        endingAddress: true,
        isActive: true,
      },
    });

    if (!request) {
      throw new CustomError({
        message: "Request not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.REQUEST_NOT_FOUND,
      });
    }

    return request;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getRequestsByUserId = async (userId: number): Promise<RequestResponse[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
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

    const requests = await prisma.request.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        description: true,
        isDriver: true,
        hasGun: true,
        isGuard: true,
        user: true,
        guard: true,
        isTaken: true,
        startingAddress: true,
        endingAddress: true,
        isActive: true,
      },
    });

    if (!requests) {
      throw new CustomError({
        message: "Requests not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.REQUEST_NOT_FOUND,
      });
    }

    return requests;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getAllRequests = async (): Promise<RequestResponse[]> => {
  try {
    const requests = await prisma.request.findMany({
      select: {
        id: true,
        description: true,
        isDriver: true,
        hasGun: true,
        isGuard: true,
        isTaken: true,
        user: true,
        guard: true,
        startingAddress: true,
        endingAddress: true,
        isActive: true,
      },
    });

    if (!requests) {
      throw new CustomError({
        message: "Requests not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.REQUEST_NOT_FOUND,
      });
    }

    return requests;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

export const requestService = {
  createRequest,
  getRequestById,
  getRequestsByUserId,
  getAllRequests,
};
