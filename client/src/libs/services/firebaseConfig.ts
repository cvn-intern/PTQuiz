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

async function startSignInWithGoogle(firebase) {
	const provider = new firebase.auth.GoogleAuthProvider();
	await signInWithProvider(firebase, provider);
}

async function startSignInWithFacebook(firebase) {
	const provider = new firebase.auth.FacebookAuthProvider();
	await signInWithProvider(firebase, provider);
}

async function startSignInWithGithub(firebase) {
	const provider = new firebase.auth.GithubAuthProvider();
	await signInWithProvider(firebase, provider);
}

async function signInWithProvider(firebase, provider) {
	try {
		const result = await firebase.auth().signInWithPopup(provider);
		// This gives you a the provider's OAuth 2.0 access token if available.
		const token = result.credential.accessToken;
		// The signed-in user info.
		const user = result.user;
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
				loginFrom: result.credential.providerId
			})
		})
			.then((res) => {
				if (res.status === 200) {
					window.location.href = '/';
				}
				return false;
			})
			.catch((err) => {
				return false;
			});
		// ...
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		const email = error.email;
		const credential = error.credential;
	}
}

export {
	initializeFirebase,
	startSignInWithGoogle,
	startSignInWithFacebook,
	startSignInWithGithub
};
