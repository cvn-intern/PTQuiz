<script lang="ts">
    export let message: string;
    export let displayName: string;
    export let avatar: string;
</script>
<div>
	<span class="text-xs text-neutral-600 pl-3">{displayName}</span>
	<div
		class="flex gap-2 items-center backdrop-opacity-10 backdrop-invert bg-white/30 rounded-2xl w-full truncate"
	>
		<img
			src={avatar}
			alt=""
			class="w-10 h-8"
		/>
		<p class="text-neutral-700 text-xs">{message}</p>
	</div>
</div>
