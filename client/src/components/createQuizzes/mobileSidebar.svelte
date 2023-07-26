<script lang="ts">
	import { Drawer, CloseButton, Button } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import SidebarCreateQuizzes from './sidebarCreateQuizzes.svelte';
	import Icon from '@iconify/svelte';
	let hidden1 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<div class="text-start my-3">
	<Button on:click={() => (hidden1 = false)} class={'text-black border '}>
		<Icon icon={'ep:list'} class="text-xl mr-2 text-cyan-500" />
		Show questions
	</Button>
</div>
<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
	<div class="flex items-center">
		<h5
			id="drawer-label"
			class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
		>
			<svg
				class="w-5 h-5 mr-2"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
					clip-rule="evenodd"
				/></svg
			>Info
		</h5>
		<CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" />
	</div>
	<SidebarCreateQuizzes classSidaBar={'flex flex-col gap-10 items-center'} />
</Drawer>
