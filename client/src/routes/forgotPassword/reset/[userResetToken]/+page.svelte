<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { LayoutData } from '../../../$types.js';
	import { enhance } from '$app/forms';
	export let data: LayoutData;

	export let form;
	let sharedToastId: string | number;
	let isProcessing: boolean = false;
	const showLoadingToast = (): void => {
		sharedToastId = toast.loading('Loading...', { duration: 20000 });
	};

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId);
	};
	const handleSubmit = async (): Promise<void> => {
		if (isProcessing) return;
		isProcessing = true;

		showLoadingToast();

		form = null;

		while (!form?.isDone) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		dismissLoadingToast();

		if (form?.isSuccess) {
			toast.success('Success!');
			invalidateAll();
			window.location.href = '/';
		} else {
			dismissLoadingToast();
			toast.error(form?.error.message || 'Invalid token');
		}

		isProcessing = false;
	};
	onMount(() => {
		if (data.user) {
			goto('/');
		}
	});
</script>

<section class="flex flex-col items-center justify-center w-full">
	<div class="w-[446px] bg-white rounded-3xl shadow-md shadow-zinc-400 my-6">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-8">
			<h1 class=" text-secondary text-[20px] font-bold">Reset Password</h1>
			<form
				method="POST"
				class="w-full px-4 lg:px-0 mx-auto"
				use:enhance={() => {
					return async ({ update }) => {
						await update({ reset: false });
					};
				}}
				action={'?/reset'}
			>
				<div class="py-4">
					<input
						aria-label="Password"
						type="password"
						name="password"
						id="password"
						placeholder="New Password"
						class="block w-full p-4 rounded-md border-gray-200 text-zinc-400"
						required
					/>
				</div>
				<div class="py-4">
					<input
						aria-label="Confirm Password"
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						placeholder="Confirm Password"
						class="block w-full p-4 rounded-md border-gray-200 text-zinc-400"
						required
					/>
				</div>
				<div class="pt-4">
					<button
						on:click={handleSubmit}
						aria-label="Reset Password"
						type="submit"
						class="uppercase block w-full p-4 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none text-white"
						>Reset your Password</button
					>
				</div>
			</form>
			<div>
				<div class=" text-gray-400">
					<p>
						Already have an account? <button
							aria-label="Log In"
							class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
							on:click={() => {
								goto('/login');
							}}
							>Log In
						</button>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
