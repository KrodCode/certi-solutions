import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import indexRouter from './routes/index.routes.js';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

const app = express();

app.disable('x-powered-by');

app.use(helmet());

app.use(
  express.json({
    limit: '20kb',
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

app.use('/api', indexRouter);

app.use((request, response) => {
  response.status(404).json({
    error: 'Recurso no encontrado.',
    path: request.originalUrl,
  });
});

app.use((error, _request, response, _next) => {
  console.error('Error interno no controlado:', error.message);

  response.status(500).json({
    error: 'Ocurrió un error interno en la aplicación.',
  });
});

export default app;
