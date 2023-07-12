import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({fetch, url}) => {
    const response = await fetch('/api/auth/me');
    if(response.ok) {
        const result = await response.json()
        const {iat, exp, ...user} = result;
        return {
            status : 200,
            user
        };
    }
}