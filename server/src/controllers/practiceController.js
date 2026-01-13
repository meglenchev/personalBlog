import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import practiceServices from "../services/practiceServices.js";

export const practiceController = Router();

// Returns an object with all practices
practiceController.get('/practices', async (req, res) => {
    try {
        const practices = await practiceServices.getAll();

        res.jeson(practices);
    } catch (err) {
        console.error("Error fetching practices:", err);

        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
});

// Returns an object with the latest practices
practiceController.get('/practices/latest', async (req, res) => {
    try {
        const lastestPractices = await practiceServices.getLast();

        res.json(lastestPractices);
    } catch (err) {
        console.error("Error fetching latest practices:", err);

        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
})

// Returns details of a specific practice
practiceController.get('/practices/:practiceId/details', async (req, res) => {
    const practiceId = req.params.practiceId;

    try {
        const practice = await practiceServices.getOne(practiceId);

        if (!practice) {
            return res.status(404).json({
                message: 'Practice not found'
            });
        }

        res.json(practice);
    } catch (err) {
        console.error("Database error:", err);

        res.status(400).json({
            message: 'Invalid Practice ID format',
            error: err.message
        });
    }
});

// Returns details for edit of a specific practice
practiceController.get('/practices/:practiceId/edit', async (req, res) => {
    const practiceId = req.params.practiceId;
    const userId = req.user?._id;

    try {
        const practice = await practiceServices.getOne(practiceId);

        if (!practice) {
            return res.status(404).json({
                message: 'Practice not found'
            });
        }

        if (practice.owner.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to edit this practice!'
            });
        }

        res.json(practice);
    } catch (err) {
        console.error("Database error:", err);

        res.status(400).json({
            message: 'Invalid Practice ID format',
            error: err.message
        });
    }
})

// Edit a specific practice
practiceController.put('/practices/:practiceId/edit', async (req, res) => {
    const practiceId = req.params.practiceId;
    const practiceData = req.body;
    const userId = req.user?._id;

    try {
        const practice = await practiceServices.getOne(practiceId);

        if (!practice) {
            return res.status(404).json({
                message: 'Practice not found'
            });
        }

        if (String(practice.owner) !== String(userId)) {
            return res.status(403).json({
                message: 'You are not authorized to edit this practice!'
            });
        }

        const updatedPractice = await practiceServices.update(practiceData, practiceId);

        res.json(updatedPractice);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).json({
            error: errorMessage,
            practice: practiceData,
        });
    }
});

// Create a new practice
practiceController.post('/practices/create', async (req, res) => {
    const ownerId = req.user?._id;

    if (!ownerId) {
        return res.status(401).json({
            message: 'You must be logged in to create a practice!'
        });
    }

    const practiceData = req.body;

    const isEmpty = Object.values(practiceData).some(value => typeof value === 'string' && value.trim() === '');

    if (isEmpty) {
        return res.status(400).json({
            error: "All fields are required and cannot be empty!",
            practice: practiceData
        });
    }

    try {
        const createdPractice = await practiceServices.create(practiceData, ownerId);

        res.status(201).json(createdPractice);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).json({
            error: errorMessage,
            practice: practiceData
        });
    }
});

// Delete a specific practice
practiceController.delete('/practices/:practiceId/delete', async (req, res) => {
    const practiceId = req.params.practiceId;
    const userId = req.user?._id;

    try {
        const practice = await practiceServices.getOne(practiceId);

        if (!practice) {
            return res.status(404).json({
                message: 'Practice not found'
            });
        }

        if (String(practice.owner) !== String(userId)) {
            return res.status(403).json({
                message: 'Unauthorized to delete this practice!'
            });
        }

        await practiceServices.delete(practiceId);

        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID or Server Error' });
    }
});