import 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
};

async function initializeFirebase(firebase: any) {
	if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
}

function getProvider(firebase: any, providerName: string) {
	switch(providerName) {
		case 'Google':
			return new firebase.auth.GoogleAuthProvider();
		case 'Facebook':
			return new firebase.auth.FacebookAuthProvider();
		case 'Github':
			return new firebase.auth.GithubAuthProvider();
		default:
			throw new Error(`Invalid provider name: ${providerName}`);
	}
}

async function signInWithProvider(firebase: any, provider: string) {
	try {
		const result = await firebase.auth().signInWithPopup(provider);
		const user = result.user;
		return sendUserToServer(user, result.credential.providerId);
	} catch (error: any) {
		throw new Error(error);
	}
}

async function sendUserToServer(user: any, providerId: string) {
	try {
		const response = await fetch('/api/auth/oauth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				authId: user.uid,
				email: user.email,
				displayName: user.displayName,
				avatar: user.photoURL,
				loginFrom: providerId
			})
		});
		if (response.status === 200) {
			window.location.href = '/';
		}
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function startSignIn(firebase: any, providerName: string) {
	const provider = getProvider(firebase, providerName);
	await signInWithProvider(firebase, provider);
}

export {
	initializeFirebase,
	startSignIn
};
