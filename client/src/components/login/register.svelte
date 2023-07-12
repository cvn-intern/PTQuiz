<script>
	import { goto } from '$app/navigation';
</script>

<section class="flex justify-center">
	<div class="w-[446px] bg-white rounded-3xl shadow-md shadow-zinc-400 my-6">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-8">
			<h1 class=" text-secondary text-[20px] font-bold">Sign up</h1>
			<form class="w-full px-4 lg:px-0 mx-auto" method="POST" action="?/register">
				<div class="py-4">
					<input
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						class="block w-full p-4 rounded-md border-gray text-zinc-400"
					/>
				</div>
				<div class="py-4">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray text-zinc-400"
					/>
				</div>
				<div class="py-4">
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						class="block w-full p-4 rounded-md border-gray text-zinc-400"
					/>
				</div>
				<div class="py-4">
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						placeholder="Confirm Password"
						class="block w-full p-4 rounded-md border-gray text-zinc-400"
					/>
				</div>
				<div class="pt-4">
					<button
						type="submit"
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
		</div>
	</div>
</section>

<style>
	.border-gray {
		@apply border border-spacing-1 border-zinc-200;
	}
</style>
