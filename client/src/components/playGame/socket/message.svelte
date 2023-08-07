<script lang="ts">
	export let message: string;
	export let avatar: string;
</script>

<div>
	<div class="flex items-center gap-2">
		<img src={avatar} alt="" class="w-10 h-10 rounded-full" />
		<div
			class="flex gap-2 items-center text-darkGreen bg-white rounded-md max-w-full truncate justify-start border-2 max-h-20 whitespace-pre-wrap p-2 "
		>
			{message}
		</div>
	</div>
</div>
