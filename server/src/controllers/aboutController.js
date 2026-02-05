import { Router } from "express";
import aboutServices from "../services/aboutServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { sanitizeHtml } from "../utils/sanitizeUtils.js";

export const aboutController = Router()

aboutController.get('/about', async (req, res) => {
    try {
        const about = await aboutServices.getOne();

        res.json(about || {});
    } catch (err) {
        console.error("Error fetching About:", err);

        res.status(400).json({
            error: getErrorMessage(err)
        });
    }
});

aboutController.get('/about/edit', verifyToken(['admin']), async (req, res) => {
    try {
        const about = await aboutServices.getOne();

        res.json(about);
    } catch (err) {
        console.error("Error fetching About:", err);

        res.status(400).json({
            error: getErrorMessage(err)
        });
    }
});

aboutController.put('/about/edit', verifyToken(['admin']), async (req, res) => {
    let { aboutImage, slogan, summary, info } = req.body;

    try {
        
        if (info) {
            info = sanitizeHtml(info);
        }

        const about = await aboutServices.update({ aboutImage, slogan, summary, info });

        res.json(about);
    } catch (err) {
        res.status(400).json({
            error: getErrorMessage(err)
        });
    }
});