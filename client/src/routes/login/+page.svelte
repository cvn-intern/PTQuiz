<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Toast } from 'flowbite-svelte';
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

	const signIn = (providerName) => () => startSignIn(window.firebase, providerName);
</script>

<div class="flex justify-center items-center">
	{#if form}
		<Toast color="red">
			<svelte:fragment slot="icon">
				<svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
				<span class="sr-only">Error icon</span>
			</svelte:fragment>
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
			<div id="loading">
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
