<script lang="ts">
	import Icon from '@iconify/svelte';
	export let showModal: boolean = false;
	import SidebarItem from './sidebarItem.svelte';

	const onClick = () => {
		showModal = false;
	};
</script>

{#if showModal}
	<div
		class="container fixed inset-0 w-screen z-10 outline-none focus:outline-none bg-neutral-800/70"
	>
		<div
			class={`translate duration-300 h-full w-screen
		${showModal ? 'translate-x-0' : 'translate-x-100'} 
		${showModal ? 'opacity-100' : 'opacity-0'}`}
		>
			<div
				class="translate w-1/2 shadow-lg h-full absolute left-0 bg-background outline-none focus:outline-none"
			>
				<div class="w-full flex flex-col">
					<button class="flex justify-end py-2" on:click={onClick}>
						<Icon icon="ph:x-fill" class="text-4xl text-red-500 mx-2" />
					</button>
					<div class="flex justify-center py-4">
						<h1 class="font-title text-2xl font-bold text-darkGreen">PentaQuiz</h1>
					</div>
					<nav class="p-4 w-full flex flex-col flex-wrap gap-2">
						<SidebarItem
							name={'My Quizzes'}
							icon={'tabler:home'}
							navigateTo={'/dashboard/quizzes'}
						/>
						<SidebarItem
							name={'History'}
							icon={'material-symbols:history'}
							navigateTo={'/dashboard/history'}
						/>
						<SidebarItem
							name={'Profile'}
							icon={'mingcute:user-setting-fill'}
							navigateTo={'/dashboard/profile'}
						/>
						<SidebarItem
							name={'Discovery'}
							icon={'mdi:world'}
							navigateTo={'/discovery'}
						/>
					</nav>
				</div>
			</div>
		</div>
	</div>
{/if}
