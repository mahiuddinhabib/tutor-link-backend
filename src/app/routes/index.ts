import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { SubjectRoutes } from '../modules/subject/subject.route';
// import { BookRoutes } from '../modules/book/book.route';
// import { OrderRoutes } from '../modules/order/order.route';
// import { ProfileRoutes } from '../modules/profile/profile.route';

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
  /* {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  }, */
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;