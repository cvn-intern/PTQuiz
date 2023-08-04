<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { page } from '$app/stores';
	import Loading from '../../loading.svelte';
	import logo from '$assets/logo.png';
	import toast from 'svelte-french-toast';

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
				toast.error(data.message);
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
			toast.error('Alias name must be between 1 and 10 characters');
			return;
		}
		if (!isHost) {
			if (!isPublicRoom && roomPassword.length === 0) {
				toast.error('Room password must be filled');
				return;
			}
		}
		socket.emit(ListenChannel.JOIN_ROOM, {
			roomPIN: $page.params.slug,
			aliasName,
			roomPassword,
			isHostJoined: isHost
		});
		isLoading = true;
	};
</script>

{#if isLoading}
	<div class="bg-greenLight w-full h-screen">
		<Loading />
	</div>
{:else}
	<div class="flex flex-col justify-center items-center h-full gap-4 bg-room bg-cover">
		<div class="logo flex flex-col items-center">
			<img src={logo} alt="logo" class="w-52 animate-wiggle" />
		</div>
		<form
			class="flex flex-col gap-2 p-4 bg-white rounded-xl w-[300px] shadow-xl border-2 border-gray-200"
			on:submit|preventDefault={joinRoom}
		>
			<label for="aliasName">Alias Name :</label>
			<input
				type="text"
				name="aliasName"
				autocomplete="username"
				placeholder="Alias Name"
				id="aliasName"
				bind:value={aliasName}
				class="rounded-lg"
			/>
			{#if !isPublicRoom && !isHost}
				<label for="roomPassword">Room password :</label>
				<input
					type="password"
					name="roomPassword"
					id="roomPassword"
					placeholder="Password"
					autocomplete="current-password"
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
