import { register } from 'neoenv';
register();

export const envConfig = Object.freeze({
  OPENAI_API_KEY: String(process.env.OPENAI_API_KEY),
  PORT: String(process.env.PORT),
});
