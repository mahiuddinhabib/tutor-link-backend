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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const service_constant_1 = require("./service.constant");
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdService = yield prisma_1.default.service.create({
        data: payload,
        include: {
            tutor: true,
            subject: true,
        },
    });
    return createdService;
});
const getAllServices = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const totalService = yield prisma_1.default.service.count();
    // console.log(totalService);
    const { limit: size } = paginationOptions, rest = __rest(paginationOptions, ["limit"]);
    if (!size) {
        paginationOptions = Object.assign({ limit: totalService }, rest);
    }
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { search, minPrice, maxPrice } = filters, filterData = __rest(filters, ["search", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: service_constant_1.serviceSearchableFields.map(field => {
                if (service_constant_1.serviceRelationalFields.includes(field)) {
                    return {
                        [field]: {
                            title: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    };
                }
                else {
                    return {
                        [field]: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    };
                }
            }),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (service_constant_1.serviceRelationalFields.includes(key)) {
                    return {
                        [key]: {
                            title: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    if (minPrice) {
        const minP = parseFloat(minPrice);
        andConditions.push({ price: { gte: minP } });
    }
    if (maxPrice) {
        const maxP = parseFloat(maxPrice);
        andConditions.push({ price: { lte: maxP } });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.service.findMany({
        include: {
            tutor: true,
            subject: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                title: 'asc',
            },
    });
    const total = yield prisma_1.default.service.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const getServicesBySubject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findMany({
        where: {
            subjectId: id,
        },
        include: {
            tutor: true,
            subject: true,
        },
    });
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    return result;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found !');
    }
    const result = yield prisma_1.default.service.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const result = yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ServiceService = {
    createService,
    getAllServices,
    getSingleService,
    getServicesBySubject,
    updateService,
    deleteService,
};
