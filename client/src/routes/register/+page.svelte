<script>
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { validationRegister } from '../login/interface/message.interface';
	import toast, { Toaster } from 'svelte-french-toast';

	export let form;
	export let data;

	onMount(async () => {
		if (data.user) {
			goto('/');
		}
	});

	async function handleSubmit() {
		toast.promise(
			new Promise((resolve, reject) => {
				setInterval(() => {
					if (form?.isDone) {
						if (form?.isSuccess) {
							resolve('Success!');
						} else {
							reject(form?.error.message || 'Invalid credentials');
						}
					}
				}, 100);
			}),
			{
				loading: 'Loading...',
				success: (value) => {
					goto('/register/loading');
					return value;
				},
				error: (err) => {
					return err;
				}
			}
		);
	}
</script>

<section class="flex justify-center">
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
						on:input={(input) => {
							form = validationRegister(input.target.value, 'displayName');
						}}
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
						on:input={(input) => {
							form = validationRegister(input.target.value, 'email');
						}}
						type="email"
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
						on:input={(input) => {
							form = validationRegister(input.target.value, 'password');
						}}
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
						on:input={(input) => {
							form = validationRegister(input.target.value, 'confirmPassword');
						}}
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
