"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const availableService_route_1 = require("../modules/availableService/availableService.route");
const booking_route_1 = require("../modules/booking/booking.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const profile_route_1 = require("../modules/profile/profile.route");
const service_route_1 = require("../modules/service/service.route");
const subject_route_1 = require("../modules/subject/subject.route");
const user_route_1 = require("../modules/user/user.route");
const faq_route_1 = require("../modules/faq/faq.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/subjects',
        route: subject_route_1.SubjectRoutes,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoutes,
    },
    {
        path: '/available-services',
        route: availableService_route_1.AvailableServiceRoutes,
    },
    {
        path: '/booking',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/feedback',
        route: feedback_route_1.FeedbackRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.ProfileRoutes,
    },
    {
        path: '/faq',
        route: faq_route_1.FAQRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
