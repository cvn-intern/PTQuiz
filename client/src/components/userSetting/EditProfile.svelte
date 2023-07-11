<script>
	import { onMount } from 'svelte';
	import axios from 'axios';

	let data;

	onMount(async () => {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		});
		data = response.data;
	});

	let isEditingAvatar = true;

	function handleSave() {}

	function handleCancel() {
		username = '';
		email = '';
		displayName = '';
	}

	function handleAvatarChange(event) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			avatarUrl = reader.result;
			isEditingAvatar = false;
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="flex flex-col items-center">
	<form action="" method="post" class="items-center flex flex-col gap-5">
		<div class="relative">
			<img src={avatarUrl} alt="Avatar" class="w-20 h-20 rounded-full cursor-pointer" />
			{#if isEditingAvatar}
				<input
					type="file"
					accept="image/*"
					class="absolute inset-0 opacity-0 cursor-pointer"
					on:change={handleAvatarChange}
				/>
			{/if}
		</div>

		<div class="">
			<label for="username" class="mb-1">Username</label>
			<input
				id="username"
				bind:value={username}
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder="Username"
			/>

			<label for="email" class="mb-1">Email</label>
			<input
				id="email"
				bind:value={email}
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder="Email"
			/>

			<label for="displayName" class="mb-1">Display name</label>
			<input
				id="displayName"
				bind:value={displayName}
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="Display name"
			/>
		</div>
	</form>

	<div class="flex justify-end space-x-2">
		<button class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800" on:click={handleCancel}
			>Cancel</button
		>
		<button class="px-4 py-2 rounded-lg bg-blue-500 text-white" on:click={handleSave}
			>Save</button
		>
	</div>
</div>
