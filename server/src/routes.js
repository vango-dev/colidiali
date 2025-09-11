import validateResource from './middleware/validateResource.js';
import {
  verifyTransporterPhoneHandler,
  createTransporterHandler,
  getTransportersHandler,
  sendVerificationCode,
  checkVerificationCode,
  updateTransporterHandler,
  loginTransporterHandler,
  getCurrentTransporter,
  updateTransporterParameterHandler,
  deleteTransporterHandler,
} from './controller/transporter.controller.js';
import { createTransporterSchema } from './schema/transporter.schema.js';
import requireUser from './middleware/requireUser.js';
import { deleteSessionsHandler } from './controller/sessions.controller.js';
import {
  addTransporterDepartureHandler,
  deleteTransporterDepartureHandler,
  getTransporterDeparturesHandler,
  updateTransporterDepartureHandler,
  getTransporterNextDepartureHandler,
  getDeparturesHandler,
} from './controller/departure.controller.js';
import {
  addTransporterCategoryHandler,
  deleteTransporterCategoryHandler,
  getTransporterCategoryHandler,
  updateTransporterCategoryHandler,
} from './controller/category.controller.js';

function routes(app) {
  app.get('/healthcheck', (req, res) => res.sendStatus(200));

  // Transporter routes
  app.post('/api/transporters/verify', verifyTransporterPhoneHandler);

  app.get('/api/transporters/list', getTransportersHandler);

  app.get(
    '/api/transporters/profile/detail',
    requireUser,
    getCurrentTransporter
  );

  app.post('/api/transporters/new', createTransporterHandler);
  app.post('/api/transporters/login', loginTransporterHandler);

  app.get('/api/transporters/verify/:phone', sendVerificationCode);

  app.get(`/api/transporters/verify/:phone/code/:code`, checkVerificationCode);

  app.put(
    '/api/transporters/profile/update',
    requireUser,
    updateTransporterHandler
  );

  app.put(
    '/api/transporters/profile/update/parameter',
    requireUser,
    updateTransporterParameterHandler
  );

  app.delete('/api/transporters', requireUser, deleteTransporterHandler);

  // Departures routes

  app.get(
    '/api/departures/:departure?/:destination?/:date',
    getDeparturesHandler
  );

  app.get('/api/departures', requireUser, getTransporterDeparturesHandler);
  app.get(
    '/api/departures/next/departure',
    requireUser,
    getTransporterNextDepartureHandler
  );

  app.post('/api/departures/new', requireUser, addTransporterDepartureHandler);

  app.delete(
    '/api/departures/:departureId/delete',
    requireUser,
    deleteTransporterDepartureHandler
  );

  app.put(
    '/api/departures/:departureId/update',
    requireUser,
    updateTransporterDepartureHandler
  );

  // Categories routes

  app.get('/api/categories', requireUser, getTransporterCategoryHandler);

  app.post('/api/categories/new', requireUser, addTransporterCategoryHandler);

  app.delete(
    '/api/categories/:categoryId/delete',
    requireUser,
    deleteTransporterCategoryHandler
  );

  app.put(
    '/api/categories/:categoryId/update',
    requireUser,
    updateTransporterCategoryHandler
  );

  // Sessions routes
  // app.post('/api/sessions', createUserSessionHandler);
  app.delete('/api/sessions', requireUser, deleteSessionsHandler);
}

export default routes;
