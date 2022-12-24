import mongoose from 'mongoose';
import User from './User.js';
import Interaction from './Interaction.js';

mongoose.set('strictQuery', true);

const { Schema, model, SchemaTypes } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: User,
    },
    content: {
      type: SchemaTypes.String, // just String is acceptable
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    interactionId: {
      type: SchemaTypes.Array,
      default: [],
      ref: Interaction,
    },
    deletedAt: {
      type: SchemaTypes.Date, // just Date is acceptable
      default: null,
    },
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;
