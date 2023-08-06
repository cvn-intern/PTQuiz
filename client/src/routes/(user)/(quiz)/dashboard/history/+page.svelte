<script lang="ts">
	export let data;
	let games = data.result.data;
	import { t } from '$i18n/translations';
	import DetailHistory from '$components/history/detailHistory.svelte';

	let cardInfor: any;
	$: isOpen = false;
	$: detailHistory = [];
	let index: number = 0;

	async function showModal(id: string) {
		isOpen = !isOpen;
		index = games.findIndex((game: any) => game.quiz.id === id);
		cardInfor = games[index].quiz;
		const result = await getDetailHistory(id);
		if (result.statusCode === 200) {
			detailHistory = result.data;
		}
	}

	async function getDetailHistory(id: string) {
		const response = await fetch(`/api/history/detail/${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = await response.json();
		return result;
	}
</script>

<div class="container mx-auto p-6">
	<h1 class="text-4xl mb-6">{$t('common.gameHistory')}</h1>
	<div class="overflow-x-auto">
		{#if games.length == 0}
			<p class="text-center">{$t('common.noHistory')}</p>
		{:else}
			<table class="w-full table-auto">
				<thead>
					<tr class="text-left">
						<th class="px-4 py-2">{$t('common.quizName')}</th>
						<th class="px-4 py-2">{$t('common.lastestStartedDate')}</th>
						<th class="px-4 py-2">{$t('common.lastestCompletedDate')}</th>
						<th class="px-4 py-2">{$t('common.score')}</th>
						<th class="px-4 py-2">{$t('common.status')}</th>
					</tr>
				</thead>
				<tbody>
					{#each games as game}
						<tr>
							<td class="border px-4 py-2">
								<a
									href="#"
									on:click={() => showModal(game.quiz.id)}
									role="button"
									class="flex flex-row justify-center md:items-start gap-3 p-6 hover:shadow-2xl transition duration-200 transform rounded-xl cursor-pointer w-full"
									aria-details="Quiz Details"
								>
									{game.quiz.title}</a
								></td
							>
							<td class="border px-4 py-2"
								>{new Date(game.startedAt).toLocaleString('vi-VN', {
									timeZone: 'Asia/Ho_Chi_Minh'
								})}</td
							>
							{#if game.completedAt == null}
								<td class="border px-4 py-2">-</td>
							{:else}
								<td class="border px-4 py-2"
									>{new Date(game.completedAt).toLocaleString('vi-VN', {
										timeZone: 'Asia/Ho_Chi_Minh'
									})}</td
								>
							{/if}
							<td class="border px-4 py-2">{game.point}</td>
							<td class="border px-4 py-2">
								{#if game.point >= game.quiz.passingPoint}
									<span class="text-green-500">{$t('common.passed')}</span>
								{:else}
									<span class="text-red-500">{$t('common.fail')}</span>
								{/if}
							</td></tr
						>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>

<DetailHistory {isOpen} {cardInfor} {detailHistory} />
