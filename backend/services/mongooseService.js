import mongoose from 'mongoose';

const mongooseService = async (hostOrUri, dbName, user, pass) => {
  mongoose.connect(hostOrUri, {
    dbName,
    user,
    pass,
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
};

export default mongooseService;
