import mongoose from 'mongoose';
import User from '../models/User.js';

mongoose.set('strictQuery', true);

const { Schema, model, SchemaTypes } = mongoose;

const interactionSchema = new Schema(
  {
    type: {
      type: SchemaTypes.String, // just String is also acceptable
      required: true,
    },
    content: {
      type: SchemaTypes.String,
      required: true,
    },
    relationId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    userId: {
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

const Interaction = model('Interaction', interactionSchema);

export default Interaction;
