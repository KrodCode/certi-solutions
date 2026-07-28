import {
  findBestKnowledgeAnswer,
  searchKnowledge,
} from '../src/services/knowledge-search.service.js';

const testCases = [
  {
    question:
      '¿Qué documentos se deben presentar para solicitar una certificación?',
    expectedId: 'CERT-002',
  },
  {
    question:
      '¿Qué ocurre si la documentación está incompleta?',
    expectedId: 'CERT-003',
  },
  {
    question:
      '¿Se puede repetir un ensayo no conforme?',
    expectedId: 'CERT-015',
  },
  {
    question:
      '¿Las respuestas del agente reemplazan una evaluación técnica?',
    expectedId: 'CERT-024',
  },
];

let passedTests = 0;

for (const testCase of testCases) {
  const result = findBestKnowledgeAnswer(
    testCase.question,
  );

  if (!result.found) {
    throw new Error(
      `No se encontró respuesta para: ${testCase.question}`,
    );
  }

  if (result.referenceId !== testCase.expectedId) {
    throw new Error(
      `Resultado inesperado para "${testCase.question}". ` +
      `Se esperaba ${testCase.expectedId}, pero se obtuvo ${result.referenceId}.`,
    );
  }

  passedTests += 1;

  console.log(
    `[OK] ${result.referenceId} - ${testCase.question}`,
  );
}

const relatedResults = searchKnowledge(
  '¿Cómo puedo conocer el estado y avance de mi solicitud?',
  {
    limit: 3,
  },
);

if (relatedResults.length === 0) {
  throw new Error(
    'La búsqueda relacionada no generó resultados.',
  );
}

console.log('');
console.log(
  `Pruebas aprobadas: ${passedTests}/${testCases.length}`,
);
console.log(
  `Mejor coincidencia adicional: ${relatedResults[0].id}`,
);
console.log(
  `Puntaje obtenido: ${relatedResults[0].score}`,
);
