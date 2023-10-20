"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        availableServiceId: zod_1.z.string({
            required_error: 'ServiceId is required',
        }),
    }),
});
const updateBookingStatusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...booking_constant_1.bookingStatus], {
            required_error: 'Status is required',
        }),
    }),
});
exports.BookingValidation = {
    createBookingZodSchema,
    updateBookingStatusZodSchema,
};
