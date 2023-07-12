import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies }) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": "phong.ngo123@hcmut.edu.vn",
            "password": "12345678"
        })
    })
    const result = await response.json();
    if (result.error) {
        // throw error(500, result.error.response)
    }
    cookies.set("accessToken", result.data.accessToken, {
        path: '/',
    });
    cookies.set("refreshToken", result.data.refreshToken, {
        path: '/'
    });
    return json(result);
}
