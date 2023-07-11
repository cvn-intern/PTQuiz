<script>
	let oldPassword = '';
	let newPassword = '';
	let confirmNewPassword = '';

	function changePassword() {
		// Logic to change password
	}

	function cancel() {
		// Logic to cancel password change
	}
</script>

<div class="flex flex-col items-center">
	<form action="" method="post" class="items-center flex flex-col gap-5">
		<div class="">
			<label for="username" class="mb-1">Username</label>
			<input
				id="username"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder="Username"
			/>

			<label for="email" class="mb-1">Email</label>
			<input
				id="email"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				disabled
				placeholder="Email"
			/>

			<label for="displayName" class="mb-1">Display name</label>
			<input
				id="displayName"
				class="w-full border-2 border-gray-200 rounded-lg p-2 mb-3"
				placeholder="Display name"
			/>
		</div>
	</form>

	<div class="flex justify-end space-x-2">
		<button class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800" on:click={cancel}
			>Cancel</button
		>
		<button class="px-4 py-2 rounded-lg bg-blue-500 text-white" on:click={changePassword}
			>Save</button
		>
	</div>
</div>

<style>
	.tab-button {
		border-bottom: 2px solid transparent;
	}

	.tab-button.active {
		border-bottom-color: #48bb78;
	}
</style>
