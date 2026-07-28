import app from './app.js';
import { environment } from './config/environment.js';

const server = app.listen(
  environment.port,
  environment.host,
  () => {
    console.log(
      `Certi-Solutions ejecutándose en http://${environment.host}:${environment.port}`,
    );
  },
);

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `El puerto ${environment.port} ya se encuentra en uso.`,
    );

    process.exit(1);
  }

  console.error('No fue posible iniciar el servidor:', error.message);
  process.exit(1);
});
