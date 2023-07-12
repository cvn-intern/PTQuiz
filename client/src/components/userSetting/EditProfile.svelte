<script>
	import { getContext } from 'svelte';

	let data = getContext('user');

	console.log(data);
	async function handleSave() {
		const res = await fetch('/api/user', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				displayName: data.data.user.displayName
			})
		});
		if (res.ok) {
			const resData = await res.json();
			console.log(resData);
		}
	}
	function handleCancel() {
		history.back();
	}
</script>

<div class="flex flex-col items-center">
	<form action="?/change-password" method="post" class="items-center flex flex-col gap-5">
		<div class="relative">
			<img src={data.avatar} alt="Avatar" class="w-20 h-20 rounded-full cursor-pointer" />
			<input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" />
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
				bind:value={data.displayName}
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="Display name"
			/>
		</div>
		<div class="flex justify-end space-x-2">
			<button class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800" on:click={handleCancel}
				>Cancel</button
			>
			<button class="px-4 py-2 rounded-lg bg-blue-500 text-white" on:click={handleSave}
				>Save</button
			>
		</div>
	</form>
</div>
