import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const { Schema, model, SchemaTypes } = mongoose;

const catcherSchema = new Schema({
  avatar: {
    type: SchemaTypes.String,
  },
  authId: {
    type: SchemaTypes.String,
    required: true,
  },
});

const UserCatcher = model('UserCatcher', catcherSchema);

export default UserCatcher;
