import { AxiosError } from "axios";
import { CustomError, HTTPStatusCode, InternalErrorMessages } from "../types/error";
import { INTERNAL_ERROR } from "./constants";

export const formatError = (e: unknown, specificMessage = "Something went wrong, try again later") => {
  if (e instanceof AxiosError) {
    return new CustomError({
      message: specificMessage,
      internalMessage: InternalErrorMessages.INTERNAL_ERROR,
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
    });
  }

  if (e instanceof CustomError) {
    return e;
  }

  return INTERNAL_ERROR;
};

export const calcTotalPriceForGuard = (hours: number) => hours * 30;
