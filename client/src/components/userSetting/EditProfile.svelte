<script>
	// @ts-nocheck

	import { enhance } from '$app/forms';

	export let data;
	export let formUserInfo;
	export let form;
	export let imageFile;
	let imageUrl;

	export const snapshot = {
		capture: () => ({ formUserInfo }),
		restore: (value) => {
			formUserInfo = value.formUserInfo;
		}
	};

	function handleCancel() {
		history.back();
	}

	function handleFileChange(event) {
		imageFile = event.target.files[0];
		imageUrl = URL.createObjectURL(imageFile);
	}
</script>

<div class="flex flex-col items-center">
	<form
		action="?/edit_profile"
		method="post"
		enctype="multipart/form-data"
		class="items-center flex flex-col gap-5"
	>
		<div class="relative">
			<img
				accept=".jpg, .jpeg, .png, .webp"
				src={imageUrl || data.avatar}
				alt="Avatar"
				class="w-20 h-20 rounded-full cursor-pointer"
			/>
			<input
				type="file"
				name="avatar"
				accept="image/*"
				class="absolute inset-0 opacity-0 cursor-pointer"
				on:change={handleFileChange}
			/>
		</div>

		<div class="">
			<label for="username" class="mb-1">Username</label>
			<input
				id="username"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder={data.id}
			/>

			<label for="email" class="mb-1">Email</label>
			<input
				id="email"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder={data.email}
			/>

			<label for="displayName" class="mb-1">Display name</label>
			<input
				id="displayName"
				name="displayName"
				bind:value={formUserInfo.displayName}
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="Display name"
			/>
		</div>
		<div class="flex justify-end space-x-2">
			<button class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800" on:click={handleCancel}
				>Cancel</button
			>
			<button class="px-4 py-2 rounded-lg bg-blue-500 text-white" type="submit">Save</button>
		</div>
	</form>
	{#if form !== null}
		<h4 class="text-red-600 font-light text-md text-center pt-4">
			{form.message}
		</h4>
	{/if}
</div>
