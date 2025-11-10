import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
};

export default env;

