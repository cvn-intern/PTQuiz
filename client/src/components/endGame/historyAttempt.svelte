<script lang="ts">
	import type { Attempt } from '../../routes/endGame/resultGame.type';
	export let attemptList: Attempt[];
</script>

<div class="w-full md:w-7/12">
	<div class="flex justify-center overflow-x-auto">
		<table class="w-full text-left text-gray-500 dark:text-gray-400">
			<thead class="uppercase bg-darkGreen text-white">
				<tr>
					<th scope="col" class="px-6 py-3"> No. </th>
					<th scope="col" class="px-6 py-3"> Points </th>
					<th scope="col" class="px-6 py-3"> Status </th>
				</tr>
			</thead>
			<tbody class="text-gray-900">
				{#each attemptList as { attempt, points, status }}
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
							Attempt {attempt}
						</th>
						<td class="px-6 py-4"> {points} </td>
						<td class="px-6 py-4"> {status} </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
