import { Router } from "express";

export const homeController = Router();

homeController.get('/', (req, res) => {
    res.send('It works!');
})

homeController.post('/', (req, res) => {
    res.send('It works!');
})