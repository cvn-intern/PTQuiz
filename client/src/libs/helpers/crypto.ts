import CryptoJS from 'crypto-js';

export default function decryptData(cipherText: any) {
	const bytes = CryptoJS.AES.decrypt(cipherText, import.meta.env.VITE_CRYPTO_KEY);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);
	return JSON.parse(originalText);
}
