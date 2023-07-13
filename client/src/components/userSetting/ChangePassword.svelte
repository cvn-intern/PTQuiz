<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import type { ActionData } from '../../routes/profile/$types';
	import { getContext } from 'svelte';
	export let user;
	export let form;

	export let formChangePassword;

	function handleCancel() {
		formChangePassword.oldPassword = '';
		formChangePassword.newPassword = '';
		formChangePassword.confirmPassword = '';
	}

	export const snapshot = {
		capture: () => ({ formChangePassword }),
		restore: (value) => {
			formChangePassword = value.formChangePassword;
		}
	};
</script>

<div class="flex flex-col items-center">
	<form
		method="POST"
		action="?/change_password"
		use:enhance
		class="items-center flex flex-col gap-5"
	>
		<div class="">
			<label for="oldPassword" class="mb-1">Old password</label>
			<input
				id="oldPassword"
				name="oldPassword"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="Old password"
				type="password"
				bind:value={formChangePassword.oldPassword}
				required
			/>

			<label for="newPassword" class="mb-1">New password</label>
			<input
				id="newPassword"
				name="newPassword"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="New password"
				type="password"
				bind:value={formChangePassword.newPassword}
				required
			/>

			<label for="confirmPassword" class="mb-1">Confirm new password</label>
			<input
				id="confirmPassword"
				name="confirmPassword"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="Confirm new password"
				type="password"
				bind:value={formChangePassword.confirmPassword}
				required
			/>
		</div>
		<div class="flex justify-end space-x-2">
			<button
				class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
				type="button"
				on:click={handleCancel}>Cancel</button
			>
			<button class="px-4 py-2 rounded-lg bg-blue-500 text-white" type="submit">Save</button>
		</div>
	</form>
	{#if form !== null}
		<h4 class="text-red-600 font-light text-md text-center pt-4">
			{form.error}
		</h4>
	{/if}
</div>
