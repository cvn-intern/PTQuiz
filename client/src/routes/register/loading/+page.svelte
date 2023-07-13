<script>
	import { goto } from '$app/navigation';
	import { Spinner } from 'flowbite-svelte';
</script>

<div class=" flex justify-center items-center">
	<div
		class="w-[446px] border border-gray-200 flex flex-col items-center my-6 p-12 gap-12 rounded-xl bg-white"
	>
		<Spinner size={'24'} color="red" />
		<p>Check your Email to Verify your Identity</p>
		<div class=" text-gray-400">
			<p>
				If you still didn't receive it? <button
					class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
					on:click={() => {
						goto('/register/resend');
					}}
					>Resend
				</button>
			</p>
		</div>
	</div>
</div>
