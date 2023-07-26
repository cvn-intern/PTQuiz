<script lang="ts">
	import Icon from '@iconify/svelte';
	import toast from 'svelte-french-toast';
	import { t } from '$i18n/translations';

	import { enhance } from '$app/forms';
	import type User from '../../interface/user.interface';
	import type { FormEditProfile } from './interface/form.interface';
	import { dismissLoadingToast, showLoadingToast } from '../../libs/toast/toast';

	export let user: User;
	export let formEditProfile: FormEditProfile;
	export let form: any;

	let imageFile;
	let inputFocused = false;
	let imageUrl: string = user?.avatar;

	const handleCancel = () => {
		formEditProfile.displayName = user.displayName;
		inputFocused = false;
	};

	const handleFileChange = (event: any) => {
		imageFile = event.target.files[0];
		imageUrl = URL.createObjectURL(imageFile);
		inputFocused = true;
	};

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
		isProcessing = false;

		if (form?.isSuccess) {
			toast.success('Success!');
		} else {
			dismissLoadingToast();
			toast.error(form?.error.message);
		}
	};
</script>

<div class="flex flex-col">
	<form
		use:enhance={() => {
			return async ({ update }) => {
				await update({ reset: false });
			};
		}}
		action="?/edit_profile"
		method="post"
		enctype="multipart/form-data"
	>
		<div class="relative flex justify-center">
			<img src={imageUrl} alt="Avatar" class="w-20 h-20 rounded-full cursor-pointer" />
			<input
				type="file"
				name="avatar"
				accept="image/*"
				class="absolute inset-0 opacity-0 cursor-pointer"
				on:change={handleFileChange}
			/>
		</div>

		<div class="relative">
			<label for="id" class="mb-1">User ID</label>
			<input
				aria-label="id"
				id="id"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder={user.id}
			/>

			<label for="email" class="mb-1">Email</label>
			<input
				aria-label="Email"
				id="email"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder={user.email}
			/>

			<label for="loginFrom" class="mb-1">{$t('common.loginFrom')}</label>
			<input
				aria-label="Login from"
				id="loginFrom"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder={user.loginFrom || $t('common.localAuthen')}
			/>

			<label for="displayName" class="mb-1">{$t('common.displayName')}</label>
			{#if !form?.isSuccess && form?.tabs?.edit_profile && form?.error.missing.displayName}
				<label for="displayName" class="mb-1 text-red-500"
					><br />{form?.error.message}</label
				>
			{/if}
			<div class="relative">
				<input
					aria-label="Display name"
					id="displayName"
					name="displayName"
					bind:value={formEditProfile.displayName}
					class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
					placeholder={$t('common.displayName')}
					on:focus={() => (inputFocused = true)}
				/>
				<div class="absolute right-3 top-3">
					<Icon icon="solar:pen-broken" width="20" height="20" />
				</div>
			</div>
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
