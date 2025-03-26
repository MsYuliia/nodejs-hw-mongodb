import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getContacts, getContactById } from './controllers/contacts.js';

function setupServer() {
  const app = express();

  // Middleware setup
  app.use(cors());
  app.use(pino());

  // Routes
  app.get('/contacts', getContacts);
  app.get('/contacts/:contactId', getContactById);

  // Handle non-existing routes
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };
