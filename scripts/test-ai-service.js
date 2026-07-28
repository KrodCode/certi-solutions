import {
  generateGroundedAnswer,
} from '../src/services/agent-response.service.js';

const result = await generateGroundedAnswer(
  '¿Qué documentos se deben presentar para solicitar una certificación?',
);

if (!result.found) {
  throw new Error(
    'No se encontró una respuesta documental.',
  );
}

if (result.referenceId !== 'CERT-002') {
  throw new Error(
    `Se esperaba CERT-002, pero se obtuvo ${result.referenceId}.`,
  );
}

if (!result.answer) {
  throw new Error(
    'La respuesta del agente está vacía.',
  );
}

if (result.references.length === 0) {
  throw new Error(
    'La respuesta no incluye referencias documentales.',
  );
}

console.log(
  '[OK] Servicio de respuesta documental operativo.',
);

console.log(
  `[OK] Referencia principal: ${result.referenceId}`,
);

console.log(
  `[OK] Modo de respuesta: ${result.mode}`,
);

console.log(
  `[OK] Referencias utilizadas: ${result.references.length}`,
);
