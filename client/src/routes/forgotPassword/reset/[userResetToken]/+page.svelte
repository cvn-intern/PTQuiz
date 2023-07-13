<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';

	export let form;
</script>

<section class="flex justify-center">
	<div class="w-[446px] bg-white rounded-3xl shadow-md shadow-zinc-400 my-6">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-8">
			<h1 class=" text-secondary text-[20px] font-bold">Reset Password</h1>
			<form method="POST" class="w-full px-4 lg:px-0 mx-auto" action={'?/reset'}>
				<div class="py-4">
					<input
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
							class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
							on:click={() => {
								goto('/login');
							}}
							>Log In
						</button>
					</p>
				</div>
			</div>
			{#if form}
				<h4 class="text-red-600 font-light text-md text-center">
					{form.error}
				</h4>
			{/if}
		</div>
	</div>
</section>
