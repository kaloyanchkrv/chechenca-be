import { Request, Response } from "express";
import { requestService } from "../services/requests";
import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";
import { RequestResponse } from "../types/requests";
import { formatError } from "../utils/functions";

const createRequest = async (
  req: Request<
    unknown,
    unknown,
    { userId: number; description: string; skills: string[]; startingAddress: string; status: string }
  >,
  res: Response<RequestResponse | CustomError>
) => {
  try {
    const { userId, description, skills, startingAddress, status } = req.body;

    if (
      !userId ||
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
    });

    return res.status(HTTPStatusCode.CREATED).json(request);
  } catch (e) {
    const error = formatError(e);
    throw error;
  }
};

export const requestController = {
  createRequest,
};
