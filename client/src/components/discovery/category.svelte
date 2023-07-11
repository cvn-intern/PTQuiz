<script lang="ts">
	import Card from './card.svelte';
	export let nameCategory = '';
</script>

<div class="md:py-8 md:px-2 md:px-12 lg:px-20">
	<h1 class="text-2xl font-semibold font-body mb-7 border-b border-gray-300 w-1/5">
		{nameCategory}
	</h1>

	<div class=" grid grid-cols-2 gap-6 lg:grid-cols-6 lg:gap-10">
		<Card nameofquiz={'Top 20 math question'} author={'Ha Viet Duc'} />
		<Card nameofquiz={'Top 20 math question qweqweqw qweqwe'} author={'Ngo Gia Phong'} />
		<Card nameofquiz={'Top 20 math question qwqwe'} author={'Ha Viet Duc'} />
		<Card nameofquiz={'Top 20 math question'} author={'Ngo Gia Phong'} />
		<Card nameofquiz={'Top 20 math question'} author={'Ha Viet Duc'} />
		<Card nameofquiz={'Top 20 math question'} author={'Ha Viet Duc'} />
	</div>
</div>
