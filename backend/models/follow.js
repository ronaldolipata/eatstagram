import mongoose from 'mongoose';
import User from '../models/User.js';

mongoose.set('strictQuery', true);

const { Schema, model, SchemaTypes } = mongoose;

const followSchema = new Schema(
  {
    followerId: {
      type: SchemaTypes.ObjectId,
      ref: User,
    },
    followThisId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: User,
    },
    deletedAt: {
      type: SchemaTypes.Date, // just Date is acceptable
      default: null,
    },
  },
  { timestamps: true }
);

const Follow = model('Follow', followSchema);

export default Follow;
