<script lang="ts">
	import Icon from '@iconify/svelte';
	export let scoreUser: any;
	export let index: number;
</script>

<div class="w-96 p-2 rounded-lg bg-white shadow-md">
	<div class="flex flex-row justify-between gap-2 items-center">
		<div class="flex items-center gap-2">
			<Icon icon="mdi:medal" class="text-2xl text-primaryColor-400" />
			<p>{index + 1}</p>
			<img src={scoreUser.avatar} alt="" class="w-8 h-8 rounded-md" />
			<p>{scoreUser.displayName}</p>
		</div>
		<div class="flex gap-2 items-center">
			<p>{scoreUser.point}</p>
			<div>
				{#if scoreUser?.isAnswered}
					<Icon icon="mingcute:check-2-line" class="text-2xl text-emerald-500" />
				{:else}
                <Icon icon="streamline-emojis:cross-mark" class="text-2xl text-red-500" />
				{/if}
			</div>
		</div>
	</div>
</div>
