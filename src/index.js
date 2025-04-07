import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/fileUtils.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './utils/constance.js';
import { initCloudinary } from './utils/cloudinaryHelper.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function startApplication() {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
    initCloudinary();
  } catch (error) {
    console.error('Failed to start the application:', error.message);
    process.exit(1);
  }
}

startApplication();
