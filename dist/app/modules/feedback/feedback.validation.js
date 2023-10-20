"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({
            required_error: 'Review is required',
        }),
        rating: zod_1.z
            .number({
            required_error: 'Rating is required',
        })
            .min(1, {
            message: 'invalid rating range',
        })
            .max(5, {
            message: 'invalid rating range',
        })
            .int({ message: 'rating must be integer' }),
        serviceId: zod_1.z.string({
            required_error: 'serviceId is required',
        }),
    }),
});
const updateFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string().optional(),
        rating: zod_1.z
            .number()
            .min(1, {
            message: 'invalid rating range',
        })
            .max(5, {
            message: 'invalid rating range',
        })
            .int({ message: 'rating must be integer' })
            .optional(),
    }),
});
exports.FeedbackValidation = {
    createFeedbackZodSchema,
    updateFeedbackZodSchema,
};
