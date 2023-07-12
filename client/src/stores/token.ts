import { writable } from 'svelte/store';

interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export const tokens = writable<Tokens>({
	accessToken: '',
	refreshToken: ''
});
