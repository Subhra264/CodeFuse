import { fetch } from '@forge/api';

const getCodeInfo = async (route: string, selectedText: string): Promise<string> => {
	const response_ = await fetch(`https://1d25-202-142-71-153.ngrok.io/${route}`, {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			code: selectedText
		})
	});

	const response = await response_.json();
	console.log('Response', response)
	return response.message;
}

export default getCodeInfo;