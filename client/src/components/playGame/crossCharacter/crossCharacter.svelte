<script lang="ts">
	let answer = 'answer';
	let answerSplit = answer.split('');
	function scrambleString(str: string) {
		let chars = str.split('');

		for (let i = chars.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[chars[i], chars[j]] = [chars[j], chars[i]];
		}
		return chars.join('');
	}

	type CharacterObject = {
		char: string;
		id: number;
	};

	let newAnswer = answer + 'sadash';
	let scrambledAnswer = scrambleString(newAnswer);
	let scrambledAnswerSplit: CharacterObject[] = scrambledAnswer
		.split('')
		.map((char: string, id: number) => ({ char, id }));

	let chooseAnswer: CharacterObject[] = [];

	function addToChooseAnswer(input: CharacterObject, index: number) {
		if (chooseAnswer.length < answerSplit.length) {
			chooseAnswer = [...chooseAnswer, input];
			scrambledAnswerSplit = [
				...scrambledAnswerSplit.slice(0, index),
				...scrambledAnswerSplit.slice(index + 1)
			];
		}
	}
	function removeChooseAnswer(input: CharacterObject, index: number) {
		chooseAnswer = [...chooseAnswer.slice(0, index), ...chooseAnswer.slice(index + 1)];
		scrambledAnswerSplit = [
			...scrambledAnswerSplit.slice(0, input.id),
			input,
			...scrambledAnswerSplit.slice(input.id)
		];
	}
	let sampleAnswer: CharacterObject[] = [];

	$: {
		const chosenChars = chooseAnswer.map((obj) => obj.char).join('');
		if (chosenChars === answer) {
			matchingAnswer = true;
		} else {
			matchingAnswer = false;
		}
	}
</script>

<div class="w-full flex flex-col justify-center items-center h-screen">
	<div class="h-1/2">Question</div>
	<div class="h-1/2">
		<div class="flex flex-col h-full">
			<div class="flex h-1/2 justify-center items-center gap-4">
				{#each sampleAnswer as input, index}
					<button
						class="p-3 text-7xl border-black rounded-lg border bg-slate-400"
						on:click={() => removeChooseAnswer(input, index)}
						>{a}
					</button>
				{/each}
				{#each chooseAnswer as input, index}
					<button
						class="p-3 text-7xl border-black rounded-lg border bg-slate-400"
						on:click={() => removeChooseAnswer(input, index)}
						>{input.char}
					</button>
				{/each}
			</div>
			<div class="flex h-1/2 justify-center items-center gap-4">
				{#each scrambledAnswerSplit as input, index}
					<button
						class="p-3 w-22 h-22 text-7xl border-black rounded-lg border bg-slate-400"
						on:click={() => addToChooseAnswer(input, index)}
						>{input.char}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
