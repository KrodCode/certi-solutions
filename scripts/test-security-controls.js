import { once } from 'node:events';

import app from '../src/app.js';

import {
  environment,
} from '../src/config/environment.js';

const server = app.listen(0, '127.0.0.1');

async function closeServer() {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

try {
  await once(server, 'listening');

  const address = server.address();

  if (!address || typeof address === 'string') {
    throw new Error(
      'No fue posible obtener el puerto de prueba.',
    );
  }

  const baseUrl =
    `http://127.0.0.1:${address.port}`;

  const homeResponse = await fetch(baseUrl);

  if (
    !homeResponse.headers.get(
      'content-security-policy',
    )
  ) {
    throw new Error(
      'No se encontró la política CSP.',
    );
  }

  console.log(
    '[OK] Política CSP configurada.',
  );

  const healthResponse = await fetch(
    `${baseUrl}/api/health`,
  );

  const cacheControl =
    healthResponse.headers.get('cache-control');

  if (!cacheControl?.includes('no-store')) {
    throw new Error(
      'La API no incluye Cache-Control no-store.',
    );
  }

  console.log(
    '[OK] Caché de la API deshabilitada.',
  );

  const invalidContentTypeResponse = await fetch(
    `${baseUrl}/api/agent/questions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'consulta no válida',
    },
  );

  const invalidContentTypeBody =
    await invalidContentTypeResponse.json();

  if (
    invalidContentTypeResponse.status !== 415 ||
    invalidContentTypeBody.error?.code !==
      'UNSUPPORTED_MEDIA_TYPE'
  ) {
    throw new Error(
      'El contenido text/plain no fue rechazado.',
    );
  }

  console.log(
    '[OK] Content-Type no permitido rechazado.',
  );

  for (
    let index = 0;
    index < environment.agentRateLimitMax;
    index += 1
  ) {
    const response = await fetch(
      `${baseUrl}/api/agent/questions`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question:
            `Consulta de validación de seguridad ${index}`,
        }),
      },
    );

    if (response.status !== 200) {
      throw new Error(
        `La solicitud permitida ${index + 1} respondió con estado ${response.status}.`,
      );
    }
  }

  const limitedResponse = await fetch(
    `${baseUrl}/api/agent/questions`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question:
          'Consulta posterior al límite permitido',
      }),
    },
  );

  const limitedBody = await limitedResponse.json();

  if (
    limitedResponse.status !== 429 ||
    limitedBody.error?.code !==
      'RATE_LIMIT_EXCEEDED'
  ) {
    throw new Error(
      'El límite de solicitudes no fue aplicado.',
    );
  }

  console.log(
    '[OK] Límite de solicitudes aplicado.',
  );

  console.log('');
  console.log(
    'Controles de seguridad validados correctamente.',
  );
} catch (error) {
  console.error(
    'Falló la validación de seguridad:',
    error.message,
  );

  process.exitCode = 1;
} finally {
  await closeServer();
}
