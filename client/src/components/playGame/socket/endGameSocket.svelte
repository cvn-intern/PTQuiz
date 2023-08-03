<script lang="ts">
	import { goto } from '$app/navigation';
	import Position from '$components/endGame/position.svelte';
	import { t } from '$i18n/translations';

	type Participant = {
		id: string;
		displayName: string;
		avatar: string;
		isHost: boolean;
		point: number;
		correct: number;
		isAnswered: boolean;
	};

	export let participants: Participant[] = [];
	export let length: number;
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex justify-end my-8">
		<button
			class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-redLight"
			on:click={() => {
				goto('/dashboard/quizzes');
			}}>{$t('common.backHome')}</button
		>
	</div>
	<Position {participants} {length} />
</div>
