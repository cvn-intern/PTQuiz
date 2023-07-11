<script>
	import testimg from './testimg.png';
	export let nameofquiz = '';
</script>

<div class="h-full rounded-xl justify-center hover:shadow-md transition duration-300 transform hover:scale-95">
	<div class="md:h-3/4 lg:h-4/5">
		<img src={testimg} alt="" class="rounded-t-xl w-full h-1/2 md:h-4/5" />
		<h1 class="text-base font-semibold mx-[10px] mt-5 font-body md:text-lg">
			{nameofquiz}
		</h1>
	</div>
    <div>
		<h2 class="mx-[10px] font-body">Author: Ha Viet Duc</h2>
    </div>
	<div class=" lg:my-2 ">


		<div class="p-1  flex flex-col md:items-center max-lg:gap-2 lg:flex-row lg:mt-2 lg:justify-center">
			<button class=" hover:bg-buttonHover  bg-secondary py-1 px-2 rounded-xl text-white md:py-2 max-lg:w-2/3 lg:mx-1 lg:px-6 lg:w-1/3">
				Play
			</button>
			<button class=" hover:bg-buttonHover  bg-secondary py-1 px-2 rounded-xl text-white md:py-2 max-lg:w-2/3 lg:mx-1 lg:px-6 lg:w-2/3">
				Add to My Quizzes
			</button>
		</div>
	</div>
</div>
