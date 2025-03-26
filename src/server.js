import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

function setupServer() {
  const app = express();

  // Middleware setup
  app.use(cors());
  app.use(pino());

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
