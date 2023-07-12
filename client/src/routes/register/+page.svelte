<script>
	import { onMount } from 'svelte';
	import Register from '../../components/login/register.svelte';
	import { tokens } from '../../stores/token';
	import { getMe } from '../../utils/auth';
	export let data;

	onMount(async () => {
		const result = await getMe()
		console.log(result)
	});
</script>

<Register />
