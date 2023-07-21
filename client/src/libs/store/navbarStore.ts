import { writable } from 'svelte/store';

export const navbarStore = writable({
	isFullScreen: false
});
