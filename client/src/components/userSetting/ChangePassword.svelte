<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { t } from '$i18n/translations';
	import toast from 'svelte-french-toast';
	import type { FormChangePassword } from './interface/form.interface';
	import { dismissLoadingToast, showLoadingToast } from '../../libs/toast/toast';
	export let form: any;
	export let formChangePassword: FormChangePassword;

	let inputFocused = false;

	function handleCancel() {
		formChangePassword = {
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		};
		inputFocused = false;
	}

	let isProcessing: boolean = false;

	const handleSubmit = async (): Promise<void> => {
		if (isProcessing) return;
		isProcessing = true;
		form = null;

		showLoadingToast();

		while (!form?.isDone) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		dismissLoadingToast();

		if (form?.isSuccess) {
			toast.success('Success!');
		} else {
			dismissLoadingToast();
			toast.error(form?.error.message);
			isProcessing = false;
		}
	};
</script>

<div class="">
	<form method="POST" action="?/change_password" use:enhance>
		<div class="relative">
			<label for="oldPassword" class="mb-1">{$t('common.oldPassword')}</label>
			{#if !form?.isSuccess && form?.error?.missing.oldPassword && form?.tabs.change_password}
				<label for="oldPassword" class="mb-1 text-red-500"
					><br />{form?.error.message}</label
				>
			{/if}
			<div class="relative">
				<input
					aria-label="Old password"
					id="oldPassword"
					name="oldPassword"
					class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
					placeholder={$t('common.oldPassword')}
					type="password"
					bind:value={formChangePassword.oldPassword}
					on:focus={() => (inputFocused = true)}
				/>
				{#if !inputFocused}
					<Icon
						icon="solar:pen-broken"
						class="absolute right-3 top-3"
						width="20"
						height="20"
					/>
				{/if}
			</div>
			<label for="newPassword" class="mb-1">{$t('common.newPassword')}</label>
			{#if !form?.isSuccess && form?.error?.missing.newPassword && form?.tabs.change_password}
				<label for="newPassword" class="mb-1 text-red-500"
					><br />{form?.error.message}</label
				>
			{/if}
			<div class="relative">
				<input
					aria-label="New password"
					id="newPassword"
					name="newPassword"
					class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
					placeholder={$t('common.newPassword')}
					type="password"
					bind:value={formChangePassword.newPassword}
					on:focus={() => (inputFocused = true)}
				/>
				{#if !inputFocused}
					<Icon
						icon="solar:pen-broken"
						class="absolute right-3 top-3"
						width="20"
						height="20"
					/>
				{/if}
			</div>
			<label for="confirmPassword" class="mb-1">{$t('common.confirmNewPassword')}</label>
			{#if !form?.isSuccess && form?.error?.missing.confirmPassword && form?.tabs.change_password}
				<label for="confirmPassword" class="mb-1 text-red-500"
					><br />{form?.error.message}</label
				>
			{/if}
			<input
				id="confirmPassword"
				name="confirmPassword"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder={$t('common.confirmNewPassword')}
				type="password"
				bind:value={formChangePassword.confirmPassword}
				on:focus={() => (inputFocused = true)}
			/>
		</div>
		{#if inputFocused}
			<div class="items-center flex flex-col">
				<div class="flex gap-3">
					<button
						aria-label="Cancel"
						class="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						on:click={handleCancel}
						type="button">{$t('common.cancel')}</button
					>
					<button
						aria-label="Save"
						on:click={handleSubmit}
						class="w-full text-white bg-secondary hover:bg-darkGreen focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						type="submit">{$t('common.save')}</button
					>
				</div>
			</div>
		{/if}
	</form>
</div>
