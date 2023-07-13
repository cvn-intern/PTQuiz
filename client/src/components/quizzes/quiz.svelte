<script lang="ts">
	export let title: string;
	export let author: string;
	export let description: string;
	export let numberOfQuestions: number;
	export let image: string;
</script>

<section
	class="w-full flex flex-row border-rose-50 gap-3 border-solid shadow-md p-6 hover:shadow-md transition duration-300 transform hover:scale-95"
>
	<div class="">
		<img class="w-[176px]" src={image} alt="" />
	</div>
	<div class="flex flex-col w-full justify-between">
		<div>
			<h1 class="text-2xl font-bold">{title}</h1>
			<p class="text-sm text-zinc-400">{description}</p>
		</div>
		<div class="flex flex-row justify-between items-center">
			<p class="text-sm text-zinc-400">
				Created by: <span class="text-zinc-300">{author}</span>
			</p>
			<div class="flex flex-row gap-4">
				<button
					class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
					>Edit</button
				>
				<button
					class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
					>Start</button
				>
			</div>
		</div>
	</div>
</section>
