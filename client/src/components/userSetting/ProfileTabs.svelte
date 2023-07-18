<script lang="ts">
	import EditProfile from './EditProfile.svelte';
	import ChangePassword from './ChangePassword.svelte';
	import type User from '../../interface/user.interface';
	import type { FormChangePassword, FormEditProfile } from './interface/form.interface';
	import type { Actions } from '@sveltejs/kit';

	export let currentTab = 'EditProfile';
	export let user: User;
	export let form: Actions;

	export let formChangePassword: FormChangePassword = {
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	};

	export let formEditProfile: FormEditProfile = {
		displayName: user.displayName
	};

	function switchTab(tab: string) {
		currentTab = tab;
		form = {};
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
		{#if !user?.loginFrom}
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

<div class="content px-4 sm:px-10 md:px-10 lg:px-40">
	<div class="w-full">
		{#if currentTab === 'EditProfile'}
			<EditProfile bind:user bind:formEditProfile bind:form />
		{:else if currentTab === 'ChangePassword'}
			<ChangePassword bind:form bind:formChangePassword />
		{/if}
	</div>
</div>

<style>
	.active {
		border-bottom: 2px solid #48bb78;
	}
</style>
