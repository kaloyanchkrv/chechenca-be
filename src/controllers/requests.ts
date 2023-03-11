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
      startingTime: string;
      hasVehicle: boolean;
      rentHours: number | null;
    }
  >,
  res: Response<RequestResponse | CustomError>
) => {
  try {
    const {
      userId,
      description,
      startingAddress,
      isActive,
      endingAddress,
      isDriver,
      isGuard,
      hasGun,
      isTaken,
      startingTime,
      hasVehicle,
      rentHours,
    } = req.body;

    if (!description || !startingAddress || !description.trim().length || !startingAddress.trim().length) {
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
      startingTime,
      hasVehicle,
      rentHours,
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

const updateRequestToTaken = async (
  req: Request<{ id: number; guardId: number }>,
  res: Response<RequestResponse | CustomError>
) => {
  try {
    const { id, guardId } = req.params;

    const request = await requestService.updateRequestToTaken(Number(id), Number(guardId));
    return res.status(HTTPStatusCode.OK).json(request);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const getActiveRequests = async (req: Request, res: Response<unknown | CustomError>) => {
  try {
    const request = await requestService.getActiveRequests();
    return res.status(HTTPStatusCode.OK).json(request);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

const updateRequestToActive = async (req: Request<{ id: number }>, res: Response<RequestResponse | CustomError>) => {
  try {
    const { id } = req.params;

    const request = await requestService.updateRequestToActive(Number(id));
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
  updateRequestToTaken,
  updateRequestToActive,
  getActiveRequests,
};
