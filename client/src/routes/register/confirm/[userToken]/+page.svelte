<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	let isSuccess = false;
	let error: string;

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
			isSuccess = true;
			window.location.href = '/';
			invalidateAll();
		} else {
			error = res;
		}
	});
</script>

{#if !isSuccess}
	<div class=" flex justify-center items-center">
		<div
			class="w-[446px] border border-gray-200 shadow-xl flex flex-col items-center my-6 p-12 gap-12 rounded-xl bg-white"
		>
			<Icon icon="oi:circle-x" class="text-9xl text-red-500" />
			<p class="font-semibold">{error}</p>
			<div class=" text-gray-400">
				<p>
					If you still didn't receive it? <button
						class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
						on:click={() => {
							goto('/register/resend');
						}}
						>Resend
					</button>
				</p>
			</div>
		</div>
	</div>
{/if}

{#if isSuccess}
	<div class="fixed inset-0 flex items-center justify-center">
		<Spinner size={'48'} color="green" />
	</div>
{/if}
