<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import OAuth from '../OAuth.svelte';
</script>

<section class="flex text-white justify-center">
	<div class="w-[446px] rounded-3xl shadow-md shadow-zinc-400 my-6 border bg-white">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-10">
			<h1 class=" text-secondary text-[20px] font-bold">Login to your Account</h1>

			<form method="POST" class="w-full px-4 lg:px-0 mx-auto" action="/login">
				<div class="py-4">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray text-zinc-400"
						required
					/>
				</div>
				<div class="py-4">
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						class="block w-full p-4 rounded-md border-gray text-zinc-400"
						required
					/>
				</div>
				<div class=" text-gray-400 hover:underline hover:text-gray-100">
					<a href="/" class="text-secondary">Forgot your password?</a>
				</div>
				<div class="pt-4">
					<button
						type="submit"
						class="uppercase block w-full p-4 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none"
						>LOG IN</button
					>
				</div>
			</form>
			<div>
				<OAuth />
				<div class="py-6 space-x-2 text-gray-500 flex">
					<button
						class=" border-gray-200 border p-2 rounded-md hover:bg-zinc-100 flex items-center gap-2"
					>
						<Icon icon="logos:facebook" class="text-2xl " />
						<span>Facebook</span>
					</button>
					<button
						class="border-gray p-2 rounded-md hover:bg-zinc-100 flex items-center gap-2"
					>
						<Icon icon="flat-color-icons:google" class="text-2xl " />
						<span>Google</span>
					</button>
				</div>
			</div>
			<div class=" text-gray-400">
				<div>
					Don't have an account?
					<button
						class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
						on:click={() => {
							goto('/register');
						}}
					>
						Sign up
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.border-gray {
		@apply border border-spacing-1 border-zinc-200;
	}
</style>
