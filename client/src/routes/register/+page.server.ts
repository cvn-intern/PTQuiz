import { get } from 'svelte/store';
import { tokens } from '../../stores/token';
import { getMe } from '../../utils/auth';

export const load = async () => {
	console.log(get(tokens));
	const result = await getMe();
	return {
		props: {
			user: result?.data
		}
	};
};
