<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from '../../$types';
	import socket from '../../../libs/socket/socket';
	import { page } from '$app/stores';
	export let data: LayoutData;
    let users = [];
	onMount(() => {
		console.log(data);
		const pathname = $page.url.pathname;
		const roomId = pathname.split('/')[2];
		socket.emit('join-room', {
			roomId,
			userId: data.user.id
		});
	});
</script>
