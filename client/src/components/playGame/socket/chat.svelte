<script>
	import Icon from '@iconify/svelte';
	import Message from './message.svelte';
	import MyMessage from './myMessage.svelte';
	let reactions = [
		'😄',
		'😍',
		'🤣',
		'😊',
		'🙌',
		'🙂',
		'😀',
		'😄',
		'😆',
		'😅',
		'😂',
		'😌',
		'😉',
		'😏',
		'😍',
		'😘',
		'😗',
		'😙',
		'😚',
		'🤗',
		'😳',
		'🙃',
		'😇',
		'😭',
		'😢',
		'😢',
		'😟'
	];
	$: isShowReaction = false;
</script>

<div
	class="w-96 backdrop-opacity-10 backdrop-invert bg-purple-400/30 shadow-lg rounded-t-lg p-2 h-screen fixed right-0 top-0 z-50"
>
	<div class="relative flex flex-col gap-4">
		<div class="overflow-scroll max-h-screen px-2">
			<Message />
			<MyMessage />
			<Message />
			<MyMessage />
			<Message />
			<MyMessage />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
		</div>
		<div class="flex justify-center absolute bottom-3 w-full">
			<input
				type="text"
				class="border-none rounded-lg w-full p-4 font-semibold"
				placeholder="Enter message here..."
			/>
			<div class="absolute right-0 top-1/2 -translate-y-1/2">
				<button
					class="border-2 bg-indigo-50 p-1 rounded-xl"
					on:click={() => {
						isShowReaction = !isShowReaction;
					}}
				>
					<Icon icon="mdi:emoticon" class="text-3xl text-yellowLogo text-center" />
				</button>
				<button class=" bg-indigo-800 p-1 rounded-xl">
					<Icon
						icon="fluent:send-16-filled"
						class="text-3xl text-white text-center p-1"
					/>
				</button>
			</div>
			<div class="absolute -top-32 bg-white {isShowReaction ? '' : 'hidden'}">
				<div class="grid grid-cols-9">
					{#each reactions as reaction}
						<button class="w-10 h-10 border hover:bg-gray-500">{reaction} </button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
