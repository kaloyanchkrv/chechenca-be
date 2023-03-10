import prisma from "../lib/prisma";
import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";
import { CreateRequestArgs, RequestResponse, UpdateRequest } from "../types/requests";
import { calcTotalPriceForGuard, formatError } from "../utils/functions";
import sgMail from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  throw new CustomError({
    message: "Missing Third party API key",
    statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
    internalMessage: InternalErrorMessages.INTERNAL_ERROR,
  });
}

sgMail.setApiKey(apiKey);

const createRequest = async ({
  userId,
  description,
  isTaken,
  startingAddress,
  endingAddress,
  startingTime,
  endingTime,
  isGuard,
  isDriver,
  hasGun,
  hasVehicle,
  rentHours,
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

    if (rentHours === null) {
      rentHours = 0;
    }

    const guardCost = calcTotalPriceForGuard(rentHours);

    const request = await prisma.request.create({
      data: {
        userId: user.id,
        description: description,
        isTaken: isTaken,
        startingAddress: startingAddress,
        endingAddress: endingAddress,
        isActive: true,
        startingTime: startingTime,
        endingTime: endingTime,
        isGuard: isGuard,
        isDriver: isDriver,
        hasGun: hasGun,
        hasVehicle: hasVehicle,
        rentHours: rentHours,
        totalCost: guardCost || 15,
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
        isTaken: true,
        startingAddress: true,
        endingAddress: true,
        isActive: true,
        startingTime: true,
        endingTime: true,
        isGuard: true,
        isDriver: true,
        hasGun: true,
        hasVehicle: true,
        rentHours: true,
        totalCost: true,
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
        user: true,
        guard: true,
        isTaken: true,
        startingAddress: true,
        endingAddress: true,
        isActive: true,
        startingTime: true,
        endingTime: true,
        isGuard: true,
        isDriver: true,
        hasGun: true,
        hasVehicle: true,
        rentHours: true,
        totalCost: true,
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
        isTaken: true,
        user: true,
        guard: true,
        startingAddress: true,
        endingAddress: true,
        isActive: true,
        startingTime: true,
        endingTime: true,
        isGuard: true,
        isDriver: true,
        hasGun: true,
        hasVehicle: true,
        rentHours: true,
        totalCost: true,
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

const updateRequestToTaken = async (id: number, guardId: number): Promise<RequestResponse> => {
  try {
    const request = await prisma.request.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!request) {
      throw new CustomError({
        message: "Request not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.REQUEST_NOT_FOUND,
      });
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: request.id,
      },
      data: {
        isActive: false,
        isTaken: true,
        guardId: guardId,
      },
    });

    const guard = await prisma.user.findFirst({
      where: {
        id: guardId,
      },
      select: {
        name: true,
      },
    });

    if (!guard) {
      throw new CustomError({
        message: "Guard not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USERS_NOT_FOUND,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: request.userId,
      },
      select: {
        email: true,
      },
    });

    if (!user) {
      throw new CustomError({
        message: "User not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.USER_NOT_FOUND,
      });
    }

    const msg = {
      to: user.email,
      from: "kchakarov@appolica.com",
      subject: "Request Status",
      text: "Your request has been taken by " + guard.name,
    };

    sgMail.send(msg);

    return updatedRequest;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const updateRequestToActive = async (id: number): Promise<RequestResponse> => {
  try {
    const request = await prisma.request.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });

    if (!request) {
      throw new CustomError({
        message: "Request not found",
        statusCode: HTTPStatusCode.NOT_FOUND,
        internalMessage: InternalErrorMessages.REQUEST_NOT_FOUND,
      });
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: request.id,
      },
      data: {
        isActive: true,
        isTaken: false,
        guardId: null,
      },
    });

    return updatedRequest;
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getAllRequestsForGuard = async (guardId: number): Promise<RequestResponse[]> => {
  try {
    const requests = await prisma.request.findMany({
      where: {
        guardId: guardId,
      },
      select: {
        id: true,
        description: true,
        isTaken: true,
        user: true,
        guard: true,
        startingAddress: true,
        endingAddress: true,
        isActive: true,
        startingTime: true,
        endingTime: true,
        totalCost: true,
        rentHours: true,
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

const getActiveRequests = async (): Promise<RequestResponse[]> => {
  try {
    const requests = await prisma.request.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        description: true,
        isTaken: true,
        user: true,
        guard: true,
        startingAddress: true,
        endingAddress: true,
        isActive: true,
        startingTime: true,
        totalCost: true,
        rentHours: true,
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
  updateRequestToTaken,
  updateRequestToActive,
  getAllRequestsForGuard,
  getActiveRequests,
};
