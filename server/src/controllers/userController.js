import { Router } from "express";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import jwt from 'jsonwebtoken';

export const userController = Router();

userController.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.login(email, password);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { 
            httpOnly: true, // Предотвратява достъп от JS (защита от XSS)
            secure: process.env.NODE_ENV === 'production', // Само през HTTPS (в production)
            sameSite: 'Strict', // Защита от CSRF
            maxAge: 3600000 
        });

        res.status(200).json({
            isLoggedIn: true,
            username: user.username,
            email: user.email, 
            _id: user._id,
        })

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(401).send({
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
    res.clearCookie('token', { 
        httpOnly: true,
        secure: true, 
        sameSite: 'Strict' 
    });

    res.status(200).json({ message: 'Logged out successfully' });
});