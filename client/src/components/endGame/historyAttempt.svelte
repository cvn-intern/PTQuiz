<script lang="ts">
	export let attemptList: Attempt[];
	import type { Attempt } from '../../interface/endGame.interface';
	import { t } from '$i18n/translations';
</script>

<div class="w-full md:w-7/12 max-h-96 overflow-y-scroll">
	<div class="flex justify-center overflow-x-auto max-h">
		<table class="w-full text-left text-gray-500 dark:text-gray-400">
			<thead class="uppercase bg-darkGreen text-white">
				<tr>
					<th scope="col" class="px-6 py-3"> {$t('common.no')}</th>
					<th scope="col" class="px-6 py-3"> {$t('common.point')} </th>
					<th scope="col" class="px-6 py-3"> {$t('common.status')} </th>
				</tr>
			</thead>
			<tbody class="text-gray-900">
				{#each attemptList as { attempt, points, status }}
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
							{$t('common.attempt')}
							{attempt}
						</th>
						<td class="px-6 py-4"> {points} </td>
						<td class="px-6 py-4"> {status} </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
