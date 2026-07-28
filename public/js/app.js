const form = document.querySelector('#agent-form');
const questionInput = document.querySelector('#question');
const submitButton = document.querySelector('#submit-question');
const statusElement = document.querySelector('#service-status');
const counterElement = document.querySelector('#question-counter');
const errorElement = document.querySelector('#form-error');

const resultCard = document.querySelector('#result-card');
const resultStatus = document.querySelector('#result-status');
const answerElement = document.querySelector('#agent-answer');
const referenceElement = document.querySelector('#result-reference');
const categoryElement = document.querySelector('#result-category');
const sourceElement = document.querySelector('#result-source');
const metadataElement = document.querySelector('#result-metadata');

const MINIMUM_QUESTION_LENGTH = 3;
const MAXIMUM_QUESTION_LENGTH = 1000;
const REQUEST_TIMEOUT = 10000;

function setFormEnabled(enabled) {
  questionInput.disabled = !enabled;
  submitButton.disabled = !enabled;
}

function setLoading(loading) {
  submitButton.disabled = loading;
  submitButton.textContent = loading
    ? 'Consultando...'
    : 'Consultar agente';

  questionInput.setAttribute(
    'aria-busy',
    String(loading),
  );
}

function showError(message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

function clearError() {
  errorElement.textContent = '';
  errorElement.hidden = true;
}

function updateCounter() {
  const currentLength = questionInput.value.length;

  counterElement.textContent =
    `${currentLength} / ${MAXIMUM_QUESTION_LENGTH}`;
}

async function fetchJson(
  url,
  options = {},
  timeout = REQUEST_TIMEOUT,
) {
  const controller = new AbortController();

  const timeoutId = window.setTimeout(
    () => controller.abort(),
    timeout,
  );

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    });

    let body;

    try {
      body = await response.json();
    } catch {
      throw new Error(
        'El servidor devolvió una respuesta inválida.',
      );
    }

    if (!response.ok) {
      throw new Error(
        body.error?.message ??
        'La solicitud no pudo ser procesada.',
      );
    }

    return body;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function displayResult(result) {
  resultCard.hidden = false;
  answerElement.textContent = result.answer;

  if (result.found) {
    resultStatus.textContent =
      'Respuesta encontrada en la base de conocimiento.';

    referenceElement.textContent =
      result.referenceId ?? 'No disponible';

    categoryElement.textContent =
      result.category ?? 'No disponible';

    sourceElement.textContent =
      result.source ?? 'No disponible';

    metadataElement.hidden = false;
  } else {
    resultStatus.textContent =
      'No se encontró una coincidencia documental suficiente.';

    referenceElement.textContent = 'No disponible';
    categoryElement.textContent = 'No disponible';
    sourceElement.textContent = 'No disponible';

    metadataElement.hidden = true;
  }

  resultCard.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

async function checkServiceStatus() {
  setFormEnabled(false);

  try {
    const [health, knowledge] = await Promise.all([
      fetchJson('/api/health'),
      fetchJson('/api/knowledge/status'),
    ]);

    const totalEntries =
      knowledge.knowledgeBase?.totalEntries ?? 0;

    statusElement.textContent =
      `${health.message} Base documental cargada con ` +
      `${totalEntries} registros.`;

    statusElement.className = 'status-ok';
    setFormEnabled(true);
  } catch {
    statusElement.textContent =
      'No fue posible establecer conexión con el servicio.';

    statusElement.className = 'status-error';
    setFormEnabled(false);
  }
}

questionInput.addEventListener('input', () => {
  updateCounter();
  clearError();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearError();

  const question = questionInput.value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (question.length < MINIMUM_QUESTION_LENGTH) {
    showError(
      'La pregunta debe contener al menos tres caracteres.',
    );

    questionInput.focus();
    return;
  }

  if (question.length > MAXIMUM_QUESTION_LENGTH) {
    showError(
      'La pregunta no puede superar los 1000 caracteres.',
    );

    questionInput.focus();
    return;
  }

  resultCard.hidden = true;
  setLoading(true);

  try {
    const response = await fetchJson(
      '/api/agent/questions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
        }),
      },
    );

    displayResult(response.result);
  } catch (error) {
    if (error.name === 'AbortError') {
      showError(
        'La consulta superó el tiempo máximo de espera.',
      );
    } else {
      showError(
        error.message ||
        'No fue posible consultar al agente.',
      );
    }
  } finally {
    setLoading(false);
  }
});

updateCounter();
checkServiceStatus();
