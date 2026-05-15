import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/posts.controller.js';
const router = express.Router();

// GET / — Get all posts (optionally filter by category)
router.get('/', getPosts);

// GET /:id — Get a single post
router.get('/:id', getPost);

// POST / — Create a new post
router.post('/', createPost);

// PUT /:id — Update a post
router.put('/:id', updatePost);

// DELETE /:id — Delete a post
router.delete('/:id', deletePost);

export default router;