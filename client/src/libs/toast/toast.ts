import toast from 'svelte-french-toast';

let sharedToastId: string | number;

export const showLoadingToast = (): void => {
	sharedToastId = toast.loading('Loading...', { duration: 20000 });
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
