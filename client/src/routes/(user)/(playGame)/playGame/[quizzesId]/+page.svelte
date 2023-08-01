<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import logo from '$assets/logo.png';
	import clsx from 'clsx';
	import { t } from '$i18n/translations';
	import { gameInfoStore } from '$stores/gameInfoStore';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
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

	let buttonCancelClicked = false;
	let buttonPlayClicked = false;
	onMount(() => {
		buttonCancelClicked = false;
	});
	function handleClickExitButton() {
		if (!buttonCancelClicked) {
			goto('/discovery/All');
			buttonCancelClicked = true;
		}
	}
	function handleClickPlayButton() {
		if (!buttonPlayClicked) {
			goto(`/playGame/${quizzesId}/play`);
			buttonPlayClicked = true;
		}
	}
</script>

<div class="w-full bg-greenLight">
	<div class="flex flex-col justify-center items-center gap-10 py-20 md:py-0 h-full">
		<div class="h-40">
			<img src={logo} alt="logo" class="md:w-52 w-28 animate-wiggle" />
		</div>
		<div class="md:text-9xl text-6xl font-bold text-white">
			<h1 class="ease-in-out transition-all duration-100">{textReady}</h1>
		</div>
		<div class = "flex flex-col md:flex-row justify-center gap-4">
			<button
				class={clsx(
					' text-white font-bold text-xl  justify-center transition duration-200 ease-in-out transform px-4 py-4 w-48 border-b-4 border-zinc-500 hover:border-b-2 bg-orangeLogo rounded-2xl hover:translate-y-px ',
					{
						hidden: !isShowButton,
						'pointer-events-none opacity-50': buttonCancelClicked
					}
				)}
				on:click={() => {
					goto('/discovery/All');
				}}
				on:click={handleClickExitButton}
			>
				<span>{$t('common.exit')}</span>
			</button>
			<button
				class={clsx(
					' text-white font-bold text-xl justify-center transition duration-200 ease-in-out transform px-4 py-4 w-48 border-b-4 border-zinc-500 hover:border-b-2 bg-blueLogo rounded-2xl hover:translate-y-px ',
					{
						hidden: !isShowButton,
						'pointer-events-none opacity-50': buttonPlayClicked
					}
				)}
				on:click={handleClickPlayButton}
			>
				{$t('common.play')}
			</button>
		</div>
	</div>
</div>
