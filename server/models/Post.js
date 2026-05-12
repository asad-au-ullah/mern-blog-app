import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxLength: 150,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            minLength: [20, 'Content must be at least 20 characters'],
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
        },
        category: {
            type: String,
            enum: ['Tech', 'Health', 'Science', 'Business', 'Sports', 'World'],
            default: 'Tech',
        },
        emoji: {
            type: String,
            default: '📰',
        },
    },
    { timestamps: true }  // adds createdAt & updatedAt automatically
);

export default mongoose.model('Post', PostSchema);