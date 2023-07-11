<script>
	import Sidebar from '../../components/Sidebar.svelte';
	import ProfileTabs from '../../components/userSetting/ProfileTabs.svelte';
</script>

<div class="flex h-screen w-screen">
	<div class="w-3/12 border-r-2">
		<Sidebar />
	</div>
	<div class="w-9/12">
		<ProfileTabs />
	</div>
</div>
