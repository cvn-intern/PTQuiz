import { loadTranslations } from '$i18n/translations';
import { redirect } from '@sveltejs/kit';
import type { LayoutData } from './$types';
import { goto } from '$app/navigation';
export const load: LayoutData = async ({ data, url }) => {
	const authPaths = ['/login', '/register', '/forgotPassword'];
	const protectedPaths = ['/dashboard', '/play-game', '/room', '/createQuiz'];

	function isAuthPath(pathname: string) {
		for (const path of authPaths) {
			if (pathname.startsWith(path)) {
				return true;
			}
		}
		return false;
	}

	function isProtectedPath(pathname: string) {
		for (const path of protectedPaths) {
			if (pathname.startsWith(path)) {
				return true;
			}
		}
		return false;
	}

	const { lang, pathname, user } = data;
	await loadTranslations(lang, pathname);
	if (!user) {
		if (isProtectedPath(pathname)) {
			throw redirect(307, '/login');
		}
	}
	return { user };
};
