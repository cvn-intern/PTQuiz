<script lang="ts">
	export let score: number;
	import { t } from '$i18n/translations';
</script>

<div class="w-full md:h-40 h-32 relative">
	<div
		class="text-xl font-semibold text-darkGreen md:w-32 md:h-32 w-20 h-20 flex items-center flex-col justify-center z-30 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
	>
		<p class="text-base md:text-lg">{$t('common.yourScore')}</p>
		<p class="text-base md:text-lg">{score}</p>
	</div>
	<div
		class="md:w-36 md:h-36 w-24 h-24 bg-opacity-60 z-20 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
	/>
	<div
		class="md:w-40 md:h-40 w-28 h-28 bg-opacity-40 z-10 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
	/>
	<div
		class=" md:w-44 md:h-44 w-32 h-32 bg-opacity-20 z-0 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-sm"
	/>
</div>
