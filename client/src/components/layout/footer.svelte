<script>
	import Icon from '@iconify/svelte';
	import { t } from '$i18n/translations';

	const contactIcons = [
		'ic:baseline-facebook',
		'mdi:twitter',
		'ic:baseline-telegram',
		'ri:instagram-fill',
		'mdi:linkedin'
	];

</script>

<footer class="bg-primary flex flex-col flex-end">
	<div class="flex flex-col md:items-center">
		<div class="container flex flex-col items-start px-4 gap-8 md:flex-row md:justify-between lg:px-24 pt-4">
			<div class="location flex flex-col items-center gap-2">
				<h1 class="text-xl font-bold" aria-label="">{$t('common.ourLocation')}</h1>
				<div class="flex flex-col gap-2">
					<span class="flex gap-2 items-center cursor-pointer">
						<Icon icon="bxs:map" class="text-2xl" />
						<div class="flex flex-col">
							<p>{$t('common.address')}</p>
							<p>{$t('common.city')}</p>
						</div>
					</span>
					<span class="flex gap-2 items-center cursor-pointer">
						<Icon icon="material-symbols:mail" class="text-2xl" />
						<p class="">btdat1412@gmail.com</p>
					</span>
					<span class="flex gap-2 items-center cursor-pointer">
						<Icon icon="ic:baseline-phone" class="text-2xl" />
						<p class="">+84 12746060</p>
					</span>
				</div>
			</div>
			<div class="about flex flex-col items-center gap-2">
				<h1 class="text-xl font-bold">{$t('common.aboutUs')}</h1>
				<ul class="flex flex-col gap-2">
					<li class="cursor-pointer" aria-label="About us">{$t('common.aboutUs')}</li>
					<li class="cursor-pointer" aria-label="Help">{$t('common.help')}</li>
					<li class="cursor-pointer" aria-label="FAQS">{$t('common.faq')}</li>
				</ul>
			</div>
			<div class="contact flex flex-col items-center gap-2">
				<h1 class="text-xl font-bold">{$t('common.contactUs')}</h1>
				<div class="flex gap-2 cursor-pointer">
					{#each contactIcons as icon}
						<Icon {icon} class="text-2xl" />
					{/each}
				</div>
			</div>
		</div>
		<div class="copyright flex justify-center text-black font-semibold">
			{$t('common.copyRights')}
		</div>
	</div>
</footer>
