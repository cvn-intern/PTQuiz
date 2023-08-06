<script lang="ts">
	export let reactions: any[] = [];
</script>

<div class="fixed top-0 bottom-0 left-0 right-0 overflow-x-hidden z-0">
	<div id="clouds">
		{#each reactions as reaction, index}
			<div class={`cloud x${(index % 5) + 1} flex items-center justify-center`}>
				<img
					src={reaction.user.avatar}
					alt={reaction.user.displayName}
					class="w-12 h-12 rounded-full relative z-10"
				/>
				<p class="mt-2 text-center relative z-20">{reaction.message}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.clouds {
		padding: 100px 0;
	}

	.cloud {
		width: 200px;
		height: 60px;
		background: #fff;
		border-radius: 200px;
		position: relative;
	}

	.cloud:before,
	.cloud:after {
		content: '';
		position: absolute;
		background: #fff;
		width: 100px;
		height: 80px;
		position: absolute;
		top: -15px;
		left: 10px;

		border-radius: 100px;
		transform: rotate(30deg);
	}

	.cloud:after {
		width: 120px;
		height: 120px;
		top: -55px;
		left: auto;
		right: 15px;
	}

	.x1 {
		animation: moveclouds 15s linear forwards;
	}

	.x2 {
		left: 200px;
		animation: moveclouds 25s linear forwards;
		transform: scale(0.6);
	}

	.x3 {
		left: -250px;
		top: -200px;
		transform: scale(0.8);
		opacity: 0.8;

		animation: moveclouds 20s linear forwards;
	}

	.x4 {
		left: 470px;
		top: -250px;

		-webkit-transform: scale(0.75);
		-moz-transform: scale(0.75);
		transform: scale(0.75);
		opacity: 0.75;
		animation: moveclouds 18s linear forwards;
	}

	.x5 {
		left: -150px;
		top: -150px;

		-webkit-transform: scale(0.8);
		-moz-transform: scale(0.8);
		transform: scale(0.8);
		opacity: 0.8;

		animation: moveclouds 20s linear forwards;
	}

	@keyframes moveclouds {
		0% {
			margin-left: 1000px;
		}
		100% {
			margin-left: -1000px;
		}
	}
</style>
