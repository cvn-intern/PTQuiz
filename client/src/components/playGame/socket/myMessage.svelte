<script lang="ts">
	export let message: string;
	export let avatar: string;
</script>

<div>
	<div class="flex items-center gap-2 w-full justify-end">
		<div
			class="max-w-full flex gap-2 items-center text-white bg-bgChat2 rounded-md truncate justify-end border-2 max-h-20 whitespace-pre-wrap px-2 text-end"
		>
			{message}
		</div>
		<img src={avatar} alt="" class="w-10 h-10 rounded-full" />
	</div>
</div>
