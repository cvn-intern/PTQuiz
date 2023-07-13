<script lang="ts">
	import Icon from '@iconify/svelte';
	let elementsSidebar = [
		{
			name: 'My Quizzes',
			icon: 'tabler:home',
			isActive: true,
			path: '/quizzes'
		},
		{
			name: 'History',
			icon: 'material-symbols:history',
			isActive: false,
			path: '/history'
		},
		{
			name: 'Profile',
			icon: 'mingcute:user-setting-fill',
			isActive: false,
			path: '/profile'
		}
	];

	function changeActiveElement(index: number) {
		elementsSidebar = elementsSidebar.map((element, i) => {
			if (i === index) {
				element.isActive = true;
			} else {
				element.isActive = false;
			}
			return element;
		});
	}
</script>

<div
	class="h-screen w-full bg-white border-r border-gray-200 pt-7 pb-10 dark:bg-gray-800 dark:border-gray-700 md:block hidden"
>
	<nav class="p-6 w-full flex flex-col flex-wrap">
		<ul class="space-y-1.5">
			{#each elementsSidebar as { isActive, icon, name, path }, i}
				<li
					on:click={() => {
						path ? (window.location.href = path) : '';
						changeActiveElement(i);
					}}
				>
					<p
						class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-md hover:bg-secondary dark:bg-gray-900 dark:text-white cursor-pointer {isActive
							? 'bg-secondary'
							: ''}"
					>
						<Icon {icon} class={'text-xl'} />
						{name}
					</p>
				</li>
			{/each}
		</ul>
	</nav>
</div>
