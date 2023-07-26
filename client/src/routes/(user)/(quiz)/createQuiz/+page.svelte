<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import ChangeTypeQuestion from '../../../../components/createQuiz/changeTypeQuestion.svelte';
	import CreateQuestion from '$components/createQuestion/createQuestion.svelte';
	import MobileSidebar from '$components/createQuiz/mobileSidebar.svelte';
	import SidebarCreateQuiz from '$components/createQuiz/sidebarCreateQuiz.svelte';
	let typeOfQuestion = 1;
	let cardListQuestion = ['1'];
</script>

<div class="w-full text-slate-950 md:p-10 bg-white p-5">
	<div class="md:flex gap-6 justify-between">
		<SidebarCreateQuiz
			{cardListQuestion}
			classSidaBar="md:w-1/6 md:flex flex-col gap-10 items-center hidden"
		/>
		<div class="md:hidden block">
			<MobileSidebar />
		</div>
		<div class="md:w-5/6 w-full">
			<div class="flex justify-between gap-4">
				<div>
					<ChangeTypeQuestion bind:defaultType={typeOfQuestion} />
				</div>
				<div class="flex gap-2">
					<Button class="bg-red-500">Exit</Button>
					<Button class="bg-green-600">Save</Button>
				</div>
			</div>
			<div class="w-full h-full md:my-3 my-5">
				<CreateQuestion {typeOfQuestion} />
			</div>
		</div>
	</div>
</div>
