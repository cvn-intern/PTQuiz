<script lang="ts">
	import { enhance } from '$app/forms';
	import { Toast } from 'flowbite-svelte';
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
		{#if form && form.error}
			<Toast>{form.error}</Toast>
		{/if}
		<div class="">
			<label for="oldPassword" class="mb-1">Old password</label>
			<input
				aria-label="Old password"
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
				aria-label="New password"
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
	</form>
</div>
