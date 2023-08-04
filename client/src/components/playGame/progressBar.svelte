<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { tweened } from 'svelte/motion';

	export let stringTimer: string;

	const getColor = (stringTimer: string) => {
		const timer = Number(stringTimer);

		switch (true) {
			case timer > 66.66:
				return 'green';
			case timer > 33.33:
				return 'yellow';
			case timer > 0:
				return 'red';
			default:
				return 'gray';
		}
	};
</script>

<Progressbar progress={stringTimer} size="h-4" color={getColor(stringTimer)} />
