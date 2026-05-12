import express from 'express';
const router = express.Router();
import Post from '../models/Post';

// GET / — Get all posts (optionally filter by category)
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const posts = await Post
            .find(filter)
            .sort({ createdAt: -1 }); // newest first
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /:id — Get a single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST / — Create a new post
router.post('/', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            category: req.body.category,
            emoji: req.body.emoji,
        });
        const saved = await post.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /:id — Delete a post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: '✅ Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;