import Express, { Request, Response } from 'express';
import { envConfig as EnvConfig } from '../env';
import { OpenAIApi, Configuration } from 'openai';

const PORT = EnvConfig.PORT || 8000;
const app = Express();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(Express.json());

app.post('/', async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.json({
      message: 'Code required',
    });
  }

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: code + '"""\nHere\'s what the above code is doing:\n1.',
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['"""'],
  });

  console.log('Response', response.data.choices);

  res.json({
    message: response.data.choices,
  });
});

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
