<script>
	import PlayCard from './playCard.svelte';
	import PlayGame from '../../assets/playgame.png';
	import CreateQuiz from '../../assets/createquiz.png';
</script>

<div
	class=" bg-background py-4 px-4 lg:px-16 flex flex-col md:items-center lg:flex-row lg:justify-between w-screen"
>
	<div class="title flex flex-col justify-center py-4 lg:pb-20 gap-10">
		<h1 class="text-5xl md:text-7xl font-bold font-title text-darkGreen">Penta Quiz</h1>
		<h2 class="text-3xl font-semibold">Exploring your full potential</h2>
	</div>
	<div class="card flex flex-col md:flex-row gap-6 md:gap-20 md:justify-center">
		<PlayCard
			src={PlayGame}
			href={'/'}
			altText={'Play Game'}
			title={'Play Game'}
			intro={'Test your knowledge with our quiz'}
		/>
		<PlayCard
			src={CreateQuiz}
			href={'/'}
			altText={'Play Game'}
			title={'Create Quiz'}
			intro={'Create your own quiz'}
		/>
	</div>
</div>
