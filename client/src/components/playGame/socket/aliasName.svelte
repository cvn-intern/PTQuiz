<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { page } from '$app/stores';
	import Loading from '../../loading.svelte';
	import logo from '$assets/logo.png';
	import toast from 'svelte-french-toast';
	import { t } from '../../../libs/i18n/translations';
	import { translateValidation } from '../../../libs/helpers/translateValidation';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	export let socket: Socket;
	export let isJoined: boolean;
	export let roomInfo: any;

	let isLoading: boolean = false;
	let aliasName: string = roomInfo.user.aliasName;
	let isPublicRoom: boolean = roomInfo.room.isPublic;
	let isHost = roomInfo.isHost;
	let roomPassword: string = '';
	let isDisabled = false;
	onMount(() => {
		socket.on(EmitChannel.JOINED, (data: any) => {
			if (data.status === false) {
				toast.error(translateValidation(data.message));
			} else {
				isJoined = true;
			}
			isLoading = false;
		});
	});
	const joinRoom = () => {
		aliasName = aliasName.trim();
		isDisabled = true;
		setTimeout(() => {
			isDisabled = false;
		}, 3000);
		if (aliasName.length > 10 || aliasName.length < 1) {
			toast.error(t.get('validation.SOCKET_ALIAS_CONSTRAINT'));
			return;
		}
		if (!isHost) {
			if (!isPublicRoom && roomPassword.length === 0) {
				toast.error(t.get('validation.SOCKET_ROOM_MUST_BE_FILLED'));
				return;
			}
		}
		socket.emit(ListenChannel.JOIN_ROOM, {
			roomPIN: $page.params.slug,
			aliasName,
			roomPassword
		});
		isLoading = true;
	};
</script>

{#if isLoading}
	<div class="bg-greenLight w-full h-screen">
		<Loading />
	</div>
{:else}
	<button
		class="absolute top-4 left-4"
		on:click={() => {
			goto('/');
		}}
	>
		<Icon icon="tabler:home" class="w-12 h-12 text-darkGreen" />
	</button>
	<div class="flex flex-col justify-center items-center h-full gap-4 bg-room bg-cover">
		<div class="logo flex flex-col items-center">
			<img src={logo} alt="logo" class="w-52 animate-wiggle" />
		</div>
		<form
			class="flex flex-col gap-2 p-4 bg-white rounded-xl w-[300px] shadow-xl border-2 border-gray-200"
			on:submit|preventDefault={joinRoom}
		>
			<label for="aliasName">{$t('common.aliasName')} :</label>
			<input
				type="text"
				name="alias-name"
				placeholder={$t('common.aliasName')}
				id="alias-name"
				bind:value={aliasName}
				class="rounded-lg"
			/>
			{#if !isPublicRoom && !isHost}
				<label for="roomPassword">{$t('common.roomPassword')} :</label>
				<input
					type="password"
					name="room-password"
					id="room-password"
					placeholder={$t('common.roomPassword')}
					bind:value={roomPassword}
					class="rounded-lg"
				/>
			{/if}
			<button
				disabled={isDisabled}
				class={`block mt-2 px-4 py-2 rounded-md bg-yellowLogo hover:bg-darkGreen text-white font-bold text-xl focus:outline-none ${
					isDisabled ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				type="submit">GO</button
			>
		</form>
	</div>
{/if}
