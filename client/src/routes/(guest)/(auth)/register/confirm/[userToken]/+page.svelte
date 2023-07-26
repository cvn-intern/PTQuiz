<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { t } from '$i18n/translations';
	import { translateValidation } from '$helpers/translateValidation';
	import { AppRoute } from '$constants/appRoute';

	let isSuccess = true;
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
			window.location.href = AppRoute.HOME;
			invalidateAll();
		} else {
			isSuccess = false;
			const i18nTranslate = translateValidation(res);
			error = i18nTranslate;
		}
	});
</script>

{#if !isSuccess}
	<div class=" flex flex-col justify-center items-center w-full">
		<div
			class="w-[446px] border border-gray-200 shadow-xl flex flex-col items-center my-6 p-12 gap-12 rounded-xl bg-white"
		>
			<Icon icon="oi:circle-x" class="text-9xl text-red-500" />
			<p class="font-semibold">{error}</p>
			<div class=" text-gray-400">
				<p>
					{$t('common.ifYouDontSeeEmail')}
					<button
						class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
						on:click={() => {
							goto('/register/resend');
						}}
						>{$t('common.resend')}
					</button>
				</p>
			</div>
		</div>
	</div>
{/if}

{#if isSuccess}
	<div class="fixed inset-0 flex items-center justify-center w-full">
		<Spinner size={'48'} color="green" />
	</div>
{/if}
