import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '../routes.js';
import deserializeUser from '../middleware/deserializeUser.js';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3006',
  'http://localhost:1337',
  'http://localhost:3006',
  'http://localhost:3006',
  'http://colidiali-review.s3-website-eu-west-1.amazonaws.com',
  'https://van-finder.onrender.com',
  'http://van-finder.onrender.com',
  'https://colidiali.onrender.com',
  'https://colidiali-frontend2.onrender.com',
];

function createServer() {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(deserializeUser);

  // Enable CORS
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            ' The CORS policy for this site does not allow access from the specified origin';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );

  routes(app);

  // Production config
  const __dirname = path.resolve();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('/*', (req, res) => {
      const indexPath = path.join(
        __dirname,
        '../client',
        'build',
        'index.html'
      );

      console.log(`Serving index.html from: ${indexPath}`);

      res.sendFile(indexPath);
    });
  } else {
    app.get('/', (req, res) => {
      res.send('API is running ...');
    });
  }

  return app;
}

export default createServer;
