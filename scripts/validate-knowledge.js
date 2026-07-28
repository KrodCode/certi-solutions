import {
  getKnowledgeEntries,
  getKnowledgeSummary,
} from '../src/services/knowledge-loader.service.js';

try {
  const entries = getKnowledgeEntries();
  const summary = getKnowledgeSummary();

  const firstEntry = entries.at(0);
  const lastEntry = entries.at(-1);

  console.log('Validación de la base de conocimiento completada.');
  console.log(`Registros procesados: ${summary.totalEntries}`);
  console.log(`Categorías detectadas: ${summary.totalCategories}`);
  console.log(`Primer identificador: ${firstEntry.id}`);
  console.log(`Último identificador: ${lastEntry.id}`);
} catch (error) {
  console.error(
    'La base de conocimiento no superó la validación:',
    error.message,
  );

  process.exit(1);
}
