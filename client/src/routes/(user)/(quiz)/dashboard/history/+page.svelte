<script>
	export let data;
	let games = data.result.data;
</script>

<div class="container mx-auto p-6">
	<h1 class="text-4xl mb-6">Game History</h1>
	<div class="overflow-x-auto">
		{#if games.length == 0}
			<p class="text-center">You have not played any game yet.</p>
		{:else}
			<table class="w-full table-auto">
				<thead>
					<tr class="text-left">
						<th class="px-4 py-2">Game</th>
						<th class="px-4 py-2">Start date</th>
						<th class="px-4 py-2">Complete date</th>
						<th class="px-4 py-2">Score</th>
						<th class="px-4 py-2">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each games as game}
						<tr>
							<td class="border px-4 py-2">{game.quiz.title}</td>
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
									<span class="text-green-500">Passed</span>
								{:else}
									<span class="text-red-500">Failed</span>
								{/if}
							</td></tr
						>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>
