import {
  getKnowledgeEntries,
} from './knowledge-loader.service.js';

const STOP_WORDS = new Set([
  'a',
  'al',
  'ante',
  'como',
  'con',
  'cual',
  'cuales',
  'cuando',
  'de',
  'del',
  'desde',
  'donde',
  'el',
  'en',
  'es',
  'esta',
  'estan',
  'este',
  'la',
  'las',
  'lo',
  'los',
  'mi',
  'para',
  'por',
  'que',
  'se',
  'su',
  'sus',
  'un',
  'una',
  'y',
]);

let cachedSearchIndex = null;

export function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value) {
  return [
    ...new Set(
      normalizeText(value)
        .split(' ')
        .filter(
          (token) =>
            token.length >= 2 &&
            !STOP_WORDS.has(token),
        ),
    ),
  ];
}

function buildSearchIndex() {
  return getKnowledgeEntries().map((entry) => {
    const normalizedKeywords = entry.keywords.map(
      (keyword) => normalizeText(keyword),
    );

    return Object.freeze({
      entry,
      normalizedQuestion: normalizeText(entry.question),
      normalizedAnswer: normalizeText(entry.answer),
      questionTokens: new Set(tokenize(entry.question)),
      answerTokens: new Set(tokenize(entry.answer)),
      categoryTokens: new Set(tokenize(entry.category)),
      keywordTokens: new Set(
        normalizedKeywords.flatMap((keyword) =>
          tokenize(keyword),
        ),
      ),
      normalizedKeywords,
    });
  });
}

function getSearchIndex() {
  if (!cachedSearchIndex) {
    cachedSearchIndex = Object.freeze(buildSearchIndex());
  }

  return cachedSearchIndex;
}

function calculateEntryScore(
  indexedEntry,
  normalizedQuery,
  queryTokens,
) {
  let score = 0;
  const matchedTerms = new Set();

  if (indexedEntry.normalizedQuestion === normalizedQuery) {
    score += 100;
  } else if (
    indexedEntry.normalizedQuestion.includes(normalizedQuery)
  ) {
    score += 35;
  }

  if (
    normalizedQuery.length >= 8 &&
    indexedEntry.normalizedAnswer.includes(normalizedQuery)
  ) {
    score += 20;
  }

  for (const keyword of indexedEntry.normalizedKeywords) {
    if (
      keyword.includes(' ') &&
      normalizedQuery.includes(keyword)
    ) {
      score += 15;
    }
  }

  for (const token of queryTokens) {
    let tokenMatched = false;

    if (indexedEntry.keywordTokens.has(token)) {
      score += 10;
      tokenMatched = true;
    }

    if (indexedEntry.questionTokens.has(token)) {
      score += 6;
      tokenMatched = true;
    }

    if (indexedEntry.categoryTokens.has(token)) {
      score += 4;
      tokenMatched = true;
    }

    if (indexedEntry.answerTokens.has(token)) {
      score += 2;
      tokenMatched = true;
    }

    if (tokenMatched) {
      matchedTerms.add(token);
    }
  }

  const coverage =
    queryTokens.length === 0
      ? 0
      : matchedTerms.size / queryTokens.length;

  score += Math.round(coverage * 20);

  return {
    score,
    coverage,
    matchedTerms: [...matchedTerms],
  };
}

export function searchKnowledge(
  question,
  options = {},
) {
  const {
    limit = 3,
    minimumScore = 5,
  } = options;

  const normalizedQuery = normalizeText(question);

  if (normalizedQuery.length < 3) {
    throw new Error(
      'La pregunta debe contener al menos tres caracteres.',
    );
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 10) {
    throw new Error(
      'El límite de resultados debe estar entre 1 y 10.',
    );
  }

  const queryTokens = tokenize(normalizedQuery);

  if (queryTokens.length === 0) {
    return Object.freeze([]);
  }

  const results = getSearchIndex()
    .map((indexedEntry) => {
      const match = calculateEntryScore(
        indexedEntry,
        normalizedQuery,
        queryTokens,
      );

      return {
        entry: indexedEntry.entry,
        ...match,
      };
    })
    .filter((result) => result.score >= minimumScore)
    .sort(
      (firstResult, secondResult) =>
        secondResult.score - firstResult.score ||
        secondResult.coverage - firstResult.coverage ||
        firstResult.entry.id.localeCompare(
          secondResult.entry.id,
        ),
    )
    .slice(0, limit)
    .map((result) =>
      Object.freeze({
        id: result.entry.id,
        category: result.entry.category,
        question: result.entry.question,
        answer: result.entry.answer,
        source: result.entry.source,
        score: result.score,
        matchedTerms: Object.freeze(
          result.matchedTerms,
        ),
      }),
    );

  return Object.freeze(results);
}

export function findBestKnowledgeAnswer(question) {
  const [bestResult] = searchKnowledge(question, {
    limit: 1,
  });

  if (!bestResult) {
    return Object.freeze({
      found: false,
      answer:
        'No encontré información suficiente en la base de conocimiento para responder esa consulta.',
      source: null,
      referenceId: null,
    });
  }

  return Object.freeze({
    found: true,
    answer: bestResult.answer,
    source: bestResult.source,
    referenceId: bestResult.id,
    category: bestResult.category,
    score: bestResult.score,
  });
}

export function clearKnowledgeSearchIndex() {
  cachedSearchIndex = null;
}
