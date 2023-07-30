<script lang="ts">
	import { TypeQuestion } from '$constants/typeQuestion';

	export let quizzesType: number;
	export let quizzesTitle: string;
</script>

<div class="flex flex-col h-full">
	<div class="flex justify-end">
		{#if quizzesType === TypeQuestion.SINGLE_CHOICE}
			<div
				class="hidden md:grid grid-cols-2 grid-rows-2 gap-2 bg-white p-3 rounded-xl md:items-center"
			>
				<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
				<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
				<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
				<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
			</div>
			<div class=" md:hidden rounded-xl text-white shadow-xl p-2 bg-green-500">
				Single Choice Question
			</div>
		{:else if quizzesType === TypeQuestion.MULTIPLE_CHOICE}
			<div
				class="hidden md:grid grid-cols-2 grid-rows-2 gap-2 bg-white p-2 rounded-xl items-center"
			>
				<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
				<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
				<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
				<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
			</div>
			<div class=" md:hidden rounded-xl text-white shadow-xl p-2 bg-green-500">
				Multiple Choice Question
			</div>
		{:else if quizzesType === TypeQuestion.TRUE_FALSE}
			<div
				class="hidden md:grid grid-cols-2 grid-rows-1 gap-2 bg-white p-2 rounded-xl items-center"
			>
				<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
				<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
			</div>
			<div class=" md:hidden rounded-xl text-white shadow-xl p-2 bg-green-500">
				True False Question
			</div>
		{:else if quizzesType === TypeQuestion.GUESS_WORDS}
			<div class="md:flex hidden p-4 gap-2 bg-white rounded-xl items-center">
				<div
					class="w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl animate-sequenceA"
				>
					A
				</div>
				<div
					class="w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl animate-sequenceB"
				>
					B
				</div>
				<div
					class="w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl animate-sequenceC"
				>
					C
				</div>

				<div class=" md:hidden rounded-xl text-white shadow-xl p-2 bg-green-500">
					Guess Words
				</div>
			</div>
		{/if}
	</div>
	<div class="flex justify-center items-center px-4 flex-1">
		<p class="p-2 text-3xl md:text-5xl lg:text-7xl font-semibold text-black text-center">
			{quizzesTitle}
		</p>
	</div>
</div>
