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

<footer class="navbar bg-primary w-full px-4 lg:px-16 py-4 items-center">
	<div class="flex flex-col w-full">
		<div class="flex justify-between">
			<div>DarkHorse Team</div>
			<div class="flex gap-2 cursor-pointer">
				{#each contactIcons as icon}
					<Icon {icon} class="text-2xl" />
				{/each}
			</div>
		</div>
	</div>
	<div class="">
		<div class="container">
			<div class="ak-bar-inner">
				<div class="ak-row ak-row-items-middle ak-row-responsive">
					<div class="ak-column ak-column-left ak-column-grow">
						<div class="ak-inner-row ak-row-items-middle ak-justify-content-left">
							<div class="ak-bar-item ak-footer-copyright">
								{$t('common.copyRights')}
							</div>
						</div>
					</div>
					<div class="ak-column ak-column-right ak-column-grow">
						<div class="ak-inner-row ak-row-items-middle ak-justify-content-right">
							<div class="ak-bar-item ak-footer-menu-container">
								<ul
									id="menu-footer-navigation"
									class="ak-menu ak-menu-wide ak-menu-style-2 ak-footer-menu"
								>
									<li
										id="menu-item-547"
										class="menu-item menu-item-type-custom menu-item-object-custom menu-item-547"
									>
										<a
											href="https://themeforest.net/item/newsy-viral-news-magazine-wordpress-theme/34626838&amp;ref=akbilisim"
											><span>Buy Now</span></a
										>
									</li>
									<li
										id="menu-item-548"
										class="menu-item menu-item-type-custom menu-item-object-custom menu-item-548"
									>
										<a
											href="https://support.akbilisim.com/docs/newsy/introduction"
											><span>Documentation</span></a
										>
									</li>
									<li
										id="menu-item-549"
										class="menu-item menu-item-type-custom menu-item-object-custom menu-item-549"
									>
										<a href="https://support.akbilisim.com/"
											><span>Support Center</span></a
										>
									</li>
									<li
										id="menu-item-550"
										class="menu-item menu-item-type-custom menu-item-object-custom menu-item-550"
									>
										<a
											href="https://themeforest.net/user/akbilisim?ref=akbilisim"
											><span>Contact Us</span></a
										>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
