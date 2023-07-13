<script>
	import { goto } from '$app/navigation';
	import { Spinner } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
</script>

<div class=" flex justify-center items-center">
	<div
		class="w-[446px] border border-gray-200 shadow-xl flex flex-col items-center my-6 p-12 gap-12 rounded-xl bg-white"
	>
		<Icon icon="flat-color-icons:ok" class="text-9xl" />
		<p class="font-semibold">Check your Email</p>
		<div class=" text-gray-400">
			<p>
				If you still didn't receive it? <button
				aria-label="Resend Email"
					class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
					on:click={() => {
						goto('/forgotPassword');
					}}
					>Resend
				</button>
			</p>
		</div>
	</div>
</div>
