<script lang="ts">
	import FourAnswer from '../../components/playGame/fourAnswer.svelte';
	import ProgressBar from '../../components/playGame/progressBar.svelte';
</script>

<main class=" bg-greenLight min-h-screen flex flex-col py-16">
	<div class="px-4 md:px-16 py-6">
		<ProgressBar />
	</div>
	<div class="flex justify-between" />
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
