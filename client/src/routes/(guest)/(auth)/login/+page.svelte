<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import Error from '../../../+error.svelte';
	import { t } from '$i18n/translations';
	import { dismissLoadingToast, showLoadingToast } from '../../../../libs/toast/toast';
	import { initializeFirebase, startSignIn } from '../../../../libs/services/firebaseConfig';
	import { AppRoute } from '$constants/appRoute';
	import Toast from '$components/toast.svelte';

	export let form;
	export let data;
	let emailInput: any;

	let isSubmitting = false;

	$: {
		if (form?.isDone) {
			isSubmitting = false;
		}
	}
	onMount(async () => {
		if (data.user) {
			goto(AppRoute.HOME);
		}
		if (typeof window !== 'undefined') {
			const firebase = window.firebase;
			await initializeFirebase(firebase);
		}
		emailInput.focus();
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
		form = 'loading';

		try {
			const response = await startSignIn(window.firebase, providerName);

			if (response) {
				goto(AppRoute.HOME);
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

	$: if (form?.isSuccess) {
		const roomPage = window.sessionStorage.getItem('room');
		if (roomPage) {
			window.sessionStorage.removeItem('room');
			goto(roomPage);
		} else {
			goto(AppRoute.HOME);
		}
	}
</script>

<section class="flex text-white justify-center w-full">
	<Toast {form} />

	<div class=" w-panel rounded-3xl shadow-md shadow-zinc-400 my-6 border bg-white">
		<div class="w-full p-6 flex justify-evenly flex-col items-center xl:gap-6 gap-4 h-full">
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
				on:submit={() => {
					isSubmitting = true;
					showLoadingToast();
				}}
			>
				<div class="py-2">
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
						required
						class="block w-full xl:p-4 p-3 rounded-md border-gray-200 text-black"
						bind:this={emailInput}
					/>
					{#if !form?.isSuccess && form?.error?.missing?.email}
						<label for="email" class="mb-1 text-red-500">{form.error.message}</label>
					{/if}
				</div>
				<div class="py-2">
					<label for="password" class="mb-1 text-black">{$t('common.password')}</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						placeholder={$t('common.password')}
						class="block w-full xl:p-4 p-3 rounded-md border-gray-200 text-black"
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
						disabled={isSubmitting}
						class={`uppercase block w-full xl:p-4 p-3 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none ${
							isSubmitting ? 'opacity-50 cursor-wait' : ''
						}`}>{$t('common.login')}</button
					>
				</div>
			</form>
			<div>
				<div class="space-x-2 text-gray-500 flex">
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
