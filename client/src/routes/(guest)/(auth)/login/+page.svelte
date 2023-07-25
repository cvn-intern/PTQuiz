<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import Error from '../../../+error.svelte';
	import { t } from '$i18n/translations';
	import type { ActionData } from './$types.js';
	import { dismissLoadingToast, showLoadingToast } from '../../../../libs/toast/toast';
	import { startSignIn } from '../../../../libs/services/firebaseConfig';

	export let form: ActionData;
	export let data;

	onMount(async () => {
		if (data.user) {
			goto('/');
		}
		if (typeof window !== 'undefined') {
			const firebase = window.firebase;
			await initializeFirebase(firebase);
		}
	});

	const signInProviders = ['Google', 'Facebook', 'Github'];
	const signInIcons = ['flat-color-icons:google', 'logos:facebook', 'icon-park:github'];

	const resendEmail = (email: string) => async () => {
		const response = await fetch('/api/auth/resend', {
			method: 'POST',
			body: JSON.stringify({
				email: email
			})
		});
		const result = await response.json();
		if (response.status === 200) {
			goto('/register/loading');
		} else {
			return {
				error: result
			};
		}
	};

	let isProcessing: boolean = false;
	const signIn = (providerName: string) => async (): Promise<void> => {
		if (isProcessing) return;
		isProcessing = true;

		showLoadingToast();

		try {
			const response = await startSignIn(window.firebase, providerName);

			if (response) {
				goto('/');
				toast.success($t('common.success'));
			} else {
				throw new Error('Invalid credentials');
			}
		} catch (err: any) {
			dismissLoadingToast();
			toast.error(err.message);
		} finally {
			isProcessing = false;
		}
	};

	const handleSubmit = async (): Promise<void> => {
		if (isProcessing) return;
		isProcessing = true;

		showLoadingToast();

		form = null;

		while (!form?.isDone) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		dismissLoadingToast();

		if (form?.isSuccess) {
			goto('/');
			toast.success(t.get('common.success'));
		} else {
			dismissLoadingToast();
			toast.error(form?.error.message || 'Invalid credentials');
		}

		isProcessing = false;
	};
</script>

<section class="flex text-white justify-center w-full">
	<div class="w-[446px] rounded-3xl shadow-md shadow-zinc-400 my-6 border bg-white">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-10">
			<h1 class=" text-secondary text-[20px] font-bold">{$t('common.loginToYourAccount')}</h1>
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
							>{form.error.message}
							{#if form?.error?.missing?.confirmEmail}
								<br />{$t('common.ifYouDidNotReceiveEmail')}
								<button
									class="text-secondary"
									on:click={resendEmail(form?.error?.fill?.email)}
									>{$t('common.here')}</button
								>
								{$t('common.toResendIt')}.
							{/if}<br /></label
						>
					{/if}
					<label for="email" class="mb-1 text-black">{$t('common.email')}</label>

					<input
						type="text"
						name="email"
						id="email"
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray-200 text-black"
					/>
					{#if !form?.isSuccess && form?.error?.missing?.email}
						<label for="email" class="mb-1 text-red-500">{form.error.message}</label>
					{/if}
				</div>
				<div class="py-4">
					<label for="password" class="mb-1 text-black">{$t('common.password')}</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder={$t('common.password')}
						class="block w-full p-4 rounded-md border-gray-200 text-black"
					/>
					{#if !form?.isSuccess && form?.error?.missing?.password}
						<label for="password" class="mb-1 text-red-500">{form.error.message}</label>
					{/if}
				</div>
				<div class=" text-gray-400 hover:underline hover:text-gray-100">
					<a href="/forgotPassword" class="text-secondary"
						>{$t('common.forgotPassword')}</a
					>
				</div>
				<div class="pt-4">
					<button
						type="submit"
						on:click={handleSubmit}
						class="uppercase block w-full p-4 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none"
						>{$t('common.login')}</button
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
					{$t('common.dontHaveAnAccount')}
					<button
						class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
						on:click={() => {
							goto('/register');
						}}
					>
						{$t('common.signUp')}
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
