<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Spinner, Toast } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { initializeFirebase, startSignIn } from '../../libs/services/firebaseConfig';
	import { validationLogin } from './interface/message.interface';
	import toast, { Toaster } from 'svelte-french-toast';

	export let form;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const firebase = window.firebase;

			await initializeFirebase(firebase);
		}
	});
	const signInProviders = ['Google', 'Facebook', 'Github'];
	const signInIcons = ['flat-color-icons:google', 'logos:facebook', 'icon-park:github'];

	const signIn = (providerName: string) => async () => {
		let status = true;
		startSignIn(window.firebase, providerName);
		await toast.success('Please wait...', {
			duration: 20000
		});
	};
	async function handleSubmit() {
		await new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});

		toast.promise(
			new Promise((resolve, reject) => {
				if (form.isSuccess) {
					resolve('Success!');
				} else {
					reject(form.error.message || 'Invalid credentials');
				}
			}),
			{
				loading: 'Loading...',
				success: (value) => {
					return value;
				},
				error: (err) => {
					return err;
				}
			}
		);
	}
</script>

<section class="flex text-white justify-center">
	<div class="w-[446px] rounded-3xl shadow-md shadow-zinc-400 my-6 border bg-white">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-10">
			<h1 class=" text-secondary text-[20px] font-bold">Login to your Account</h1>
			<form
				method="POST"
				class="w-full px-4 lg:px-0 mx-auto"
				action="?/login"
				use:enhance={() => {
					return async ({ update }) => {
						await update({ reset: false });
					};
				}}
			>
				<div class="py-4">
					{#if !form?.isSuccess && form?.error?.missing?.default}
						<label for="common" class="mb-1 text-red-500"
							>{form.error.message}<br /></label
						>
					{/if}
					<label for="email" class="mb-1 text-black">Email</label>

					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray-200 text-black"
						required
						on:input={(input) => {
							form = validationLogin(input.target.value, 'email');
						}}
					/>
					{#if !form?.isSuccess && form?.error?.missing?.email}
						<label for="email" class="mb-1 text-red-500">{form.error.message}</label>
					{/if}
				</div>
				<div class="py-4">
					<label for="password" class="mb-1 text-black">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						class="block w-full p-4 rounded-md border-gray-200 text-black"
						required
						on:input={(input) => {
							form = validationLogin(input.target.value, 'password');
						}}
					/>
					{#if !form?.isSuccess && form?.error?.missing?.password}
						<label for="password" class="mb-1 text-red-500">{form.error.message}</label>
					{/if}
				</div>
				<div class=" text-gray-400 hover:underline hover:text-gray-100">
					<a href="/forgotPassword" class="text-secondary">Forgot your password?</a>
				</div>
				<div class="pt-4">
					<button
						type="submit"
						on:click={handleSubmit}
						class="uppercase block w-full p-4 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none"
						>LOG IN</button
					>
				</div>
			</form>
			<div>
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
