import mongoose, { Schema } from 'mongoose'
import { TComment, TPost } from './post.interface'

// Comment Schema
const CommentSchema: Schema = new Schema<TComment>(
  {
    commenter: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

const PostSchema: Schema = new Schema<TPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    tags: { type: String, enum: ['premium', 'regular'], required: true },
    upVotes: [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
    downVotes: [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
    comments: [CommentSchema],
    commentsCount: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    category: {
      type: String,
      enum: [
        'software_engineering',
        'tech',
        'ml',
        'vr',
        'watch',
        'mobile',
        'macbook',
        'gaming',
        'others'
      ],
      default: 'tech',
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

// Create the Post model
const Post = mongoose.model<TPost>('Post', PostSchema)

export default Post
