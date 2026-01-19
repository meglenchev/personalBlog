import { Router } from "express";
import settingsServices from "../services/settingsServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const settingsController = Router()

settingsController.get('/settings', async (req, res) => {
    try {
        const settings = await settingsServices.getOne();

        res.json(settings || {});
    } catch (err) {
        console.error("Error fetching Settings:", err);

        res.status(400).json({
            error: getErrorMessage(err)
        });
    }
});

settingsController.get('/settings/edit', verifyToken(['admin']), async (req, res) => {
    try {
        const settings = await settingsServices.getOne();

        res.json(settings)
    } catch (err) {
        console.error("Error fetching Settings:", err);

        res.status(400).json({
            error: getErrorMessage(err)
        });
    }
});

settingsController.put('/settings/edit', verifyToken(['admin']), async (req, res) => {
    const { name, email, facebook, instagram, presentation, headerImg, authorImg } = req.body;

    try {
        const settings = await settingsServices.update({ name, email, facebook, instagram, presentation, headerImg, authorImg });

        res.json(settings);
    } catch (err) {
        console.error("Error updating Settings:", err);

        res.status(400).json({
            error: getErrorMessage(err)
        });
    }
});