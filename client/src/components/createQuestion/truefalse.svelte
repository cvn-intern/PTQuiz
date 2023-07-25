<script>
	import Option from './option.svelte';
</script>

<div
	class=" grid 2xl:grid-cols-2 2xl:gap-3 2xl:h-1/2 2xl:w-full xl:grid-cols-2 xl:gap-3 xl:h-1/2 xl:w-full lg:grid-cols-2 lg:gap-2 lg:h-1/2 lg:w-full md:grid-cols-2 md:gap-3 md:h-1/2 md:w-full grid-cols-1 gap-3 h-1/2 w-full"
>
	<Option
		question="False"
		optionOfQuestion="bg-optionA"
		isSingleChoice={true}
		isTrueFalse={true}
	/>
	<Option
		question="True"
		optionOfQuestion="bg-optionB"
		isSingleChoice={true}
		isTrueFalse={true}
	/>
</div>
