import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AvailableServiceRoutes } from '../modules/availableService/availableService.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SubjectRoutes } from '../modules/subject/subject.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/subjects',
    route: SubjectRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/available-services',
    route: AvailableServiceRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
