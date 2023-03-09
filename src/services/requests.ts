import prisma from "../lib/prisma";
import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";
import { CreateRequestArgs, RequestResponse } from "../types/requests";
import { formatError } from "../utils/functions";

const createRequest = async ({
  userId,
  description,
  skills,
  startingAddress,
  status,
}: CreateRequestArgs): Promise<RequestResponse> => {
  try {
    const request = await prisma.request.create({
      data: {
        userId: userId,
        description: description,
        skills: skills,
        startingAddress: startingAddress,
        status: status,
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

export const requestService = {
  createRequest,
};
