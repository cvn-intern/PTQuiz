<script lang="ts">
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';
	import { t } from '../../libs/i18n/translations';
	import Icon from '@iconify/svelte';
	import DetailQuiz from '$components/detailQuiz/detailQuiz.svelte';

	export let title: string;
	export let description: string;
	export let numberOfQuestions: number;
	export let image: string;
	export let createdAt: string;
	export let id: string;
	export let quiz: any;

	let sharedToastId: string | number;

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId.toString());
	};

	async function handleStart() {
		sharedToastId = toast.loading(t.get('common.loading'), { duration: 20000 });
		const response = await fetch(`/api/room/open`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				quizId: id
			})
		});
		const result = await response.json();
		if (response.status === 200) {
			dismissLoadingToast();
			toast.success(t.get('common.success'));
			goto(`/room/${result.data.PIN}`);
		} else {
			dismissLoadingToast();
			toast.error(result.message);
		}
	}

	function handleEdit() {
		goto(`/createQuiz/${id}`);
	}

	async function deleteQuiz(id: string) {
		const response = await fetch(`/api/quizzes/delete/${id}`, {
			method: 'DELETE'
		});
		const result = await response.json();
		if (response.status === 200) {
			toast.success(t.get('common.success'));
			location.reload();
		} else {
			toast.error(result.message);
		}
	}
	$: isOpen = false;
	$: questionList = [];

	const handleClickView = async () => {
		isOpen = !isOpen;
		const result = await getQuestionOfQuiz(id);
		if (result.statusCode === 200) {
			questionList = result.data;
		}
	};
	async function getQuestionOfQuiz(id: string) {
		const response = await fetch(`/api/quizzes/get-questions-no-answer/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = await response.json();
		return result;
	}
</script>

<div class="relative z-0 w-full">
	<a href="#"
		role="button"
		on:click={handleClickView}
		class="flex flex-row justify-center md:items-start border-rose-50 gap-3 border-solid shadow-md p-6 hover:shadow-md transition duration-200 transform hover:scale-102 rounded-xl cursor-pointer w-full"
		aria-details="Quiz Details"
	>
		<div>
			<img class="w-[176px] h-32 rounded-xl" src={image} alt={title} />
		</div>
		<div class="flex flex-col w-full justify-start gap-2 h-full text-start">
			<h1 class="md:text-2xl text-base font-bold max-w-sm whitespace-pre-wrap">
				{title}
			</h1>

			<p class="text-sm text-zinc-400">
				{$t('common.createdAt')}: <span class="text-zinc-400"> {createdAt}</span>
			</p>
		</div>
	</a>
	<div class="absolute top-5 right-5 z-10">
		<button on:click={() => deleteQuiz(id)}>
			<Icon icon="iconamoon:trash-fill" class="text-2xl text-red-600" />
		</button>
	</div>
	<div class="flex flex-row gap-4 absolute bottom-2 right-2 z-10">
		<button
			aria-label="Edit"
			on:click={handleEdit}
			class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
			>{$t('common.editBtn')}</button
		>
		<button
			aria-label="Start"
			on:click={handleStart}
			class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
			>{$t('common.startBtn')}</button
		>
	</div>
</div>
<DetailQuiz {isOpen} cardInfor={quiz} {questionList} />
