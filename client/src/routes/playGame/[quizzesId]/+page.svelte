<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { gameInfoStore } from '../../../libs/store/gameInfoStore';
	export let data;

	let gameInfo = data.gameInfo;
	gameInfoStore.update((val) => (val = gameInfo));
	let quizzesId = $page.params.quizzesId;
</script>

<div class="flex w-full justify-center items-center">
	<button
		class="p-6 bg-secondary rounded-full text-4xl hover:bg-buttonHover"
		on:click={() => {
			goto(`/playGame/${quizzesId}/play`);
		}}
	>
		Play Game
	</button>
</div>
