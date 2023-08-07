<script lang="ts">
	export let reactions: any[] = [];
</script>

<div class="fixed top-0 bottom-0 left-0 right-0 overflow-x-hidden z-0 pointer-events-none">
	<div class="py-32">
		{#each reactions as reaction}
			<p
				class="reaction absolute text-center z-10 pointer-events-auto text-9xl"
				style="left: {Math.random() * 80}vw;"
			>
				{reaction.reaction}
			</p>
		{/each}
	</div>
</div>

<style>
	@keyframes flyInFromTop {
		0% {
			transform: translateY(-100%);
			opacity: 1;
		}
		100% {
			transform: translateY(0);
			opacity: 0;
		}
	}
	.reaction {
		animation: flyInFromTop 3s linear forwards;
	}
</style>
