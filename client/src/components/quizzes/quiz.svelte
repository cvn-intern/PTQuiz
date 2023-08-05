<script lang="ts">
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';
	import { t } from '../../libs/i18n/translations';
	import Icon from '@iconify/svelte';
	import DetailQuiz from '$components/detailQuiz/detailQuiz.svelte';
	import { page } from '$app/stores';
	import Loading from '$components/loading.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import { RoomType } from './room.enum';
	let popupModal = false;

	export let title: string;
	export let description: string;
	export let numberOfQuestions: number;
	export let image: string;
	export let createdAt: string;
	export let id: string;
	export let quiz: any;
	export let quizzes: any;
	let isDelete = false;

	let date = new Date(createdAt).toLocaleString('vi-VN', {
		timeZone: 'Asia/Ho_Chi_Minh'
	});

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
				quizId: id,
				type: RoomType.GROUP
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
			if (result.message.includes('Room is already exist')) {
				let url = result.message.match(/(http|https):\/\/[^\s$.?#].[^\s]*$/gm);
				goto(`${url}`);
			}
		}
	}

	function handleEdit() {
		goto(`/createQuiz/${id}`);
	}

	async function deleteQuiz(id: string) {
		isDelete = true;
		const response = await fetch(`/api/quizzes/delete/${id}`, {
			method: 'DELETE'
		});

		const result = await response.json();
		isDelete = false;

		if (response.status === 200) {
			const quizIndex = quizzes.findIndex((quiz: any) => quiz.id === id);
			quizzes.splice(quizIndex, 1);
			let redirectUrl = `/dashboard/quizzes/${$page.params.page || 1}/${
				$page.params.sortBy || 0
			}`;

			if (quizzes.length === 0) {
				redirectUrl = `/dashboard/quizzes/${parseInt($page.params.page) - 1}/${
					$page.params.sortBy
				}`;
			}

			window.location.href = redirectUrl;
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

{#if isDelete}
	<Loading />
{/if}

<div class="relative z-0 w-full">
	<a
		href="#"
		role="button"
		on:click={handleClickView}
		class="flex flex-row justify-center md:items-start border-rose-50 gap-3 border-solid p-6 shadow-md hover:shadow-2xl transition duration-200 transform rounded-xl cursor-pointer w-full"
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
		<button on:click={() => (popupModal = true)}>
			<Icon icon="iconamoon:trash-fill" class="text-2xl text-red-600" />
		</button>
	</div>
	<div class="flex flex-row gap-4 absolute bottom-3 right-3 z-10">
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
<Modal bind:open={popupModal} size="xs" autoclose>
	<div class="text-center">
		<svg
			aria-hidden="true"
			class="mx-auto mb-4 w-14 h-14 text-red-400 dark:text-red-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{$t('common.confirmDelete')}
		</h3>
		<Button color="red" class="mr-2" on:click={() => deleteQuiz(id)}
			>{$t('common.acceptDeleteQuiz')}</Button
		>
		<Button color="green">{$t('common.cancelDeleteQuiz')}</Button>
	</div>
</Modal>
<DetailQuiz {isOpen} cardInfor={quiz} {questionList} />
