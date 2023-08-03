<script lang="ts">
	import { t } from '$i18n/translations';
	import { dismissLoadingToast, showLoadingToast } from '$libs/toast/toast';
	import toast from 'svelte-french-toast';

	export let form: any;
	$: {
		if (form?.isDone) {
			dismissLoadingToast();

			if (form?.isSuccess) {
				toast.success(t.get('common.success'));
			} else {
				toast.error(form?.error.message);
			}
		}
	}
</script>
