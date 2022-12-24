import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const { Schema, model, SchemaTypes } = mongoose;

const userSchema = new Schema({
  username: {
    type: SchemaTypes.String, // just String is acceptable
    required: true,
  },
  userInfo: {
    type: SchemaTypes.Object, // just Object is acceptable
    required: true,
  },
  avatar: {
    type: SchemaTypes.String,
  },
  authId: {
    type: SchemaTypes.String,
    required: true,
  },
});

const User = model('User', userSchema);

export default User;
