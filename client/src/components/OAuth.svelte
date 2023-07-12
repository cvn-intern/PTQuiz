<script>
	import { onMount } from 'svelte';
	import { initializeFirebase, startFirebaseUI } from '../../src/libs/services/firebaseConfig';

	let ui;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const firebase = window.firebase;

			await initializeFirebase(firebase);
			await startFirebaseUI(firebase);
		}
	});
</script>

<div id="firebaseui-auth-container" />
