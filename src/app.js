import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  environment,
} from './config/environment.js';

import {
  disableApiCaching,
} from './middlewares/request-security.middleware.js';

import indexRouter from './routes/index.routes.js';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

const app = express();

if (process.env.VERCEL === '1') {
  app.set('trust proxy', 1);
}

app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        upgradeInsecureRequests:
          environment.isProduction
            ? []
            : null,
      },
    },
  }),
);

app.use(
  express.json({
    limit: '20kb',
    strict: true,
  }),
);

app.use(
  express.urlencoded({
    extended: false,
    limit: '20kb',
  }),
);

app.use(
  express.static(
    path.join(currentDirectory, '..', 'public'),
  ),
);

app.use(
  '/api',
  disableApiCaching,
  indexRouter,
);

app.use((request, response) => {
  response.status(404).json({
    error: 'Recurso no encontrado.',
    path: request.originalUrl,
  });
});

app.use((error, _request, response, _next) => {
  console.error(
    'Error interno no controlado:',
    error.message,
  );

  response.status(500).json({
    error:
      'Ocurrió un error interno en la aplicación.',
  });
});

export default app;
