import { browser } from '$app/environment';

let decrypt: (key: string, data: string) => Promise<string>;

if (browser) {
	decrypt = async (key: string, data: string) => {
		const decodedData = atob(data);
		const keyMaterial = await window.crypto.subtle.importKey(
			'raw',
			new TextEncoder().encode(key),
			{ name: 'AES-ECB' },
			false,
			['decrypt']
		);
		const decrypted = await window.crypto.subtle.decrypt(
			{ name: 'AES-ECB' },
			keyMaterial,
			new Uint8Array(decodedData.split('').map((char) => char.charCodeAt(0)))
		);
		return new TextDecoder().decode(decrypted);
	};
}

export const load = async ({ fetch, params }) => {
	const { quizzesId } = params;
	const response = await fetch(`/api/quizzes/all-questions/${quizzesId}`);
	const encryptedQuizData = await response.text();
	const key = 'your-encryption-key';
	const decryptedQuizData = await decrypt(key, encryptedQuizData);
	const quizData = JSON.parse(decryptedQuizData);
	return {
		quizData
	};
};
