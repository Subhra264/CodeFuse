import { fetch } from '@forge/api';
import { API_BASE_URL } from './config';

export async function translateLang({
  code,
  toLang,
}: {
  code: string;
  toLang: string;
}): Promise<string> {
  const response_ = await fetch(`${API_BASE_URL}/translate-lang`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
      toLang: toLang,
    }),
  });

  const response = await response_.json();
  return response.message;
}
