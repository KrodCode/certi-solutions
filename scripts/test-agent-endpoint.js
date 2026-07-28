import { once } from 'node:events';

import app from '../src/app.js';

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

async function postQuestion(baseUrl, question) {
  const response = await fetch(
    `${baseUrl}/api/agent/questions`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
      }),
    },
  );

  const body = await response.json();

  return {
    status: response.status,
    body,
  };
}

try {
  await once(server, 'listening');

  const address = server.address();

  if (
    !address ||
    typeof address === 'string'
  ) {
    throw new Error(
      'No fue posible obtener el puerto de prueba.',
    );
  }

  const baseUrl =
    `http://127.0.0.1:${address.port}`;

  const validResponse = await postQuestion(
    baseUrl,
    '¿Qué documentos se deben presentar para solicitar una certificación?',
  );

  if (validResponse.status !== 200) {
    throw new Error(
      'La consulta válida no respondió con estado 200.',
    );
  }

  if (
    validResponse.body.result?.referenceId !==
    'CERT-002'
  ) {
    throw new Error(
      'La consulta válida no devolvió la referencia CERT-002.',
    );
  }

  console.log(
    '[OK] Consulta válida respondida con CERT-002.',
  );

  const invalidResponse = await postQuestion(
    baseUrl,
    ' ',
  );

  if (invalidResponse.status !== 400) {
    throw new Error(
      'La consulta vacía no respondió con estado 400.',
    );
  }

  if (
    invalidResponse.body.error?.code !==
    'INVALID_QUESTION'
  ) {
    throw new Error(
      'La consulta vacía no devolvió INVALID_QUESTION.',
    );
  }

  console.log(
    '[OK] Consulta vacía rechazada correctamente.',
  );

  const unknownResponse = await postQuestion(
    baseUrl,
    'astronomía cuántica galáctica',
  );

  if (unknownResponse.status !== 200) {
    throw new Error(
      'La consulta sin coincidencias no respondió con estado 200.',
    );
  }

  if (
    unknownResponse.body.result?.found !== false
  ) {
    throw new Error(
      'La consulta desconocida debería indicar found=false.',
    );
  }

  console.log(
    '[OK] Consulta sin coincidencias controlada.',
  );

  console.log('');
  console.log(
    'Pruebas del endpoint del agente completadas.',
  );
} catch (error) {
  console.error(
    'Falló la prueba del endpoint:',
    error.message,
  );

  process.exitCode = 1;
} finally {
  await closeServer();
}
