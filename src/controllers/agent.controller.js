import {
  findBestKnowledgeAnswer,
} from '../services/knowledge-search.service.js';

const MINIMUM_QUESTION_LENGTH = 3;
const MAXIMUM_QUESTION_LENGTH = 1000;

function validateQuestion(value) {
  if (typeof value !== 'string') {
    return {
      valid: false,
      message:
        'El campo "question" es obligatorio y debe ser texto.',
    };
  }

  const normalizedQuestion = value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (
    normalizedQuestion.length <
    MINIMUM_QUESTION_LENGTH
  ) {
    return {
      valid: false,
      message:
        'La pregunta debe contener al menos tres caracteres.',
    };
  }

  if (
    normalizedQuestion.length >
    MAXIMUM_QUESTION_LENGTH
  ) {
    return {
      valid: false,
      message:
        'La pregunta no puede superar los 1000 caracteres.',
    };
  }

  return {
    valid: true,
    question: normalizedQuestion,
  };
}

export function askAgentQuestion(
  request,
  response,
  next,
) {
  try {
    const validation = validateQuestion(
      request.body?.question,
    );

    if (!validation.valid) {
      return response.status(400).json({
        status: 'error',
        error: {
          code: 'INVALID_QUESTION',
          message: validation.message,
        },
      });
    }

    const result = findBestKnowledgeAnswer(
      validation.question,
    );

    return response.status(200).json({
      status: 'ok',
      result: {
        found: result.found,
        answer: result.answer,
        referenceId: result.referenceId,
        category: result.category ?? null,
        source: result.source,
        score: result.score ?? null,
      },
    });
  } catch (error) {
    return next(error);
  }
}
