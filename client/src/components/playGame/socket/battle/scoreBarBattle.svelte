<script lang="ts">
	import type { Tweened } from 'svelte/motion';
	import ProgressComponent from './progressComponent.svelte';

	export let timer: Tweened<number>;
	export let participants: any[];
	export let questionLength: number;

	$: participantHost = participants.filter((participant) => participant.isHost)[0];
	$: participantCompetitor = participants.filter((participant) => !participant.isHost)[0];

	let progressA: number = 0;
	let progressB: number = 0;

	$: progressA = (participantHost.correct / questionLength) * 100;

	$: progressB = (participantCompetitor.correct / questionLength) * 100;
</script>

<div class="flex w-full gap-2 md:gap-4 items-center">
	<ProgressComponent progress={progressA} color={"yellow"} />
	<div class="px-2 md:px-8 rounded-full text-3xl md:text-7xl">
		{$timer.toFixed(0)}
	</div>
	<ProgressComponent progress={progressB} color={"blue"} />
</div>
