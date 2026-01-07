import { Router } from "express";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export const userController = Router();

userController.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);

        res.send(JSON.stringify(token));

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(404).send({
            error: errorMessage,
        });
    }
});

userController.post('/users/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const token = await userService.register(username, email, password, confirmPassword);

        res.status(200).json(token);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(404).send({
            error: errorMessage,
        });
    }
})

userController.post('/users/logout', (req, res) => {
    res.send('Logout');
});