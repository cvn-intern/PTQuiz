export const actions = {
    login: async ({ fetch, request }) => {
        const response = await fetch("/api/auth/login", {
            method : 'POST'
        });
        const result = await response.json()
        return result;
    }
};
