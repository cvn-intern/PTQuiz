<script>
	import Icon from '@iconify/svelte';
</script>

<div class="max-w-md w-[330px] bg-gray-50 shadow-lg rounded-xl p-6 m-10">
	<div class="flex flex-col">
		<div class="relative h-62 w-full mb-3">
			<img
				src="https://groupgames101.com/wp-content/uploads/2022/06/Summer-trivia-quesitons.jpg"
				alt="Just a flower"
				class=" w-full object-fill rounded-xl shadow-md h-full"
			/>
		</div>
		<div class="flex-auto justify-evenly mt-4">
			<div class="flex flex-wrap">
				<div class="w-full text-sm flex items-center text-gray-600">
					<div class="flex items-center gap-2">
						<Icon icon="ph:question" color="red" />
						<span class="text-gray-400 whitespace-nowrap mr-3">10 Questions</span>
					</div>
					<div class="flex items-center gap-2">
						<Icon icon={'ph:clock'} color={'blue'} />
						<span class="mr-2 text-gray-400"> Time: 5p</span>
					</div>
				</div>
				<div class="flex items-start w-full justify-between min-w-0 mt-4">
					<h2
						class="text-lg cursor-pointer text-gray-600 hover:text-secondary truncate font-semibold whitespace-pre-wrap"
					>
						20 super hard Math question
					</h2>
					<div
						class="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg mt-2"
					>
						Math
					</div>
				</div>
			</div>
			<div class="text-base text-gray-600 py-2">
				<div>
					<span class="font-semibold">Author: </span>
					<span class="p-1 py-0">Thanh Tinh</span>
				</div>
				<div>
					<span class="font-semibold">Level: </span>
					<span class="p-1 py-0 text-yellow-400">Medium</span>
				</div>
			</div>
			<div class="flex space-x-2 font-medium py-3 text-sm">
				<button
					class="transition ease-in duration-300 inline-flex items-center font-medium mb-2 md:mb-0 bg-secondary px-4 py-2 hover:shadow-lg tracking-wider text-white rounded-xl hover:bg-darkGreen shadow-lg"
				>
					<span>Play</span>
				</button>
				<button
					class="transition ease-in duration-300 inline-flex items-center font-medium mb-2 md:mb-0 bg-secondary px-4 py-2 hover:shadow-lg tracking-wider text-white rounded-xl hover:bg-darkGreen shadow-lg"
				>
					<span>Add to my Quizzes</span>
				</button>
			</div>
		</div>
	</div>
</div>
