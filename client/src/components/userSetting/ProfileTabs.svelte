<script>
	import EditProfile from './EditProfile.svelte';
	import ChangePassword from './ChangePassword.svelte';
	import { getContext } from 'svelte';

	let currentTab = 'EditProfile';
	export let user;
	export let form;

	export let formChangePassword = {
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	};

	export let formUserInfo = {
		displayName: user.displayName
	};

	function switchTab(tab) {
		currentTab = tab;
	}
</script>

<div class="profile">
	<div class="w-full h-20 flex items-center justify-center">
		<h1 class="text-2xl font-bold text-center">Profile</h1>
	</div>

	<div class="flex justify-center space-x-4 mb-8">
		<button
			class="pb-1 border-b-2 border-transparent hover:border-blue-500"
			class:active={currentTab === 'EditProfile'}
			on:click={() => switchTab('EditProfile')}
		>
			Edit Profile
		</button>
		{#if user?.loginFrom === null}
			<button
				class="pb-1 border-b-2 border-transparent hover:border-blue-500"
				class:active={currentTab === 'ChangePassword'}
				on:click={() => switchTab('ChangePassword')}
			>
				Change Password
			</button>
		{/if}
	</div>
</div>

<div class="content">
	<div class="w-full">
		{#if currentTab === 'EditProfile'}
			<EditProfile data={user} {formUserInfo} {form} />
		{:else if currentTab === 'ChangePassword'}
			<ChangePassword {form} {formChangePassword} />
		{/if}
	</div>
</div>

<style>
	.active {
		border-bottom: 2px solid #48bb78;
	}
</style>
