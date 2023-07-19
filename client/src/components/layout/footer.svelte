<script>
	import Icon from '@iconify/svelte';

	const aboutUs = ['About us', 'Help', 'FAQS'];

	const contactIcons = [
		'ic:baseline-facebook',
		'mdi:twitter',
		'ic:baseline-telegram',
		'ri:instagram-fill',
		'mdi:linkedin'
	];
</script>

<footer class="bg-primary flex flex-col flex-end">
	<div class="flex flex-col items-center">
		<div class="container flex flex-col gap-8 md:flex-row justify-between lg:px-24 pt-4">
			<div class="location flex flex-col items-center gap-2">
				<h1 class="text-xl font-bold" aria-label="">Our Location</h1>
				<div class="flex flex-col gap-2">
					<span class="flex gap-2 items-center cursor-pointer">
						<Icon icon="bxs:map" class="text-2xl" />
						<div class="flex flex-col">
							<p>106 Nguyen Van Troi, Phu Nhuan</p>
							<p>District, Ho Chi Minh City</p>
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
				<h1 class="text-xl font-bold">About Us</h1>
				<ul class="flex flex-col gap-2">
					{#each aboutUs as item}
						<li class="cursor-pointer" aria-label={item}>{item}</li>
					{/each}
				</ul>
			</div>
			<div class="contact flex flex-col items-center gap-2">
				<h1 class="text-xl font-bold">Contact Us</h1>
				<div class="flex gap-2 cursor-pointer">
					{#each contactIcons as icon}
						<Icon {icon} class="text-2xl" />
					{/each}
				</div>
			</div>
		</div>
		<div class="copyright flex justify-center text-black font-semibold">
			Copyrights by DarkHorse 2023
		</div>
	</div>
</footer>
