<script lang="ts">
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

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
	let isProcessing: boolean = false;

	const showLoadingToast = (): void => {
		sharedToastId = toast.loading('Loading...', { duration: 20000 });
	};

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId);
	};

	async function handleStart() {
		sharedToastId = toast.loading('Loading...', { duration: 20000 });
		const response = await fetch(`/api/quizzes/${id}/start`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		if (response.status === 200) {
			dismissLoadingToast();
			goto(`/quiz/${id}`);
		} else {
			dismissLoadingToast();
			toast.error(result.message);
		}
	}
</script>

<section
	class="w-full flex flex-row border-rose-50 gap-3 border-solid shadow-md p-6 hover:shadow-md transition duration-300 transform hover:scale-95 rounded-xl"
	aria-details="Quiz Details"
>
	<div class="">
		<img class="w-[176px] h-[120px]" src={image} alt={title} />
	</div>
	<div class="flex flex-col w-full justify-between">
		<div>
			<h1 class="text-2xl font-bold">{title}</h1>
			<p class="text-sm text-zinc-400">{description}</p>
		</div>
		<div class="flex flex-row justify-between items-center">
			<p class="text-sm text-zinc-400">
				Created at: <span class="text-zinc-400">{formattedDateTime}</span>
			</p>
			<div class="flex flex-row gap-4">
				<button
					aria-label="Edit"
					class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
					>Edit</button
				>
				<button
					aria-label="Start"
					class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
					>Start</button
				>
			</div>
		</div>
	</div>
</section>
