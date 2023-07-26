<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import ModalInforQuizzes from '../../../../components/createQuizzes/modalInforQuizzes.svelte';
	import ChangeTypeQuestion from '../../../../components/createQuizzes/changeTypeQuestion.svelte';
	import CardQuestion from '$components/createQuizzes/cardQuestion.svelte';
	import Icon from '@iconify/svelte';
	import CreateQuestion from '$components/createQuestion/createQuestion.svelte';

</script>

<div class="w-full text-slate-950 md:p-10 bg-white">
	<div class="md:flex gap-6 justify-between">
		<div class="md:w-1/6 flex flex-col gap-10 items-center w-full">
			<ModalInforQuizzes />
			<div class="md:max-h-boxCardQuestion md:overflow-y-scroll w-full flex flex-col gap-4">
				<CardQuestion />
			</div>
			<hr class="bg-gray-950" />
			<Button class="bg-secondary text-white hover:bg-darkGreen">
				<Icon icon={'gridicons:add-outline'} class="text-xl mr-3" />
				Add Question
			</Button>
		</div>
		<div class="md:w-5/6 w-full">
			<div class="flex justify-between gap-4">
				<div>
					<ChangeTypeQuestion/>
				</div>
				<div class="flex gap-2">
					<Button class="bg-red-500">Exit</Button>
					<Button class="bg-green-600">Save</Button>
				</div>
			</div>
			<div class="w-full h-full mt-3">
				<CreateQuestion />
			</div>
		</div>
	</div>
</div>
