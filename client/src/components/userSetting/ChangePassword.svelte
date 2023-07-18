<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';
	import type { FormChangePassword } from './interface/form.interface';
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
</script>

<div class="items-center">
	<form method="POST" action="?/change_password" use:enhance>
		<div class="hidden">
			{#if form?.isSuccess && form?.tabs?.change_password}
				{toast.push('Success!', {
					theme: {
						'--toastColor': 'mintcream',
						'--toastBackground': 'rgba(72,187,120,0.9)',
						'--toastBarBackground': '#2F855A'
					}
				})}
			{/if}
			{#if !form?.isSuccess && form?.tabs?.change_password}
				{toast.push(`Fail!\n${form?.error.message}`, {
					theme: {
						'--toastColor': 'mintcream',
						'--toastBackground': '#FF1111',
						'--toastBarBackground': '#5c0f09'
					}
				})}
			{/if}
		</div>

		<div class="relative">
			<label for="oldPassword" class="mb-1">Old password</label>
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
					placeholder="Old password"
					type="password"
					bind:value={formChangePassword.oldPassword}
					required
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
			<label for="newPassword" class="mb-1">New password</label>
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
					placeholder="New password"
					type="password"
					bind:value={formChangePassword.newPassword}
					required
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
			<label for="confirmPassword" class="mb-1">Confirm new password</label>
			{#if !form?.isSuccess && form?.error?.missing.confirmPassword && form?.tabs.change_password}
				<label for="confirmPassword" class="mb-1 text-red-500"
					><br />{form?.error.message}</label
				>
			{/if}
			<input
				id="confirmPassword"
				name="confirmPassword"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="Confirm new password"
				type="password"
				bind:value={formChangePassword.confirmPassword}
				required
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
						type="button">Cancel</button
					>
					<button
						aria-label="Save"
						class="w-full text-white bg-secondary hover:bg-darkGreen focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						type="submit">Save</button
					>
				</div>
			</div>
		{/if}
	</form>
</div>
