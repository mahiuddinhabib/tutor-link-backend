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
exports.SubjectService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createSubject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdSubject = yield prisma_1.default.subject.create({
        data: payload,
    });
    return createdSubject;
});
const getAllSubjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = yield prisma_1.default.subject.findMany();
    return subjects;
});
const getSingleSubject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.subject.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Subject not found');
    }
    return result;
});
const updateSubject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.subject.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Subject not found !');
    }
    const result = yield prisma_1.default.subject.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteSubject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.subject.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Subject not found');
    }
    const result = yield prisma_1.default.subject.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.SubjectService = {
    createSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
    deleteSubject,
};
