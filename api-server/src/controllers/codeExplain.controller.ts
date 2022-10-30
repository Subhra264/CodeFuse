import { Request, Response } from 'express';
import { openAi } from '@/utils/openAi';

export async function explainCode(req: Request, res: Response) {
  const { code } = req.body;

  if (!code) {
    return res.json({
      message: 'Select the code snippet you want to explain',
    });
  }

  const response = await openAi.createCompletion({
    model: 'text-davinci-002',
    prompt: code + '"""\nHere\'s what the above code is doing:\n1.',
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['"""'],
  });

  return res.json({
    message: response.data.choices[0].text,
  });
}
