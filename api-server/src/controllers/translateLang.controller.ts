import { Request, Response } from 'express';
import { openAi } from '@/utils/openAi';
// @ts-ignore
import detectLang from 'lang-detector';

export async function translateLang(req: Request, res: Response) {
  const { code, toLang } = req.body;

  const fromLang = detectLang(code);

  if (!code || fromLang === 'Unknown') {
    return res.json({
      message: 'Select the code snippet you want to convert',
    });
  }

  if (fromLang === toLang) {
    return res.json({
      message: 'Select a different language to convert to',
    });
  }

  const response = await openAi.createCompletion({
    model: 'text-davinci-002',
    prompt: `##### Translate this function  from ${fromLang} into ${toLang}\n### ${fromLang}\n    \n    ${code}\n    \n### ${toLang}`,
    temperature: 0,
    max_tokens: 54,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['###'],
  });

  const output = response.data.choices[0].text;

  console.log(output);

  return res.json({
    message: output,
  });
}
