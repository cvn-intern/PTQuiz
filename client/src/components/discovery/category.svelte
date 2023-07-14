<script lang="ts">
	import Card from './card.svelte';
	export let nameCategory = '';
	import img1 from '../../assets/testimg.png';
	import img2 from '../../assets/testimg2.png';
	import img3 from '../../assets/testimg3.png';
	const cardList = [
		{
			nameofquiz: 'Top 20 math question',
			author: 'Ha Viet Duc',
			image: img1
		},
		{
			nameofquiz: 'Top 20 math question qweqweqw qweqwe',
			author: 'Ngo Gia Phong',
			image: img2
		},
		{
			nameofquiz: 'Top 20 math question qwqwe',
			author: 'Ha Viet Duc',
			image: img3
		},
		{
			nameofquiz: 'Top 20 math question',
			author: 'Ngo Gia Phong',
			image: img3
		},
		{
			nameofquiz: 'Top 20 math question',
			author: 'Ha Viet Duc',
			image: img2
		},
		{
			nameofquiz: 'Top 20 math question',
			author: 'Ha Viet Duc',
			image: img1
		}
	];
</script>

<div class="px-4 md:py-8 md:px-12 lg:px-20">
	<h1 class="text-2xl font-semibold font-body mb-7 border-b border-gray-300 w-1/5">
		{nameCategory}
	</h1>

	<div
		class=" grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-10 2xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-3"
	>
		{#each cardList as card}
			<Card nameofquiz={card.nameofquiz} author={card.author} image={card.image} />
		{/each}
	</div>
</div>
