<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';

	let show = false;
	let container: any;
	export let user: any;
	export let logout = () => {};

	function onWindowClick(e) {
		if (container.contains(e.target) == false) show = false;
	}
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container}>
	<button on:click={() => (show = !show)} class="relative">
		<button class="flex items-center cursor-pointer">
			<div
				aria-label="profile"
				class="flex items-center gap-2 hover:text-secondary max-w-dropDown"
			>
				<img src={user.avatar} alt="user avatar" class="rounded-full w-10 h-10" />
				<p class="text-xl truncate">{user.displayName}</p>
			</div>
			<Icon icon="mingcute:down-line" class="text-2xl" />
		</button>
		{#if show}
			<div
				class="absolute top-full right-2 w-full max-w-xs min-w-[150px] rounded-md shadow-lg bg-white p-2 flex flex-col items-start gap-2 px-3 py-2"
			>
				<a
					href="#"
					class="w-full round-xl"
					on:click={() => {
						goto('/dashboard/quizzes');
						show = false;
					}}
				>
					<div class="flex gap-2 items-center hover:bg-secondary/30 p-1 rounded-lg">
						<Icon icon="tabler:home" class={'text-2xl'} />
						<h1 class="text-base">{$t('common.myQuizzes')}</h1>
					</div>
				</a>
				<a
					href="#"
					class="w-full round-xl"
					on:click={() => {
						goto('/dashboard/history');
						show = false;
					}}
				>
					<div class="flex gap-2 items-center hover:bg-secondary/30 p-1 rounded-lg">
						<Icon icon="material-symbols:history" class={'text-2xl'} />
						<h1 class="text-base">{$t('common.history')}</h1>
					</div>
				</a>
				<a
					href="#"
					class="w-full round-xl"
					on:click={() => {
						goto('/dashboard/profile');
						show = false;
					}}
				>
					<div class="flex gap-2 items-center hover:bg-secondary/30 p-1 rounded-lg">
						<Icon icon="mdi:account-circle" class={'text-2xl'} />
						<h1 class="text-base">{$t('common.profile')}</h1>
					</div>
				</a>
				<a
					href="#"
					class="w-full round-xl"
					on:click={() => {
						logout();
						show = false;
					}}
				>
					<div class="flex gap-2 items-center hover:bg-secondary/30 p-1 rounded-lg">
						<Icon icon="mdi:logout" class={'text-2xl'} />
						<h1 class="text-base">{$t('common.signOut')}</h1>
					</div>
				</a>
			</div>
		{/if}
	</button>
</div>
