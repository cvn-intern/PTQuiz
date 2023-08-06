<script lang="ts">
	import Icon from '@iconify/svelte';
	import Balloon from './balloon.svelte';
	import Firework from './firework.svelte';
	import { t } from '$i18n/translations';
	import { onMount } from 'svelte';
	import type { Socket } from 'socket.io-client';
	import { EmitChannel, ListenChannel } from '../../libs/constants/socketChannel';
	import Loading from '../loading.svelte';

	type Participant = {
		id: string;
		displayName: string;
		avatar: string;
		isHost: boolean;
		point: number;
		correct: number;
		isAnswered: boolean;
	};

	export let participants: Participant[];
	export let length: number;
	export let socket: Socket;
	let meIndex = 0;
	let isLoading = true;
	onMount(() => {
		socket.on(EmitChannel.ME, (data) => {
			if (data.me === true) {
				isLoading = false;
				meIndex = data.index;
			}
		});
		participants.forEach((participant, index) => {
			socket.emit(ListenChannel.GET_ME, {
				participantId: participant.id,
				index
			});
		});
	});
</script>

{#if isLoading}
	<Loading />
{:else}
	<div class="h-full flex flex-col items-center justify-center">
		{#if meIndex === 0}
			<div class="flex gap-10 justify-between w-full items-center">
				<div class="w-full text-center flex flex-col gap-5 relative">
					<p class="md:text-5xl text-4xl font-semibold text-run1st uppercase">
						{$t('common.winner')}
					</p>
					<div class="flex flex-col justify-center items-center">
						<Icon icon="noto:crown" class="text-5xl" />
						<img
							src={participants[0]?.avatar
								? participants[0].avatar
								: 'https://png.pngtree.com/element_our/png/20181206/ninja-warrior-png_260998.jpg'}
							alt="Img Avatar"
							class="rounded-full shadow-2xl border-4 border-spacing-2 border-run1st bg-transparent md:w-52 md:h-52 w-40 h-40"
						/>
						<p
							class="px-4 bg-white/50 rounded-md font-semibold text-sky-700 text-3xl text-center mt-4"
						>
							{participants[0]?.displayName}
						</p>
					</div>
					<div class="absolute w-full">
						<Firework />
					</div>
				</div>
			</div>
		{:else}
			<div class="w-full text-center flex flex-col gap-5 items-center">
				<p class="md:text-5xl text-4xl font-semibold text-run2st uppercase">
					{$t('common.loser')}
				</p>
				<div class="flex flex-col justify-center items-center">
					<Icon icon="emojione:sad-but-relieved-face" class="text-5xl" />
					<img
						src={participants[1]?.avatar
							? participants[1].avatar
							: 'https://png.pngtree.com/element_our/png/20181206/ninja-warrior-png_260998.jpg'}
						alt="Img Avatar"
						class="rounded-full shadow-2xl border-4 border-spacing-2 border-run2st bg-transparent md:w-52 md:h-52 w-40 h-40"
					/>
					<p
						class="px-4 bg-white/50 rounded-md font-semibold text-sky-700 text-3xl text-center mt-4"
					>
						{participants[1]?.displayName}
					</p>
				</div>
			</div>
		{/if}
	</div>
{/if}
