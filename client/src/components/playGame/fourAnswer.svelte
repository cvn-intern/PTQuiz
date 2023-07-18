<script lang="ts">
	import Icon from '@iconify/svelte';
	let buttonRounded: string =
		'bg-buttonAnswer rounded-full text-white w-8 h-8 md:w-12 md:h-12 text-2xl md:text-4xl';
</script>

<div class="grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 min-h-[208px]">
	<button class=" bg-optionA rounded-2xl flex p-2 md:p-4 gap-2">
		<div class="rounded-full">
			<button class={buttonRounded}> A </button>
		</div>
		<p class="text-sm md:text-xl font-semibold text-left">
			Chiều 17/7, khi Talim cách Móng Cái (Quảng Ninh) khoảng 400 km - vị trí dự kiến bão đổ
			bộ, các tỉnh thành phía Nam nằm xa tâm bão hơn nghìn km xảy ra mưa lớn. Giông gió đã làm
			nhiều cây ở TP HCM, Bình Dương,
		</p>
	</button>

	<button class="bg-optionB rounded-2xl flex p-2 md:p-4 gap-2">
		<div class="rounded-full">
			<button class={buttonRounded}> B </button>
		</div>
		<p class="text-sm md:text-xl font-semibold text-left">
			Chiều 17/7, khi Talim cách Móng Cái (Quảng Ninh) khoảng 400 km - vị trí dự kiến bão đổ
			bộ, các tỉnh thành phía Nam nằm xa tâm bão hơn nghìn km xảy ra mưa lớn. Giông gió đã làm
			nhiều cây ở TP HCM, Bình Dương,
		</p>
	</button>

	<button class=" bg-optionC rounded-2xl flex p-2 md:p-4 gap-2">
		<div class="rounded-full">
			<button class={buttonRounded}> C </button>
		</div>
		<p class="text-sm md:text-xl font-semibold text-left">
			Chiều 17/7, khi Talim cách Móng Cái (Quảng Ninh) khoảng 400 km - vị trí dự kiến bão đổ
			bộ, các tỉnh thành phía Nam nằm xa tâm bão hơn nghìn km xảy ra mưa lớn. Giông gió đã làm
			nhiều cây ở TP HCM, Bình Dương,
		</p>
	</button>

	<button class=" bg-optionD rounded-2xl flex p-2 md:p-4 gap-2">
		<div class="rounded-full">
			<button class={buttonRounded}> D </button>
		</div>
		<p class="text-sm md:text-xl font-semibold text-left">
			Chiều 17/7, khi Talim cách Móng Cái (Quảng Ninh) khoảng 400 km - vị trí dự kiến bão đổ
			bộ, các tỉnh thành phía Nam nằm xa tâm bão hơn nghìn km xảy ra mưa lớn. Giông gió đã làm
			nhiều cây ở TP HCM, Bình Dương,
		</p>
	</button>
</div>
