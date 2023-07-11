import { apiNoAuth } from '../../utils/api';
import { tokens } from '../../stores/token';
import { get } from 'svelte/store';
import Login from '../../components/login/login.svelte';
import { login } from '../../utils/auth';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const result = await login(formData.get('email'), formData.get('password'));
	}
};
