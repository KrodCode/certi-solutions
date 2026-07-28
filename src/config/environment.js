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

const port = readInteger(
  'PORT',
  3000,
  1,
  65535,
);

const host = process.env.HOST ?? '127.0.0.1';
const nodeEnv = process.env.NODE_ENV ?? 'development';

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

export const environment = Object.freeze({
  host,
  port,
  nodeEnv,
  isProduction: nodeEnv === 'production',
  agentRateLimitWindowMs,
  agentRateLimitMax,
});
