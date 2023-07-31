<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import type { Quiz } from '../../../routes/(user)/(playGame)/playGame/[quizzesId]/play/quizzes.interface';
	import { page } from '$app/stores';

	export let question: Quiz;
	export let socket: Socket;
	export let user: any;
	export let isHost: boolean;

	$: {
		console.log(question);
		console.log(user);
		console.log(isHost);
		console.log(socket);
	}
</script>

{#each Object.keys(question.options) as optionKey}
	<button
		disabled={isHost ? false : true}
		class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
		on:click={() => {
			socket.emit('pick-answer', {
				roomPIN: $page.params.slug,
				userId: user.id,
				answer: optionKey
			});
		}}>{question.options[optionKey]}</button
	>
{/each}
