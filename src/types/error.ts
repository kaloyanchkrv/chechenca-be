export enum InternalErrorMessages {
  //Users
  USER_NOT_FOUND = "User not found",
  USER_ALREADY_EXISTS = "User already exists",
  USER_NOT_CREATED = "User not created",
  USER_NOT_UPDATED = "User not updated",
  USER_NOT_DELETED = "User not deleted",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  REQUEST_NOT_CREATED = "REQUEST_NOT_CREATED",
}

export enum HTTPStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface CustomErrorConstructor {
  statusCode: HTTPStatusCode;
  message: string;
  internalMessage: InternalErrorMessages;
}

export class CustomError extends Error {
  readonly statusCode: HTTPStatusCode;
  readonly internalMessage: InternalErrorMessages;

  constructor(args: CustomErrorConstructor) {
    super(args.message);
    this.statusCode = args.statusCode;
    this.internalMessage = args.internalMessage;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
