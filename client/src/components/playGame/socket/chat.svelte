<script>
	import Icon from '@iconify/svelte';
	import Message from './message.svelte';
	import MyMessage from './myMessage.svelte';
	import { REACTIONS } from '$constants/chat';

	$: isShowReaction = false;
	$: isShowChat = true;
	const hanleClickOpenChat = () => {
		isShowChat = !isShowChat;
	};
</script>

<div
	class="md:w-96 md:max-w-sm max-w-xs backdrop-opacity-10 backdrop-invert bg-greenLight rounded-t-lg shadow-2xl {isShowChat
		? 'fixed right-0 bottom-0 z-60'
		: 'hidden'}"
>
	<div class="relative flex flex-col gap-4">
		<div class="overflow-y-scroll h-halfScreen max-h-halfScreen px-3 pt-5">
			<Message />
			<MyMessage />
			<Message />
			<MyMessage />
			<Message />
			<MyMessage />
			<Message />
			<Message />
			<Message />
			<MyMessage />
			<MyMessage />
			<Message />
			<Message />
		</div>
		<form class="flex justify-center absolute bottom-0 w-full">
			<input
				maxlength="100"
				type="text"
				class="border-none rounded-lg w-full p-3 font-semibold"
				placeholder="Enter message here..."
			/>
			<div class="absolute right-0 top-1/2 -translate-y-1/2 px-2 flex gap-1">
				<button
					type="button"
					class="border-2 bg-indigo-50 p-1 rounded-xl w-full"
					on:click={() => {
						isShowReaction = !isShowReaction;
					}}
				>
					<Icon icon="mdi:emoticon" class="text-3xl text-yellowLogo text-center" />
				</button>
				<button type="submit" class=" bg-darkGreen p-1 rounded-xl">
					<Icon
						icon="fluent:send-16-filled"
						class="text-3xl text-white text-center p-1"
					/>
				</button>
			</div>
			<div class="absolute -top-32 left-0 bg-white {isShowReaction ? '' : 'hidden'}">
				<div class="grid grid-cols-9">
					{#each REACTIONS as reaction}
						<button type="button" class="w-10 h-10 border hover:bg-gray-500"
							>{reaction}
						</button>
					{/each}
				</div>
			</div>
		</form>
		<div class="absolute right-0 z-60 w-full bg-white rounded-md py-0.5 flex justify-end">
			<button on:click={hanleClickOpenChat}
				><Icon icon="pixelarticons:close" class="text-2xl mr-3" /></button
			>
		</div>
	</div>
</div>
<button
	on:click={hanleClickOpenChat}
	class="shadow-lg rounded-xl backdrop-opacity-10 backdrop-invert h-10 bg-darkGreen md:w-96 text-white border-2 border-gray-300 font-semibold px-2 {isShowChat
		? 'hidden'
		: 'fixed right-0 bottom-0 z-60 '}"
>
	<div class="flex justify-center items-center gap-2">
		<Icon icon="et:chat" class="text-2xl" />
		<p>Open chat here</p>
	</div>
</button>
