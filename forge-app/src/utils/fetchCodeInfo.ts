import { fetch } from '@forge/api';
import { API_BASE_URL } from './config';

type RouteType = 'code-explain' | 'time-complexity';

const getCodeInfo = async (route: RouteType, selectedText: string): Promise<string> => {
  const response_ = await fetch(`${API_BASE_URL}/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: selectedText,
    }),
  });

  const response = await response_.json();
  return response.message;
};

export default getCodeInfo;
