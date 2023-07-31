<div class="page-container">
	<div class="loading">
		<span>Loading</span>
	</div>
</div>

<style>
	.page-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 9999;
	}
	.loading {
		font-family: 'Arial Black', 'Arial Bold', Gadget, sans-serif;
		text-transform: uppercase;

		width: 150px;
		text-align: center;
		line-height: 50px;

		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		margin: auto;
		transform: translateY(-50%);
		transform: scale(3);
	}

	.loading span {
		position: relative;
		z-index: 999;
		color: #1e3f20;
	}
	.loading:before {
		content: '';
		background: #f8fff0;
		width: 128px;
		height: 36px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;

		animation: 2s loadingBefore infinite ease-in-out;
	}

	@keyframes loadingBefore {
		0% {
			transform: translateX(-14px);
		}
		50% {
			transform: translateX(14px);
		}
		100% {
			transform: translateX(-14px);
		}
	}

	.loading:after {
		content: '';
		background: #ff3600;
		width: 14px;
		height: 60px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		opacity: 0.5;

		animation: 2s loadingAfter infinite ease-in-out;
	}

	@keyframes loadingAfter {
		0% {
			transform: translateX(-50px);
		}
		50% {
			transform: translateX(50px);
		}
		100% {
			transform: translateX(-50px);
		}
	}
</style>
