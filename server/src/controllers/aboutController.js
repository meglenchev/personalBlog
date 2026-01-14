import { Router } from "express";
import aboutServices from "../services/aboutServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";

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

aboutController.put('/about/edit', async (req, res) => {
    const { aboutImage, slogan, summary, info } = req.body;
    
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ 
            message: 'Forbidden: Admins only.' 
        });
    }

    try {
        const about = await aboutServices.update({ aboutImage, slogan, summary, info });

        res.json(about);
    } catch (err) {
        res.status(400).json({
            error: getErrorMessage(err)
        });
    }
});