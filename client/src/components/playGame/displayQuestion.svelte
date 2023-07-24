<script lang="ts">
	export let question: {
		title: string;
	};
</script>

<div class="question px-8 md:px-32">
	<div class="px-4 py-2 bg-secondary min-h-[208px] rounded-3xl shadow-xl">
		<h1 class="px-4 text-4xl text-white font-bold">Question</h1>
		<p class="p-2 text-2xl text-white">{question.title}</p>
	</div>
</div>
