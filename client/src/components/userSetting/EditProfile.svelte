<script lang="ts">
	import { Toast } from 'flowbite-svelte';
	import type User from '../../interface/user.interface';

	export let user: User;
	export let formUserInfo: User;
	export let form: any;

	let imageFile;
	let imageUrl: string = user?.avatar;

	export const snapshot = {
		capture: () => ({ formUserInfo }),
		restore: (value: any) => {
			formUserInfo = value.formUserInfo;
		}
	};

	const handleCancel = () => {
		formUserInfo.displayName = user.displayName;
	};

	const handleFileChange = (event: any) => {
		imageFile = event.target.files[0];
		imageUrl = URL.createObjectURL(imageFile);
	};
</script>

<div class="flex flex-col items-center">
	<form
		action="?/edit_profile"
		method="post"
		enctype="multipart/form-data"
		class="items-center flex flex-col gap-5"
	>
		{#if form && form.type === 'edit_profile'}
			<Toast position="top-right">{form.message}</Toast>
		{/if}
		<div class="relative">
			<img src={imageUrl} alt="Avatar" class="w-20 h-20 rounded-full cursor-pointer" />
			<input
				type="file"
				name="avatar"
				accept="image/*"
				class="absolute inset-0 opacity-0 cursor-pointer"
				on:change={handleFileChange}
			/>
		</div>

		<div class="">
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

			<label for="displayName" class="mb-1">Display name</label>
			<input
				aria-label="Display name"
				id="displayName"
				name="displayName"
				bind:value={formUserInfo.displayName}
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="Display name"
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
