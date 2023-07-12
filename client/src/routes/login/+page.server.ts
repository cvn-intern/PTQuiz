import { apiNoAuth } from '../../utils/api';
import { tokens } from '../../stores/token';
import { get } from 'svelte/store';
import Login from '../../components/login/login.svelte';
import { login } from '../../utils/auth';
import { createAPI } from '../../+server';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		console.log('formData', formData);

		const result = await login(formData.get('email'), formData.get('password'));
		if (result?.status === 'Success') {
			event.cookies.set('accessToken', result.data.accessToken);
			event.cookies.set('refreshToken', result.data.refreshToken);
		}
	}
};
