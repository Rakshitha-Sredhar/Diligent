import env from './config/env.js';
import { connectToDatabase } from './config/db.js';
import app from './app.js';

async function startServer() {
  try {
    const connection = await connectToDatabase();
    connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    app.listen(env.port, () => {
      console.log(`API server listening on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;

