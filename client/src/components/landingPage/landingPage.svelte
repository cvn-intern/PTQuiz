<script>
	import PlayCard from './playCard.svelte';
	import PlayGame from '../../assets/playgame.png';
	import CreateQuiz from '../../assets/createquiz.png';
	import { t } from '$i18n/translations';
	import Dropdown from '$components/dropdown.svelte';
	import DropdownProfile from '$components/dropdown/dropdownProfile.svelte';
</script>

<div
	class=" bg-background py-4 px-4 lg:px-16 flex flex-col md:items-center lg:flex-row lg:justify-between w-screen"
>
	<div class="title flex flex-col justify-center py-4 lg:pb-20 gap-10">
		<h1 class="text-5xl md:text-7xl font-bold font-title text-darkGreen">
			Quiz<sup class="text-3xl md:text-5xl text-orangeLogo">P</sup><sup
				class="text-3xl md:text-5xl text-blueLogo">T</sup
			>
		</h1>
		<h2 class="text-3xl font-semibold">{$t('common.explore')}</h2>
	</div>
	<div />
	<div class="card flex flex-col md:flex-row gap-6 md:gap-20 md:justify-center">
		<PlayCard
			src={PlayGame}
			href={'/discovery/all'}
			altText={'Play Game'}
			title={$t('common.playGame')}
			intro={$t('common.playGameIntro')}
		/>
		<PlayCard
			src={CreateQuiz}
			href={'/createQuiz'}
			altText={'Play Game'}
			title={$t('common.createQuiz')}
			intro={$t('common.createQuizIntro')}
		/>
	</div>
</div>
