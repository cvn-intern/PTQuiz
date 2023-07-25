import toast from 'svelte-french-toast';
import { t } from '$i18n/translations';

let sharedToastId: string | number;

export const showLoadingToast = (): void => {
	sharedToastId = toast.loading(t.get('common.loading'), { duration: 20000 });
};

export const dismissLoadingToast = (): void => {
	toast.dismiss(sharedToastId);
};

export const showToast = (type: 'success' | 'error', message: string): void => {
	if (type === 'success') {
		toast.success(message);
	} else if (type === 'error') {
		toast.error(message);
	}
};
