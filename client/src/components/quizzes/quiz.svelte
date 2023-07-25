<script lang="ts">
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';
	import { t } from '../../libs/i18n/translations';

	export let title: string;
	export let author: string;
	export let description: string;
	export let numberOfQuestions: number;
	export let image: string;
	export let createdAt: string;
	export let id: string;

	const dateObj = new Date(createdAt);
	const hours = String(dateObj.getUTCHours()).padStart(2, '0');
	const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
	const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
	const day = String(dateObj.getUTCDate()).padStart(2, '0');
	const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
	const year = dateObj.getUTCFullYear();
	const formattedDateTime = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

	let sharedToastId: string | number;

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId);
	};

	async function handleStart() {
		sharedToastId = toast.loading('Loading...', { duration: 20000 });
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
			toast.success('Success!');
			goto(`/room/${result.data.PIN}`);
		} else {
			dismissLoadingToast();
			toast.error(result.message);
		}
	}
</script>

<section
	class="flex flex-row justify-center md:items-start items-center border-rose-50 gap-3 border-solid shadow-md p-6 hover:shadow-md transition duration-200 transform hover:scale-102 rounded-xl cursor-pointer"
	aria-details="Quiz Details"
>
	<div>
		<img class="w-[176px] h-32 rounded-xl" src={image} alt={title} />
	</div>
	<div class="flex flex-col w-full">
		<div>
			<h1 class="md:text-2xl text-base font-bold max-w-sm whitespace-pre-wrap">{title}</h1>
			<p class="text-sm text-zinc-400 md:w-full md:block hidden">{description}</p>
		</div>
		<div class="flex md:flex-row flex-col md:justify-between md:items-center items-start md:gap-4 gap-2">
			<p class="text-sm text-zinc-400">
				{$t('common.createdAt')}: <span class="text-zinc-400"> {formattedDateTime}</span>
			</p>
			<div class="flex flex-row gap-4">
				<button
					aria-label="Start"
					on:click={handleStart}
					class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
					>{$t('common.startBtn')}</button
				>
			</div>
		</div>
	</div>
</section>
