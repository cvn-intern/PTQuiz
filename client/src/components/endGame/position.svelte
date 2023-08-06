<script lang="ts">
	import Icon from '@iconify/svelte';

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
	const topThreeParticipants = participants.slice(0, 3);
</script>

<div class="flex justify-center mt-20 mb-10">
	<div class="flex items-end">
		<div
			class={`${
				topThreeParticipants.length < 2 ? 'hidden' : ''
			} bg-run2st text-white p-4 pt-6 rounded-tl-2xl relative h-52 w-24 md:h-60 md:w-36`}
		>
			<div class="absolute -top-14 z-10 left-1/2 -translate-x-1/2 w-full">
				<div class="flex flex-col justify-center items-center">
					<img
						src={topThreeParticipants[1]?.avatar
							? topThreeParticipants[1].avatar
							: 'https://png.pngtree.com/element_our/png/20181206/ninja-warrior-png_260998.jpg'}
						alt="Img Avatar"
						class="rounded-full shadow-2xl border-4 border-spacing-2 border-run2st bg-transparent w-20 h-20"
					/>
				</div>
			</div>
			<div class="flex flex-col items-center text-center gap-4">
				<h2 class="text-2xl md:text-4xl font-semibold">2st</h2>
				<div>
					<p>
						{topThreeParticipants[1]?.displayName
							? topThreeParticipants[1].displayName
							: ''}
					</p>
					<p class="font-semibold">
						{topThreeParticipants[1]?.point ? topThreeParticipants[1].point : 0} Point
					</p>
					<p class="font-semibold">
						{topThreeParticipants[1]?.correct
							? topThreeParticipants[1].correct
							: 0}/{length}
					</p>
				</div>
			</div>
		</div>
		<div class="bg-run1st text-white p-4 pt-6 rounded-t-2xl relative w-24 h-64 md:h-72 md:w-36">
			<div class="absolute -top-20 z-10 left-1/2 -translate-x-1/2 w-full">
				<div class="flex flex-col justify-center items-center">
					<Icon icon="noto:crown" class="text-3xl" />
					<img
						src={topThreeParticipants[0]?.avatar
							? topThreeParticipants[0].avatar
							: 'https://png.pngtree.com/element_our/png/20181206/ninja-warrior-png_260998.jpg'}
						alt="Img Avatar"
						class="rounded-full shadow-2xl border-4 border-spacing-2 border-run1st bg-transparent w-20 h-20"
					/>
				</div>
			</div>
			<div class="flex flex-col items-center text-center gap-4">
				<h2 class="text-2xl md:text-4xl font-semibold">1st</h2>
				<div>
					<p>
						{topThreeParticipants[0]?.displayName
							? topThreeParticipants[0].displayName
							: ''}
					</p>
					<p class="font-semibold">
						{topThreeParticipants[0]?.point ? topThreeParticipants[0].point : 0} Point
					</p>
					<p class="font-semibold">
						{topThreeParticipants[0]?.correct
							? topThreeParticipants[0].correct
							: 0}/{length}
					</p>
				</div>
			</div>
		</div>
		<div
			class={`${topThreeParticipants.length < 3 ? 'hidden' : ''}
		bg-run3st text-white p-4 pt-6 rounded-tr-2xl relative w-24 h-40 md:h-48 md:w-36`}
		>
			<div class="absolute -top-14 z-10 left-1/2 -translate-x-1/2 w-full">
				<div class="flex flex-col justify-center items-center">
					<img
						src={topThreeParticipants[2]?.avatar
							? topThreeParticipants[2].avatar
							: 'https://png.pngtree.com/element_our/png/20181206/ninja-warrior-png_260998.jpg'}
						alt="Img Avatar"
						class="rounded-full shadow-2xl border-4 border-spacing-2 border-run3st bg-transparent w-20 h-20"
					/>
				</div>
			</div>
			<div class="flex flex-col items-center text-center gap-2">
				<h2 class="text-2xl md:text-4xl font-semibold">3st</h2>
				<div>
					<p>
						{topThreeParticipants[2]?.displayName
							? topThreeParticipants[2].displayName
							: ''}
					</p>
					<p class="font-semibold">
						{topThreeParticipants[2]?.point ? topThreeParticipants[2].point : 0} Point
					</p>
					<p class="font-semibold">
						{topThreeParticipants[2]?.correct
							? topThreeParticipants[2].correct
							: 0}/{length}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
