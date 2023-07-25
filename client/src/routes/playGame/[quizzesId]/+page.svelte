<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { gameInfoStore } from '../../../libs/store/gameInfoStore';
	import logo from '../../../assets/logo.png';
	import clsx from 'clsx';
	import { navbarStore } from '../../../libs/store/navbarStore';
	import { onDestroy, onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { t } from '$i18n/translations';
	export let data;

	let gameInfo = data.gameInfo;
	gameInfoStore.update((val) => (val = gameInfo));
	let quizzesId = $page.params.quizzesId;

	$: textReady = 'ARE';
	setTimeout(() => {
		textReady = 'YOU';
	}, 500);
	setTimeout(() => {
		textReady = 'READY ?';
	}, 1000);
	$: isShowButton = false;
	setTimeout(() => {
		isShowButton = true;
	}, 1500);

	const isFullScreen = true;
	const handleIsFullScreen = (isFullScreen: boolean) => {
		navbarStore.update((value) => {
			return {
				...value,
				isFullScreen: isFullScreen
			};
		});
	};
	onMount(() => {
		handleIsFullScreen(isFullScreen);
	});
	onDestroy(() => {
		handleIsFullScreen(false);
	});
</script>

<div class="w-full bg-greenLight">
	<div class="flex flex-col justify-center items-center gap-10 py-20 md:py-0 h-full">
		<div class="h-40">
			<img src={logo} alt="logo" class="md:w-52 w-28 animate-wiggle" />
		</div>
		<div class="md:text-9xl text-6xl font-bold text-white">
			<h1 class="ease-in-out transition-all duration-100">{textReady}</h1>
		</div>
		<div>
			<button
				class={clsx(
					' text-white font-bold justify-center transition duration-200 ease-in-out transform px-4 py-2 w-48 border-b-4 border-zinc-500 hover:border-b-2 bg-red-700 rounded-2xl hover:translate-y-px',
					{
						hidden: !isShowButton
					}
				)}
				on:click={() => {
					goto('/discovery')
				}}
			>
				<span>{$t('common.exit')}</span>
			</button>
			<button
				class={clsx(
					' text-white font-bold justify-center transition duration-200 ease-in-out transform px-4 py-2 w-48 border-b-4 border-zinc-500 hover:border-b-2 bg-secondary rounded-2xl hover:translate-y-px',
					{
						hidden: !isShowButton
					}
				)}
				on:click={() => {
					goto(`/playGame/${quizzesId}/play`);
				}}
			>
				{$t('common.play')}
			</button>
		</div>
	</div>
</div>
