<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { dismissLoadingToast, showLoadingToast } from '../../libs/toast/toast.js';
	import type Message from '../login/interface/message.interface.js';

	export let form: Message;

	let isProcessing: boolean = false;

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
			goto('/register/loading');
			toast.success('Success!');
		} else {
			dismissLoadingToast();
			toast.error(form?.error.message || 'Invalid credentials');
			isProcessing = false;
		}
	};
</script>

<section class="flex justify-center w-full">
	<div class="w-[446px] bg-white rounded-3xl shadow-md shadow-zinc-400 my-6">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-8">
			<h1 class=" text-secondary text-[20px] font-bold">Sign up</h1>
			<form
				method="POST"
				class="w-full px-4 lg:px-0 mx-auto"
				action="?/register"
				use:enhance={() => {
					return async ({ update }) => {
						await update({ reset: false });
					};
				}}
			>
				<div class="py-4">
					<label for="displayName" class="mb-1 text-black">Display Name</label>
					<input
						type="text"
						name="displayName"
						id="displayName"
						placeholder="Display Name"
						class="block w-full p-4 rounded-md border-gray-200 text-black"
					/>
					{#if !form?.isSuccess && form?.error?.missing?.displayName}
						<label for="displayName" class="mb-1 text-red-500"
							>{form.error.message}</label
						>
					{/if}
				</div>
				<div class="py-4">
					<label for="email" class="mb-1 text-black">Email</label>
					<input
						type="text"
						name="email"
						id="email"
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray-200 text-black"
					/>
					{#if !form?.isSuccess && form?.error?.missing?.email}
						<label for="email" class="mb-1 text-red-500">{form.error.message}</label>
					{/if}
				</div>
				<div class="py-4">
					<label for="password" class="mb-1 text-black">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						class="block w-full p-4 rounded-md border-gray-200 text-black"
					/>
					{#if !form?.isSuccess && form?.error?.missing?.password}
						<label for="password" class="mb-1 text-red-500">{form.error.message}</label>
					{/if}
				</div>
				<div class="py-4">
					<label for="confirmPassword" class="mb-1 text-black">Confirm Password</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						placeholder="Confirm Password"
						class="block w-full p-4 rounded-md border-gray-200 text-black"
					/>
					{#if !form?.isSuccess && form?.error?.missing?.confirmPassword}
						<label for="confirmPassword" class="mb-1 text-red-500"
							>{form.error.message}</label
						>
					{/if}
				</div>

				<div class="pt-4">
					<button
						type="submit"
						on:click={handleSubmit}
						id="submit"
						class="uppercase block w-full p-4 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none text-white"
						>SIGN UP</button
					>
				</div>
			</form>
			<div>
				<div class=" text-gray-400">
					<p>
						Already have an account? <button
							class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
							on:click={() => {
								goto('/login');
							}}
							>Log In
						</button>
					</p>
				</div>
			</div>
			<div class="flex justify-center items-center" />
		</div>
	</div>
</section>
