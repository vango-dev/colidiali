import mongoose from 'mongoose';
import logger from './logger.js';

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
