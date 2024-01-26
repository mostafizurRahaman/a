import express, { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { authRoutes } from "./../modules/auth/auth.route";

const router = express.Router();

interface IModuleRoutes {
  path: string;
  route: Router;
}

const modulesRoutes: IModuleRoutes[] = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
