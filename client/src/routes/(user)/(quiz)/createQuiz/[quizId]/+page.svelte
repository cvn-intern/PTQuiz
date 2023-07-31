<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import ChangeTypeQuestion from '../../../../../components/createQuiz/changeTypeQuestion.svelte';
	import CreateQuestion from '$components/createQuestion/createQuestion.svelte';
	import MobileSidebar from '$components/createQuiz/mobileSidebar.svelte';
	import SidebarCreateQuiz from '$components/createQuiz/sidebarCreateQuiz.svelte';
	import { dismissLoadingToast, showLoadingToast, showToast } from '$libs/toast/toast';
	let typeOfQuestion = 1;
	export let data: any;
	export let form: any;
	export let questions: any;
	import { questionData } from '$stores/questionInfoStore';
	import { indexNow } from '$stores/indexNowStore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { t } from '$i18n/translations';
	import Toast from '$components/toast.svelte';
	let length;

	let isSubmitting: boolean = false;

	length = questionData.subscribe((data) => {
		length = data;
	});
	const newQuestion = {
		id: '',
		categoryId: '',
		title: '',
		options: {
			optionA: '',
			optionB: '',
			optionC: '',
			optionD: ''
		},
		answers: {
			answerA: false,
			answerB: false,
			answerC: false,
			answerD: false
		},
		written: '',
		image: '',
		type: 1,
		index: 1
	};
	questionData.set([newQuestion]);
	indexNow.set({
		index: 0
	});

	let index: number;
	$: indexNow.subscribe((data) => {
		index = data.index;
	});

	$: questionData.subscribe((data) => {
		try {
			typeOfQuestion = data[index].type;
		} catch {
			indexNow.set({
				index: 0
			});
			typeOfQuestion = data[index].type;
		}
	});

	$: isSubmitting;
	let dataSave: any;
	questionData.subscribe((data) => {
		dataSave = data;
	});
	function checkInput() {
		if (dataSave[index].type === 0 || dataSave[index].type === 1) {
			if (
				dataSave[index].title === '' ||
				dataSave[index].options.optionA === '' ||
				dataSave[index].options.optionB === '' ||
				dataSave[index].options.optionC === '' ||
				dataSave[index].options.optionD === ''
			) {
				return false;
			}
			if (
				dataSave[index].answers.answerA === false &&
				dataSave[index].answers.answerB === false &&
				dataSave[index].answers.answerC === false &&
				dataSave[index].answers.answerD === false
			) {
				return false;
			}
		} else if (dataSave[index].type === 2) {
			if (dataSave[index].title === '' || dataSave[index].written === '') {
				return false;
			}
		} else {
			if (
				dataSave[index].title === '' ||
				(dataSave[index].answers.answerA === false &&
					dataSave[index].answers.answerB === false)
			) {
				return false;
			}
		}
		return true;
	}

	async function handleSave() {
		showLoadingToast();
		isSubmitting = true;
		if (!checkInput()) {
			dismissLoadingToast();
			showToast('error', t.get('validation.FILL_ALL_FIELDS'));
			isSubmitting = false;
			return;
		}
		let url, method;
		const quizId = $page.params.quizId;

		if (dataSave[index].id === '') {
			url = `/api/question/create/${quizId}`;
			method = 'POST';
		} else {
			url = `/api/question/update/${dataSave[index].id}`;
			method = 'PUT';
		}

		const formData = new FormData();
		formData.append('title', dataSave[index].title);
		formData.append('type', dataSave[index].type);
		formData.append('optionA', dataSave[index].options.optionA);
		formData.append('optionB', dataSave[index].options.optionB);
		formData.append('optionC', dataSave[index].options.optionC);
		formData.append('optionD', dataSave[index].options.optionD);
		formData.append('answerA', dataSave[index].answers.answerA);
		formData.append('answerB', dataSave[index].answers.answerB);
		formData.append('answerC', dataSave[index].answers.answerC);
		formData.append('answerD', dataSave[index].answers.answerD);
		formData.append('written', dataSave[index].written);

		if (dataSave[index].image !== '') {
			await fetch(dataSave[index].image)
				.then((res) => res.blob())
				.then((blob) => {
					const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
					formData.append('image', file);
				});
		} else {
			formData.append('image', '');
		}

		const response = await fetch(url, {
			method: method,
			body: formData
		});
		isSubmitting = false;
		dismissLoadingToast();
		const res = await response.json();
		if (response.status === 200) {
			showToast('success', t.get('common.success'));
			dataSave[index].id = res.data.id;
		} else showToast('error', res.message);
	}
	onMount(() => {
		if (data.questions.length > 0) {
			questionData.set(data.questions);
			return;
		}
	});

	function exit() {
		goto('/dashboard/quizzes');
	}
</script>

<Toast {form} />
<div class="w-full text-slate-950 md:p-10 bg-white p-5">
	<div class="md:flex gap-6 justify-between">
		<SidebarCreateQuiz
			classSidaBar="md:w-1/6 md:flex flex-col gap-10 items-center hidden"
			bind:result={data.result.data}
			{form}
		/>
		<div class="md:hidden block">
			<MobileSidebar bind:result={data.result.data} {form} />
		</div>
		<div class="md:w-5/6 w-full">
			<div class="flex justify-between gap-4">
				<div>
					<ChangeTypeQuestion bind:defaultType={typeOfQuestion} {index} />
				</div>
				<div class="flex gap-2">
					<Button class="bg-red-500" on:click={exit}>{$t('common.exit')}</Button>
					<Button class="bg-green-600" disabled={isSubmitting} on:click={handleSave}
						>{$t('common.save')}</Button
					>
				</div>
			</div>
			<div class="w-full h-full md:my-3 my-5">
				<CreateQuestion {typeOfQuestion} {index} />
			</div>
		</div>
	</div>
</div>
