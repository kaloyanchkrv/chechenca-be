import { Request, Response } from "express";
import { requestService } from "../services/requests";
import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";
import { RequestResponse } from "../types/requests";
import { formatError } from "../utils/functions";

const createRequest = async (
  req: Request<
    unknown,
    unknown,
    {
      userId: number;
      description: string;
      isGuard: boolean;
      isDriver: boolean;
      hasGun: boolean;
      isTaken: boolean;
      startingAddress: string;
      isActive: boolean;
      endingAddress: string | null;
    }
  >,
  res: Response<RequestResponse | CustomError>
) => {
  try {
    const { userId, description, startingAddress, isActive, endingAddress, isDriver, isGuard, hasGun, isTaken } =
      req.body;

    if (
      !description ||
      !startingAddress ||
      !status ||
      !description.trim().length ||
      !startingAddress.trim().length ||
      !status.trim().length
    ) {
      throw new CustomError({
        message: "Missing required fields",
        statusCode: HTTPStatusCode.BAD_REQUEST,
        internalMessage: InternalErrorMessages.REQUEST_NOT_CREATED,
      });
    }

    const request = await requestService.createRequest({
      userId,
      description,
      startingAddress,
      isActive,
      endingAddress,
      isDriver,
      isGuard,
      hasGun,
      isTaken,
    });

    return res.status(HTTPStatusCode.CREATED).json(request);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getRequestById = async (req: Request<{ id: number }>, res: Response<RequestResponse | CustomError>) => {
  try {
    const { id } = req.params;
    const request = await requestService.getRequestById(Number(id));
    return res.status(HTTPStatusCode.OK).json(request);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getRequestsByUserId = async (
  req: Request<{ userId: number }>,
  res: Response<RequestResponse[] | CustomError>
) => {
  try {
    const { userId } = req.params;
    const request = await requestService.getRequestsByUserId(Number(userId));
    return res.status(HTTPStatusCode.OK).json(request);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getAllRequests = async (req: Request, res: Response<unknown | CustomError>) => {
  try {
    const request = await requestService.getAllRequests();
    return res.status(HTTPStatusCode.OK).json(request);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

export const requestController = {
  createRequest,
  getRequestById,
  getRequestsByUserId,
  getAllRequests,
};
