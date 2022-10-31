import { Request, Response } from 'express';
import { openAi } from '@/utils/openAi';

export async function sqlTranslate(req: Request, res: Response) {
  const { code } = req.body;

  if (!code) {
    return res.json({
      message: 'Select the text you want to translate to SQL',
    });
  }

  const response = await openAi.createCompletion({
    model: 'text-davinci-002',
    prompt: code + '\nSELECT',
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['#', ';'],
  });

  const sql = 'SELECT' + response.data.choices[0].text;

  console.log(sql);

  return res.json({
    message: sql,
  });
}
