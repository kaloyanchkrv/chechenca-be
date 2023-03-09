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
      skills: string[];
      startingAddress: string;
      status: string;
      endingAddress: string | null;
    }
  >,
  res: Response<RequestResponse | CustomError>
) => {
  try {
    const { userId, description, skills, startingAddress, status, endingAddress } = req.body;

    if (
      !description ||
      !skills ||
      !startingAddress ||
      !status ||
      !description.trim().length ||
      !skills.length ||
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
      skills,
      startingAddress,
      status,
      endingAddress,
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

export const requestController = {
  createRequest,
  getRequestById,
  getRequestsByUserId,
};
