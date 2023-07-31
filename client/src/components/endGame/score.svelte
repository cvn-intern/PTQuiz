<script lang="ts">
	export let score: number;
	import { t } from '$i18n/translations';
</script>

<div class="w-full h-40 relative">
	<div
		class="text-xl font-semibold text-darkGreen w-32 h-32 flex items-center flex-col justify-center z-30 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
	>
		<p>{$t('common.yourScore')}</p>
		<p>{score}</p>
	</div>
	<div
		class="w-36 h-36 bg-opacity-60 z-20 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
	/>
	<div
		class="w-40 h-40 bg-opacity-40 z-10 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
	/>
	<div
		class="w-44 h-44 bg-opacity-20 z-0 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-sm"
	/>
</div>
