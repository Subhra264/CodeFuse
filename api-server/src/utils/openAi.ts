import { OpenAIApi, Configuration } from 'openai';
import { envConfig } from '@/config/env';

const configuration = new Configuration({
  apiKey: envConfig.OPENAI_API_KEY,
});

export const openAi = new OpenAIApi(configuration);
