<script lang="ts">
	import { page } from '$app/stores';
	import { SocketError } from '$libs/message/responseMessage.enum';
	import { t } from '$i18n/translations';
	import { goto } from '$app/navigation';

	export let errorMessage: string;
	let isClicked = false;
</script>

<div class="w-full h-full flex flex-col gap-8">
	<div class="p-4">
		<button
			class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-secondary flex justify-start"
			on:click={() => {
				goto('/dashboard/quizzes');
			}}>{$t('common.backHome')}</button
		>
	</div>
	<div class="flex flex-col flex-1 items-center py-12">
		<div class="p-4 rounded-xl">
			<h1 class="text-2xl md:text-4xl font-bold text-center">{errorMessage}</h1>
		</div>
		{#if errorMessage != SocketError.SOCKET_USER_ALREADY_CONNECTED}
			<div class="arrow-down">
				<svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M7 10l5 5 5-5z" />
				</svg>
			</div>
			<button
				type="button"
				disabled={isClicked}
				class={`${isClicked ? 'cursor-not-allowed opacity-50' : ''} button`}
				on:click={() => {
					isClicked = true;
					setTimeout(() => {
						isClicked = false;
					}, 2000);
					window.location.href = $page.url.href;
				}}
			>
				<span class="button__text">Refresh</span>
				<span class="button__icon"
					><svg
						class="svg"
						height="48"
						viewBox="0 0 48 48"
						width="48"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"
						/><path d="M0 0h48v48h-48z" fill="none" /></svg
					></span
				>
			</button>
		{/if}
	</div>
</div>

<style>
	.button {
		--font-color: #ffffff;
		--bg-color-sub: #8daf74;
		--bg-color: rgb(141 175 116 / var(--tw-bg-opacity));
		--main-color: #323232;
		position: relative;
		width: 150px;
		height: 40px;
		display: flex;
		align-items: center;
		background-color: var(--bg-color);
		border-radius: 10px;
		overflow: hidden;
		transform: scale(2);
	}

	.button,
	.button__icon,
	.button__text {
		transition: all 0.3s;
	}

	.button .button__text {
		transform: translateX(30px);
		color: var(--font-color);
		font-weight: 600;
	}

	.button .button__icon {
		position: absolute;
		transform: translateX(109px);
		height: 100%;
		width: 39px;
		background-color: var(--bg-color-sub);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button .svg {
		width: 20px;
		fill: var(--main-color);
	}

	.button:hover {
		background: var(--bg-color);
	}

	.button:hover .button__text {
		color: transparent;
	}

	.button:hover .button__icon {
		width: 148px;
		transform: translateX(0);
	}

	.arrow-down {
		display: flex;
		justify-content: center;
		align-items: center;
		animation: bounce 1s infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(10px);
		}
	}

	.arrow-icon {
		width: 100px;
		height: 100px;
		fill: #323232;
	}
</style>
