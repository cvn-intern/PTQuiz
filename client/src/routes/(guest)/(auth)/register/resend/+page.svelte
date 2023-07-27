<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { t } from '$i18n/translations.js';
	import { AppRoute } from '$constants/appRoute';
	export let form;
	export let data;
	let isSubmitting = false;
	$: {
		if (form?.isDone) {
			isSubmitting = false;
		}
	}
	let sharedToastId: string | number;
	let isProcessing: boolean = false;
	const showLoadingToast = (): void => {
		sharedToastId = toast.loading(t.get('common.loading'), { duration: 20000 });
	};
	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId);
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
			toast.success(t.get('common.success'));
			goto('/register/loading');
		} else {
			dismissLoadingToast();
			toast.error(form?.error.message || 'Invalid submit');
		}

		isProcessing = false;
	};
	onMount(() => {
		if (data.user) {
			goto(AppRoute.HOME);
		}
	});
</script>

<section class="flex flex-col justify-center items-center w-full">
	<div class="w-[446px] bg-white rounded-3xl shadow-md shadow-zinc-400 my-6">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-8">
			<h1 class=" text-secondary text-[20px] font-bold">
				{$t('common.sendEmailVerification')}
			</h1>
			<form
				method="POST"
				on:submit={() => {
					isSubmitting = true;
				}}
				class="w-full px-4 lg:px-0 mx-auto"
				use:enhance={() => {
					return async ({ update }) => {
						await update({ reset: false });
					};
				}}
				action="?/resend"
			>
				<div class="py-4">
					<input
						type="text"
						name="email"
						id="email"
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray-200 text-zinc-400"
					/>
				</div>
				<div class="pt-4">
					<button
						on:click={handleSubmit}
						type="submit"
						disabled={isSubmitting}
						class={`uppercase block w-full p-4 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none text-white ${
							isSubmitting ? 'opacity-50 cursor-wait' : ''
						}`}>{$t('common.send')}</button
					>
				</div>
			</form>
			<div>
				<div class=" text-gray-400">
					<p>
						{$t('common.alreadyHaveAnAccount')}
						<button
							class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
							on:click={() => {
								goto('/login');
							}}
							>{$t('common.login')}
						</button>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
