<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { tweened } from 'svelte/motion';

	let realtime = 20;
	let original = 100;
	let intervalValue = original / realtime;
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) $timer -= intervalValue;
	}, 100);
</script>

<Progressbar progress={$timer.toString()} color="gray" />
