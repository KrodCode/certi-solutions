import dotenv from 'dotenv';

dotenv.config();

function readInteger(
  variableName,
  defaultValue,
  minimum,
  maximum,
) {
  const rawValue = process.env[variableName];

  if (
    rawValue === undefined ||
    rawValue.trim() === ''
  ) {
    return defaultValue;
  }

  const parsedValue = Number(rawValue);

  if (
    !Number.isInteger(parsedValue) ||
    parsedValue < minimum ||
    parsedValue > maximum
  ) {
    throw new Error(
      `La variable ${variableName} debe ser un número entero entre ${minimum} y ${maximum}.`,
    );
  }

  return parsedValue;
}

function readBoolean(variableName, defaultValue) {
  const rawValue = process.env[variableName];

  if (
    rawValue === undefined ||
    rawValue.trim() === ''
  ) {
    return defaultValue;
  }

  const normalizedValue = rawValue
    .trim()
    .toLowerCase();

  if (normalizedValue === 'true') {
    return true;
  }

  if (normalizedValue === 'false') {
    return false;
  }

  throw new Error(
    `La variable ${variableName} debe contener true o false.`,
  );
}

function readText(variableName, defaultValue) {
  const rawValue = process.env[variableName];

  if (
    rawValue === undefined ||
    rawValue.trim() === ''
  ) {
    return defaultValue;
  }

  return rawValue.trim();
}

const port = readInteger(
  'PORT',
  3000,
  1,
  65535,
);

const host = readText(
  'HOST',
  '127.0.0.1',
);

const nodeEnv = readText(
  'NODE_ENV',
  'development',
);

const agentRateLimitWindowMs = readInteger(
  'AGENT_RATE_LIMIT_WINDOW_MS',
  300000,
  1000,
  3600000,
);

const agentRateLimitMax = readInteger(
  'AGENT_RATE_LIMIT_MAX',
  20,
  1,
  1000,
);

const aiEnabled = readBoolean(
  'AI_ENABLED',
  false,
);

const aiProvider = readText(
  'AI_PROVIDER',
  'gemini',
);

const aiModel = readText(
  'AI_MODEL',
  'gemini-3.5-flash-lite',
);

const aiTimeoutMs = readInteger(
  'AI_TIMEOUT_MS',
  12000,
  1000,
  60000,
);

const aiMaxOutputTokens = readInteger(
  'AI_MAX_OUTPUT_TOKENS',
  400,
  100,
  2000,
);

const geminiApiKey =
  process.env.GEMINI_API_KEY?.trim() ?? '';

if (aiProvider !== 'gemini') {
  throw new Error(
    'El proveedor de IA configurado no es compatible.',
  );
}

if (aiEnabled && !geminiApiKey) {
  throw new Error(
    'AI_ENABLED está activo, pero GEMINI_API_KEY no fue configurada.',
  );
}

export const environment = Object.freeze({
  host,
  port,
  nodeEnv,
  isProduction: nodeEnv === 'production',

  agentRateLimitWindowMs,
  agentRateLimitMax,

  aiEnabled,
  aiProvider,
  aiModel,
  aiTimeoutMs,
  aiMaxOutputTokens,
  geminiApiKey,
});
