import Post from '../models/Post.js';


//#region GET REQUESTS

const getPosts = async (req, res) => {
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
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//#endregion

//#region POST

const createPost = async (req, res) => {
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
}

//#endregion

//#region PUT

const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//#endregion

//#region DELETE

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: '✅ Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//#endregion

export { getPosts, getPost, createPost, updatePost, deletePost };