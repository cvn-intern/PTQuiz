<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Spinner, Toast } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	export let form;
	import { onMount } from 'svelte';
	import { initializeFirebase, startSignIn } from '../../libs/services/firebaseConfig';

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const firebase = window.firebase;

			await initializeFirebase(firebase);
		}
	});
	const signInProviders = ['Google', 'Facebook', 'Github'];
	const signInIcons = ['flat-color-icons:google', 'logos:facebook', 'icon-park:github'];

	function showToast() {
		const toast = document.getElementById('loading');
		toast?.classList.remove('hidden');
	}
	const signIn = (providerName: string) => async () => {
		startSignIn(window.firebase, providerName);
		setTimeout(() => {
			showToast();
		}, 3000);
	};
</script>

<div class="flex justify-center items-center">
	{#if form}
		<Toast position="top-right">
			{form.error}
		</Toast>
	{/if}
</div>

<section class="flex text-white justify-center">
	<div class="w-[446px] rounded-3xl shadow-md shadow-zinc-400 my-6 border bg-white">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-10">
			<h1 class=" text-secondary text-[20px] font-bold">Login to your Account</h1>
			<form method="POST" class="w-full px-4 lg:px-0 mx-auto" action="?/login" use:enhance>
				<div class="py-4">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray-200 text-zinc-400"
						required
					/>
				</div>
				<div class="py-4">
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						class="block w-full p-4 rounded-md border-gray-200 text-zinc-400"
						required
					/>
				</div>
				<div class=" text-gray-400 hover:underline hover:text-gray-100">
					<a href="/forgotPassword" class="text-secondary">Forgot your password?</a>
				</div>
				<div class="pt-4">
					<button
						type="submit"
						class="uppercase block w-full p-4 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none"
						>LOG IN</button
					>
				</div>
			</form>
			<div>
				<div id="loading" class="hidden">
					<Toast position="bottom-right">Loading...</Toast>
				</div>
				<div class="py-6 space-x-2 text-gray-500 flex">
					{#each signInProviders as provider, i}
						<button
							class="border-gray p-2 rounded-md hover:bg-zinc-100 flex items-center gap-2"
							on:click={signIn(provider)}
						>
							<Icon icon={signInIcons[i]} class="text-2xl " />
							<span>{provider}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class=" text-gray-400">
				<div>
					Don't have an account?
					<button
						class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
						on:click={() => {
							goto('/register');
						}}
					>
						Sign up
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
