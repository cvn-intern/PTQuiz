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
	<div class="flex justify-center items-center h-full">
		<form class="flex flex-col gap-4 p-4 bg-white" on:submit|preventDefault={joinRoom}>
			<div class="logo flex items-center gap-2">
				<img src={logo} alt="logo" class="hidden md:block w-16" />
				<h1
					class="hidden text-2xl md:block md:text-3xl font-bold font-title text-darkGreen"
				>
					Quiz<sup class="text-lg md:text-xl text-orangeLogo">P</sup><sup
						class="text-lg md:text-xl text-blueLogo">T</sup
					>
				</h1>
			</div>
			<label for="aliasName">Alias Name :</label>
			<input
				type="text"
				name="aliasName"
				autocomplete="username"
				id="aliasName"
				bind:value={aliasName}
			/>
			{#if !isPublicRoom && !isHost}
				<label for="roomPassword">Room password :</label>
				<input
					type="password"
					name="roomPassword"
					id="roomPassword"
					autocomplete="current-password"
					bind:value={roomPassword}
				/>
			{/if}
			<button
				disabled={isDisabled}
				class={`block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none ${
					isDisabled ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				type="submit">Ok, GO</button
			>
		</form>
	</div>
{/if}
