<script>

	export let image ='';
	export let nameofquiz = '';
	export let author = '';
</script>

<div
	class=" h-full rounded-xl justify-center shadow-md transition duration-300 transform hover:scale-105 lg:pb-3"
>
	<div class="h-3/4 lg:h-4/5">
		<img src={image} alt="" class="rounded-t-xl w-full h-4/5" />
		<h1 class=" text-xs  font-semibold mx-[10px] mt-5 font-body md:text-lg">
			{nameofquiz}
		</h1>
	</div>
	<div class=" max-md:pb-1 max-lg:pb-5 lg:mt-3">
		<h2 class="text-xs md:text-base mx-[10px] font-body">Author: {author}</h2>
	</div>
	<div
		class="pb-3 flex flex-col items-center md:mx-[10px] max-lg:gap-2 lg:flex-row lg:mt-2 lg:justify-center"
	>
		<button
			class=" text-xs md:text-sm hover:bg-buttonHover bg-secondary py-1 px-2 rounded-xl text-white max-md:w-5/6 md:py-2 max-lg:w-2/3 lg:mr-1 lg:px-2 lg:w-1/4"
		>
			Play
		</button>
		<button
			class="text-xs md:text-sm hover:bg-buttonHover bg-secondary py-1 px-2 rounded-xl text-white max-md:w-5/6 md:py-2 max-lg:w-2/3 lg:ml-1 lg:px-2 lg:w-3/4"
		>
			Add to My Quizzes
		</button>
	</div>
</div>
