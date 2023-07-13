import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
    const response = await fetch('/api/auth/me');
    const result = await response.json()
    if (response.status === 200) {
        const { iat, exp, ...user } = result;
        return {
            status: 'Success',
            user
        };
    } else {
        return {
            status: 'Error',
            user: null
        }
    }
}
