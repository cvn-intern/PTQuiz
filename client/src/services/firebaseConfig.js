import 'firebase/auth';
import { writable } from 'svelte/store';

export const authResultStore = writable(null);

const firebaseConfig = {
	apiKey: 'AIzaSyA2unT_jGPlEJIT_UfsZeIg4KC1IihUp10',
	authDomain: 'oauth---ptquiz.firebaseapp.com',
	projectId: 'oauth---ptquiz',
	storageBucket: 'oauth---ptquiz.appspot.com'
};

async function initializeFirebase(firebase) {
	if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
}

const uiConfig = (firebase) => ({
	signInSuccessUrl: 'http://localhost:5173/',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID
	],
	signInFlow: 'popup',
	callbacks: {
		signInSuccessWithAuthResult: function (authResult) {
			const { credential, user } = authResult;
			fetch('http://localhost:8080/api/auth/oauth/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					authId: user.uid,
					email: user.email,
					displayName: user.displayName,
					avatar: user.photoURL,
					loginFrom: credential.providerId
				})
			}).then((res) => {
				console.log(res);
				localStorage.setItem('accessToken', res.data.accessToken);
				localStorage.setItem('refreshToken', res.data.refreshToken);
			});

			return false;
		}
	}
});

authResultStore.subscribe(async (authResult) => {
	if (authResult) {
		const { credential, user } = authResult;
		fetch('http://localhost:8080/api/auth/oauth/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				authId: user.uid,
				email: user.email,
				displayName: user.displayName,
				avatar: user.photoURL,
				loginFrom: credential.providerId
			})
		}).then((res) => {
			console.log(res);
			localStorage.setItem('accessToken', res.data.accessToken);
			localStorage.setItem('refreshToken', res.data.refreshToken);
		});
	}
});

async function startFirebaseUI(firebase) {
	const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
	await ui.start('#firebaseui-auth-container', uiConfig(firebase));
}

export { initializeFirebase, uiConfig, startFirebaseUI };
