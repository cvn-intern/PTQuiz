<script>
	let items = ['My quizzes', 'Discovery', 'History', 'Profile'];
</script>

<aside class="h-full flex flex-col justify-center">
	<ul class="space-y-4">
		{#each items as item (item)}
			<li class="px-4 py-2 hover:bg-gray-100">{item}</li>
		{/each}
	</ul>
</aside>
