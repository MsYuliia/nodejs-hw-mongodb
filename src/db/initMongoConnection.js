import mongoose from 'mongoose';

async function initMongoConnection() {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    throw new Error(
      'MongoDB connection environment variables are not fully defined',
    );
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

export { initMongoConnection };
