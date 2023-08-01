<script lang="ts">
	import toast from 'svelte-french-toast';
	type Participant = { id: string; displayName: string; avatar: string; isHost: boolean };
	type Message = {
		participant: Participant;
		content: string;
		reaction: string | null;
		id: number;
		left: number;
		style: string;
	};

	export let startGame: () => void;
	export let sendMessage: () => void;
	export let url: string;
	export let participants: Participant[];
	export let messages: Message[];
	export let isHost: boolean;
	export let messageContent: string;
	export let selectedReaction: string | null;
	export let isButtonDisabled: boolean;

	let reactions = ['😄', '😍', '🤣', '😊', '🙌'];
	const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=100x100`;
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		toast.success('Copied to clipboard');
	};
</script>

<div class="flex flex-col gap-4 h-full justify-center">
	<div class="flex flex-col justify-between gap-4">
		<div class="flex flex-col w-full justify-center items-center gap-4">
			{#if isHost}
				<div class="flex flex-row justify-between w-full items-center">
					<div class="flex gap-4 items-center">
						<button
							class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
							on:click={handleCopy}>Click here to copy link</button
						>
						<img class="hidden md:block" width="120px" src={qrCode} alt="" title="" />
					</div>
					<button
						class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
						on:click={startGame}>Start</button
					>
				</div>
			{/if}
		</div>
		<div class="flex flex-col gap-4 justify-center items-center">
			<div class="text-4xl">Waiting for players...</div>
			<div class="text-2xl">Participants: {participants.length}</div>
		</div>
	</div>
	<div class="hidden md:flex flex-wrap items-center justify-center gap-4">
		{#each participants as participant (participant.displayName)}
			<div
				class="rounded-xl w-48 h-20 flex items-center justify-between text-white p-2 bg-secondary hover:animate-wiggle"
			>
				<p class="truncate w-32">{participant.displayName}</p>
				<img
					src={participant.avatar}
					alt={participant.displayName}
					class="w-10 h-10 rounded-full ml-4"
				/>
			</div>
		{/each}
	</div>
	<div class="flex justify-center h-full items-center md:hidden">
		You can chat, throw react, and see others participants name on host screen
	</div>
	<div class="flex justify-center">
		<form on:submit|preventDefault={sendMessage} class="flex items-center space-x-2">
			<input
				bind:value={messageContent}
				placeholder="Type a message..."
				class="border-2 border-blue-500 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-700 transition-colors duration-200 ease-in-out"
			/>
			<div class="relative group">
				<button
					on:click={() => {
						selectedReaction = reactions[0];
					}}
					class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl focus:outline-none"
					>{reactions[0]}</button
				>
				<div
					class="absolute left-0 mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
				>
					{#each reactions.slice(1) as reaction}
						<button
							disabled={isButtonDisabled}
							on:click={() => {
								selectedReaction = reaction;
								isButtonDisabled = true;
							}}
							class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl focus:outline-none"
							>{reaction}</button
						>
					{/each}
				</div>
			</div>
			<button
				type="submit"
				class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl focus:outline-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
			</button>
		</form>
	</div>
	<style>
		@keyframes flyAndFade {
			0% {
				transform: translateY(30vh);
				opacity: 1;
			}
			100% {
				transform: translateY(0vh);
				opacity: 0;
			}
		}
	</style>
	{#each messages as message (message.id)}
		<div class="balloon flex items-center relative" style={message.style}>
			<img
				src={message.participant.avatar}
				alt={message.participant.displayName}
				class="w-12 h-12 rounded-full mr-2"
			/>
			<div class="text-center truncate">
				<p>{message.content} {message.reaction}</p>
			</div>
		</div>

		<style>
			.balloon {
				display: inline-block;
				width: 120px;
				height: 145px;
				background: hsl(215, 50%, 65%);
				border-radius: 80%;
				position: relative;
				box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.07);
				margin: 20px 30px;
				transition: transform 0.5s ease;
				z-index: 10;
				animation: balloons 1s ease-in-out infinite;
				transform-origin: bottom center;
			}
			@keyframes balloons {
				0%,
				100% {
					transform: translateY(0px) rotate(-4deg);
				}
				50% {
					transform: translateY(-20px) rotate(4deg);
				}
			}
			.balloon:before {
				content: '▲';
				font-size: 20px;
				color: hsl(215, 30%, 50%);
				display: block;
				text-align: center;
				width: 100%;
				position: absolute;
				bottom: -12px;
				z-index: -100;
			}
			.balloon:after {
				display: inline-block;
				top: 153px;
				position: absolute;
				height: 50px;
				width: 1px;
				margin: 0 auto;
				content: '';
				background: rgba(0, 0, 0, 0.2);
			}
		</style>
	{/each}
</div>
