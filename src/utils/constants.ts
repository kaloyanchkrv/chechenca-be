import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";

export const INTERNAL_ERROR = new CustomError({
  message: "Something went wrong",
  statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
  internalMessage: InternalErrorMessages.INTERNAL_ERROR,
});

export const USER_NOT_EXIST_ERROR = new CustomError({
  message: "User does not exist",
  statusCode: HTTPStatusCode.NOT_FOUND,
  internalMessage: InternalErrorMessages.INTERNAL_ERROR,
});
