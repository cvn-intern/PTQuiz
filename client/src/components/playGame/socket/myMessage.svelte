<script lang="ts">
	export let message: string;
	export let displayName: string;
	export let avatar: string;
</script>

<div>
	<p class="= text-neutral-600 pr-3 text-end w-full text-xs">{displayName}</p>
	<div
		class="flex gap-2 items-center backdrop-opacity-10 backdrop-invert bg-white/30 rounded-2xl w-full truncate justify-end border-2 border-cyan-200"
	>
		<p class="text-neutral-700 text-xs">{message}</p>
		<img src={avatar} alt="" class="w-10 h-8" />
	</div>
</div>
