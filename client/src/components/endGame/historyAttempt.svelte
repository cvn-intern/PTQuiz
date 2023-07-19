<script>
	const AttemptList = [
		{
			Attempt: 1,
			Points: 10,
			Status: 'Fail'
		},
		{
			Attempt: 2,
			Points: 100,
			Status: 'Pass'
		}
	];
</script>

<div class="w-full">
	<div class="flex justify-center overflow-x-auto">
		<table class="w-1/2 text-left text-gray-500 dark:text-gray-400">
			<thead class="uppercase bg-darkGreen text-white">
				<tr>
					<th scope="col" class="px-6 py-3"> No. </th>
					<th scope="col" class="px-6 py-3"> Points </th>
					<th scope="col" class="px-6 py-3"> Status </th>
				</tr>
			</thead>
			<tbody class="text-gray-900">
				{#each AttemptList as { Attempt, Points, Status }}
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
							{Attempt}
						</th>
						<td class="px-6 py-4"> {Points} </td>
						<td class="px-6 py-4"> {Status} </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
