import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  transporter: {
    target: 'pino-pretty',
  },
  base: {
    pid: false,
  },
  timestamp: () => `, "time" : "${dayjs().format()}"`,
});

export default log;
