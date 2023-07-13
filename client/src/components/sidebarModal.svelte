<script lang="ts">
	import Icon from '@iconify/svelte';
	export let showModal: boolean = false;
	let elementsSidebar = [
		{
			name: 'My Quizzes',
			icon: 'tabler:home',
			isActive: true
		},
		{
			name: 'History',
			icon: 'material-symbols:history',
			isActive: false
		},
		{
			name: 'Profile',
			icon: 'mingcute:user-setting-fill',
			isActive: false
		},
		{
			name: 'Discovery',
			icon: 'mdi:world',
			isActive: false
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
	const onClick = () => {
		showModal = false;
	};
</script>

{#if showModal}
	<div class="container fixed inset-0 z-10 outline-none focus:outline-none bg-neutral-800/70">
		<div
			class={`translate duration-300 h-full 
		${showModal ? 'translate-x-0' : 'translate-x-full'} 
		${showModal ? 'opacity-100' : 'opacity-0'}`}
		>
			<div
				class="translate w-1/2 shadow-lg h-full absolute left-0 bg-background outline-none focus:outline-none"
			>
				<div class="w-full flex flex-col">
					<button class="flex justify-end py-2" on:click={onClick}>
						<Icon icon="ph:x-fill" class="text-4xl text-red-500" /> "
					</button>
					<div class="flex justify-center py-4">
						<h1 class="font-title text-2xl font-bold text-darkGreen">PentaQuiz</h1>
					</div>
					<nav class="p-4 flex-wrap">
						<ul class="space-y-1.5">
							{#each elementsSidebar as { isActive, icon, name }, i}
								<li on:click={() => changeActiveElement(i)}>
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
			</div>
		</div>
	</div>
{/if}
