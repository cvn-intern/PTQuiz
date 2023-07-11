import 'firebase/auth';
import axios from 'axios';

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
		signInSuccessWithAuthResult: function (authResult) {
			const { credential, user } = authResult;
			const request = axios.post(`${import.meta.env.VITE_HOST_BACKEND}/api/auth/oauth/`, {
				authId: user.uid,
				email: user.email,
				displayName: user.displayName,
				avatar: user.photoURL,
				loginFrom: credential.providerId
			});
			request.then((res) => {
				localStorage.setItem('accessToken', res.data.data.accessToken);
				localStorage.setItem('refreshToken', res.data.data.refreshToken);
				window.location.href = import.meta.env.VITE_HOST_FRONTEND;
			});

			return false;
		}
	}
});

async function startFirebaseUI(firebase) {
	const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
	await ui.start('#firebaseui-auth-container', uiConfig(firebase));
}

export { initializeFirebase, uiConfig, startFirebaseUI };
