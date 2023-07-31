<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, Chevron, Radio } from 'flowbite-svelte';
	import { questionData } from '$stores/questionInfoStore';
	import { t } from '$i18n/translations';
	export let index: number;
	export let defaultTime = 20;
	$: timeOfQuestion = (() => {
		switch (defaultTime) {
			case 5:
				return '5s';
			case 10:
				return '10s';
			case 20:
				return '20s';
			case 30:
				return '30s';
			case 60:
				return '60s';
			default:
				return '20s';
		}
	})();
	$: questionData.update((data) => {
		switch (defaultTime) {
			case 5:
				data[index].time = 5;
				break;
			case 10:
				data[index].time = 10;
				break;
			case 20:
				data[index].time = 20;
				break;
			case 30:
				data[index].time = 30;
				break;
			case 60:
				data[index].time = 60;
				break;
			default:
				data[index].time = 20;
				break;
		}
		return data;
	});
</script>

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400">
	<Chevron>{timeOfQuestion}</Chevron></Button
>
<Dropdown class="w-full p-3 space-y-1">
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="timeOfQuestion" bind:group={defaultTime} value={5}>5s</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="timeOfQuestion" bind:group={defaultTime} value={10}>10s</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="timeOfQuestion" bind:group={defaultTime} value={20}>20s</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="timeOfQuestion" bind:group={defaultTime} value={30}>30s</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="timeOfQuestion" bind:group={defaultTime} value={60}>60s</Radio>
	</li>
</Dropdown>
