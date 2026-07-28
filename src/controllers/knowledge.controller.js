import {
  getKnowledgeSummary,
} from '../services/knowledge-loader.service.js';

export function getKnowledgeStatus(
  _request,
  response,
  next,
) {
  try {
    const summary = getKnowledgeSummary();

    response.status(200).json({
      status: 'ok',
      service: 'certi-solutions',
      knowledgeBase: {
        loaded: true,
        format: 'CSV',
        totalEntries: summary.totalEntries,
        totalCategories: summary.totalCategories,
        categories: summary.categories,
      },
    });
  } catch (error) {
    next(error);
  }
}
