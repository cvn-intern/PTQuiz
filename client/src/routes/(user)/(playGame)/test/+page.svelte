<script lang="ts">
	import type { Tweened } from 'svelte/motion';
	import { Progressbar } from 'flowbite-svelte';

	// export let timer: Tweened<number>;
    $: stringQuestion = ((scoreUser.correct * 100) / questionLength).toString();

	let progressA = 100;
	let progressB = 0;
    

</script>

<div class="flex w-full gap-2 md:gap-4 items-center">
	<Progressbar progress={progressA.toString()} size="h-2 md:h-4" color="blue" class="bg-[#4b5563]" />
	<div class="px-2 md:px-8 rounded-full text-3xl md:text-7xl">20</div>
	<Progressbar progress={progressB.toString()} size="h-2 md:h-4" color="gray" class="bg-red-500" />
</div>
