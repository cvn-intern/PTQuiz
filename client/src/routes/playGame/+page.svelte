<script lang="ts">
	import FourAnswer from '../../components/playGame/fourAnswer.svelte';
	import ProgressBar from '../../components/playGame/progressBar.svelte';
</script>

<main class=" bg-greenLight flex flex-grow flex-col justify-center">
	<div class="px-4 md:px-16 py-6">
		<ProgressBar />
	</div>
	<div class="flex justify-between px-4 py-4 md:px-16">
		<button class="px-4 bg-red-500 text-xl rounded-2xl">End Game</button>
		<button class="px-4 bg-buttonHover text-xl rounded-2xl text-white">Next Question</button>
	</div>
	<div class="question px-8 md:px-32">
		<div class="px-4 py-2 bg-secondary min-h-[208px] rounded-3xl">
			<h1 class="px-4 text-4xl text-white font-bold">Question</h1>
			<p class="p-2 text-2xl text-white">In which Italian city can you find the Colosseum?</p>
		</div>
	</div>
	<div class="px-4 md:px-16 py-8">
		<FourAnswer />
	</div>
</main>
