"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_1 = require("../services/users");
const error_1 = require("../types/error");
const functions_1 = require("../utils/functions");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone || !name.trim().length || !email.trim().length || !phone.trim().length) {
            throw new error_1.CustomError({
                message: "Missing required fields",
                statusCode: error_1.HTTPStatusCode.BAD_REQUEST,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_CREATED,
            });
        }
        const user = yield users_1.userService.createUser({ name, email, phone });
        return res.status(error_1.HTTPStatusCode.CREATED).json(user);
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
const createGuard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, skills } = req.body;
        if (!name ||
            !email ||
            !phone ||
            !skills ||
            !name.trim().length ||
            !email.trim().length ||
            !phone.trim().length ||
            !skills.length) {
            throw new error_1.CustomError({
                message: "Missing required fields",
                statusCode: error_1.HTTPStatusCode.BAD_REQUEST,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_CREATED,
            });
        }
        const user = yield users_1.userService.createGuard({ name, email, phone, skills });
        return res.status(error_1.HTTPStatusCode.CREATED).json(user);
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield users_1.userService.getUser(Number(id));
        if (!user) {
            throw new error_1.CustomError({
                message: "User not found",
                statusCode: error_1.HTTPStatusCode.NOT_FOUND,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_FOUND,
            });
        }
        return res.status(error_1.HTTPStatusCode.OK).json(user);
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
const getGuard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield users_1.userService.getGuard(Number(id));
        if (!user) {
            throw new error_1.CustomError({
                message: "User not found",
                statusCode: error_1.HTTPStatusCode.NOT_FOUND,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_FOUND,
            });
        }
        return res.status(error_1.HTTPStatusCode.OK).json(user);
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
const getGuardBySkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = req.params.skills;
        const user = yield users_1.userService.getGuardBySkills(skills);
        if (!user) {
            throw new error_1.CustomError({
                message: "User not found",
                statusCode: error_1.HTTPStatusCode.NOT_FOUND,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_FOUND,
            });
        }
        return res.status(error_1.HTTPStatusCode.OK).json(user);
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
exports.userController = {
    createUser,
    createGuard,
    getUser,
    getGuard,
    getGuardBySkills,
};
//# sourceMappingURL=users.js.map