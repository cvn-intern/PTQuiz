<script>
	import Icon from '@iconify/svelte';
</script>

<footer class="bg-primary font-body flex flex-col items-center">
	<div class="container flex flex-col gap-8 md:flex-row justify-between lg:px-24 pt-4">
		<div class="location flex flex-col items-center gap-2">
			<h1 class="text-xl font-bold">Our Location</h1>
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
			<div class="flex flex-col gap-2">
				<p class="cursor-pointer">About us</p>
				<p class="cursor-pointer">Help</p>
				<p class="cursor-pointer">FAQS</p>
			</div>
		</div>
		<div class="contact flex flex-col items-center gap-2">
			<h1 class="text-xl font-bold">Contact Us</h1>
			<div class="flex gap-2 cursor-pointer">
				<Icon icon="ic:baseline-facebook" class="text-2xl " />
				<Icon icon="mdi:twitter" class="text-2xl" />
				<Icon icon="ic:baseline-telegram" class="text-2xl" />
				<Icon icon="ri:instagram-fill" class="text-2xl" />
				<Icon icon="mdi:linkedin" class="text-2xl" />
			</div>
		</div>
	</div>
	<div class="copyright flex justify-center text-black font-semibold">Copyrights by DarkHorse 2023</div>
</footer>
