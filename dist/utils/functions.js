"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const axios_1 = require("axios");
const error_1 = require("../types/error");
const constants_1 = require("./constants");
const formatError = (e, specificMessage = "Something went wrong, try again later") => {
    if (e instanceof axios_1.AxiosError) {
        return new error_1.CustomError({
            message: specificMessage,
            internalMessage: error_1.InternalErrorMessages.INTERNAL_ERROR,
            statusCode: error_1.HTTPStatusCode.INTERNAL_SERVER_ERROR,
        });
    }
    if (e instanceof error_1.CustomError) {
        return e;
    }
    return constants_1.INTERNAL_ERROR;
};
exports.formatError = formatError;
//# sourceMappingURL=functions.js.map