import { Request, Response } from 'express';
import { openAi } from '@/utils/openAi';

export async function calculateComplexity(req: Request, res: Response) {
  const { code } = req.body;

  if (!code) {
    return res.json({
      message: 'Select the code snippet you want to measure the time complexity of',
    });
  }

  const response = await openAi.createCompletion({
    model: 'text-davinci-002',
    prompt: code + '"""\nThe time complexity of this function is',
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['\n'],
  });

  const timeComplexity = response.data.choices[0].text;

  console.log(timeComplexity);

  return res.json({
    message: timeComplexity,
  });
}
