<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { t } from '$i18n/translations';
	import { AppRoute } from '$constants/appRoute';
	import Toast from '$components/toast.svelte';
	import { showLoadingToast, showToast } from '$libs/toast/toast';
	export let form;
	export let data;
	let emailInput: any;
	let isSubmitting = false;
	$: {
		if (form?.isDone) {
			isSubmitting = false;
		}
		if (form?.isSuccess) {
			goto('/forgotPassword/loading');
		}
	}

	onMount(() => {
		if (data.user) {
			goto(AppRoute.HOME);
		}
		emailInput.focus();
	});
</script>

<Toast {form} />
<section class="flex flex-col items-center w-full">
	<div class=" md:w-panel bg-white rounded-3xl shadow-md shadow-zinc-400 my-6">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-8">
			<h1 class=" text-secondary text-[20px] font-bold">{$t('common.forgotPassword')}</h1>
			<form
				method="POST"
				class="w-full px-4 lg:px-0 mx-auto"
				on:submit={() => {
					isSubmitting = true;
					showLoadingToast();
				}}
				use:enhance={() => {
					return async ({ update }) => {
						await update({ reset: false });
					};
				}}
				action="?/forgotPassword"
			>
				<div class="py-4">
					<input
						aria-label="Email"
						type="text"
						name="email"
						id="email"
						required
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray-200 text-zinc-400"
						bind:this={emailInput}
					/>
				</div>
				<div class="pt-4">
					<button
						aria-label="Send"
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
