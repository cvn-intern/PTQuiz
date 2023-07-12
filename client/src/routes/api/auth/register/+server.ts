import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
    // get data from request
    const data = await request.json();
    const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data
        })
    });
    const result = await response.json();
    if (response.status === 200) {
        return new Response(JSON.stringify(result.message), {
            status: 200,
        });
    } else {
        return new Response(JSON.stringify(result.message), {
            status: 400,
        });
    }
};
