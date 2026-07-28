import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '127.0.0.1';
const nodeEnv = process.env.NODE_ENV ?? 'development';

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('La variable PORT debe contener un puerto válido.');
}

export const environment = Object.freeze({
  host,
  port,
  nodeEnv,
  isProduction: nodeEnv === 'production',
});
