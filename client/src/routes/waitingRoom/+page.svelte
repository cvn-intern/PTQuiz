<script>
	import { onMount } from 'svelte';

	let participants = [];

	onMount(() => {
		setInterval(() => {
			if (participants.length < 20) {
				participants = [...participants, participants.length + 1];
			}
		}, 100);
	});

	function startGame() {
	}
</script>

<div class="flex flex-col items-center justify-center min-h-scree text-black">
	<h1 class="text-4xl mb-8">Welcome to the Game!</h1>
	<h2 class="text-2xl mb-8">Participants: {participants.length}</h2>
	<div class="flex flex-wrap justify-center">
		{#each participants as participant (participant)}
			<div class="w-24 h-24 bg-green-500 m-4 flex items-center justify-center rounded">
				<p class="text-white">{participant}</p>
			</div>
		{/each}
	</div>
	<button
		class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8"
		on:click={startGame}>Start</button
	>
</div>
