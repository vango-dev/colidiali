import dotenv from 'dotenv';
import createServer from './utils/server.js';
import connect from './utils/connect.js';
import logger from './utils/logger.js';

dotenv.config();

const app = createServer();

app.listen(process.env.PORT, async () => {
  logger.info(`App is running at http://localhost:${process.env.PORT}`);

  await connect();
});
031