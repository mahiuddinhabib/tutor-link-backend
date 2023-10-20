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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// import { asyncForEach } from '../../../shared/utils';
// import { IBookingCreateData } from './booking.interface';
const createBooking = (user, availableServiceId) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBooking = yield prisma_1.default.booking.create({
        data: { userId: user === null || user === void 0 ? void 0 : user.userId, availableServiceId },
        include: {
            availableService: true,
        },
    });
    return createdBooking;
});
const getAllBookings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let bookings;
    if ((user === null || user === void 0 ? void 0 : user.role) === user_1.USER_ROLE.ADMIN) {
        bookings = yield prisma_1.default.booking.findMany({
            include: {
                availableService: {
                    include: {
                        service: {
                            include: {
                                tutor: true,
                            },
                        },
                    },
                },
                user: true,
            },
        });
    }
    else {
        bookings = yield prisma_1.default.booking.findMany({
            where: {
                userId: {
                    equals: user === null || user === void 0 ? void 0 : user.userId,
                },
            },
            include: {
                availableService: {
                    include: {
                        service: {
                            include: {
                                tutor: true,
                            },
                        },
                    },
                },
            },
        });
    }
    return bookings;
});
const getAllPastBookings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let pastBookings;
    if ((user === null || user === void 0 ? void 0 : user.role) === user_1.USER_ROLE.ADMIN) {
        pastBookings = yield prisma_1.default.pastBooking.findMany({
            include: {
                user: true,
            },
        });
    }
    else {
        pastBookings = yield prisma_1.default.pastBooking.findMany({
            where: {
                userId: {
                    equals: user === null || user === void 0 ? void 0 : user.userId,
                },
            },
            include: {
                user: true
            }
        });
    }
    return pastBookings;
});
const getSingleBooking = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
        include: {
            availableService: true,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.role) === user_1.USER_ROLE.ADMIN ||
        ((user === null || user === void 0 ? void 0 : user.role) === user_1.USER_ROLE.CUSTOMER && (user === null || user === void 0 ? void 0 : user.userId) === (booking === null || booking === void 0 ? void 0 : booking.userId))) {
        return booking;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
});
const updateBookingStatus = (id, updatedStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedResult = yield prisma_1.default.$transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBooking = yield trx.booking.update({
            where: {
                id,
            },
            data: {
                status: updatedStatus,
            },
        });
        if (!updatedBooking) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to update status');
        }
        if (updatedStatus === 'approved') {
            yield trx.availableService.update({
                where: {
                    id: updatedBooking === null || updatedBooking === void 0 ? void 0 : updatedBooking.availableServiceId,
                },
                data: {
                    isBooked: true,
                },
            });
        }
        else if (updatedStatus === 'rejected') {
            yield trx.pastBooking.create({
                data: {
                    status: 'rejected',
                    userId: updatedBooking.userId,
                    availableServiceId: updatedBooking.availableServiceId,
                },
            });
            yield trx.booking.delete({
                where: {
                    id,
                },
            });
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to update status');
        }
        // console.log(updatedBooking, pastBooking);
        return updatedBooking;
    }));
    return updatedResult;
});
const cancelOrCompleteBooking = (id, user, updatedStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    if ((user === null || user === void 0 ? void 0 : user.userId) !== (isExist === null || isExist === void 0 ? void 0 : isExist.userId)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden');
    }
    const updatedResult = yield prisma_1.default.$transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        let deletedBooking;
        if ((isExist.status === 'pending' && updatedStatus === 'cancelled') ||
            (isExist.status === 'approved' && updatedStatus === 'completed')) {
            yield trx.availableService.update({
                where: {
                    id: isExist.availableServiceId,
                },
                data: {
                    isBooked: false,
                },
            });
            yield trx.booking.delete({
                where: {
                    id,
                },
            });
            deletedBooking = yield trx.pastBooking.create({
                data: {
                    status: updatedStatus,
                    userId: isExist.userId,
                    availableServiceId: isExist.availableServiceId,
                },
            });
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to update booking');
        }
        return deletedBooking;
    }));
    return updatedResult;
});
exports.BookingService = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    updateBookingStatus,
    cancelOrCompleteBooking,
    getAllPastBookings,
};
