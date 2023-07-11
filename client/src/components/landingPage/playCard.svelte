<script>
	export let src = '';
	export let altText = '';
	export let title = '';
	export let href = '';
	export let intro = '';
	function handleClick() {
		window.location.href = href;
	}
</script>

<div
	class="card border flex flex-col items-center border-black rounded-xl px-2 py-4 md:p-8 gap-4 bg-primary cursor-pointer"
>
	<div class="flex flex-col text-center w-[250px] md:gap-6">
		<img {src} alt={altText} class="card-image md:w-[250px] md:h-[250px]" />
		<p class="text-xl">{intro}</p>
	</div>
	<div class=" mt-auto">
		<button
			class="button bg-secondary py-2 px-14 rounded-xl text-white font-semibold hover:bg-buttonHover"
			on:click={handleClick}
		>
			{title}
		</button>
	</div>
</div>
