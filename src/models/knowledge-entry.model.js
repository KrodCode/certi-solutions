const REQUIRED_FIELDS = Object.freeze([
  'id',
  'category',
  'question',
  'answer',
  'keywords',
  'source',
]);

export class KnowledgeEntry {
  constructor({
    id,
    category,
    question,
    answer,
    keywords,
    source,
  }) {
    this.id = id;
    this.category = category;
    this.question = question;
    this.answer = answer;
    this.keywords = Object.freeze(
      keywords
        .split('|')
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    );
    this.source = source;

    Object.freeze(this);
  }

  static fromRecord(record, rowNumber) {
    const normalizedRecord = {};

    for (const field of REQUIRED_FIELDS) {
      const value = String(record[field] ?? '').trim();

      if (!value) {
        throw new Error(
          `El campo "${field}" está vacío en la fila ${rowNumber}.`,
        );
      }

      normalizedRecord[field] = value;
    }

    if (!/^CERT-\d{3}$/.test(normalizedRecord.id)) {
      throw new Error(
        `El identificador "${normalizedRecord.id}" de la fila ${rowNumber} no es válido.`,
      );
    }

    return new KnowledgeEntry(normalizedRecord);
  }
}

export const knowledgeEntryFields = REQUIRED_FIELDS;
