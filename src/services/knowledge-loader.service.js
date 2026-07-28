import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'csv-parse/sync';

import {
  KnowledgeEntry,
  knowledgeEntryFields,
} from '../models/knowledge-entry.model.js';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const projectRoot = path.resolve(currentDirectory, '..', '..');

const defaultKnowledgeFile = path.join(
  projectRoot,
  'data',
  'knowledge',
  'certification_knowledge.csv',
);

let cachedEntries = null;

function validateHeaders(headers) {
  const normalizedHeaders = headers.map((header) =>
    String(header).trim(),
  );

  const hasExpectedLength =
    normalizedHeaders.length === knowledgeEntryFields.length;

  const hasExpectedNames = knowledgeEntryFields.every(
    (field, index) => normalizedHeaders[index] === field,
  );

  if (!hasExpectedLength || !hasExpectedNames) {
    throw new Error(
      `Las columnas del CSV deben ser: ${knowledgeEntryFields.join(', ')}.`,
    );
  }

  return normalizedHeaders;
}

function validateUniqueIds(entries) {
  const registeredIds = new Set();

  for (const entry of entries) {
    if (registeredIds.has(entry.id)) {
      throw new Error(
        `El identificador "${entry.id}" está duplicado en la base de conocimiento.`,
      );
    }

    registeredIds.add(entry.id);
  }
}

export function loadKnowledgeEntries(
  filePath = defaultKnowledgeFile,
) {
  let csvContent;

  try {
    csvContent = readFileSync(filePath, 'utf8');
  } catch {
    throw new Error(
      'No fue posible leer el archivo de conocimiento.',
    );
  }

  const contentWithoutBom = csvContent.replace(/^\uFEFF/, '');

  const rows = parse(contentWithoutBom, {
    delimiter: ';',
    skip_empty_lines: true,
    trim: true,
  });

  if (rows.length < 2) {
    throw new Error(
      'La base de conocimiento no contiene registros.',
    );
  }

  const [rawHeaders, ...rawRecords] = rows;
  const headers = validateHeaders(rawHeaders);

  const entries = rawRecords.map((values, index) => {
    if (values.length !== headers.length) {
      throw new Error(
        `La fila ${index + 2} no contiene la cantidad esperada de columnas.`,
      );
    }

    const record = Object.fromEntries(
      headers.map((header, headerIndex) => [
        header,
        values[headerIndex],
      ]),
    );

    return KnowledgeEntry.fromRecord(record, index + 2);
  });

  validateUniqueIds(entries);

  cachedEntries = Object.freeze(entries);

  return cachedEntries;
}

export function getKnowledgeEntries() {
  if (!cachedEntries) {
    return loadKnowledgeEntries();
  }

  return cachedEntries;
}

export function reloadKnowledgeEntries() {
  cachedEntries = null;

  return loadKnowledgeEntries();
}

export function getKnowledgeSummary() {
  const entries = getKnowledgeEntries();

  const categories = [
    ...new Set(entries.map((entry) => entry.category)),
  ].sort((firstCategory, secondCategory) =>
    firstCategory.localeCompare(secondCategory, 'es'),
  );

  return Object.freeze({
    totalEntries: entries.length,
    totalCategories: categories.length,
    categories: Object.freeze(categories),
  });
}
