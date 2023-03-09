"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.HTTPStatusCode = exports.InternalErrorMessages = void 0;
var InternalErrorMessages;
(function (InternalErrorMessages) {
    //Users
    InternalErrorMessages["USER_NOT_FOUND"] = "User not found";
    InternalErrorMessages["USER_ALREADY_EXISTS"] = "User already exists";
    InternalErrorMessages["USER_NOT_CREATED"] = "User not created";
    InternalErrorMessages["USER_NOT_UPDATED"] = "User not updated";
    InternalErrorMessages["USER_NOT_DELETED"] = "User not deleted";
    InternalErrorMessages["INTERNAL_ERROR"] = "INTERNAL_ERROR";
})(InternalErrorMessages = exports.InternalErrorMessages || (exports.InternalErrorMessages = {}));
var HTTPStatusCode;
(function (HTTPStatusCode) {
    HTTPStatusCode[HTTPStatusCode["OK"] = 200] = "OK";
    HTTPStatusCode[HTTPStatusCode["CREATED"] = 201] = "CREATED";
    HTTPStatusCode[HTTPStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HTTPStatusCode[HTTPStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTPStatusCode[HTTPStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTPStatusCode[HTTPStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTPStatusCode[HTTPStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTPStatusCode[HTTPStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HTTPStatusCode = exports.HTTPStatusCode || (exports.HTTPStatusCode = {}));
class CustomError extends Error {
    constructor(args) {
        super(args.message);
        this.statusCode = args.statusCode;
        this.internalMessage = args.internalMessage;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=error.js.map