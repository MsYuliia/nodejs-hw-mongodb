import mongoose from 'mongoose';

async function initMongoConnection() {
  const { MONGODB_DB, MONGODB_PASSWORD, MONGODB_USER,MONGODB_URL } = process.env;

  if (!MONGODB_USER||!MONGODB_PASSWORD||!MONGODB_URL||!MONGODB_DB) {
    throw new Error(
      'MongoDB connection environment variables are not fully defined',
    );
  }

 const MONGO_URI =`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/?retryWrites=true&w=majority&appName=${MONGODB_DB}`

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
