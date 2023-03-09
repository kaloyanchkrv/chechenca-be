"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_NOT_EXIST_ERROR = exports.INTERNAL_ERROR = void 0;
const error_1 = require("../types/error");
exports.INTERNAL_ERROR = new error_1.CustomError({
    message: "Something went wrong",
    statusCode: error_1.HTTPStatusCode.INTERNAL_SERVER_ERROR,
    internalMessage: error_1.InternalErrorMessages.INTERNAL_ERROR,
});
exports.USER_NOT_EXIST_ERROR = new error_1.CustomError({
    message: "User does not exist",
    statusCode: error_1.HTTPStatusCode.NOT_FOUND,
    internalMessage: error_1.InternalErrorMessages.INTERNAL_ERROR,
});
//# sourceMappingURL=constants.js.map