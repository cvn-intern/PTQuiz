<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';

	const userToken = $page.params.userToken;
	onMount(async () => {
		const response = await fetch('/api/auth/confirm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token: userToken })
		});
		const res = await response.json();
		if (response.status === 200) {
			window.location.href = '/';
			invalidateAll();
		} else {
			return {
				error: res.message
			};
		}
	});
</script>

<div class="flex justify-center py-6">
	<Spinner size={'24'} color="red" />
</div>
