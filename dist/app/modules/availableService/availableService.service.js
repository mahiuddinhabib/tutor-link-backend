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
exports.AvailableServiceService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createAvailableService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAvailableService = yield prisma_1.default.availableService.create({
        data: payload,
        include: {
            service: true,
        },
    });
    return createdAvailableService;
});
const getAllAvailableServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const availableServices = yield prisma_1.default.availableService.findMany({
        include: {
            service: {
                include: {
                    tutor: true
                }
            },
        },
    });
    return availableServices;
});
const getSingleAvailableService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableService.findUnique({
        include: {
            service: true
        },
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Available service not found');
    }
    return result;
});
const updateAvailableService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.availableService.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Available service not found !');
    }
    const result = yield prisma_1.default.availableService.update({
        include: {
            service: true
        },
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteAvailableService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.availableService.findUnique({
        include: {
            service: true
        },
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Available service not found');
    }
    const result = yield prisma_1.default.availableService.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.AvailableServiceService = {
    createAvailableService,
    getAllAvailableServices,
    getSingleAvailableService,
    updateAvailableService,
    deleteAvailableService,
};
