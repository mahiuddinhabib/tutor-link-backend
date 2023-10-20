"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableServiceValidation = void 0;
const zod_1 = require("zod");
const createAvailableServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'ServiceId is required',
        }),
        startTime: zod_1.z.string({
            required_error: 'Start time is required',
        }),
        isBooked: zod_1.z.boolean().optional(),
    }),
});
const updateAvailableServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
        isBooked: zod_1.z.boolean().optional(),
    }),
});
exports.AvailableServiceValidation = {
    createAvailableServiceZodSchema,
    updateAvailableServiceZodSchema,
};
