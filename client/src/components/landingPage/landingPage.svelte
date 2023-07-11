<script>
	import PlayCard from './playCard.svelte';
	import PlayGame from '../../libs/assets/playgame.png';
	import CreateQuiz from '../../libs/assets/createquiz.png';
</script>

<main class=" bg-background min-h-screen py-6 px-6 lg:px-16 flex justify-center md:items-center">
	<div class="container flex flex-col lg:flex-row md:justify-between">
		<div class="title flex flex-col justify-center py-4 lg:pb-20 gap-10">
			<h1 class="text-5xl md:text-7xl font-bold font-title text-darkGreen">Penta Quiz</h1>
			<h2 class="text-3xl font-semibold">Exploring your full potential</h2>
		</div>
		<div class="card flex flex-col md:flex-row gap-6 md:gap-20 md:justify-center h-max">
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
</main>
