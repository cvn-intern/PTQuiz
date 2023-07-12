import 'firebase/auth';

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
	// signInSuccessUrl: '',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID
	],
	signInFlow: 'popup',
	callbacks: {
		signInSuccessWithAuthResult: function (authResult) {
			const { credential, user } = authResult;

			return fetch('/api/auth/oauth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					authId: user.uid,
					email: user.email,
					displayName: user.displayName,
					avatar: user.photoURL,
					loginFrom: credential.providerId
				})
			})
				.then((res) => {
					if (res.status === 200) {
						window.location.href = '/';
					}
					return false;
				})
				.catch((err) => {
					console.error(err);
					return false;
				});
		}
	}
});

async function startFirebaseUI(firebase) {
	const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
	await ui.start('#firebaseui-auth-container', uiConfig(firebase));
}

export { initializeFirebase, uiConfig, startFirebaseUI };
