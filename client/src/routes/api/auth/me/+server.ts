import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, cookies }) => {
    const accessToken = cookies.get("accessToken")
    const response = await fetch("http://localhost:8080/api/auth/me", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        },
    })
    const result = await response.json();
    if(result.error) throw error(400, result.error.message)
    return json(result.data)
}
