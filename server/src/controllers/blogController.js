import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import blogServices from "../services/blogServices.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const blogController = Router();

// Returns an object with all blogs
blogController.get('/blogs', async (req, res) => {
    try {
        const blogs = await blogServices.getAll();

        res.json(blogs);

    } catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
});

blogController.get('/blogs/latest', async (req, res) => {
    try {
        const latestBlogs = await blogServices.getLatest();

        res.json(latestBlogs);
    } catch (err) {
        console.error("Error fetching latest blogs:", err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
});

// Returns an object with all categories
blogController.get('/blogs/categories', async (req, res) => {
    try {
        const categories = await blogServices.getCategories();

        res.json(categories);

    } catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
});

// Returns all posts in the category
blogController.get('/blogs/:categorie/posts', async (req, res) => {
    const categorie = req.params.categorie;
    
    try {
        const categories = await blogServices.allPostsCategory(categorie);

        res.json(categories);

    } catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
});

// Returns an object with the details for a blog
blogController.get('/blogs/:blogId/details', async (req, res) => {
    const blogId = req.params.blogId;

    try {
        // const blog = await blogServices.getOne(blogId).populate('owner');
        const blog = await blogServices.getOne(blogId);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        res.json(blog);

    } catch (err) {
        console.error("Database error:", err);
        res.status(400).json({
            message: 'Invalid Blog ID format',
            error: err.message
        });
    }
});

// Returns an object with the details for a blog
blogController.get('/blogs/:blogId/edit', async (req, res) => {
    const blogId = req.params.blogId;
    const userId = req.user?._id;

    try {
        const blog = await blogServices.getOne(blogId);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        if (blog.owner.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to edit this blog!'
            });
        }

        res.json(blog);
    } catch (err) {
        console.error("Database error:", err);
        res.status(400).json({
            message: 'Invalid Blog ID format',
            error: err.message
        });
    }
});

// Blog edit request
blogController.put('/blogs/:blogId/edit', async (req, res) => {
    const blogId = req.params.blogId;
    const blogData = req.body;
    const userId = req.user?._id;

    try {
        const blog = await blogServices.getOne(blogId);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        if (String(blog.owner) !== String(userId)) {
            return res.status(403).json({
                message: 'You are not authorized to edit this blog!'
            });
        }

        const updatedBlog = await blogServices.update(blogId, blogData);

        res.json(updatedBlog);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).json({
            error: errorMessage,
            blog: blogData,
        });
    }
});

// Request to create a blog
blogController.post('/blogs/create', async (req, res) => {
    const ownerId = req.user?._id;

    if (!ownerId) {
        return res.status(401).json({ error: "You must be logged in to create a blog!" });
    }

    const blogData = req.body;  

    const isEmpty = Object.values(blogData).some(value => typeof value === 'string' && value.trim() === '');

    if (isEmpty) {
        return res.status(400).json({
            error: "All fields are required and cannot be empty!",
            blog: blogData
        });
    }

    try {
        const blog = await blogServices.create(blogData, ownerId);

        res.status(201).json(blog);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).json({
            error: errorMessage,
            blog: blogData
        });
    }
});

// Blog deletion request
blogController.delete('/blogs/:blogId/delete', async (req, res) => {
    const blogId = req.params.blogId;
    const userId = req.user?._id;

    try {
        const blog = await blogServices.getOne(blogId);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        if (String(blog.owner) !== String(userId)) {
            return res.status(403).json({ error: 'Unauthorized to delete this blog!' });
        }

        await blogServices.delete(blogId);

        res.status(204).end(); 
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID or Server Error' });
    }
});