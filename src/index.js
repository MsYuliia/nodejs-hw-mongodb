import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.example' });

async function startApplication() {
  try {
    await initMongoConnection();
    setupServer(); // Ensure the server starts
  } catch (error) {
    console.error('Failed to start the application:', error.message);
    process.exit(1);
  }
}

startApplication();
