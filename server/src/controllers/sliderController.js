import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import sliderServices from "../services/sliderServices.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const sliderController = Router();

// Returns an object with all sliders
sliderController.get('/slider/all', async (req, res) => {
    try {
        const sliders = await sliderServices.getAll();

        res.json(sliders)
    } catch (err) {
        console.error("Error fetching sliders:", err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
});

// Request to create a slider
sliderController.post('/slider/create', verifyToken(['admin']), async (req, res) => {
    const { sliderContent, sliderImage } = req.body;

    if (!sliderImage || sliderImage.trim() === '') {
        return res.status(400).json({
            error: "Slider image is required",
            slider: { sliderContent, sliderImage }
        });
    }

    try {
        const newSlider = await sliderServices.create({ sliderContent, sliderImage });

        res.status(201).json(newSlider);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).json({
            error: errorMessage,
            slider: sliderData
        });
    }
});

// Slider edit request
sliderController.put('/slider/:sliderId/edit', verifyToken(['admin']), async (req, res) => {
    const sliderId = req.params.sliderId;
    const sliderData = req.body;

    try {
        const slider = await sliderServices.getOne(sliderId);

        if (!slider) {
            return res.status(404).json({ error: 'Slider not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized to edit this slider!' });
        }

        const updatedSlider = await sliderServices.update(sliderId, sliderData);

        res.json(updatedSlider);

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).json({
            error: errorMessage,
            slider: sliderData,
        });
    }
});

// Slider deletion request
sliderController.delete('/slider/:sliderId/delete', verifyToken(['admin']), async (req, res) => {
    const sliderId = req.params.sliderId

    try {
        const slider = await sliderServices.getOne(sliderId);

        if (!slider) {
            return res.status(404).json({ error: 'Slider not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized to delete this slider!' });
        }

        await sliderServices.delete(sliderId);

        res.status(204).end();;
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID or Server Error' });
    }
});