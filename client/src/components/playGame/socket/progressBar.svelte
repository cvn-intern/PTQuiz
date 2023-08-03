<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { tweened } from 'svelte/motion';

	export let stringTimer: string;

	const getColor = (stringTimer: string) => {
		const timer = Number(stringTimer);

		switch (true) {
			case timer > 75:
				return 'blue';
			case timer > 50:
				return 'indigo';
			case timer > 25:
				return 'purple';
			case timer > 0:
				return 'red';
			default:
				return 'gray';
		}
	};
</script>

<Progressbar progress={stringTimer} size="h-4" color={getColor(stringTimer)} />
