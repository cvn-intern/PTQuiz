import 'firebase/auth';
import { apiNoAuth } from '../utils/api';
import { tokens } from '../stores/token';
import { get } from 'svelte/store';
import cookies from 'js-cookie';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
};

async function initializeFirebase(firebase) {
	if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
}

const uiConfig = (firebase) => ({
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID
	],
	signInFlow: 'popup',
	callbacks: {
		signInSuccessWithAuthResult: async function (authResult: any) {
			const { credential, user } = authResult;
			const { data } = await apiNoAuth.post('/auth/oauth', {
				authId: user.uid,
				email: user.email,
				displayName: user.displayName,
				avatar: user.photoURL,
				loginFrom: credential.providerId
			});



			cookies.remove('accessToken');
			cookies.remove('refreshToken');

			cookies.set('accessToken', data.data.accessToken);
			cookies.set('refreshToken', data.data.refreshToken);

			return {
				status: 'Success',
				message: data.message
			};
			// }
			// return false;
		}
	}
});

async function startFirebaseUI(firebase) {
	const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
	await ui.start('#firebaseui-auth-container', uiConfig(firebase));
}

export { initializeFirebase, uiConfig, startFirebaseUI };
