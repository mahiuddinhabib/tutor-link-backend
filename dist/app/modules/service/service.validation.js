"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        tutorId: zod_1.z.string({
            required_error: 'Tutor id is required',
        }),
        price: zod_1.z.union([zod_1.z.string(), zod_1.z.number()], {
            required_error: "Price is required"
        }),
        subjectId: zod_1.z.string({
            required_error: 'Subject id is required',
        }),
    }),
});
const updateServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        tutorId: zod_1.z.string().optional(),
        price: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).optional(),
        subjectId: zod_1.z.string().optional(),
    }),
});
exports.ServiceValidation = {
    createServiceZodSchema,
    updateServiceZodSchema,
};
