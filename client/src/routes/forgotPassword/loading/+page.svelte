<script>
	import { goto } from '$app/navigation';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col justify-center items-center w-full">
	<div
		class="w-[446px] border border-gray-200 shadow-xl flex flex-col items-center my-6 p-12 gap-12 rounded-xl bg-white"
	>
		<Icon icon="flat-color-icons:ok" class="text-9xl" />
		<p class="font-semibold">{$t('common.checkYourEmail')}</p>
		<div class=" text-gray-400">
			<p>
				{$t('common.ifYouDontSeeEmail')}<button
					aria-label="Resend Email"
					class="text-secondary hover:underline hover:text-darkGreen cursor-pointer"
					on:click={() => {
						goto('/forgotPassword');
					}}
					>{$t('common.resend')}
				</button>
			</p>
		</div>
	</div>
</div>
