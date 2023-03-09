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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const error_1 = require("../types/error");
const functions_1 = require("../utils/functions");
const createUser = ({ name, email, phone }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.create({
            data: {
                name,
                email,
                phoneNumber: phone,
            },
        });
        if (!user) {
            throw new error_1.CustomError({
                message: "User not created",
                statusCode: error_1.HTTPStatusCode.BAD_REQUEST,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_CREATED,
            });
        }
        return user;
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
const createGuard = ({ name, email, phone, skills }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guard = yield prisma_1.default.guard.create({
            data: {
                name,
                email,
                phoneNumber: phone,
                skills: skills,
            },
        });
        if (!guard) {
            throw new error_1.CustomError({
                message: "User not created",
                statusCode: error_1.HTTPStatusCode.BAD_REQUEST,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_CREATED,
            });
        }
        return guard;
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
            },
        });
        if (!user) {
            throw new error_1.CustomError({
                message: "User not found",
                statusCode: error_1.HTTPStatusCode.NOT_FOUND,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_FOUND,
            });
        }
        return user;
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
const getGuard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guard = yield prisma_1.default.guard.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                skills: true,
            },
        });
        if (!guard) {
            throw new error_1.CustomError({
                message: "User not found",
                statusCode: error_1.HTTPStatusCode.NOT_FOUND,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_FOUND,
            });
        }
        return guard;
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        throw error;
    }
});
const getGuardBySkills = (skills) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guard = yield prisma_1.default.guard.findMany({
            where: {
                skills: {
                    hasEvery: skills,
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                skills: true,
            },
        });
        if (!guard) {
            throw new error_1.CustomError({
                message: "User not found",
                statusCode: error_1.HTTPStatusCode.NOT_FOUND,
                internalMessage: error_1.InternalErrorMessages.USER_NOT_FOUND,
            });
        }
        return guard;
    }
    catch (e) {
        const error = (0, functions_1.formatError)(e);
        console.log(error);
        throw error;
    }
});
exports.userService = {
    createUser,
    createGuard,
    getUser,
    getGuard,
    getGuardBySkills,
};
//# sourceMappingURL=users.js.map