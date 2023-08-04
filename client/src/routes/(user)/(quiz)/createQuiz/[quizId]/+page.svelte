<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import ChangeTypeQuestion from '../../../../../components/createQuiz/changeTypeQuestion.svelte';
	import CreateQuestion from '$components/createQuestion/createQuestion.svelte';
	import MobileSidebar from '$components/createQuiz/mobileSidebar.svelte';
	import SidebarCreateQuiz from '$components/createQuiz/sidebarCreateQuiz.svelte';
	import { dismissLoadingToast, showLoadingToast, showToast } from '$libs/toast/toast';
	let categoryOfQuestion = 0;
	let typeOfQuestion = 1;
	let timeOfQuestion = 20;
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
	import ChangeTimeQuestion from '$components/createQuiz/changeTimeQuestion.svelte';
	import ChangeCategoryQuestion from '$components/createQuiz/changeCategoryQuestion.svelte';
	let length;

	let isSubmitting: boolean = false;
	let isDisabled: boolean = false;
	let isDisabledNewQuestion: boolean = false;

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
		index: 1,
		time: 20,
		hint: ''
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
			timeOfQuestion = data[index].time;
			switch (data[index].categoryId) {
				case 'clk6mopdw0005j3ngsixir2g2':
					categoryOfQuestion = 0;
					break;
				case 'clk6mp0ik0006j3ngfaep8pb8':
					categoryOfQuestion = 1;
					break;
				case 'clkjsqieu0000k6m5sqfi4gj5':
					categoryOfQuestion = 2;
					break;
				case 'clkjsrewf0001k6m5bpxteo0t':
					categoryOfQuestion = 3;
					break;
				case 'clkjsrewg0002k6m565jmkvvw':
					categoryOfQuestion = 4;
					break;
				case 'clkjsrewg0003k6m5tpo9b8nx':
					categoryOfQuestion = 5;
					break;
				case 'clkjsrewg0004k6m5dt89zll5':
					categoryOfQuestion = 6;
					break;
				default:
					categoryOfQuestion = 0;
					break;
			}
		} catch {
			indexNow.set({
				index: 0
			});
			index = 0;
			typeOfQuestion = data[index].type;
		}
	});

	$: isSubmitting;
	let dataSave: any;
	questionData.subscribe((data) => {
		dataSave = data;
	});
	function checkInputChoiceType01() {
		if (
			dataSave[index].options.optionA === '' ||
			dataSave[index].options.optionB === '' ||
			dataSave[index].options.optionC === '' ||
			dataSave[index].options.optionD === ''
		) {
			return $t('common.errorOptions');
		}
		if (
			dataSave[index].answers.answerA === false &&
			dataSave[index].answers.answerB === false &&
			dataSave[index].answers.answerC === false &&
			dataSave[index].answers.answerD === false
		) {
			return $t('common.errorAnswer');
		}
		return '';
	}
	function checkInputTextType25() {
		if (dataSave[index].written === '') {
			return $t('common.errorWritten');
		}
		return '';
	}
	function checkInputChoiceType3() {
		if (
			dataSave[index].answers.answerA === false &&
			dataSave[index].answers.answerB === false
		) {
			return $t('common.errorAnswer');
		}
		return '';
	}
	function checkInputTextType4() {
		if (dataSave[index].written === '') {
			return $t('common.errorWritten');
		}
		return '';
	}
	function checkInputImageType6() {
		if (
			dataSave[index].options.optionA === '' ||
			dataSave[index].options.optionB === '' ||
			dataSave[index].options.optionC === '' ||
			dataSave[index].options.optionD === ''
		) {
			return $t('common.errorOptions');
		}
		if (
			dataSave[index].answers.answerA === false &&
			dataSave[index].answers.answerB === false &&
			dataSave[index].answers.answerC === false &&
			dataSave[index].answers.answerD === false
		) {
			return $t('common.errorAnswer');
		}
		if (dataSave[index].image === '') {
			return $t('common.errorGif');
		}
		return '';
	}

	function checkInput() {
		if (dataSave[index].title === '') {
			return $t('common.errorTitle');
		}
		if (dataSave[index].type === 1 || dataSave[index].type === 0) {
			return checkInputChoiceType01();
		}
		if (dataSave[index].type === 2 || dataSave[index].type === 5) {
			return checkInputTextType25();
		}
		if (dataSave[index].type === 3) {
			return checkInputChoiceType3();
		}
		if (dataSave[index].type === 4) {
			return checkInputTextType4();
		}
		if (dataSave[index].type === 6) {
			return checkInputImageType6();
		}
		return '';
	}

	async function handleSave() {
		showLoadingToast();
		isSubmitting = true;
		isDisabled = true;
		setTimeout(() => {
			isDisabled = false;
		}, 3000);
		let checkSave = checkInput();
		console.log(dataSave[index]);
		if (checkSave !== '') {
			dismissLoadingToast();
			showToast('error', checkSave);
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
		if (dataSave[index].image === null) {
			dataSave[index].image = '';
		}
		if (dataSave[index].written === null) {
			dataSave[index].written = '';
		}
		const formData = new FormData();
		formData.append('categoryId', dataSave[index].categoryId);
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
		formData.append('time', dataSave[index].time);
		formData.append('hint', dataSave[index].hint);

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
			isDisabledNewQuestion = false;
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

<div class="w-full text-slate-950 md:p-10 bg-white p-5">
	<div class="md:flex gap-6 justify-between">
		<SidebarCreateQuiz
			classSidaBar="md:w-1/6 md:flex flex-col gap-10 items-center hidden"
			bind:result={data.result.data}
			{form}
			bind:isDisabled={isDisabledNewQuestion}
		/>
		<div class="md:hidden block">
			<MobileSidebar
				bind:result={data.result.data}
				{form}
				bind:isDisabled={isDisabledNewQuestion}
			/>
		</div>

		<div class="md:w-5/6 w-full">
			<div class="flex justify-between gap-10">
				<div class="flex gap-4 sm:flex-row flex-col">
					<ChangeTypeQuestion bind:defaultType={typeOfQuestion} {index} />
					<ChangeTimeQuestion bind:defaultTime={timeOfQuestion} {index} />
					<ChangeCategoryQuestion bind:defaultCategory={categoryOfQuestion} {index} />
				</div>

				<div class="flex gap-2 sm:flex-row flex-col">
					<Button class="bg-red-500" on:click={exit}>{$t('common.exit')}</Button>
					<Button
						class="bg-green-600"
						disabled={isSubmitting || isDisabled}
						on:click={handleSave}>{$t('common.save')}</Button
					>
				</div>
			</div>
			<div class="w-full h-full md:my-3 my-5">
				<CreateQuestion {typeOfQuestion} {index} />
			</div>
		</div>
	</div>
</div>
