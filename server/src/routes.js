import { Router } from "express";
import { homeController } from "./controllers/homeController.js";
import { userController } from "./controllers/userController.js";
import { blogController } from "./controllers/blogController.js";
import { practiceController } from "./controllers/practiceController.js";

export const routes = Router();

routes.use(homeController);
routes.use(userController);
routes.use(blogController);
routes.use(practiceController);

routes.use('/*splat', (req, res) => {
    res.status(404).json({ message: 'Маршрутът не е намерен' });
});